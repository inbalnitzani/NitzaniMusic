import React from "react";
import SongsDataTable from "../components/SongsDataTable";
import FilterPanel from "../components/FilterPanel";

export default function AdminPage() {
      const columns = [{ field: 'keywords', header: 'מילות מפתח' }, { field: 'genres', header: "ז'אנרים" }, { field: 'authors', header: 'יוצרים' }, { field: 'artist', header: 'מבצע' }, { field: 'title', header: 'שם' }];
  
    return (
      <div>
        <FilterPanel/>
        <SongsDataTable columns={columns}/>
      </div>
    );
  }
  