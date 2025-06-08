import React from 'react';
import SuggestionForm from './components/SuggestionForm';
import SuggestionList from './components/SuggestionList';
import ConnectionStatus from './components/ConnectionStatus';
import { useVoting } from './hooks/useVoting';
import './App.css';

const App = () => {
  const {
    suggestions,
    connected,
    handleSubmitSuggestion,
    handleVote,
    loading
  } = useVoting();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Internal Suggestion Voting System</h1>
        <ConnectionStatus connected={connected} />
      </header>

      <main className="app-main">
        <SuggestionForm 
          onSubmit={handleSubmitSuggestion}
          loading={loading}
        />
        
        <SuggestionList 
          suggestions={suggestions}
          onVote={handleVote}
          loading={loading}
        />
      </main>
    </div>
  );
};

export default App;