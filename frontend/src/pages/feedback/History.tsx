import CommentTable from "../../components/feedback/CommentTable";

const History = () => {
  const mockData = [
    {
      id: "1",
      source: "Play Store",
      fileName: "app_reviews_april.csv",
      uploadedAt: "2025-04-01",
      status: "Processed",
    },
    {
      id: "2",
      source: "Manual Upload",
      fileName: "web_feedback.json",
      uploadedAt: "2025-03-25",
      status: "Pending",
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Feedback History
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        View past feedback files, their sources, upload dates, and processing status.
      </p>
      <CommentTable files={mockData} />
    </div>
  );
};

export default History;
