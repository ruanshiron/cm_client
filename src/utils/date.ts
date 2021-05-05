import { compareDesc, formatISO } from "date-fns";

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
  return "Thời gian";
};

export const getDates = (
  startDate: Date | string | number,
  endDate: Date | string | number
) => {
  let dates: string[] = [];
  endDate = new Date(endDate);
  endDate = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );
  //to avoid modifying the original date
  startDate = new Date(startDate);
  const theDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  while (theDate < endDate) {
    dates = [...dates, formatISO(theDate, { representation: "date" })];
    theDate.setDate(theDate.getDate() + 1);
  }
  dates = [...dates, formatISO(theDate, { representation: "date" })];
  return dates;
};

export const isBetween = (date: string, from?: string, to?: string) => {
  if (!from && !to) return true;

  if (from && !to)
    return compareDesc(new Date(from.substring(0, 10)), new Date(date)) >= 0;

  if (!from && to)
    return compareDesc(new Date(to.substring(0, 10)), new Date(date)) <= 0;

  if (from && to)
    return (
      compareDesc(new Date(from.substring(0, 10)), new Date(date)) >= 0 &&
      compareDesc(new Date(to.substring(0, 10)), new Date(date)) <= 0
    );
};
