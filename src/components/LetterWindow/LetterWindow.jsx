import React from 'react';
import './LetterWindow.css';

function LetterWindow({ title, text, onClose }) {
  return (
    <div className="letter-overlay">
      <div className="letter-window win98-window">
        <div className="letter-title-bar win98-title-bar">
          <p>{title || 'Um Pergaminho'}</p>
          <button className="win98-close-button" onClick={onClose}>X</button>
        </div>
        {/* A área de conteúdo terá o scroll */}
        <div className="letter-content win98-content-area">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}

export default LetterWindow;