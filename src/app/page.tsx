import SimpleFareCalculator from "@/components/SimpleFareCalculator";

export default function Home() {
  return (
    <div className="main-gradient-bg min-h-screen p-5 font-sans">
      <div className="relative z-10 text-white text-center">
        <h1 className="text-5xl mb-2! font-bold drop-shadow-lg">
          MoysterCard
        </h1>
        <p className="text-xl opacity-90 drop-shadow-md">
          Fare Calculation Engine
        </p>
      </div>
      <div className="relative z-10">
        <SimpleFareCalculator />
      </div>
    </div>
  );
}
