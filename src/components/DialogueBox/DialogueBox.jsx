import React from 'react';
import './DialogueBox.css';

function DialogueBox({ text, onClose }) {
  return (
    <div className="dialogue-overlay" onClick={onClose}>
      <div className="dialogue-box win98-window" onClick={(e) => e.stopPropagation()}>
        <div className="dialogue-title-bar win98-title-bar">
          <p>Mensagem</p>
          <button className="win98-close-button" onClick={onClose}>X</button>
        </div>
        <div className="dialogue-content">
          <p>{text}</p>
          <button className="ok-button" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default DialogueBox;