import React from 'react';
import './ContextMenu.css';

// O componente agora recebe também a função onInspectClick
function ContextMenu({ x, y, onCombineClick, onInspectClick }) {
  const style = {
    top: `${y}px`,
    left: `${x}px`,
  };

  return (
    <div className="context-menu" style={style}>
      <ul>
        <li onClick={onInspectClick}>Inspecionar</li>
        <li onClick={onCombineClick}>Combinar</li>
      </ul>
    </div>
  );
}

export default ContextMenu;