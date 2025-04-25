import React, { useEffect, useState } from "react";
import TruncatedCell from './TruncatedCell'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function SongsDataTable() {

    const columns = [{ field: 'keywords', header: 'מילות מפתח' }, { field: 'genres', header: "ז'אנרים" }, { field: 'authors', header: 'אומנים' }, { field: 'artist', header: 'מבצע' }, { field: 'title', header: 'שם' }];
    const [songs, setSongs] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalRecords, setTotalRecords] = useState(0); 

    const handlePageChange = (e) => {
        setPage(Math.floor(e.first / e.rows) + 1);
        setLimit(e.rows);
    };

    useEffect(() => {
        fetch(`http://localhost:3000/songs?page=${page}&limit=${limit}`)
            .then(res => res.json())
            .then(data => {
                setSongs(data.rows || data); 
                setTotalRecords(data.total || 50);

            });
    }, [page, limit]);


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