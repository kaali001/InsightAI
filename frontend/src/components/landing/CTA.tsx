const CTA = () => {
  return (
    <section className="relative py-28 px-6 bg-gradient-to-br from-[#1f1f21] via-[#3a3a3d] to-[#6b6b73] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:30px_30px] opacity-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
          Ready to gain insights from your user feedback?
        </h2>
        <p className="text-lg md:text-xl mb-10 text-gray-200">
          Join InsightAI and start clustering, summarizing, and resolving issues faster.
        </p>
        <a
          href="/signup"
          className="inline-block bg-white text-black font-semibold px-8 py-4 rounded-xl shadow-md
                     hover:bg-gray-100 transition-transform transform hover:scale-105"
        >
          Get Started Now
        </a>
      </div>
    </section>
  );
};

export default CTA;

