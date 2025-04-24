

const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Meet the Team Behind InsightAI</h2>
        <p className="text-lg text-gray-700 mb-10">
          We're a team of engineers, designers, and AI researchers passionate about transforming feedback into actionable insight.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <img src="/assets/illustrations/team1.svg" alt="Team Member" className="w-24 h-24 mx-auto mb-4 rounded-full" />
            <h4 className="font-semibold">Aarav Sharma</h4>
            <p className="text-sm text-gray-500">Founder & CEO</p>
          </div>
          <div>
            <img src="/assets/illustrations/team2.svg" alt="Team Member" className="w-24 h-24 mx-auto mb-4 rounded-full" />
            <h4 className="font-semibold">Maya Kapoor</h4>
            <p className="text-sm text-gray-500">Head of AI</p>
          </div>
          <div>
            <img src="/assets/illustrations/team3.svg" alt="Team Member" className="w-24 h-24 mx-auto mb-4 rounded-full" />
            <h4 className="font-semibold">Vihaan Mehta</h4>
            <p className="text-sm text-gray-500">Lead Engineer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
