import { transformDateFormat } from './date.util'; // Ajusta la ruta según sea necesario

describe('transformDateFormat', () => {
  it('should convert DD/MM/YYYY to YYYY-MM-DD', () => {
    const input = '23/07/2024';
    const expectedOutput = '2024-07-23';
    expect(transformDateFormat(input)).toBe(expectedOutput);
  });

  it('should convert YYYY-MM-DD to DD/MM/YYYY', () => {
    const input = '2024-07-23';
    const expectedOutput = '23/07/2024';
    expect(transformDateFormat(input)).toBe(expectedOutput);
  });

  it('should return the same string if it is not in a recognized format', () => {
    const input = 'InvalidDate';
    expect(transformDateFormat(input)).toBe('InvalidDate');
  });
});
