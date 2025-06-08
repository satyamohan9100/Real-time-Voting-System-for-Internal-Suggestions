import React from 'react';
import { formatDate } from '../utils/helpers';

const SuggestionItem = ({ suggestion, onVote, loading }) => {
  const handleVoteClick = () => {
    if (!loading) {
      onVote(suggestion.id);
    }
  };

  return (
    <div className="suggestion-item">
      <div className="suggestion-content">
        <div className="suggestion-details">
          <h4 className="suggestion-title">
            {suggestion.title}
          </h4>
          {suggestion.description && (
            <p className="suggestion-description">
              {suggestion.description}
            </p>
          )}
          <div className="suggestion-meta">
            By {suggestion.author} • {formatDate(suggestion.created_at)}
          </div>
        </div>
        
        <div className="vote-section">
          <button
            onClick={handleVoteClick}
            className="vote-button"
            disabled={loading}
            title="Vote for this suggestion"
          >
            👍 Vote
          </button>
          <div className="vote-count">
            {suggestion.vote_count} vote{suggestion.vote_count !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionItem;