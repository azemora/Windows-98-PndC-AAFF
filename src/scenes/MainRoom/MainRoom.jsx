import React from 'react';
import './MainRoom.css';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';

// Posições dos objetos em PIXELS (ajuste se necessário)
const TABLE_POSITION = { top: '390px', left: '600px', width: '120px', height: '60px' };
const CHANDELIER_POSITION = { top: '60px', left: '375px', width: '200px', height: '100px' };
const DOOR_POSITION = { top: '330px', left: '450px', width: '100px', height: '140px' };

// NOVO: Posição para o collider da lareira
const FIREPLACE_POSITION = { top: '300px', left: '80px', width: '300px', height: '260px' };


function MainRoom({ onObjectClick, debug, successFlashes }) {
  return (
    <div className="main-room-scene">
      {/* Colliders existentes */}
      <InteractiveObject 
        id="table" 
        position={TABLE_POSITION} 
        onClick={() => onObjectClick('table')} 
        debug={debug}
        successFlashes={successFlashes}
      />
      <InteractiveObject 
        id="chandelier" 
        position={CHANDELIER_POSITION} 
        onClick={() => onObjectClick('chandelier')} 
        debug={debug}
        successFlashes={successFlashes}
      />
      <InteractiveObject 
        id="main_door" 
        position={DOOR_POSITION} 
        onClick={() => onObjectClick('main_door')} 
        debug={debug}
        successFlashes={successFlashes}
      />

      {/* NOVO: Collider da lareira adicionado à cena */}
      <InteractiveObject 
        id="fireplace" 
        position={FIREPLACE_POSITION} 
        onClick={() => onObjectClick('fireplace')} 
        debug={debug}
        successFlashes={successFlashes}
      />
    </div>
  );
}

export default MainRoom;