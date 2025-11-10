import { FareConfig } from "./types";

export const FARE_CONFIG: FareConfig = {
  baseFares: {
    "1-1": {
      peak: 30,
      "off-peak": 25,
    },
    "1-2": {
      peak: 35,
      "off-peak": 30,
    },
    "2-1": {
      peak: 35,
      "off-peak": 30,
    },
    "2-2": {
      peak: 25,
      "off-peak": 20,
    },
  },
  dailyCaps: {
    "1-1": 100,
    "1-2": 120,
    "2-1": 120,
    "2-2": 80,
  },
  weeklyCaps: {
    "1-1": 500,
    "1-2": 600,
    "2-1": 600,
    "2-2": 400,
  },
};
