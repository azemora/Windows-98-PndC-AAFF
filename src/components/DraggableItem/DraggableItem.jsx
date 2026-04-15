import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import './DraggableItem.css';

// O componente volta a receber onContextMenu como prop
function DraggableItem({ id, name, image, onContextMenu }) {
  const { attributes, listeners, setNodeRef: draggableRef, transform, isDragging } = useDraggable({ id });
  const { setNodeRef: droppableRef } = useDroppable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 9999 : 1,
  };

  const handleRightClick = (event) => {
    event.preventDefault(); // Impede o menu padrão do navegador
    if (onContextMenu) {
      onContextMenu(event.clientX, event.clientY, id); // Chama a função do App
    }
  };

  return (
    <div
      ref={(node) => { draggableRef(node); droppableRef(node); }}
      style={style}
      {...listeners}
      {...attributes}
      className="draggable-item"
      title={name}
      onContextMenu={handleRightClick} // Evento de clique direito reativado
    >
      <img src={image} alt={name} />
    </div>
  );
}

export default DraggableItem;