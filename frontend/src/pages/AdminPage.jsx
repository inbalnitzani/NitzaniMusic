import React, { useState, useEffect } from "react";
import SongsDataTable from "../components/SongsDataTable";
import FilterPanel from "../components/FilterPanel";


export default function AdminPage() {

  const [filters, setFilters] = useState({});
  const [songs, setSongs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const columns = [{ field: 'title', header: 'שם' }, { field: 'artist', header: 'מבצע' }, { field: 'authors', header: 'יוצרים' }, { field: 'geners', header: "ז'אנרים" }, { field: 'keywords', header: 'מילות מפתח' }, { field: 'link', header: 'קישור' }];

  // check auth
    useEffect(() => {
      console.log(`${import.meta.env.VITE_API_URL}/auth/user`);
    fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 403) throw new Error("אין לך הרשאה להיכנס לדף זה");
          if (res.status === 401) throw new Error("יש להתחבר קודם");
          throw new Error("שגיאה כללית");
        }
        return res.json();
      })
      .then(data => setUser(data.user))
      .catch(err => setError(err.message));
  }, []);

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


    fetch(`${import.meta.env.VITE_API_URL}/songs?${params.toString()}`)
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

    if (error) return (
    <div style={{ color: "red", padding: "1rem" }}>
      <h3>שגיאה</h3>
      <p>{error}</p>
    </div>
  );

  if (!user) return <div>טוען מידע...</div>;

  return (
    <div className="page">
      <h1>שירים</h1>
      <FilterPanel onChangeFilters={handleFilterChange} />
      <SongsDataTable
        columns={columns}
        songs={songs}
        totalRecords={totalRecords}
        onPageChange={handlePageChange} />
    </div>
  );
}
