import React, { useEffect, useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from "primereact/inputtext";
import Button from '@mui/material/Button';
export default function FilterPanel({ onChangeFilters }) {

    const [filters, setFilters] = useState([
        { id: 'keywords', label: 'מילות מפתח', value: [], options: [] },
        { id: 'authors', label: 'יוצרים', value: [], options: [] }
    ]);

    const [lyricsFilter, setLyricsFilter] = useState("");

    const handleChange = (e, i) => {
        const newFilters = [...filters];
        newFilters[i].value = e.target.value;
        setFilters(newFilters);
    };

    const handelSearch = () => {
        onChangeFilters({
            authors: filters.find(f => f.id === 'authors')?.value || [],
            keywords: filters.find(f => f.id === 'keywords')?.value || [],
            lyrics: lyricsFilter
        })
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/filtersOptions`)
          .then(res => res.json())
          .then(data => {
            setFilters(prevFilters => {
              const newFilters = [...prevFilters];
      
              const authorsFilter = newFilters.find(f => f.id === 'authors');
              if (authorsFilter) {
                authorsFilter.options = data.authors.map(a => ({ label: a, value: a }));
              }
      
              const keywordsFilter = newFilters.find(f => f.id === 'keywords');
              if (keywordsFilter) {
                keywordsFilter.options = data.keywords.map(k => ({ label: k, value: k }));
              }
      
              return newFilters;
            });
          });
      }, []);
      



    return (
        <form className="">
            <div className=" flex flex-row gap-3" >
                <Button variant="outlined" onClick={handelSearch}>חפש</Button>

                {/* Search by lyrics filter */}
                <FloatLabel key={"lyrics"} >
                    <InputText id="lyrics" onChange={(e) => setLyricsFilter(e.target.value)} value={lyricsFilter} />
                    <label htmlFor="lyrics">חיפוש לפי טקסט</label>
                </FloatLabel>
                {/* other filters */}
                {filters.map((filter, i) => (
                    <FloatLabel key={filter.id} className="w-full  text-right" >
                        <MultiSelect id={filter.id} onChange={(e) => handleChange(e, i)} value={filter.value} options={filter.options}
                            filter className="w-full " maxSelectedLabels={3} />
                        <label htmlFor={filter.id}>{"חיפוש לפי " + filter.label}</label>
                    </FloatLabel>
                ))}

            </div>
        </form>




    );
}
