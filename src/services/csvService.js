// src/services/csvService.js
import Papa from 'papaparse';

export const parseCSV = (input) => {
  return new Promise((resolve, reject) => {
    const parseConfig = {
      complete: (results) => {
        const items = results.data
          .flat()
          .filter(item => item.trim() !== '')
          .slice(0, 41);
        resolve(items);
      },
      error: (error) => {
        reject(error);
      }
    };

    if (input instanceof File) {
      Papa.parse(input, parseConfig);
    } else if (typeof input === 'string') {
      Papa.parse(input, { ...parseConfig, header: false });
    } else {
      reject(new Error('Invalid input type. Expected File or string.'));
    }
  });
};