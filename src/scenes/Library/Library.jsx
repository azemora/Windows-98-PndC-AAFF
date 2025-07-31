import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import './Library.css';

// Posições (ajuste fino necessário!)
const BOOKSHELF_POSITION = { top: '250px', left: '520px', width: '100px', height: '200px' };
const DESK_POSITION = { top: '400px', left: '250px', width: '90px', height: '30px' };
const DINO_SKELETON_POSITION = { top: '100px', left: '100px', width: '350px', height: '200px' };
const SECRET_DOOR_POSITION = { top: '250px', left: '700px', width: '100px', height: '200px' };

function Library({ onNavigate, onNavigateNext, onNavigatePrev, onObjectClick, debug, successFlashes, gameFlags }) {
  return (
    <div className="library-scene">
      <BackButton onClick={() => onNavigate('main_room')} />
      <button className="nav-arrow left" onClick={onNavigatePrev}>&#9664;</button>
      <button className="nav-arrow right" onClick={onNavigateNext}>&#9654;</button>
      
      {/* Colliders existentes */}
      <InteractiveObject id="bookshelf" position={BOOKSHELF_POSITION} onClick={() => onObjectClick('bookshelf')} debug={debug} successFlashes={successFlashes} />
      <InteractiveObject id="desk" position={DESK_POSITION} onClick={() => onObjectClick('desk')} debug={debug} successFlashes={successFlashes} />
      
      {/* Collider para o esqueleto de dinossauro */}
      <InteractiveObject id="dino_skeleton" position={DINO_SKELETON_POSITION} onClick={() => onObjectClick('dino_skeleton')} debug={debug} successFlashes={successFlashes} />

      {/* A porta secreta SÓ APARECE se o puzzle for resolvido */}
      {gameFlags.library_secret_door_unlocked && (
        <InteractiveObject id="secret_door" position={SECRET_DOOR_POSITION} onClick={() => onObjectClick('secret_door')} debug={debug} successFlashes={successFlashes} />
      )}
    </div>
  );
}
export default Library;