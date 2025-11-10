import { Card, Button } from "./shared";

interface JourneyInputProps {
  jsonInput: string;
  onInputChange: (value: string) => void;
  onCalculate: () => void;
  onShowCases: () => void;
  onShowCapInfo: () => void;
  error: string;
  loading: boolean;
}

const sampleData = {
  daily: `[
  { "dateTime": "2024-11-09T08:30:00", "fromZone": 1, "toZone": 1 },
  { "dateTime": "2024-11-09T09:15:00", "fromZone": 1, "toZone": 2 },
  { "dateTime": "2024-11-09T12:00:00", "fromZone": 2, "toZone": 1 },
  { "dateTime": "2024-11-09T14:30:00", "fromZone": 1, "toZone": 1 },
  { "dateTime": "2024-11-09T17:45:00", "fromZone": 1, "toZone": 2 },
  { "dateTime": "2024-11-09T18:30:00", "fromZone": 2, "toZone": 1 },
  { "dateTime": "2024-11-09T19:15:00", "fromZone": 1, "toZone": 1 }
]`,
};

export const JourneyInput = ({
  jsonInput,
  onInputChange,
  onCalculate,
  onShowCases,
  onShowCapInfo,
  error,
  loading,
}: JourneyInputProps) => {
  const handleQuickTest = () => {
    onInputChange(sampleData.daily);
  };

  return (
    <Card className="flex-1 min-h-[500px] bg-gray-800 border-gray-600 shadow-2xl p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-7 text-white border-b-2 border-blue-500 pb-3 md:pb-4 text-center">
        Journey Data Input
      </h2>

      <div className="mb-6">
        <label className="block mb-1 mt-3 text-base text-gray-300 font-semibold">
          Paste your journey data (JSON format):
        </label>
        <textarea
          value={jsonInput}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={sampleData.daily}
          className="w-full h-52 p-5 rounded-xl border-2 border-gray-600 text-sm font-mono resize-y bg-gray-900 text-white transition-all duration-300 shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        />
      </div>

      <div className="flex flex-row gap-3 md:gap-4 mb-6 w-full">
        <Button
          onClick={onCalculate}
          disabled={loading}
          variant="primary"
          size="md"
          className="flex-1 min-w-0"
        >
          {loading ? "Calculating..." : "Calculate Fares"}
        </Button>

        <Button
          onClick={onShowCases}
          variant="secondary"
          size="md"
          className="flex-1 min-w-0"
        >
          View Cases
        </Button>

        <Button
          onClick={handleQuickTest}
          variant="primary"
          size="md"
          className="flex-1 min-w-0 bg-gradient-to-r from-purple-600 to-violet-700"
        >
          Quick Test
        </Button>

        <Button
          onClick={onShowCapInfo}
          variant="warning"
          size="md"
          className="flex-1 min-w-0"
        >
          Cap Info
        </Button>
      </div>

      {error && (
        <Card variant="danger" className="mt-4 animate-pulse">
          <p className="text-red-200 text-base font-semibold m-0 flex items-center">
            <span className="mr-2 text-lg">⚠</span>
            {error}
          </p>
        </Card>
      )}

      <Card variant="info" className="mt-6">
        <h3 className="text-lg font-bold text-blue-300 mb-4">
          Sample Journey Format:
        </h3>
        <pre className="text-xs text-gray-300 bg-gray-900 p-4 rounded-lg border border-gray-600 overflow-auto font-mono">
          {`[
  {
    "dateTime": "2024-11-09T08:30:00",
    "fromZone": 1,
    "toZone": 2
  }
]`}
        </pre>
      </Card>
    </Card>
  );
};
