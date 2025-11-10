import { FareTransaction } from "@/lib/types";
import { Badge } from "./shared";

interface TransactionListProps {
  transactions: FareTransaction[];
}

const formatDateTime = (dateTime: string) => {
  return new Date(dateTime).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getCapType = (explanation: string) => {
  // Prioritize weekly cap over daily cap
  // If both are present, show weekly cap badge
  if (explanation.includes("Weekly cap applied")) return "weekly";
  if (explanation.includes("Daily cap applied")) return "daily";
  return null;
};

export const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <>
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-gray-600/50"></div>
          <h4 className="text-sm md:text-base font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
            Transaction Breakdown
          </h4>
          <div className="h-px flex-1 bg-gray-600/50"></div>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2.5 custom-scrollbar">
        {transactions.map((transaction, index) => {
          const capType = getCapType(transaction.explanation);
          return (
            <div
              key={index}
              className={`relative bg-gray-800 border rounded-xl p-4 transition-all duration-200 hover:border-gray-600 ${
                capType === "daily"
                  ? "border-amber-500/40 bg-gray-800"
                  : capType === "weekly"
                  ? "border-purple-500/40 bg-gray-800"
                  : "border-gray-700 bg-gray-800"
              }`}
            >
              {capType && (
                <Badge variant={capType} position="corner">
                  {capType === "daily" ? "Daily Cap" : "Weekly Cap"}
                </Badge>
              )}

              {/* Header Row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-xs font-medium">
                    #{index + 1}
                  </span>
                  <span className="text-white text-base font-semibold">
                    Zone {transaction.journey.fromZone} → Zone{" "}
                    {transaction.journey.toZone}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 text-lg font-bold">
                    {transaction.chargedFare}p
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-1">
                    Date & Time
                  </p>
                  <p className="text-gray-300 text-xs">
                    {formatDateTime(transaction.journey.dateTime)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-1">
                    Base Fare
                  </p>
                  <p className="text-gray-300 text-xs font-medium">
                    {transaction.baseFare}p
                  </p>
                </div>
              </div>

              {/* Explanation */}
              <p className="text-gray-400 text-xs mb-3 leading-relaxed">
                {transaction.explanation}
              </p>

              {/* Totals */}
              <div className="flex gap-3 pt-3 border-t border-gray-700">
                <div className="flex-1">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-1">
                    Daily Total
                  </p>
                  <p className="text-gray-300 text-xs font-medium">
                    {transaction.dailyTotalBefore}p →{" "}
                    {transaction.dailyTotalAfter}p
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-1">
                    Weekly Total
                  </p>
                  <p className="text-gray-300 text-xs font-medium">
                    {transaction.weeklyTotalBefore}p →{" "}
                    {transaction.weeklyTotalAfter}p
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
