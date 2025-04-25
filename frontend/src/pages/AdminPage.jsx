import React from "react";
import SongsDataTable from "../components/SongsDataTable";
import FilterPanel from "../components/FilterPanel";

export default function AdminPage() {
    return (
      <div>
        <FilterPanel/>
        <SongsDataTable/>
      </div>
    );
  }
  