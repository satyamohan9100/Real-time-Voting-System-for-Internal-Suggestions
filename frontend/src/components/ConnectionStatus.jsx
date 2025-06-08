import React from 'react';

const ConnectionStatus = ({ connected }) => {
  return (
    <div className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
      <span>{connected ? '🟢' : '🔴'}</span>
      <span>{connected ? 'Connected' : 'Disconnected'}</span>
    </div>
  );
};

export default ConnectionStatus;