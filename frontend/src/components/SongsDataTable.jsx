import React, { useState } from "react";
import TruncatedCell from './TruncatedCell'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-cyan/theme.css";



export default function SongsDataTable({ columns, songs, totalRecords, onPageChange}) {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const handlePageChange = (e) => {

        const newPage = Math.floor(e.first / e.rows) + 1;
        setPage(newPage);
        setLimit(e.rows);
    
        onPageChange(newPage, e.rows);

    };



    return (
        <div className="card " >
            <DataTable value={songs}
                lazy
                paginator
                onPage={handlePageChange}
                totalRecords={totalRecords}
                first={(page - 1) * limit}
                rows={limit}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}>

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


            </DataTable>
        </div>
    );
}