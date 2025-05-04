import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import AddProject from './components/AddProjects';
import { fetchProjects } from '@/lib/api';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface Project {
  last_scraped: any;
  google_play_app_id: any;
  app_store_app_id: any;
  _id: string;
  name: string;
  createdAt: string;
  platform: string;
  appId: string;
}

const Projects = () => {
  const [showAddProject, setShowAddProject] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from backend
  const FetchProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchProjects();
  }, []);

  const handleProjectCreated = (newProject: Project) => {
    setProjects(prev => [...prev, newProject]);
    setShowAddProject(false);
    toast.success('Project created successfully!');
  };

  if (loading) {
    return <div className="p-6">Loading projects...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Projects</h2>
        <Button
          className="flex items-center gap-2"
          onClick={() => setShowAddProject(true)}
        >
          <Plus size={18} />
          Add New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 text-lg">No projects created yet</p>
          <Button className="mt-4" onClick={() => setShowAddProject(true)}>
            Create New Project
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white shadow border rounded-lg p-5 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {project.name}
              </h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-500">
                  {project.platform === "app_store"
                    ? "App Store"
                    : "Play Store"}{" "}
                  ID:
                  <span className="ml-2 font-mono">
                    {project.app_store_app_id || project.google_play_app_id}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Last analyzed:{" "}
                  {project.last_scraped
                    ? new Date(project.last_scraped).toLocaleDateString()
                    : "Never"}
                </p>
              </div>
              <Link to={`/dashboard/overview/${project._id}`} className="w-full">
                <Button className="mt-4 w-full">Open Project</Button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {showAddProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative">
            <button
              onClick={() => setShowAddProject(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <AddProject
              onSuccess={handleProjectCreated}
              onClose={() => setShowAddProject(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;