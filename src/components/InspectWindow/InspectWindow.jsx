import React from 'react';
import { ITEMS_DB } from '../../database/items.js';
import './InspectWindow.css';

function InspectWindow({ itemId, onClose }) {
  const item = ITEMS_DB[itemId];
  if (!item) return null;

  return (
    <div className="inspect-overlay" onClick={onClose}>
      <div className="inspect-window win98-window" onClick={(e) => e.stopPropagation()}>
        <div className="inspect-title-bar win98-title-bar">
          <p>{item.name}</p>
          <button className="win98-close-button" onClick={onClose}>X</button>
        </div>
        <div className="inspect-content win98-content-area">
          <div className="inspect-image-container">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="inspect-description">
            <p>{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InspectWindow;