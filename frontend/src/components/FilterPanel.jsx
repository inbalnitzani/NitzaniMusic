import React, { useEffect, useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from "primereact/inputtext";
import Button from '@mui/material/Button';
export default function FilterPanel() {

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

    useEffect(() => {
        fetch(`http://localhost:3000/filtersOptions`)
            .then(res => res.json())
            .then(data => {
                setFilters(prevFilters => {
                    const newFilters = [...prevFilters];

                    const authorsFilter = newFilters.find(f => f.id === 'authors');
                    if (authorsFilter) {
                        authorsFilter.options = data.authors;
                    }

                    const keywordsFilter = newFilters.find(f => f.id === 'keywords');
                    if (keywordsFilter) {
                        keywordsFilter.options = data.keywords;
                    }

                    return newFilters;
                });
            });
    }, []);


    return (
        <div className="card flex flex-column gap-3" >

            <Button variant="outlined">חפש</Button>

            {/* Search by lyrics filter */}
            <FloatLabel key={"lyrics"} >
                <InputText id="lyrics" value={lyricsFilter} onChange={(e) => setLyricsFilter(e.target.value)} />
                <label htmlFor="lyrics">חיפוש לפי טקסט</label>
            </FloatLabel>
            {/* other filters */}
            {filters.map((filter, i) => (
                <FloatLabel key={filter.id} className="w-full  text-right" >
                    <MultiSelect id={filter.id} value={filter.value} onChange={(e) => handleChange(e, i)} options={filter.options}
                        filter className="w-full " maxSelectedLabels={3} />
                    <label htmlFor={filter.id}>{"חיפוש לפי " + filter.label}</label>
                </FloatLabel>
            ))}

        </div>



    );
}
