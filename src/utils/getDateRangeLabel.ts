export const getDateRangeLabel = (timeRange: string) => {
    const now = new Date();
    let from = new Date(now);
  
    if (timeRange === '30d') {
      from.setDate(now.getDate() - 30);
    } else if (timeRange === '7d') {
      from.setDate(now.getDate() - 7);
    } else {
      from.setMonth(now.getMonth() - 6);
    }
  
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
  
    return `${from.toLocaleDateString("en-US", options)} - ${now.toLocaleDateString("en-US", options)}`;
  };
  