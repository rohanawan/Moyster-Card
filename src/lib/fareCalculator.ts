import {
  Journey,
  AccountState,
  FareTransaction,
  FareResult,
  ZoneCombination,
  FareConfig,
} from "./types";
import { FARE_CONFIG } from "./config";
import {
  getZoneCombination,
  getTimeOfTravel,
  isSameDay,
  isSameWeek,
  getWeekStart,
  getHighestZoneCombination,
  getJourneyDate,
} from "./utils";

export const createInitialAccountState = (): AccountState => ({
  dailyTotal: 0,
  weeklyTotal: 0,
  currentApplicableDailyCap: 0,
  currentApplicableWeeklyCap: 0,
  lastJourneyDate: null,
  weekStart: null,
});

const resetDailyState = (
  state: AccountState,
  newDate: string
): AccountState => ({
  ...state,
  dailyTotal: 0,
  currentApplicableDailyCap: 0,
  lastJourneyDate: newDate,
});

const resetWeeklyState = (
  state: AccountState,
  newDate: string
): AccountState => ({
  ...state,
  weeklyTotal: 0,
  currentApplicableWeeklyCap: 0,
  weekStart: getWeekStart(newDate),
  dailyTotal: 0,
  currentApplicableDailyCap: 0,
  lastJourneyDate: newDate,
});

const updateApplicableCaps = (
  state: AccountState,
  zoneCombination: ZoneCombination,
  config: FareConfig = FARE_CONFIG
): AccountState => {
  const currentDailyCap =
    state.currentApplicableDailyCap > 0
      ? getHighestZoneCombination(
          Object.keys(config.dailyCaps).find(
            (z) =>
              config.dailyCaps[z as ZoneCombination] ===
              state.currentApplicableDailyCap
          ) as ZoneCombination,
          zoneCombination
        )
      : zoneCombination;

  const currentWeeklyCap =
    state.currentApplicableWeeklyCap > 0
      ? getHighestZoneCombination(
          Object.keys(config.weeklyCaps).find(
            (z) =>
              config.weeklyCaps[z as ZoneCombination] ===
              state.currentApplicableWeeklyCap
          ) as ZoneCombination,
          zoneCombination
        )
      : zoneCombination;

  return {
    ...state,
    currentApplicableDailyCap: config.dailyCaps[currentDailyCap],
    currentApplicableWeeklyCap: config.weeklyCaps[currentWeeklyCap],
  };
};

export const calculateBaseFare = (
  journey: Journey,
  config: FareConfig = FARE_CONFIG
): number => {
  const zoneCombination = getZoneCombination(journey.fromZone, journey.toZone);
  const timeOfTravel = getTimeOfTravel(journey);
  return config.baseFares[zoneCombination][timeOfTravel];
};

/**
 * Resets state if a new day or week is detected
 * @param state - Current account state
 * @param journeyDate - Date of the current journey
 * @param journeyDateTime - Full datetime string for week comparison
 * @returns Updated state with reset totals if needed
 */
const resetStateIfNeeded = (
  state: AccountState,
  journeyDate: string,
  journeyDateTime: string
): AccountState => {
  // No reset needed if same day
  if (state.lastJourneyDate && isSameDay(state.lastJourneyDate, journeyDate)) {
    return state;
  }

  // Check if new week
  if (
    !state.weekStart ||
    !isSameWeek(state.weekStart + "T00:00:00", journeyDateTime)
  ) {
    return resetWeeklyState(state, journeyDate);
  }

  // Same week, new day - reset daily totals
  return resetDailyState(state, journeyDate);
};

/**
 * Applies daily and weekly caps to calculate the final charged fare
 * @param baseFare - Base fare for the journey
 * @param state - Current account state
 * @returns Object containing charged fare and explanation
 */
