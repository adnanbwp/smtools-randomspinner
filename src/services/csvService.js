// src/services/csvService.js
import Papa from 'papaparse';

export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => {
        const items = results.data
          .flat()
          .filter(item => item.trim() !== '')
          .slice(0, 30);
        resolve(items);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};