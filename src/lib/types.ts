export interface Journey {
  dateTime: string;
  fromZone: number;
  toZone: number;
}

export interface AccountState {
  dailyTotal: number;
  weeklyTotal: number;
  currentApplicableDailyCap: number;
  currentApplicableWeeklyCap: number;
  lastJourneyDate: string | null;
  weekStart: string | null;
}

export interface FareTransaction {
  journey: Journey;
  baseFare: number;
  chargedFare: number;
  explanation: string;
  dailyTotalBefore: number;
  weeklyTotalBefore: number;
  dailyTotalAfter: number;
  weeklyTotalAfter: number;
}

export interface FareResult {
  totalFare: number;
  transactions: FareTransaction[];
  finalState: AccountState;
}

export type ZoneCombination = "1-1" | "1-2" | "2-1" | "2-2";
export type TimeOfTravel = "peak" | "off-peak";

export interface FareConfig {
  baseFares: Record<ZoneCombination, Record<TimeOfTravel, number>>;
  dailyCaps: Record<ZoneCombination, number>;
  weeklyCaps: Record<ZoneCombination, number>;
}
