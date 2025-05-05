import { FaChartPie, FaComments, FaBrain } from 'react-icons/fa';

const features = [
  {
    title: 'Feedback Clustering',
    description: 'Group similar user feedback into actionable clusters using AI.',
    icon: <FaBrain className="text-4xl" />,
  },
  {
    title: 'Sentiment Analysis',
    description: 'Understand how your users feel about different parts of your app.',
    icon: <FaChartPie className="text-4xl" />,
  },
  {
    title: 'Multi-source Input',
    description: 'Support for app store data, web uploads, and social feedback.',
    icon: <FaComments className="text-4xl" />,
  },
];

const Features = () => {
  return (
    <section className="relative py-24 px-6 bg-gray-50 overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl p-8 shadow-md overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2b2b2b] to-[#4a4a4a] opacity-5 transform group-hover:scale-105 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>

<svg
  className="absolute bottom-[-100px] right-[-100px] z-0 w-[400px] h-[400px] opacity-50"
  viewBox="0 0 200 200"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill="url(#grad1)"
    d="M48.4,-67.4C60.4,-56.2,66.6,-40.5,68.5,-25.5C70.4,-10.6,68.1,3.7,61.2,15.2C54.2,26.6,42.5,35.2,31,45.5C19.4,55.9,7.9,67.9,-4.4,73.4C-16.7,78.9,-33.4,77.9,-44.4,68.1C-55.5,58.3,-60.9,39.6,-66.2,21.4C-71.5,3.3,-76.8,-14.5,-70.7,-28.3C-64.6,-42.2,-47.1,-52.1,-30.4,-61C-13.8,-69.8,1.9,-77.6,17.3,-75.3C32.8,-73.1,48,-61.7,48.4,-67.4Z"
    transform="translate(100 100)"
  />
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#8b5cf6" />
      <stop offset="100%" stopColor="#ec4899" />
    </linearGradient>
  </defs>
</svg>

    </section>
  );
};

export default Features;
