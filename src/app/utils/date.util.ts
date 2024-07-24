export function transformDateFormat(dateStr: string): string {
  if (dateStr.includes('/')) {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  } else if (dateStr.includes('-')) {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  } else {
    return dateStr;
  }
}
