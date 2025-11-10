import { Journey, ZoneCombination, TimeOfTravel } from "./types";

// Peak time constants (in minutes from midnight)
const PEAK_TIMES = {
  WEEKDAY: {
    MORNING: { START: 420, END: 630 }, // 07:00-10:30
    EVENING: { START: 1020, END: 1200 }, // 17:00-20:00
  },
  WEEKEND: {
    MORNING: { START: 540, END: 660 }, // 09:00-11:00
    EVENING: { START: 1080, END: 1320 }, // 18:00-22:00
  },
} as const;

const WEEKDAY_START = 1; // Monday
const WEEKDAY_END = 5; // Friday
const SUNDAY = 0;
const SATURDAY = 6;

export const getZoneCombination = (
  fromZone: number,
  toZone: number
): ZoneCombination => {
  return `${fromZone}-${toZone}` as ZoneCombination;
};

export const isPeakTime = (dateTimeStr: string): boolean => {
  const dateTime = new Date(dateTimeStr);
  const day = dateTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();
  const timeInMinutes = hour * 60 + minute;

  // Monday to Friday (1-5)
  if (day >= WEEKDAY_START && day <= WEEKDAY_END) {
    return (
      (timeInMinutes >= PEAK_TIMES.WEEKDAY.MORNING.START &&
        timeInMinutes <= PEAK_TIMES.WEEKDAY.MORNING.END) ||
      (timeInMinutes >= PEAK_TIMES.WEEKDAY.EVENING.START &&
        timeInMinutes <= PEAK_TIMES.WEEKDAY.EVENING.END)
    );
  }

  // Saturday and Sunday (0, 6)
  if (day === SUNDAY || day === SATURDAY) {
    return (
      (timeInMinutes >= PEAK_TIMES.WEEKEND.MORNING.START &&
        timeInMinutes <= PEAK_TIMES.WEEKEND.MORNING.END) ||
      (timeInMinutes >= PEAK_TIMES.WEEKEND.EVENING.START &&
        timeInMinutes <= PEAK_TIMES.WEEKEND.EVENING.END)
    );
  }

  return false;
};

export const getTimeOfTravel = (journey: Journey): TimeOfTravel => {
  return isPeakTime(journey.dateTime) ? "peak" : "off-peak";
};

export const isSameDay = (date1: string, date2: string): boolean => {
  const d1 = new Date(date1).toDateString();
  const d2 = new Date(date2).toDateString();
  return d1 === d2;
};

export const getWeekStart = (dateStr: string): string => {
  // Normalize the date string to handle malformed dates like "2023-01-03T8:00:00"
  const normalizedDateStr = dateStr.replace(/T(\d):/, "T0$1:");
  const date = new Date(normalizedDateStr);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date string: ${dateStr}`);
  }

  const day = date.getDay();
  // Calculate days to subtract to get to Monday (0=Sunday, 1=Monday, ..., 6=Saturday)
  const daysToSubtract = day === 0 ? 6 : day - 1; // Sunday=6 days back, Monday=0, Tuesday=1, etc.

  // Use getTime() and subtract milliseconds to avoid date mutation issues
  const weekStartTime = date.getTime() - daysToSubtract * 24 * 60 * 60 * 1000;
  const weekStart = new Date(weekStartTime);

  return weekStart.toISOString().split("T")[0];
};

export const isSameWeek = (date1: string, date2: string): boolean => {
  return getWeekStart(date1) === getWeekStart(date2);
};

export const getHighestZoneCombination = (
  zoneCombination1: ZoneCombination,
  zoneCombination2: ZoneCombination
): ZoneCombination => {
  const hierarchy: ZoneCombination[] = ["1-1", "2-2", "1-2", "2-1"];
  const index1 = hierarchy.indexOf(zoneCombination1);
  const index2 = hierarchy.indexOf(zoneCombination2);
  return hierarchy[Math.max(index1, index2)];
};

/**
 * Extracts the date portion from a datetime string
 * @param dateTime - ISO datetime string (e.g., "2023-01-02T08:30:00")
 * @returns Date string (e.g., "2023-01-02")
 */
export const getJourneyDate = (dateTime: string): string => {
  // Handle both "T" and space separators
  return dateTime.split(/[T ]/)[0];
};
