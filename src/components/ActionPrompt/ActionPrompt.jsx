import React from 'react';
import './ActionPrompt.css';

function ActionPrompt({ title, buttonText, onExecute }) {
  return (
    <div className="action-prompt-overlay">
      <div className="action-prompt-window win98-window">
        <div className="action-prompt-title-bar win98-title-bar">
          <p>{title || 'Ação Requerida'}</p>
        </div>
        <div className="action-prompt-content">
          <button className="action-prompt-button" onClick={onExecute}>
            {buttonText || 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActionPrompt;