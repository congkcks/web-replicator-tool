
// Base API service for making HTTP requests
class ApiService {
  private baseUrl: string;
  private authToken: string | null = null;
  
  constructor(baseUrl: string = import.meta.env.VITE_API_URL || 'https://localhost:5000') {
    this.baseUrl = baseUrl;
    // Try to get auth token from localStorage if it exists
    this.authToken = localStorage.getItem('auth_token');
  }

  // Get the base URL
  getBaseUrl(): string {
    return this.baseUrl;
  }

  // Get headers with optional authentication
  getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  // Set authentication token
  setAuthToken(token: string) {
    this.authToken = token;
    localStorage.setItem('auth_token', token);
  }

  // Clear authentication token
  clearAuthToken() {
    this.authToken = null;
    localStorage.removeItem('auth_token');
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      
      // Default headers
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      // Add auth token if available
      if (this.authToken) {
        headers['Authorization'] = `Bearer ${this.authToken}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `Server responded with status: ${response.status}`
        );
      }

      // For 204 No Content responses, return empty object
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  // POST request
  post<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  put<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  delete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

// Create a new instance with the local API URL
export const apiService = new ApiService('https://localhost:5000');
