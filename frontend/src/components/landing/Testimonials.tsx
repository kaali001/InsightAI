// Testimonials.tsx
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
    <section className="py-24 px-6 bg-white ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white dark:bg-neutral-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-6xl font-serif text-primary opacity-25 mb-4">“</div>
              <p className="text-lg text-gray-600 dark:text-gray-600 mb-6 italic">
                {t.quote}
              </p>
              <div className="border-t pt-4">
                <div className="font-bold text-lg text-gray-900 dark:text-gray">{t.name}</div>
                <div className="text-sm text-primary">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
