export function formatDate(raw: Date | string | number) {
  const date = new Date(raw);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

export const selectedDateLabelParser = (text = "") => {
  const date = new Date(text);
  const today = new Date();
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
    return "Hôm nay";
  else if (
    date.getDate() === today.getDate() - 1 &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
    return "Hôm qua";
  return "";
};

export const getDatesBetweenDates = (
  startDate: Date | string | number,
  endDate: Date | string | number
) => {
  let dates: Date[] = [];
  endDate = new Date(endDate);
  //to avoid modifying the original date
  const theDate = new Date(startDate);
  while (theDate < endDate) {
    dates = [...dates, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
  }
  dates = [...dates, endDate];
  return dates;
};
