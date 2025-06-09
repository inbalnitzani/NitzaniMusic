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

export default function EditSong({ songToEdit, onClose }) {
    
    const toast = useRef(null);

    const [song, setSong] = useState({
        id: songToEdit?.id,
        title: songToEdit?.title || '',
        album: songToEdit?.album || '',
        artist: songToEdit?.artist || '',
        link: songToEdit?.link || '',
        authors: Array.isArray(songToEdit?.authors) ? songToEdit.authors : [],
        tags: Array.isArray(songToEdit?.tags) ? songToEdit.tags : [],
        keywords: Array.isArray(songToEdit?.keywords) ? songToEdit.keywords : [],
        lyrics: songToEdit?.lyrics || '',
        isFree: songToEdit?.isFree || false,
        score: songToEdit?.score || null,
        date: songToEdit?.year ? new Date(`${songToEdit.year}-01-01`) : null,
    })

    const editSong = async () => {
    try {
        const response = await fetch("http://localhost:3000/songs/edit", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", 
            body: JSON.stringify(song) 
        });

        const data = await response.json();

        if (response.ok) {
            toast.current.show({ severity: "success", summary: "עודכן בהצלחה" });
            //onClose();
        } else {
            throw new Error(data.error || "שגיאה בעדכון");
        }

    } catch (err) {
        console.error("❌ editSong failed:", err);
        toast.current.show({ severity: "error", summary: "שגיאה", detail: err.message });
    }
};

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        editSong();
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
            message: 'אתה בטוח שאתה רוצה למחוק את השיר הזה?',
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
                    <InputText
                        id="title"
                        value={song.title}
                        onChange={(e) =>
                            setSong({ ...song, title: e.target.value })
                        }
                    />
                </div>

                {/* ALBUM */}
                <div className="flex-auto">
                    <label htmlFor="album" className="font-bold block mb-2">אלבום</label>
                    <InputText
                        id="album"
                        value={song.title}
                        min={0} max={100}
                        onChange={(e) =>
                            setSong({ ...song, album: e.target.value })
                        }
                    />
                </div>

                {/* ARTIST */}
                <div className="flex-auto">
                    <label htmlFor="artist" className="font-bold block mb-2">מבצע</label>
                    <InputText
                        id="artist"
                        value={song.artist}
                        onChange={(e) =>
                            setSong({ ...song, artist: e.target.value })
                        }
                    />
                </div>

                {/* YEAR */}
                <div className="flex-auto">
                    <label htmlFor="minmax" className="font-bold block mb-2">שנה</label>
                    <Calendar value={song.date} onChange={(e) => setSong({ ...song, date: e.value })} view="year" dateFormat="yy" />
                </div>

                {/* LINK */}
                <div className="flex-auto">
                    <label htmlFor="link" className="font-bold block mb-2">קישור</label>
                    <InputText
                        id="link"
                        value={song.link}
                        min={0} max={100}
                        onChange={(e) =>
                            setSong({ ...song, link: e.target.value })
                        }
                    />
                </div>

                {/* AUTHORS */}
                <div className="flex-auto w-full" dir='ltr'>
                    <label htmlFor="minmaxfraction" className="font-bold block mb-2">יוצרים</label>
                    <Chips value={song.authors} onChange={(e) => setSong({ ...song, authors: e.value })} separator="," className="chips-spacing" />
                </div>
                {/* TAGS */}
                <div className="flex-auto w-full" dir='ltr'>
                    <label htmlFor="minmax" className="font-bold block mb-2">טאגים</label>
                    <Chips value={song.tags} onChange={(e) => setSong({ ...song, tags: e.value })} separator="," className="chips-spacing" />
                </div>
                {/* KEYWORDS */}
                <div className="flex-auto w-full" dir='ltr'>
                    <label htmlFor="minmax" className="font-bold block mb-2">מילות מפתח</label>
                    <Chips value={song.keywords} onChange={(e) => setSong({ ...song, keywords: e.value })} separator="," className="chips-spacing" />
                </div>
                {/* GENRES */}
                <div className="flex-auto w-full gap-2" dir='ltr'>
                    <label htmlFor="minmax" className="font-bold block mb-2">ז'אנרים</label>
                    <Chips value={song.genres} onChange={(e) => setSong({ ...song, genres: e.value })} separator="," className="chips-spacing" />
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
                {songToEdit ?
                    <Button onClick={confirm2} icon="pi pi-times" label="מחק" className="p-button-danger"></Button> : null
                }            </div>
        </>
    )

}
