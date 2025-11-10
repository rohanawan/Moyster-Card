import { useState } from "react";
import { Modal, Card, Button } from "./shared";

interface SampleDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUseData: (data: string) => void;
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
  weekly: `[
  { "dateTime": "2024-11-04T08:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-04T09:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-04T10:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-04T11:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-04T12:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-05T08:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-05T09:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-05T10:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-05T11:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-05T12:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-06T08:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-06T09:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-06T10:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-06T11:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-06T12:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-07T08:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-07T09:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-07T10:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-07T11:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-07T12:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-08T08:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-08T09:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-08T10:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-08T11:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-08T12:00:00", "fromZone": 2, "toZone": 2 },
  { "dateTime": "2024-11-08T13:00:00", "fromZone": 2, "toZone": 2 }
]`,
};

export const SampleDataModal = ({
  isOpen,
  onClose,
  onUseData,
}: SampleDataModalProps) => {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly">("daily");

  const handleUseData = () => {
    onUseData(sampleData[activeTab]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sample Test Cases"
      maxWidth="2xl"
    >
      <div className="flex mb-5 md:mb-6 border-b-2 border-gray-700/50 gap-2">
        {[
          {
            id: "daily" as const,
            label: "Daily Cap Test",
            desc: "Heavy single day usage",
          },
          {
            id: "weekly" as const,
            label: "Weekly Cap Test",
            desc: "Multi-day cap reach",
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 p-4 md:p-5 font-semibold text-white transition-all duration-300 rounded-t-xl relative ${
              activeTab === tab.id
                ? "bg-gradient-to-b from-blue-600 to-blue-700 border-b-4 border-blue-400 shadow-lg shadow-blue-500/30 transform -translate-y-0.5"
                : "bg-gray-700/50 hover:bg-gray-700 border-b-2 border-transparent hover:border-gray-600"
            }`}
          >
            <div
              className={`text-base ${
                activeTab === tab.id ? "text-white font-bold" : "text-gray-300"
              }`}
            >
              {tab.label}
            </div>
            <div
              className={`text-xs mt-1.5 ${
                activeTab === tab.id
                  ? "text-blue-100 font-medium"
                  : "text-gray-400"
              }`}
            >
              {tab.desc}
            </div>
          </button>
        ))}
      </div>

      <Card
        variant="info"
        className="mb-4 bg-gradient-to-r from-blue-500/15 to-blue-600/15 border-blue-400/40 p-4 md:p-5"
      >
        <h3 className="text-blue-300 text-lg md:text-xl font-bold mb-2 md:mb-3">
          {activeTab === "daily" ? "Daily Cap Scenario" : "Weekly Cap Scenario"}
        </h3>
        <p className="text-gray-200 text-xs md:text-sm leading-relaxed">
          {activeTab === "daily"
            ? "7 trips on the same day testing daily cap limits with mixed zones and peak/off-peak times."
            : "26 trips across 5 days in Zone 2-2 to demonstrate weekly cap of £4.00 being reached."}
        </p>
      </Card>

      <textarea
        value={sampleData[activeTab]}
        readOnly
        className="w-full h-64 md:h-72 p-4 md:p-5 rounded-xl border-2 border-gray-600/50 text-xs font-mono bg-gray-900/80 text-gray-100 resize-none shadow-inner focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 leading-relaxed"
      />

      <div className="flex justify-end gap-3 mt-5 md:mt-6">
        <Button onClick={handleUseData} variant="success">
          Use This Data
        </Button>
      </div>
    </Modal>
  );
};