const applyCaps = (
  baseFare: number,
  state: AccountState
): { chargedFare: number; explanation: string } => {
  let chargedFare = baseFare;
  let explanation = `Base fare: ${baseFare}p`;

  const dailyTotalBefore = state.dailyTotal;
  const weeklyTotalBefore = state.weeklyTotal;

  // Apply daily cap
  if (dailyTotalBefore + baseFare > state.currentApplicableDailyCap) {
    chargedFare = Math.max(
      0,
      state.currentApplicableDailyCap - dailyTotalBefore
    );
    if (chargedFare < baseFare) {
      explanation += ` (Daily cap applied: ${chargedFare}p charged)`;
    }
  }

  // Apply weekly cap (may override daily cap)
  let finalChargedFare = chargedFare;
  if (weeklyTotalBefore + chargedFare > state.currentApplicableWeeklyCap) {
    finalChargedFare = Math.max(
      0,
      state.currentApplicableWeeklyCap - weeklyTotalBefore
    );
    if (finalChargedFare < chargedFare) {
      explanation += ` (Weekly cap applied: ${finalChargedFare}p charged)`;
    }
  }

  return { chargedFare: finalChargedFare, explanation };
};

/**
 * Updates account state with the charged fare amount
 * @param state - Current account state
 * @param chargedFare - Fare amount to add to totals
 * @returns Updated account state with new totals
 */
const updateStateWithFare = (
  state: AccountState,
  chargedFare: number
): AccountState => {
  return {
    ...state,
    dailyTotal: state.dailyTotal + chargedFare,
    weeklyTotal: state.weeklyTotal + chargedFare,
  };
};

/**
 * Creates a fare transaction record
 * @param journey - Journey details
 * @param baseFare - Base fare amount
 * @param chargedFare - Final charged fare after caps
 * @param explanation - Explanation of fare calculation
 * @param stateBefore - State before this journey
 * @param stateAfter - State after this journey
 * @returns Fare transaction record
 */
const createTransaction = (
  journey: Journey,
  baseFare: number,
  chargedFare: number,
  explanation: string,
  stateBefore: AccountState,
  stateAfter: AccountState
): FareTransaction => {
  return {
    journey,
    baseFare,
    chargedFare,
    explanation,
    dailyTotalBefore: stateBefore.dailyTotal,
    weeklyTotalBefore: stateBefore.weeklyTotal,
    dailyTotalAfter: stateAfter.dailyTotal,
    weeklyTotalAfter: stateAfter.weeklyTotal,
  };
};

/**
 * Processes a single journey and updates account state
 * @param journey - Journey to process
 * @param currentState - Current account state
 * @param config - Fare configuration (defaults to FARE_CONFIG)
 * @returns Transaction record and updated state
 */
export const processJourney = (
  journey: Journey,
  currentState: AccountState,
  config: FareConfig = FARE_CONFIG
): { transaction: FareTransaction; newState: AccountState } => {
  // Step 1: Reset state if new day/week detected
  const journeyDate = getJourneyDate(journey.dateTime);
  let state = resetStateIfNeeded(currentState, journeyDate, journey.dateTime);

  // Step 2: Update applicable caps based on zone combination
  const zoneCombination = getZoneCombination(journey.fromZone, journey.toZone);
  state = updateApplicableCaps(state, zoneCombination, config);

  // Step 3: Calculate base fare
  const baseFare = calculateBaseFare(journey, config);
  const stateBeforeCaps = { ...state };

  // Step 4: Apply caps to determine final charged fare
  const { chargedFare, explanation } = applyCaps(baseFare, state);

  // Step 5: Update state with charged fare
  const newState = updateStateWithFare(state, chargedFare);

  // Step 6: Create transaction record
  const transaction = createTransaction(
    journey,
    baseFare,
    chargedFare,
    explanation,
    stateBeforeCaps,
    newState
  );

  return { transaction, newState };
};

/**
 * Sorts journeys by date/time to ensure correct processing order
 * @param journeys - Array of journeys to sort
 * @returns Sorted array of journeys
 */
