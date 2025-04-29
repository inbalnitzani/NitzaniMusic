import React, { useState } from "react";
import TruncatedCell from './TruncatedCell'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import SongsPDF from './SongsPDF';
import { pdf } from '@react-pdf/renderer';
import { Dialog } from 'primereact/dialog';
import { SongsExcel } from "./SongsExcel";
export default function SongsDataTable({ columns, songs, totalRecords, onPageChange }) {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [visible, setVisible] = useState(false);

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
        a.download = 'songs.pdf';
        a.click();

        URL.revokeObjectURL(url);
    };

    const handleExportSelectedExcel = () => {
        if (selectedSongs.length === 0) {
            alert('לא נבחרו שירים לייצוא');
            return;
        }
        SongsExcel(selectedSongs, ['title', 'artist', 'authors', 'track']);
    };
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button onClick={() => setVisible(true)} type="button" icon="pi pi-download" text />;

    return (

        <div className="card " >
            {/* EXPORT DIALOG */}
            <Dialog dir="rtl" header="בחר סוג קובץ:" visible={visible} onHide={() => { if (!visible) return; setVisible(false); }}
                style={{ width: '20vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                closeIcon={<i className="pi pi-times" />}>
                <div className="flex justify-center gap-1.5">
                    <button onClick={handleExportSelectedPDF}>PDF</button>
                    <button onClick={handleExportSelectedExcel}>Excel</button></div>
            </Dialog>

            {/* SONGS TABLE */}
            <DataTable value={songs}
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
                selection={selectedSongs} onSelectionChange={(e) => setSelectedSongs(e.value)}>

                {columns.map((col, i) => (

                    // link to youtube
                    col.field === 'track' ? (
                        <Column
                            key={col.field}
                            header={col.header}
                            body={(rowData) =>
                                rowData.track ? (
                                    <Button
                                        icon="pi pi-play-circle"
                                        onClick={() => window.open(rowData.track, '_blank')}
                                        className="p-button-sm p-button-text"
                                    />
                                ) : null
                            }
                            style={{ width: '6rem', textAlign: 'center' }}
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
                                        Array.isArray(rowData[col.field])
                                            ? rowData[col.field].join(', ')
                                            : rowData[col.field]
                                    }
                                />
                            )}
                        />
                    )
                ))}

                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>



            </DataTable>
        </div>
    );
}