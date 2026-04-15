import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { ITEMS_DB } from '../../database/items.js';
import DraggableItem from '../DraggableItem/DraggableItem';
import './Inventory.css';

function Inventory({ onClose, items = [], onItemContextMenu, position }) {
  // A lógica para arrastar a janela continua aqui
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: 'draggable_inventory_window',
  });

  const style = {
    transform: !position.isInitial ? `translate3d(${position.x}px, ${position.y}px, 0)` : undefined,
  };

  return (
    <div className="inventory-overlay">
      <div 
        ref={setNodeRef}
        style={style} 
        className={`inventory-window win98-window ${position.isInitial ? 'initial-pos' : ''}`}
      >
        <div className="inventory-title-bar win98-title-bar" {...listeners} {...attributes}>
          <p>Inventário</p>
          <button className="win98-close-button" onClick={onClose}>X</button>
        </div>
        <div className="inventory-content win98-content-area">
          {items.length === 0 ? (
            <p className="empty-message">O inventário está vazio.</p>
          ) : (
            <div className="items-grid">
              {items.map(itemId => {
                const itemDetails = ITEMS_DB[itemId];
                if (!itemDetails) return null;
                return <DraggableItem key={itemDetails.id} {...itemDetails} onContextMenu={onItemContextMenu} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Inventory;