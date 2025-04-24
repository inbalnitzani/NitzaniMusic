import React, { useEffect, useState } from "react";
import TruncatedCell from './TruncatedCell'
import Tooltip from '@mui/material/Tooltip';

export default function DataTable() {

    const columns = ["Keywords", "Genres", "Link", "Authors", "Artist", "Title"];
    const [songs, setSongs] = useState([]);
    const [page, setPage] = useState(1);

    const limit = 10;

    useEffect(() => {
        fetch(`http://localhost:3000/songs?page=${page}&limit=${limit}`)
            .then(res => res.json())
            .then(data => setSongs(data));
    }, [page]);

    return (
        <div>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                            {columns.map((col, index) => (
                                <th key={index} scope="col" className="px-6 py-3">
                                    {col === "Actions" ? <span className="sr-only">{col}</span> : col}
                                </th>
                            ))}

                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                                {/* //EDIT */}
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Edit
                                    </a>
                                </td>

                                {/* //KEYWORDS */}
                                <td className="px-6 py-4">
                                    <TruncatedCell value={song.keywords?.join(', ')} />
                                </td>   

                                {/* //GENRES                              */}
                                <td className="px-6 py-4">
                                    <TruncatedCell value={song.genres?.join(', ')} />
                                </td>

                                {/* //YOUTUBE LINK */}
                                <td className="px-6 py-4">  {song.track ? (
                                    <a href={song.track} target="_blank" rel="noopener noreferrer">  <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg></a>
                                ) : (
                                    <span className="text-gray-400 italic">לא זמין</span>
                                )}</td>

                                {/* //AUTHORS */}
                                <td className="px-6 py-4">
                                    <TruncatedCell value={song.authors?.join(', ')} />
                                </td>

                                {/* //ARTIST */}
                                <td className="px-6 py-4">{song.artist}</td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {song.title}
                                </th>

                            </tr>
                        ))}
                    </tbody>

                </table>
                <div className="flex justify-center gap-2 m-4">
                    <button
                        onClick={() => setPage((p) => p + 1)}
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        ← הבא
                    </button>

                    <span className="px-3 py-1 font-semibold">עמוד {page}</span>

                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        הקודם →
                    </button>
                </div>


            </div>

        </div>
    );
}