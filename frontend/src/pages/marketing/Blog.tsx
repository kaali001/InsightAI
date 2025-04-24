

const Blog = () => {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Latest Updates</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">🚀 Launch Announcement</h3>
            <p className="text-gray-600 mb-4">InsightAI is live! Learn how to turn feedback into product clarity.</p>
            <a href="#" className="text-blue-600 font-medium">Read more →</a>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">📈 New Sentiment Engine</h3>
            <p className="text-gray-600 mb-4">Our new model improves clustering accuracy and NLU by 30%.</p>
            <a href="#" className="text-blue-600 font-medium">Read more →</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
