

const Contact = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>
        <p className="text-gray-600 text-center mb-12">We’d love to hear from you — drop us a message and we’ll get back soon.</p>
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2"
          />
          <textarea
            placeholder="Your Message"
            rows={6}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
