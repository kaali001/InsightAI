const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};


// get all projectes of user
export const fetchProjects = async () => {
  const headers: HeadersInit = {
    ...getAuthHeaders(),
  };

  const response = await fetch(`${API_BASE_URL}/api/projects/all`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
};


//create a new project
export const createProject = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/api/projects/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to create project");
  }

  return result;
};


//perform analysis on project
export const fetchAnalysis = async (
  googlePlayId?: string, 
  appStoreId?: string,
  period: string = 'weekly'
) => {
  const headers = getAuthHeaders();
  const params = new URLSearchParams();

  if (googlePlayId) params.append('google_play_app_id', googlePlayId);
  if (appStoreId) params.append('app_store_app_id', appStoreId);
  params.append('mode', period);

  const response = await fetch(`${API_BASE_URL}/api/feedback/fetch-analyze?${params}`, {
    method: 'GET',
    headers
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Analysis failed');
  }

  return response.json();
};