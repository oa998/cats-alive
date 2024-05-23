import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

export const prettyDate = (utcTimestamp: string) => {
  if (dayjs(utcTimestamp).isToday())
    return dayjs(utcTimestamp).format("h:mm A");
  return dayjs(utcTimestamp).format("ddd, MMM D h:mm A");
};
