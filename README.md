# MoysterCard Fare Calculation Engine

A production-ready fare calculation engine for the MoysterCard metro system built with Next.js and TypeScript, featuring functional programming principles and comprehensive testing.

## Features

- **Pure Functional Design**: Core logic separated from UI using pure TypeScript functions
- **Immutable State Management**: All state changes handled immutably
- **Comprehensive Fare Rules**: Support for zone-based pricing with peak/off-peak times
- **Daily & Weekly Capping**: Intelligent fare capping based on journey patterns
- **Modern UI**: Clean React interface with Tailwind CSS
- **Full Test Coverage**: Jest test suite covering all core functionality

## Architecture

### Core Components

- **`src/lib/`**: Pure functional logic layer

  - `types.ts`: TypeScript interfaces and types
  - `config.ts`: Fare configuration constants
  - `utils.ts`: Utility functions for date/time and zone calculations
  - `fareCalculator.ts`: Main fare calculation engine

- **`src/app/`**: Next.js App Router structure

  - `page.tsx`: Main application page
  - `api/calculate/route.ts`: API endpoint for fare calculations

- **`src/components/`**: React UI components
  - `SimpleFareCalculator.tsx`: Main calculator interface
  - `LoadingSpinner.tsx`: Loading spinner component
  - `shared/`: Shared UI components (Badge, Button, Card, Modal)

## Fare Rules

### Base Fares

- **Zone 1-1**: Peak 30p, Off-peak 25p
- **Zone 1-2/2-1**: Peak 35p, Off-peak 30p
- **Zone 2-2**: Peak 25p, Off-peak 20p

### Peak Times

- **Weekdays**: 07:00-10:30, 17:00-20:00
- **Weekends**: 09:00-11:00, 18:00-22:00

### Capping Rules

- **Daily Caps**: Zone 1-1 (100p), Zone 1-2/2-1 (120p), Zone 2-2 (80p)
- **Weekly Caps**: Zone 1-1 (500p), Zone 1-2/2-1 (600p), Zone 2-2 (400p)
- Caps are determined by the farthest journey taken in the period

## Usage

### Development

```bash
npm install
npm run dev
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Production

```bash
npm run build
npm start
```

## API Usage

### POST `/api/calculate`

Calculate fares for a series of journeys.

**Request Body:**

```json
[
  { "dateTime": "2023-01-01 09:30", "fromZone": 1, "toZone": 2 },
  { "dateTime": "2023-01-01 18:45", "fromZone": 2, "toZone": 1 }
]
```

**Response:**

```json
{
  "totalFare": 70,
  "transactions": [
    {
      "journey": { "dateTime": "2023-01-01 09:30", "fromZone": 1, "toZone": 2 },
      "baseFare": 35,
      "chargedFare": 35,
      "explanation": "Base fare: 35p",
      "dailyTotalBefore": 0,
      "weeklyTotalBefore": 0,
      "dailyTotalAfter": 35,
      "weeklyTotalAfter": 35
    }
  ],
  "finalState": {
    "dailyTotal": 70,
    "weeklyTotal": 70,
    "currentApplicableDailyCap": 120,
    "currentApplicableWeeklyCap": 600,
    "lastJourneyDate": "2023-01-01",
    "weekStart": "2023-01-02"
  }
}
```

## Technology Stack

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities

## Design Principles

1. **Functional Programming**: Pure functions, immutable data, no side effects in core logic
2. **Separation of Concerns**: Business logic completely separate from UI
3. **Type Safety**: Comprehensive TypeScript coverage
4. **Testability**: Every function is unit testable
5. **Performance**: Optimized calculations with minimal complexity
