// Features.tsx
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
    <section className="py-24 px-6 bg-white ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border-2 p-8 rounded-xl  hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-500 text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Features;
