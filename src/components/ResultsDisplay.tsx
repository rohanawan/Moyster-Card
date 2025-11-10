import { FareResult } from "@/lib/types";
import { Card, Badge } from "./shared";
import { TransactionList } from "./TransactionList";

interface ResultsDisplayProps {
  result: FareResult | null;
  loading: boolean;
}

const getCapStatus = (result: FareResult) => {
  // Check if weekly cap was reached by checking final state
  // Weekly cap is reached if final weekly total equals the weekly cap
  const weeklyCapReached =
    result.finalState.weeklyTotal > 0 &&
    result.finalState.currentApplicableWeeklyCap > 0 &&
    result.finalState.weeklyTotal >=
      result.finalState.currentApplicableWeeklyCap;

  // Also check explanation text for explicit weekly cap application
  const weeklyCapInExplanation = result.transactions.some((t) =>
    t.explanation.includes("Weekly cap applied")
  );

  // Weekly cap is applied if either condition is true
  const weeklyCapApplied = weeklyCapReached || weeklyCapInExplanation;

  // Only check for daily cap if weekly cap is not applied
  const dailyCapApplied =
    !weeklyCapApplied &&
    result.transactions.some((t) =>
      t.explanation.includes("Daily cap applied")
    );

  return {
    dailyCapApplied,
    weeklyCapApplied,
    hasCapApplied: dailyCapApplied || weeklyCapApplied,
  };
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-white">
    <div className="w-24 h-24 rounded-full border-4 border-blue-500/30 flex items-center justify-center mb-8 bg-gradient-to-br from-blue-600/20 to-blue-700/20 shadow-lg shadow-blue-500/20">
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
        <div className="w-8 h-8 bg-white rounded-lg relative flex items-center justify-center">
          <div className="absolute top-2 left-1.5 right-1.5 h-0.5 bg-blue-600 rounded" />
          <div className="absolute top-3.5 left-1.5 right-1.5 h-0.5 bg-blue-500 rounded" />
          <div className="absolute bottom-2 left-1.5 right-1.5 h-0.5 bg-blue-400 rounded" />
        </div>
      </div>
    </div>

    <h3 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">
      Ready to Calculate
    </h3>
    <p className="text-base text-gray-300 max-w-md leading-relaxed mb-8 px-4">
      Enter your journey data on the left and click &ldquo;Calculate
      Fares&rdquo; to see detailed fare breakdown and analysis
    </p>
    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-4">
      <Card
        variant="info"
        className="px-5 py-1.5 md:px-6 md:py-2 min-w-[140px] md:min-w-[160px] hover:scale-105 transition-transform duration-200"
      >
        <div className="text-blue-300 text-sm md:text-base font-bold mb-1">
          Peak/Off-peak
        </div>
        <div className="text-gray-300 text-xs font-medium">
          Automatic detection
        </div>
      </Card>
      <Card
        variant="success"
        className="px-5 py-1.5 md:px-6 md:py-2 min-w-[140px] md:min-w-[160px] hover:scale-105 transition-transform duration-200"
      >
        <div className="text-emerald-300 text-base font-bold mb-1">
          Smart Capping
        </div>
        <div className="text-gray-300 text-xs font-medium">Daily & Weekly</div>
      </Card>
    </div>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-white">
    <div className="w-20 h-20 border-4 border-gray-600 border-t-blue-400 rounded-full animate-spin mb-8" />
    <h3 className="text-2xl font-bold mb-4 text-white">Processing Journey</h3>
    <p className="text-base text-gray-400 max-w-xs leading-relaxed">
      Analyzing your travel data and calculating optimal fares...
    </p>
  </div>
);

const ResultsSummary = ({ result }: { result: FareResult }) => {
  const { dailyCapApplied, weeklyCapApplied, hasCapApplied } =
    getCapStatus(result);

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-white/10 shadow-2xl mb-6 relative">
      {/* Badge in top-right corner of the parent card */}
      {dailyCapApplied && (
        <Badge variant="daily" position="corner">
          Daily Cap
        </Badge>
      )}
      {weeklyCapApplied && (
        <Badge variant="weekly" position="corner">
          Weekly Cap
        </Badge>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        {/* Left Side - Total Cost */}
        <div className="flex-1 min-w-[200px] w-full lg:w-auto">
          <Card className="bg-gradient-to-br from-emerald-600 to-green-700 shadow-lg shadow-emerald-500/30 w-full flex flex-col justify-center min-h-[100px] md:min-h-[120px] text-center p-4 md:p-5">
            <h3 className="text-3xl md:text-4xl font-black mb-1.5 text-white drop-shadow-lg">
              {result.totalFare}p
            </h3>
            <p className="text-white/90 text-xs md:text-sm font-semibold leading-tight">
              Total Journey Cost
            </p>
          </Card>
        </div>

        {/* Right Side - Cap Information */}
        <div className="flex-1 min-w-[150px] md:min-w-[200px] max-w-[250px] w-full lg:w-auto">
          {hasCapApplied ? (
            <Card
              variant="info"
              className="text-center min-h-[100px] md:min-h-[120px] flex flex-col justify-center p-4 md:p-5"
            >
              <h4 className="text-blue-300 text-base md:text-lg font-bold mb-1.5 pr-14 leading-tight">
                Smart Capping Applied
              </h4>
              <p className="text-gray-300 text-[11px] md:text-xs opacity-80 px-2 leading-tight">
                Savings highlighted in transactions below
              </p>
            </Card>
          ) : (
            <Card
              variant="success"
              className="text-center min-h-[100px] md:min-h-[120px] flex flex-col justify-center p-4 md:p-5"
            >
              <h4 className="text-emerald-300 text-base md:text-lg font-bold mb-1.5 leading-tight">
                Standard Pricing
              </h4>
              <p className="text-gray-300 text-[11px] md:text-xs opacity-80 leading-tight">
                No cap limits reached on this journey
              </p>
            </Card>
          )}
        </div>
      </div>
    </Card>
  );
};

export const ResultsDisplay = ({ result, loading }: ResultsDisplayProps) => {
  return (
    <Card className="flex-1 min-h-[500px] bg-gray-800 border-gray-600 shadow-2xl p-6 md:p-8 relative overflow-hidden">
      {!result && !loading ? (
        <EmptyState />
      ) : loading ? (
        <LoadingState />
      ) : result ? (
        <div className="animate-in fade-in duration-600 text-white">
          <ResultsSummary result={result} />
          <TransactionList transactions={result.transactions} />
        </div>
      ) : null}
    </Card>
  );
};
