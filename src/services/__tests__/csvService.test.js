// src/services/__tests__/csvService.test.js
import { parseCSV } from '../csvService';

describe('CSV Service', () => {
  it('should parse CSV data correctly', async () => {
    const csvString = 'item1,item2,item3';
    const result = await parseCSV(csvString);
    expect(result).toEqual(['item1', 'item2', 'item3']);
  });

  it('should limit the number of items to 30', async () => {
    const items = Array.from({ length: 40 }, (_, i) => `item${i + 1}`);
    const csvString = items.join(',');
    const result = await parseCSV(csvString);
    expect(result).toHaveLength(30);
  });

  it('should filter out empty items', async () => {
    const csvString = 'item1,,item2, ,item3';
    const result = await parseCSV(csvString);
    expect(result).toEqual(['item1', 'item2', 'item3']);
  });
});