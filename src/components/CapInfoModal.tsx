import { Modal, Card } from "./shared";

interface CapInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CapInfoModal = ({ isOpen, onClose }: CapInfoModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Fare Cap Details"
      maxWidth="2xl"
    >
      <Card
        variant="info"
        className="mb-5 md:mb-6 text-center bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-400/50 p-4 md:p-5"
      >
        <p className="text-blue-100 text-sm m-0 font-medium leading-relaxed">
          Smart capping ensures you never pay more than these daily and weekly
          limits, regardless of how many trips you take.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Daily Caps */}
        <Card
          variant="warning"
          className="text-center bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-amber-500/60 shadow-lg shadow-amber-500/20 p-5 md:p-6"
        >
          <h3 className="text-amber-300 text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center justify-center gap-2">
            Daily Caps
          </h3>
          <div className="space-y-2 md:space-y-3">
            {[
              { zone: "Zone 1-1", cap: "£1.00" },
              { zone: "Zone 1-2", cap: "£1.20" },
              { zone: "Zone 2-1", cap: "£1.20" },
              { zone: "Zone 2-2", cap: "£0.80" },
            ].map((item) => (
              <div
                key={item.zone}
                className="flex justify-between items-center p-3 md:p-4 bg-amber-500/15 rounded-xl border border-amber-500/30 hover:bg-amber-500/20 transition-colors duration-200 shadow-sm"
              >
                <span className="text-gray-200 font-semibold text-sm md:text-base">
                  {item.zone}:
                </span>
                <span className="text-amber-300 font-bold text-lg md:text-xl">
                  {item.cap}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Caps */}
        <Card
          variant="info"
          className="text-center border-purple-600/60 bg-gradient-to-br from-purple-600/20 to-violet-700/20 shadow-lg shadow-purple-600/20 p-5 md:p-6"
        >
          <h3 className="text-purple-300 text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center justify-center gap-2">
            Weekly Caps
          </h3>
          <div className="space-y-2 md:space-y-3">
            {[
              { zone: "Zone 1-1", cap: "£5.00" },
              { zone: "Zone 1-2", cap: "£6.00" },
              { zone: "Zone 2-1", cap: "£6.00" },
              { zone: "Zone 2-2", cap: "£4.00" },
            ].map((item) => (
              <div
                key={item.zone}
                className="flex justify-between items-center p-3 md:p-4 bg-purple-600/15 rounded-xl border border-purple-600/30 hover:bg-purple-600/20 transition-colors duration-200 shadow-sm"
              >
                <span className="text-gray-200 font-semibold text-sm md:text-base">
                  {item.zone}:
                </span>
                <span className="text-purple-300 font-bold text-lg md:text-xl">
                  {item.cap}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Base Fare Reference */}
      <Card
        variant="success"
        className="text-center bg-gradient-to-br from-emerald-500/20 to-green-600/20 border-emerald-500/60 shadow-lg shadow-emerald-500/20 p-5 md:p-6"
      >
        <h3 className="text-emerald-300 text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center justify-center gap-2">
          Base Fare Reference
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { zone: "Zone 1-1", peak: "30p", offPeak: "25p" },
            { zone: "Zone 1-2", peak: "35p", offPeak: "30p" },
            { zone: "Zone 2-1", peak: "35p", offPeak: "30p" },
            { zone: "Zone 2-2", peak: "25p", offPeak: "20p" },
          ].map((item) => (
            <div
              key={item.zone}
              className="p-3 md:p-4 bg-emerald-500/15 rounded-xl border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors duration-200 shadow-sm"
            >
              <div className="text-gray-200 font-bold text-xs md:text-sm mb-2 md:mb-3 pb-2 border-b border-emerald-500/30">
                {item.zone}
              </div>
              <div className="space-y-1 md:space-y-1.5">
                <div className="text-emerald-300 text-xs font-semibold">
                  Peak:{" "}
                  <span className="text-emerald-200 font-bold">
                    {item.peak}
                  </span>
                </div>
                <div className="text-emerald-300 text-xs font-semibold">
                  Off-peak:{" "}
                  <span className="text-emerald-200 font-bold">
                    {item.offPeak}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Modal>
  );
};
