const getDateBySubstractionMonths = (monthNumber: number) => {
  const date = new Date();
  date.setMonth(date.getMonth() - monthNumber);

  return date;
};

export { getDateBySubstractionMonths };
