import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProjects, fetchAnalysis } from '@/lib/api';
import { toast } from 'sonner';

interface Project {
  _id: string;
  name: string;
  google_play_app_id?: string;
  app_store_app_id?: string;
  createdAt: string;
  platform: string;
  last_scraped?: string;
}

interface AnalysisData {
  total_feedbacks: number;
  sentiment: {
    positive: number;
    negative: number;
    neutral: number;
  };
  clusters: Record<string, string[]>;
  timestamp: string;
  [key: string]: any;
}

const Overview = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [timePeriod, setTimePeriod] = useState("weekly");
  const [projects, setProjects] = useState<Project[]>([]);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all projects
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        toast.error("Failed to load projects");
        setError("Failed to load projects");
      }
    };
    loadProjects();
  }, []);

  // Fetch analysis data
  useEffect(() => {
    const fetchAnalysisData = async () => {
      if (!projectId) return;

      try {
        setIsLoading(true);
        const selectedProject = projects.find(p => p._id === projectId);
        
        if (!selectedProject) {
          toast.error('Project not found');
          navigate('/dashboard/projects');
          return;
        }

        const analysis = await fetchAnalysis(
          selectedProject.google_play_app_id,
          selectedProject.app_store_app_id,
          timePeriod
        );
        
        if (!analysis.sentiment) {
          throw new Error('Missing sentiment data in response');
        }
        
        setAnalysisData(analysis);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        setError(message);
        toast.error('Failed to load analysis');
      } finally {
        setIsLoading(false);
      }
    };

    if (projects.length > 0) {
      fetchAnalysisData();
    }
  }, [projectId, timePeriod, projects, navigate]);

  // Chart data
  const sentimentData = analysisData?.sentiment ? [
    { name: 'Positive', value: analysisData.sentiment.positive, color: '#4ade80' },
    { name: 'Negative', value: analysisData.sentiment.negative, color: '#f87171' },
    { name: 'Neutral', value: analysisData.sentiment.neutral, color: '#94a3b8' }
  ] : [];

  const clusterData = analysisData?.clusters ? 
    Object.entries(analysisData.clusters).map(([key, value]) => ({
      id: key,
      name: `Cluster ${key}`,
      count: value.length,
      feedbacks: value
    })) : [];

  const sentiment = analysisData?.sentiment || { 
      positive: 0, 
      negative: 0, 
      neutral: 0 
    };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Project Insights</h2>

        <div className="flex gap-4 flex-wrap">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={projectId}
            onValueChange={(value) => navigate(`/dashboard/overview/${value}`)}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project._id} value={project._id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          Error: {error}. Please try again later.
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading project data...</p>
        </div>
      ) : (
        analysisData && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Total Feedbacks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {analysisData.total_feedbacks}
                  </div>
                  <p className="text-sm text-gray-500">
                    Last updated:{" "}
                    {new Date(analysisData.timestamp).toLocaleString()}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Main Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">
                    {Object.keys(analysisData.clusters).length}
                  </div>
                  <p className="text-sm text-gray-500">
                    Key clusters identified
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Sentiment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Positive</span>
                      <span>{sentiment.positive}%</span>
                    </div>
                    <Progress value={sentiment.positive} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Critical Issues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">
                    {
                      clusterData.filter((cluster) =>
                        cluster.feedbacks.some(
                          (fb) =>
                            fb.toLowerCase().includes("crash") ||
                            fb.toLowerCase().includes("fail")
                        )
                      ).length
                    }
                  </div>
                  <p className="text-sm text-gray-500">Urgent problems</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Sentiment Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Top Clusters</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={clusterData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Cluster Details */}
            <Card>
              <CardHeader>
                <CardTitle>Feedback Clusters</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple">
                  {clusterData.map((cluster) => (
                    <AccordionItem key={cluster.id} value={cluster.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium">
                            {cluster.name}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {cluster.count} feedbacks
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p className="font-medium">Sample Feedbacks:</p>
                          <ul className="space-y-2">
                            {cluster.feedbacks
                              .slice(0, 5)
                              .map((feedback, index) => (
                                <li key={index} className="text-gray-600">
                                  • {feedback}
                                </li>
                              ))}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline">Regenerate Insights</Button>
              <Button>Download Full Report (PDF)</Button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Overview;