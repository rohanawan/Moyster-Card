import {
  getZoneCombination,
  isPeakTime,
  getTimeOfTravel,
  isSameDay,
  getWeekStart,
  isSameWeek,
  getHighestZoneCombination,
  getJourneyDate,
} from "../lib/utils";
import { Journey } from "../lib/types";

describe("Utils", () => {
  describe("getZoneCombination", () => {
    test("should return correct zone combination", () => {
      expect(getZoneCombination(1, 1)).toBe("1-1");
      expect(getZoneCombination(1, 2)).toBe("1-2");
      expect(getZoneCombination(2, 1)).toBe("2-1");
      expect(getZoneCombination(2, 2)).toBe("2-2");
    });
  });

  describe("isPeakTime", () => {
    test("should identify weekday peak hours correctly", () => {
      // Monday 08:30 - peak
      expect(isPeakTime("2023-01-02 08:30")).toBe(true);
      // Monday 18:00 - peak
      expect(isPeakTime("2023-01-02 18:00")).toBe(true);
      // Monday 12:00 - off-peak
      expect(isPeakTime("2023-01-02 12:00")).toBe(false);
      // Monday 22:00 - off-peak
      expect(isPeakTime("2023-01-02 22:00")).toBe(false);
    });

    test("should identify weekend peak hours correctly", () => {
      // Saturday 10:00 - peak
      expect(isPeakTime("2023-01-07 10:00")).toBe(true);
      // Saturday 20:00 - peak
      expect(isPeakTime("2023-01-07 20:00")).toBe(true);
      // Saturday 12:00 - off-peak
      expect(isPeakTime("2023-01-07 12:00")).toBe(false);
      // Sunday 23:00 - off-peak
      expect(isPeakTime("2023-01-08 23:00")).toBe(false);
    });
  });

  describe("getTimeOfTravel", () => {
    test("should return peak or off-peak correctly", () => {
      const peakJourney: Journey = {
        dateTime: "2023-01-02 08:30",
        fromZone: 1,
        toZone: 2,
      };
      const offPeakJourney: Journey = {
        dateTime: "2023-01-02 12:00",
        fromZone: 1,
        toZone: 2,
      };

      expect(getTimeOfTravel(peakJourney)).toBe("peak");
      expect(getTimeOfTravel(offPeakJourney)).toBe("off-peak");
    });
  });

  describe("isSameDay", () => {
    test("should correctly identify same day", () => {
      expect(isSameDay("2023-01-01 08:00", "2023-01-01 18:00")).toBe(true);
      expect(isSameDay("2023-01-01 23:59", "2023-01-02 00:01")).toBe(false);
    });
  });

  describe("getWeekStart", () => {
    test("should return Monday of the week", () => {
      expect(getWeekStart("2023-01-04")).toBe("2023-01-02"); // Wed -> Mon
      expect(getWeekStart("2023-01-08")).toBe("2023-01-02"); // Sun -> Mon
    });
  });

  describe("isSameWeek", () => {
    test("should correctly identify same week", () => {
      expect(isSameWeek("2023-01-02", "2023-01-08")).toBe(true); // Mon-Sun
      expect(isSameWeek("2023-01-08", "2023-01-09")).toBe(false); // Sun-Mon
    });
  });

  describe("getHighestZoneCombination", () => {
    test("should return highest zone combination", () => {
      expect(getHighestZoneCombination("1-1", "1-2")).toBe("1-2");
      expect(getHighestZoneCombination("2-2", "1-2")).toBe("1-2");
      expect(getHighestZoneCombination("1-1", "2-2")).toBe("2-2");
    });
  });

  describe("getJourneyDate", () => {
    test("should extract date from ISO datetime string", () => {
      expect(getJourneyDate("2023-01-02T08:30:00")).toBe("2023-01-02");
      expect(getJourneyDate("2023-12-25T23:59:59")).toBe("2023-12-25");
    });

    test("should handle datetime strings with space separator", () => {
      expect(getJourneyDate("2023-01-02 08:30:00")).toBe("2023-01-02");
    });
  });
});
