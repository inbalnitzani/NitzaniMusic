import React, { useRef, useState } from 'react';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { Rating } from "primereact/rating";
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';

export default function EditSong({ songToEdit }) {
    const toast = useRef(null);
    const [song, setSong] = useState({
        title: songToEdit?.title || '',
        album: songToEdit?.album || '',
        artist: songToEdit?.artist || '',
        track: songToEdit?.track || '',
        authors: songToEdit?.authors || [],
        tags: songToEdit?.tags || [],
        keywords: songToEdit?.keywords || [],
        lyrics: songToEdit?.lyrics || '',
        isFree: songToEdit?.isFree || false,
        score: songToEdit?.score || null,
        date: songToEdit?.year ? new Date(`${songToEdit.year}-01-01`) : null,
    })
    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };
    const confirm1 = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };
    const confirm2 = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    return (
        <>
            <div className=" m-1 flex flex-wrap gap-1 p-fluid" dir='rtl'>
                {/* TITLE */}
                <div className="flex-auto">
                    <label htmlFor="title" className="font-bold block mb-2">שם השיר</label>
                    <InputText inputId="title" value={song.title} />
                </div>

                {/* ALBUM */}
                <div className="flex-auto">
                    <label htmlFor="album" className="font-bold block mb-2">אלבום</label>
                    <InputText inputId="album" value={song.album} min={0} max={100} />
                </div>

                {/* ARTIST */}
                <div className="flex-auto">
                    <label htmlFor="artist" className="font-bold block mb-2">מבצע</label>
                    <InputText inputId="artist" value={song.artist} useGrouping={false} />
                </div>

                {/* YEAR */}
                <div className="flex-auto">
                    <label htmlFor="minmax" className="font-bold block mb-2">שנה</label>
                    <Calendar value={song.date} onChange={(e) => setSong({ ...song, date: e.value })} view="year" dateFormat="yy" />
                </div>

                {/* TRACK */}
                <div className="flex-auto">
                    <label htmlFor="track" className="font-bold block mb-2">קישור</label>
                    <InputText inputId="track" value={song.track} min={0} max={100} />
                </div>

                {/* AUTHORS */}
                <div className="flex-auto w-full">
                    <label htmlFor="minmaxfraction" className="font-bold block mb-2">יוצרים</label>
                    <Chips value={song.authors} onChange={(e) => setSong({ ...song, authors: e.value })} separator="," />
                </div>
                {/* TAGS */}
                <div className="flex-auto w-full">
                    <label htmlFor="minmax" className="font-bold block mb-2">טאגים</label>
                    <Chips value={song.tags} onChange={(e) => setSong({ ...song, tags: e.value })} separator="," />
                </div>
                {/* KEYWORDS */}
                <div className="flex-auto w-full">
                    <label htmlFor="minmax" className="font-bold block mb-2">מילות מפתח</label>
                    <Chips value={song.keywords} onChange={(e) => setSong({ ...song, keywords: e.value })} separator="," />
                </div>
                {/* GENRES */}
                <div className="flex-auto w-full">
                    <label htmlFor="minmax" className="font-bold block mb-2">ז'אנרים</label>
                    <Chips value={song.genres} onChange={(e) => setSong({ ...song, genres: e.value })} separator="," />
                </div>
                {/* LYRICS */}
                <div className="flex-auto">
                    <label htmlFor="minmax" className="font-bold block mb-2">טקסט</label>
                    <InputTextarea value={song.lyrics} onChange={(e) => setSong({ ...song, lyrics: e.value })} rows={5} cols={30} />
                </div>

                {/* IS FREE */}
                <div className="card flex justify-content-center">
                    <Checkbox
                        inputId="isFree"
                        onChange={(e) => setSong({ ...song, isFree: e.checked })}
                        checked={song.isFree}
                    />
                    <label htmlFor="ingredient1" className="mr-2">נחלת הכלל</label>
                </div>

                {/* SCORE */}
                <div className="flex-auto">
                    <label htmlFor="minmax" className="font-bold block mb-2">ציון</label>
                    <Rating value={song.score} onChange={(e) => setSong({ ...song, score: e.value })} stars={3} cancel={false} />
                </div>

            </div>

            <Toast ref={toast} />
            <ConfirmPopup />
            <div className="card flex flex-wrap gap-2 justify-content-center">
                <Button onClick={confirm1} icon="pi pi-check" label="שמור"></Button>
                { songToEdit?
                    <Button onClick={confirm2} icon="pi pi-times" label="מחק" className="p-button-danger"></Button> : null
                }            </div>
        </>
    )

}
