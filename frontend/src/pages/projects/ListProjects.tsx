import ProjectCard from "../../components/project/ProjectCard";

const ListProjects = () => {
  const projects = [
    {
      id: "1",
      name: "Snapchat",
      platform: "Android",
      category: "Productivity",
      createdAt: "2025-04-10",
    },
    {
      id: "2",
      name: "Fitness Tracker",
      platform: "iOS",
      category: "Health",
      createdAt: "2025-04-08",
    },
  ];

  return (
    <div className="mt-16 p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        Your Projects
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        View and manage your app feedback tracking projects.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ListProjects;
