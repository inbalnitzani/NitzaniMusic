import React from "react";
export default function DataTable() {

    const columns = ["Song name", "Artist", "Album", "Authors", "Keywords", "Genres"];
    const songs = [
        {
            name: "The Sliding Mr. Bones",
            artist: "Silver",
            album: "Laptop",
            authors: ["a", "b"],
            keywords: ["a", "b"],
            genres: ["a", "b"]
        },
        {
            name: "The Sliding Mr. Bones",
            artist: "Silver",
            album: "Laptop",
            authors: ["a", "b"],
            keywords: ["a", "b"],
            genres: ["a", "b"]
        }, {
            name: "The Sliding Mr. Bones",
            artist: "Silver",
            album: "Laptop",
            authors: ["a", "b"],
            keywords: ["a", "b"],
            genres: ["a", "b"]
        },
    ];

    return (
        <div>


            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index} scope="col" className="px-6 py-3">
                                    {col === "Actions" ? <span className="sr-only">{col}</span> : col}
                                </th>
                            ))}
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {song.name}
                                </th>
                                <td className="px-6 py-4">{song.artist}</td>
                                <td className="px-6 py-4">{song.album}</td>
                                <td className="px-6 py-4">{song.authors?.join(', ')}</td>
                                <td className="px-6 py-4">{song.keywords?.join(', ')}</td>
                                <td className="px-6 py-4">{song.genres?.join(', ')}</td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Edit
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
}