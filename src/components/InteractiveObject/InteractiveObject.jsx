import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import './InteractiveObject.css';

function InteractiveObject({ id, position, onClick, debug, successFlashes, children }) {
  const { isOver, setNodeRef } = useDroppable({ id: id });

  const classNames = [
    'interactive-object',
    debug ? 'debug-mode' : '',
    successFlashes[id] ? 'success-flash' : ''
  ].join(' ');

  const style = {
    top: position.top,
    left: position.left,
    width: position.width,
    height: position.height,
    // CORRIGIDO: A cor de fundo só aparece se isOver E debug forem verdadeiros
    backgroundColor: isOver && debug ? 'rgba(0, 255, 0, 0.4)' : '',
  };

  return (
    <div
      ref={setNodeRef}
      className={classNames}
      style={style}
      onClick={onClick}
    >
      {debug && (
        <span style={{
          position: 'absolute', top: 2, left: 2,
          color: '#FF0', fontSize: '10px', fontWeight: 'bold',
          fontFamily: 'Courier New', background: 'rgba(0,0,0,0.75)',
          padding: '1px 4px', pointerEvents: 'none', zIndex: 9999,
          whiteSpace: 'nowrap', lineHeight: '14px',
        }}>
          {id}
        </span>
      )}
      {children}
    </div>
  );
}

export default InteractiveObject;