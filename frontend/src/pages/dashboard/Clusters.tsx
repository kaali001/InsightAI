import TopicAccordion from "../../components/cluster/TopicAccordion";

const Clusters = () => {
  const mockTopics = [
    {
      id: "1",
      title: "Login Issues",
      summary: "Users are experiencing failed logins due to server errors.",
      comments: [
        "Can't log in after updating the app.",
        "Login button does nothing.",
        "Error 500 when submitting credentials.",
      ],
    },
    {
      id: "2",
      title: "Slow Performance",
      summary: "The app is taking too long to load screens, especially on Android.",
      comments: [
        "App takes forever to start.",
        "Screen freeze on the dashboard.",
        "Performance is worse after the last update.",
      ],
    },
    {
      id: "3",
      title: "Notification Bugs",
      summary: "Push notifications are not being delivered consistently.",
      comments: [
        "Missed an important alert.",
        "Notifications work only once.",
        "I never get notified unless the app is open.",
      ],
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Feedback Clusters
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        These clusters represent common themes and issues extracted from user feedback.
      </p>
      <TopicAccordion topics={mockTopics} />
    </div>
  );
};

export default Clusters;
