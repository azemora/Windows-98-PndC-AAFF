import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import './PC_main.css';

const PC_MAIN_COMPUTER_POS = { top: '200px', left: '200px', width: '250px', height: '200px' };
const FINAL_PORTAL_POS = { top: '1px', left: '550px', width: '300px', height: '480px' };

function PC_main({ onNavigate, onNavigateNext, onNavigatePrev, onObjectClick, debug, successFlashes, gameFlags }) {
  return (
    <div className="pc-main-scene">
      <BackButton onClick={() => onNavigate('library')} />
      <button className="nav-arrow left" onClick={onNavigatePrev}>&#9664;</button>
      <button className="nav-arrow right" onClick={onNavigateNext}>&#9654;</button>
      
      {/* O computador só é clicável se o portal final NÃO estiver aberto */}
      {!gameFlags.final_portal_unlocked && (
        <InteractiveObject id="pc_main_computer" position={PC_MAIN_COMPUTER_POS} onClick={() => onObjectClick('pc_main_computer')} debug={debug} successFlashes={successFlashes} />
      )}
      
      {/* O portal para a cena final só aparece quando o puzzle é resolvido */}
      {gameFlags.final_portal_unlocked && (
        <InteractiveObject id="final_scene_portal" position={FINAL_PORTAL_POS} onClick={() => onObjectClick('final_scene_portal')} debug={debug} successFlashes={successFlashes} />
      )}
    </div>
  );
}
export default PC_main;