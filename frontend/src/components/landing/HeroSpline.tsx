import Spline from '@splinetool/react-spline';

const HeroSpline = () => {
  return (
    <section className="relative w-full h-[100vh] overflow-hidden bg-gray-950 text-white">
      {/* Background 3D Spline */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/RYWb8rSncpjrQTy0/scene.splinecode" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-5xl">
          Turn Feedback into{' '}
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Action
          </span>{' '}
          with AI
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-300">
          InsightAI clusters user feedback, detects issues, and delivers instant product insights.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <a
            href="/signup"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
          >
            Start Free Trial
          </a>
          <a
            href="/contact"
            className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-black transition duration-300"
          >
            Book Demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSpline;
