import React from 'react';
import './TestApp.css';

function TestApp() {
  return (
    <div className="test-container">
      <h1>StudioFlow Test Page</h1>
      <p>If you can see this, basic React rendering is working!</p>
      <div className="env-card">
        <h2>Environment Variables</h2>
        <pre className="env-pre">
          {JSON.stringify({
            VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || 'Not set',
            NODE_ENV: import.meta.env.MODE
          }, null, 2)}
        </pre>
      </div>
      <button 
        className="test-button"
        onClick={() => alert('React events are working!')}
      >
        Click me
      </button>
    </div>
  );
}

export default TestApp; 