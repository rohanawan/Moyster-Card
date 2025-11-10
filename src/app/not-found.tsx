import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden flex items-center justify-center">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 bg-white bg-opacity-10 rounded-full float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-1/2 -left-40 w-60 h-60 bg-white bg-opacity-5 rounded-full float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-40 right-1/4 w-96 h-96 bg-white bg-opacity-5 rounded-full float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 text-center page-container">
        <div className="glass rounded-3xl p-12 card backdrop-blur-xl max-w-2xl mx-auto">
          <div className="text-8xl mb-8 success-bounce">🚇</div>
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl font-bold text-white mb-6">
            Station Not Found
          </h2>
          <p className="text-xl text-white text-opacity-80 mb-8">
            Looks like this journey has taken a wrong turn! The page you&apos;re
            looking for doesn&apos;t exist on our transport network.
          </p>

          <Link
            href="/"
            className="btn-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg inline-flex items-center space-x-2"
          >
            <span>🏠</span>
            <span>Return to Station</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
