const API_BASE_URL = 'http://localhost:8000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  async getSuggestions() {
    return this.request('/suggestions');
  }

  async createSuggestion(suggestionData) {
    return this.request('/suggestions', {
      method: 'POST',
      body: JSON.stringify(suggestionData)
    });
  }

  async vote(suggestionId, userId) {
    return this.request('/vote', {
      method: 'POST',
      body: JSON.stringify({
        suggestion_id: suggestionId,
        user_id: userId
      })
    });
  }

  // async healthCheck() {
  //   return this.request('/health');
  // }
}

export const apiService = new ApiService();