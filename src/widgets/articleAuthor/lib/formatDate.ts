export const getDateArticleCreation = (date: string) => {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { month: "long" };
    const month = newDate.toLocaleString("en-US", options);
    const dateNum = newDate.getDate();
    const year = newDate.getFullYear();
    const dateArticleCreation = `${month} ${dateNum}, ${year}`;
    return dateArticleCreation;
  };