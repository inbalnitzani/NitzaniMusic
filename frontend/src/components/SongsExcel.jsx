import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const SongsExcel = (songs, selectedFields = [], fileName = 'songs.xlsx') => {

  const filteredSongs = songs.map(song =>
    Object.fromEntries(
      selectedFields.map(field => [field, song[field]])
    )
  );

  const worksheet = XLSX.utils.json_to_sheet(filteredSongs);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'שירים');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveAs(blob, fileName);
};
