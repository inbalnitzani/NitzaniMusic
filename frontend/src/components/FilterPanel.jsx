import React, { useEffect, useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from "primereact/inputtext";
export default function FilterPanel() {

    const [filters, setFilters] = useState([
        { id: 'keywords', label: 'מילות מפתח', value: [] },
        { id: 'authors', label: 'יוצרים', value: [] }
    ]);

    const [lyricsFilter, setLyricsFilter] = useState("");
    const [filtersOptions,setFiltersOptions] = useState([[],[]]);

    const handleChange = (e, i) => {
        const newFilters = [...filters];
        newFilters[i].value = e.target.value;
        setFilters(newFilters);
    };

        useEffect(() => {
            fetch(`http://localhost:3000/filtersOptions`)
                .then(res => res.json())
                .then(data => {
                    setFiltersOptions(data); 
    
                });
        }, []);
    
    return (
        <div className="card flex flex-column gap-3" >

            {/* Search by lyrics filter */}
            <FloatLabel key={"lyrics"} >
                <InputText id="lyrics" value={lyricsFilter} onChange={(e) => setLyricsFilter(e.target.value)} />
                <label htmlFor="lyrics">חיפוש לפי טקסט</label>
            </FloatLabel>
            {/* other filters */}
            {filters.map((filter, i) => (
                <FloatLabel key={filter.id} className="w-full  text-right" >
                    <MultiSelect id={filter.id} value={filter.value} onChange={(e) => handleChange(e, i)} options={filtersOptions}
                        filter className="w-full " maxSelectedLabels={3}  />
                    <label htmlFor={filter.id}>{"חיפוש לפי " + filter.label}</label>
                </FloatLabel>
            ))}
        </div>


    );
}
