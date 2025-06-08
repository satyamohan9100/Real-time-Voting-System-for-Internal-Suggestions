import { useState, useEffect, useCallback } from 'react';
import useWebSocket from './useWebSocket';
import { apiService } from '../services/api';
import { generateUserId } from '../utils/helpers';

const useVoting = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId] = useState(() => generateUserId());

  const handleWebSocketMessage = useCallback((data) => {
    if (data.type === 'new_suggestion') {
      setSuggestions(prev => [data.suggestion, ...prev]);
    } else if (data.type === 'vote_update') {
      setSuggestions(prev => prev.map(suggestion => 
        suggestion.id === data.suggestion_id 
          ? { ...suggestion, vote_count: data.vote_count }
          : suggestion
      ));
    }
  }, []);

  const { connected } = useWebSocket('ws://localhost:8000/ws', handleWebSocketMessage);

  // Fetch initial suggestions
  const fetchSuggestions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiService.getSuggestions();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  const handleSubmitSuggestion = useCallback(async (suggestionData) => {
    try {
      setLoading(true);
      await apiService.createSuggestion(suggestionData);
      // New suggestion will be added via WebSocket
    } catch (error) {
      console.error('Error creating suggestion:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleVote = useCallback(async (suggestionId) => {
    try {
      await apiService.vote(suggestionId, userId);
      // Vote update will be received via WebSocket
    } catch (error) {
      console.error('Error voting:', error);
    }
  }, [userId]);

  return {
    suggestions,
    connected,
    loading,
    handleSubmitSuggestion,
    handleVote,
    fetchSuggestions
  };
};

export { useVoting };