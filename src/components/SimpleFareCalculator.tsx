"use client";

import { useState } from "react";
import { FareResult, Journey } from "@/lib/types";
import { calculateFares } from "@/lib/fareCalculator";
import { JourneyInput } from "./JourneyInput";
import { ResultsDisplay } from "./ResultsDisplay";
import { CapInfoModal } from "./CapInfoModal";
import { SampleDataModal } from "./SampleDataModal";

const SimpleFareCalculator = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [result, setResult] = useState<FareResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCapDetails, setShowCapDetails] = useState(false);

  const handleCalculateFares = () => {
    if (!jsonInput.trim()) {
      setError("Please enter journey data");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const journeys: Journey[] = JSON.parse(jsonInput);

      // Validate journey data
      for (const journey of journeys) {
        if (
          !journey.dateTime ||
          journey.fromZone === undefined ||
          journey.toZone === undefined
        ) {
          throw new Error(
            "Each journey must have dateTime, fromZone, and toZone"
          );
        }

        if (
          ![1, 2].includes(journey.fromZone) ||
          ![1, 2].includes(journey.toZone)
        ) {
          throw new Error("Zones must be 1 or 2");
        }

        // Validate date format
        const dateTime = new Date(journey.dateTime);
        if (isNaN(dateTime.getTime())) {
          throw new Error(
            "Invalid dateTime format. Use YYYY-MM-DDTHH:mm:ss or YYYY-MM-DD HH:mm format"
          );
        }
      }

      // Calculate fares directly (no API call)
      const result = calculateFares(journeys);
      setResult(result);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError("Invalid JSON format. Please check your input.");
      } else {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUseSampleData = (data: string) => {
    setJsonInput(data);
    setError("");
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 max-w-8xl mx-auto p-4 md:p-6 split-container">
      <JourneyInput
        jsonInput={jsonInput}
        onInputChange={setJsonInput}
        onCalculate={handleCalculateFares}
        onShowCases={() => setShowModal(true)}
        onShowCapInfo={() => setShowCapDetails(true)}
        error={error}
        loading={loading}
      />

      <ResultsDisplay result={result} loading={loading} />

      <SampleDataModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUseData={handleUseSampleData}
      />

      <CapInfoModal
        isOpen={showCapDetails}
        onClose={() => setShowCapDetails(false)}
      />
    </div>
  );
};

export default SimpleFareCalculator;
