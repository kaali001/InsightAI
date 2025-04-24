

// CTA.tsx
const CTA = () => {
  return (
    <section className="bg-gradient-to-br from-primary to-purple-600  py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to gain insights from your user feedback?
        </h2>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Join InsightAI and start clustering, summarizing, and resolving issues faster.
        </p>
        <a
          href="/signup"
          className="inline-block bg-white text-primary font-bold px-8 py-4 rounded-lg
                   hover:scale-105 transition-transform duration-300 shadow-lg
                   hover:shadow-xl"
        >
          Get Started Now
        </a>
      </div>
    </section>
  );
};

export default CTA;
