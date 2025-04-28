import React, { useState } from "react";
import TruncatedCell from './TruncatedCell'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import SongsPDF from './SongsPDF';
import { pdf } from '@react-pdf/renderer'; 

export default function SongsDataTable({ columns, songs, totalRecords, onPageChange }) {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [selectedSongs, setSelectedSongs] = useState([]);
 
    const handlePageChange = (e) => {

        const newPage = Math.floor(e.first / e.rows) + 1;
        setPage(newPage);
        setLimit(e.rows);

        onPageChange(newPage, e.rows);

    };

    const handleExportSelected = async () => {
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
      
        URL.revokeObjectURL(url); // ניקוי זיכרון
      };

      const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
      const paginatorRight = <Button  onClick={handleExportSelected} type="button" icon="pi pi-download" text />;
  
    return (
        
        <div className="card " >
            
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
                    <Column key={col.field} field={col.field} header={col.header}
                        body={(rowData) => (
                            <TruncatedCell
                                tooltipId={col.header + i}
                                value={
                                    Array.isArray(rowData[col.field])
                                        ? rowData[col.field].join(', ')
                                        : rowData[col.field]
                                }
                            />
                        )} />
                ))}
                              <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>



            </DataTable>
        </div>
    );
}