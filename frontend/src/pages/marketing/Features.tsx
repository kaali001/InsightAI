import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FeatureStepProps {
  number: number;
  title: string;
  description: string;
  icon: string;
  direction?: 'left' | 'right';
}

const FeatureStep = ({ number, title, description, icon, direction = 'left' }: FeatureStepProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
      animate={{
        opacity: inView ? 1 : 0,
        x: inView ? 0 : direction === "left" ? -50 : 50,
      }}
      transition={{ duration: 0.5 }}
      className="relative mb-20 md:mb-32 last:mb-0"
    >
      <div
        className={`flex flex-col ${
          direction === "right" ? "md:flex-row-reverse" : "md:flex-row"
        } items-center gap-8 md:gap-16`}
      >
        {/* Visual Element */}
        <div className="relative flex-shrink-0 w-full md:w-3/4 lg:w-2/3">

        <div className="relative z-10 p-8 md:p-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl shadow-xl w-full">

            <div className="text-6xl mb-4">{icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full text-xl font-bold">
                  {number}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {title}
                </h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-20" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20" />
          </div>
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl" />
        </div>

        {/* Content */}
      </div>

      {/* Connecting Line */}
      {number < 4 && (
        <div className="hidden md:block absolute left-1/2 top-full -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-indigo-100 to-purple-100" />
      )}
    </motion.li>
  );
};

const Features = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Transform Feedback into Action
          </h1>
          <p className="text-lg text-gray-600">
            Four simple steps to unlock powerful insights from user feedback
          </p>
        </motion.div>

        <ol className="relative">
          <FeatureStep
            number={1}
            title="Connect Your App"
            icon="📱"
            description="Seamlessly integrate with app stores or directly connect your platform. Our system automatically aggregates user feedback from multiple sources in real-time."
            direction="left"
          />

          <FeatureStep
            number={2}
            title="Upload Feedback"
            icon="📤"
            description="Drag-and-drop CSV/JSON files or connect to popular survey tools. We support all major formats and automatically normalize unstructured data."
            direction="right"
          />

          <FeatureStep
            number={3}
            title="AI-Powered Analysis"
            icon="🧠"
            description="Our advanced LLM engine identifies patterns, clusters similar feedback, and surfaces critical issues with sentiment analysis and priority scoring."
            direction="left"
          />

          <FeatureStep
            number={4}
            title="Actionable Insights"
            icon="📊"
            description="Interactive dashboards with real-time metrics, automated trend detection, and exportable reports that integrate with your workflow tools."
            direction="right"
          />
        </ol>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-md font-semibold hover:bg-indigo-700 transition-colors duration-300">
            Start Your Free Trial →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;