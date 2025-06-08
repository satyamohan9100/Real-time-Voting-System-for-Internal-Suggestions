import React from 'react';
import SuggestionItem from './SuggestionItem';

const SuggestionList = ({ suggestions, onVote, loading }) => {
  if (loading && suggestions.length === 0) {
    return (
      <div className="suggestions-section">
        <div className="loading-state">
          Loading suggestions...
        </div>
      </div>
    );
  }

  return (
    <div className="suggestions-section">
      <h3>All Suggestions ({suggestions.length})</h3>
      
      {suggestions.length === 0 ? (
        <div className="empty-state">
          <p>No suggestions yet. Be the first to submit one!</p>
        </div>
      ) : (
        <div className="suggestions-list">
          {suggestions.map(suggestion => (
            <SuggestionItem
              key={suggestion.id}
              suggestion={suggestion}
              onVote={onVote}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestionList;