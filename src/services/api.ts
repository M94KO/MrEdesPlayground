const BASE_URL = 'https://api.example.com';

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.message || 'An error occurred',
      response.status,
      errorData
    );
  }
  
  return response.json();
};

export const api = {
  async get<T>(endpoint: string): Promise<T> {
    console.log(`API GET: ${endpoint}`);
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },
  
  async post<T>(endpoint: string, data?: any): Promise<T> {
    console.log(`API POST: ${endpoint}`, data);
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    
    return handleResponse(response);
  },
  
  async put<T>(endpoint: string, data?: any): Promise<T> {
    console.log(`API PUT: ${endpoint}`, data);
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    
    return handleResponse(response);
  },
  
  async delete<T>(endpoint: string): Promise<T> {
    console.log(`API DELETE: ${endpoint}`);
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },
};

export { ApiError };