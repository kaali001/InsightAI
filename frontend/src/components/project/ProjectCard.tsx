interface ProjectCardProps {
    id: string;
    name: string;
    platform: string;
    category: string;
    createdAt: string;
  }
  
  const ProjectCard = ({ name, platform, category, createdAt }: ProjectCardProps) => {
    return (
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Platform: {platform}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Category: {category}</p>
        <p className="text-sm text-gray-400 mt-2">Created: {createdAt}</p>
      </div>
    );
  };
  
  export default ProjectCard;
  