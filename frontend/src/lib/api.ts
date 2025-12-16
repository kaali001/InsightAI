// API Types
export interface Project {
  _id: string;
  id: string;
  name: string;
  description?: string;
  google_play_app_id?: string;
  app_store_app_id?: string;
  created_at: string;
  last_scraped?: string;
  platforms: string[];
  review_count?: number;
  owner_id: string;
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
  google_play_app_id?: string;
  app_store_app_id?: string;
}

export interface ClusterData {
  summary: string;
  count: number;
  feedbacks: string[];
}

export interface AnalysisResponse {
  timestamp: string;
  total_feedbacks: number;
  summary: string;
  clusters: Record<string, ClusterData>;
  labeled_feedbacks: Array<{
    content: string;
    score: number;
    date: string;
    platform: string;
    label: string;
  }>;
  sentiment: {
    positive: number;
    negative: number;
    neutral: number;
    critical_issues: number;
    critical_feedbacks: Array<{
      text: string;
      score: number;
      keywords: string[];
    }>;
  };
}

export interface ApiError {
  detail: string | string[];
}

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

if (!API_BASE_URL) {
  console.error('VITE_BACKEND_URL is not defined in environment variables');
}

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Generic API error handler
const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = 'An unexpected error occurred';
  
  try {
    const error: ApiError = await response.json();
    if (Array.isArray(error.detail)) {
      errorMessage = error.detail.join(', ');
    } else if (typeof error.detail === 'string') {
      errorMessage = error.detail;
    }
  } catch {
    // If JSON parsing fails, use status text
    errorMessage = response.statusText || `Request failed with status ${response.status}`;
  }
  
  // Handle specific status codes
  if (response.status === 401) {
    localStorage.removeItem('access_token');
    window.location.href = '/auth/login';
    throw new Error('Session expired. Please login again.');
  }
  
  if (response.status === 429) {
    throw new Error('Too many requests. Please try again later.');
  }
  
  throw new Error(errorMessage);
};

// Get all projects for authenticated user
export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_BASE_URL}/api/projects/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    await handleApiError(response);
  }
  
  return response.json();
};

// Create a new project
export const createProject = async (data: CreateProjectPayload): Promise<Project> => {
  // Validate that at least one app ID is provided
  if (!data.google_play_app_id && !data.app_store_app_id) {
    throw new Error('At least one app ID (Google Play or App Store) is required');
  }

  const response = await fetch(`${API_BASE_URL}/api/projects/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

// Fetch and analyze feedback
export const fetchAnalysis = async (
  googlePlayId?: string,
  appStoreId?: string,
  mode: 'daily' | 'weekly' | 'monthly' = 'weekly'
): Promise<AnalysisResponse> => {
  // Validate that at least one ID is provided
  if (!googlePlayId && !appStoreId) {
    throw new Error('At least one app ID is required for analysis');
  }

  const params = new URLSearchParams();
  if (googlePlayId) params.append('google_play_app_id', googlePlayId);
  if (appStoreId) params.append('app_store_app_id', appStoreId);
  params.append('mode', mode);

  const response = await fetch(`${API_BASE_URL}/api/feedback/fetch-analyze?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

// Upload CSV file with feedback
export const uploadFeedbackCsv = async (file: File): Promise<{ message: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/feedback/upload-csv`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      // Don't set Content-Type for FormData - browser will set it with boundary
    },
    body: formData,
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};