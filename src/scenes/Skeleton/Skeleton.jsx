import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import './Skeleton.css';

// Importe a imagem da mão que está no cenário
import dinoHandWorldImage from '../../assets/item-dino-hand-world.png';

const SKELETON_BODY_POSITION = { top: '100px', left: '500px', width: '200px', height: '400px' };
// Posição para a mão estranha (ajuste fino necessário)
const DINO_HAND_POSITION = { top: '200px', left: '420px', width: '80px', height: '80px' };
// Posição do livro (ajuste fino necessário)
const BOOK_POSITION = { top: '330px', left: '180px', width: '120px', height: '110px' };

function Skeleton({ onNavigate, onNavigateBack, onNavigateNext, onNavigatePrev, onObjectClick, debug, successFlashes, gameFlags }) {
  return (
    <div className="skeleton-scene">
      <BackButton onClick={onNavigateBack} />
      <button className="nav-arrow left" onClick={onNavigatePrev}>&#9664;</button>
      <button className="nav-arrow right" onClick={onNavigateNext}>&#9654;</button>
      
      {/* Collider geral do corpo do esqueleto (apenas para descrição) */}
      <InteractiveObject id="skeleton_body" position={SKELETON_BODY_POSITION} onClick={() => onObjectClick('skeleton_body')} debug={debug} successFlashes={successFlashes} />

      {/* Livro – leva à cena do livro */}
      <InteractiveObject id="skeleton_book_navigate" position={BOOK_POSITION} onClick={() => onObjectClick('skeleton_book_navigate')} debug={debug} successFlashes={successFlashes} />

      {/* A mão SÓ APARECE se ainda não foi pega */}
      {!gameFlags.dino_hand_taken && (
        <InteractiveObject 
          id="skeleton_hand" 
          position={DINO_HAND_POSITION} 
          onClick={() => onObjectClick('skeleton_hand')} 
          debug={debug} 
          successFlashes={successFlashes}
        >
          <img src={dinoHandWorldImage} alt="Mão de Dinossauro" className="world-item-image"/>
        </InteractiveObject>
      )}
    </div>
  );
}
export default Skeleton;