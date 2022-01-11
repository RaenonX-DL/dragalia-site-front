export const formatDateString = (date: string): string => {
  const padMonth = date.substr(4, 2);
  const padDay = date.substr(6, 2);

  return `${padMonth}/${padDay}`;
};
