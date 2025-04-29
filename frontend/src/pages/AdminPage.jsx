import React, { useState, useEffect } from "react";
import SongsDataTable from "../components/SongsDataTable";
import FilterPanel from "../components/FilterPanel";

export default function AdminPage() {

  const [filters, setFilters] = useState({});
  const [songs, setSongs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);

  const columns = [{ field: 'track', header: 'קישור'},{ field: 'keywords', header: 'מילות מפתח' }, { field: 'genres', header: "ז'אנרים" }, { field: 'authors', header: 'יוצרים' }, { field: 'artist', header: 'מבצע' }, { field: 'title', header: 'שם' }];

  useEffect(() => {

    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
  
    if (filters.lyrics) {
      params.append('lyrics', filters.lyrics);
    }
    if (filters.authors && filters.authors.length > 0) {
      filters.authors.forEach(author => params.append('authors', author));
    }
    if (filters.keywords && filters.keywords.length > 0) {
      filters.keywords.forEach(keyword => params.append('keywords', keyword));
    }
    

    fetch(`http://localhost:3000/songs?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setSongs(data.rows || data);
        setTotalRecords(data.total || 50);

      });
  }, [page, limit, filters]);

  const handlePageChange = (newPage, newLimit) => {
    setPage(newPage);
    setLimit(newLimit);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); 
  }

  return (
    <div>
      <FilterPanel onChangeFilters={handleFilterChange} />
      <SongsDataTable 
        columns={columns}
        songs={songs}
        totalRecords={totalRecords}
        onPageChange={handlePageChange} />
    </div>
  );
}
