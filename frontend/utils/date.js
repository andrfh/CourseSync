function formatDate(date, sep) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();

  return `${dd}${sep}${mm}${sep}${yyyy}`;
}

export default function getDateRange(period, separator = '.') {
  const now = new Date();
  const to = new Date(now);
  const from = new Date(now);

  switch (period) {
    case '1w':
      from.setDate(from.getDate() - 7);
      break;
    case '1m':
      from.setMonth(from.getMonth() - 1);
      break;
    case '3m':
      from.setMonth(from.getMonth() - 3);
      break;
    case '6m':
      from.setMonth(from.getMonth() - 6);
      break;
    case '1y':
      from.setFullYear(from.getFullYear() - 1);
      break;
    default:
      throw new Error(`Unknown period: ${period}`);
  }

  return {
    from: formatDate(from, separator),
    to: formatDate(to, separator),
  };
}