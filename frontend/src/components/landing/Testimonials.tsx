import { AnimatedBlob } from "../ui/AnimateBlob";

const testimonials = [
  {
    name: 'Lisa Tran',
    role: 'Product Manager @ FitTech',
    quote: 'InsightAI helped us catch login issues early. Clustering and sentiment insights are game changers!',
  },
  {
    name: 'Dev Mishra',
    role: 'CEO @ Edunow',
    quote: 'We got feedback from 10,000+ users automatically processed. Our dev team loves the clarity it provides.',
  },
  {
    name: 'James Nolan',
    role: 'CTO @ Medix AI',
    quote: 'Sentiment tracking over time gave us a clear roadmap on what to prioritize next.',
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
      {/* Background blobs */}
      <AnimatedBlob className="top-0 left-0" size={300} color="rgba(255, 99, 132, 0.4)" />
      <AnimatedBlob className="bottom-0 right-0" size={400} color="rgba(54, 162, 235, 0.3)" />
      <AnimatedBlob className="top-1/2 left-1/2" size={250} color="rgba(255, 206, 86, 0.4)" />


      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-5 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-6xl font-serif text-indigo-600 opacity-20 mb-4">
                  “
                </div>
                <p className="text-lg text-gray-800 mb-6 italic">
                  {t.quote}
                </p>
                <div className="border-t pt-4">
                  <div className="font-bold text-lg text-gray-900">{t.name}</div>
                  <div className="text-sm text-indigo-600">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
