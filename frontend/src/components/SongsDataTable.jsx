import React, { useState } from "react";
import TruncatedCell from './TruncatedCell'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import SongsPDF from './SongsPDF';
import { pdf } from '@react-pdf/renderer';
import { Dialog } from 'primereact/dialog';
import { SongsExcel } from "./SongsExcel";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import EditSong from "./EditSong";
export default function SongsDataTable({ columns, songs, totalRecords, onPageChange }) {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [exportVisible, setExportVisible] = useState(false);
    const [newSongVisible, setnewSongVisible] = useState(false);
    const [fileName, setFileName] = useState('');
    const [songToEdit,setSongToEdit] = useState(null);

    const handlePageChange = (e) => {

        const newPage = Math.floor(e.first / e.rows) + 1;
        setPage(newPage);
        setLimit(e.rows);

        onPageChange(newPage, e.rows);

    };

    const handleExportSelectedPDF = async () => {
        if (selectedSongs.length === 0) {
            alert('לא נבחרו שירים לייצוא');
            return;
        }

        const blob = await pdf(<SongsPDF songs={selectedSongs} />).toBlob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName + '.pdf';
        a.click();

        URL.revokeObjectURL(url);
        setFileName('');
        setExportVisible(false);
    };

    const handleExportSelectedExcel = () => {
        if (selectedSongs.length === 0) {
            alert('לא נבחרו שירים לייצוא');
            return;
        }
        SongsExcel(selectedSongs, ['title', 'artist', 'authors', 'track'], fileName);
        setFileName('');
        setExportVisible(false);
    };


    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button onClick={() => setExportVisible(true)} type="button" icon="pi pi-download" text />;

    return (

        <div className="card " >
            {/* ADD NEW SONG DIALOG */}
            <Dialog 
            visible={newSongVisible}
            style={{ width: '50vw' }} onHide={() => {
                setSongToEdit(null)
                if (!newSongVisible) return; setnewSongVisible(false); } } closeIcon={<i className="pi pi-times" />} >
                <EditSong songToEdit={songToEdit}></EditSong>
            </Dialog>


            {/* EXPORT DIALOG */}
            <Dialog dir="rtl" header="בחר סוג קובץ:" visible={exportVisible} onHide={() => { if (!exportVisible) return; setExportVisible(false); }}
                style={{ width: '30vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                closeIcon={<i className="pi pi-times" />}>
                <div className="dialog-body">
                    <div className="p-fluid">
                    <FloatLabel  >
                        <InputText id="fileName" onChange={(e) => setFileName(e.target.value)} value={fileName} />
                        <label htmlFor="fileName">שם הקובץ</label>
                    </FloatLabel>
                    </div>
                    <div className="dialog-buttons">

                        <Button onClick={handleExportSelectedPDF}>PDF</Button>
                        <Button onClick={handleExportSelectedExcel}>Excel</Button>
                    </div>
                </div>
            </Dialog>

            {/* SONGS TABLE */}
            <DataTable value={songs}
            dir="rtl"
                lazy
                paginator
                paginatorLeft={paginatorLeft}
                paginatorRight={paginatorRight}
                onPage={handlePageChange}
                totalRecords={totalRecords}
                first={(page - 1) * limit}
                rows={limit}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
                selection={selectedSongs} onSelectionChange={(e) => setSelectedSongs(e.value)}
                className="songs-table">

                                    {/* SELECT FOR EXPORT */}
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                {/* EDIT */}
                <Column 
                    header={<Button type="button" icon="pi pi-plus" text onClick={() => setnewSongVisible(true)}/>} 
                    body={(rowData) => (<Button type="button" icon="pi pi-pen-to-square" text onClick={() => {
                        setnewSongVisible(true)
                        setSongToEdit(rowData)
                        }} />)}>
                        
                </Column>

                {columns.map((col, i) => (

                    // link to youtube
                    col.field === 'link' ? (
                        <Column
                            key={col.field}
                            header={col.header}
                            body={(rowData) =>
                                rowData.link ? (
                                    <Button
                                        icon="pi pi-play-circle"
                                        onClick={() => window.open(rowData.link, '_blank')}
                                        className="p-button-sm p-button-text"
                                    />
                                ) : null
                            }
                            style={{ width: '6rem', textAlign: 'right' }}
                        />
                    ) : (

                        //other columns 
                        <Column
                            key={col.field}
                            field={col.field}
                            header={col.header}
                            body={(rowData) => (
                                <TruncatedCell
                                    tooltipId={col.header + i}
                                    value={
                                      rowData[col.field]
                                    }
                                />
                            )}
                        />
                    )
                ))}




            </DataTable>
        </div>
    );
}