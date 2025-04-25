import React, { useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { Chips } from 'primereact/chips';
        
import { Dropdown } from 'primereact/dropdown';
        
export default function FilterPanel() {
    const [value, setValue] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    return (
        <div className="flex gap-1">
        <div className="card p-fluid">
            <FloatLabel>
                <Chips id="lyrics" value={value} onChange={(e) => setValue(e.value)} />
                <label htmlFor="lyrics">חיפוש לפי טקסט</label>
            </FloatLabel>
        </div>
        <div className="card flex justify-content-center">
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="חיפוש לפי יוצר" className="w-full md:w-14rem" />
        </div>
        <div className="card flex justify-content-center">
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="חיפוש לפי מילת מפתח" className="w-full md:w-14rem" />
        </div>
        </div>


    );
}
