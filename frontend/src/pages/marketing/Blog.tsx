import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import LaunchImage from '../../assets/blog-launch.jpg';
import SentimentImage from '../../assets/blog-sentiment.jpg';
import CaseStudyImage from '../../assets/blog-casestudy.jpg';


const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Launch Announcement",
      excerpt: "InsightAI is live! Learn how to turn feedback into product clarity with our advanced AI analysis.",
      category: "Product News",
      date: "May 15, 2023",
      readTime: "4 min read",
      author: "Sarah Johnson",
      emoji: "🚀",
      image: LaunchImage
    },
    {
      id: 2,
      title: "New Sentiment Engine",
      excerpt: "Our upgraded model improves clustering accuracy and natural language understanding by 30%.",
      category: "Tech Update",
      date: "June 2, 2023",
      readTime: "6 min read",
      author: "Michael Chen",
      emoji: "📈",
      image: SentimentImage
    },
    {
      id: 3,
      title: "Customer Success Story",
      excerpt: "How Acme Inc. used InsightAI to increase feature adoption by 45% in just 3 months.",
      category: "Case Study",
      date: "June 18, 2023",
      readTime: "8 min read",
      author: "Emma Rodriguez",
      emoji: "🏆",
      image: CaseStudyImage
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Insights & Updates
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the latest product news, technical deep dives, and customer stories
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <motion.article
              key={post.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{post.emoji}</span>
                  <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <UserIcon className="w-4 h-4" />
                    {post.author}
                  </div>
                </div>

                <a 
                  href="#" 
                  className="inline-flex items-center text-indigo-600 font-medium group"
                >
                  Read more
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
            View All Articles
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;