const sortJourneysByDate = (journeys: Journey[]): Journey[] => {
  return [...journeys].sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );
};

/**
 * Calculates fares for multiple journeys
 * @param journeys - Array of journeys to process
 * @param config - Fare configuration (defaults to FARE_CONFIG)
 * @returns Fare calculation result with transactions and final state
 */
export const calculateFares = (
  journeys: Journey[],
  config: FareConfig = FARE_CONFIG
): FareResult => {
  let state = createInitialAccountState();
  const transactions: FareTransaction[] = [];
  let totalFare = 0;

  const sortedJourneys = sortJourneysByDate(journeys);

  for (const journey of sortedJourneys) {
    const { transaction, newState } = processJourney(journey, state, config);
    transactions.push(transaction);
    totalFare += transaction.chargedFare;
    state = newState;
  }

  return {
    totalFare,
    transactions,
    finalState: state,
  };
};

/**
 * OOP Class that encapsulates AccountState and provides object-oriented interface
 * This class wraps the existing functional code, providing encapsulation while
 * maintaining backward compatibility with the functional approach.
 */
export class FareAccount {
  private state: AccountState;
  private config: FareConfig;

  /**
   * Creates a new FareAccount instance with initial state
   * @param config - Optional fare configuration (defaults to FARE_CONFIG)
   */
  constructor(config: FareConfig = FARE_CONFIG) {
    this.state = createInitialAccountState();
    this.config = config;
  }

  /**
   * Processes a single journey and updates the internal state
   * @param journey - Journey to process
   * @returns Transaction record for this journey
   */
  processJourney(journey: Journey): FareTransaction {
    const { transaction, newState } = processJourney(
      journey,
      this.state,
      this.config
    );
    this.state = newState;
    return transaction;
  }

  /**
   * Processes multiple journeys in chronological order
   * @param journeys - Array of journeys to process
   * @returns Array of transaction records
   */
  processJourneys(journeys: Journey[]): FareTransaction[] {
    const sortedJourneys = sortJourneysByDate(journeys);
    const transactions: FareTransaction[] = [];

    for (const journey of sortedJourneys) {
      transactions.push(this.processJourney(journey));
    }

    return transactions;
  }

  /**
   * Calculates total fare for multiple journeys
   * @param journeys - Array of journeys to process
   * @returns Total fare charged
   */
  calculateTotalFare(journeys: Journey[]): number {
    const transactions = this.processJourneys(journeys);
    return transactions.reduce((total, t) => total + t.chargedFare, 0);
  }

  /**
   * Gets a readonly copy of the current account state
   * @returns Readonly copy of the account state
   */
  getState(): Readonly<AccountState> {
    return { ...this.state };
  }

  /**
   * Resets the account state to initial values
   */
  reset(): void {
    this.state = createInitialAccountState();
  }

  /**
   * Gets the current daily total
   * @returns Current daily total in pence
   */
  getDailyTotal(): number {
    return this.state.dailyTotal;
  }

  /**
   * Gets the current weekly total
   * @returns Current weekly total in pence
   */
  getWeeklyTotal(): number {
    return this.state.weeklyTotal;
  }

  /**
   * Gets the current applicable daily cap
   * @returns Current applicable daily cap in pence
   */
  getDailyCap(): number {
    return this.state.currentApplicableDailyCap;
  }

  /**
   * Gets the current applicable weekly cap
   * @returns Current applicable weekly cap in pence
   */
  getWeeklyCap(): number {
    return this.state.currentApplicableWeeklyCap;
  }

  /**
   * Creates a FareResult object with current state and transactions
   * @param transactions - Array of transactions
   * @returns FareResult object
   */
  createFareResult(transactions: FareTransaction[]): FareResult {
    const totalFare = transactions.reduce(
      (total, t) => total + t.chargedFare,
      0
    );
    return {
      totalFare,
      transactions,
      finalState: { ...this.state },
    };
  }
}
