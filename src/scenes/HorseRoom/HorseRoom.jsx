import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import './HorseRoom.css';

import bgDefault    from '../../assets/scene-room-horse.jpg';
import bgAfter      from '../../assets/scene-room-horse-afterpuzzle.jpg';
import bgAfter2     from '../../assets/scene-room-horse-afterpuzzle2.jpg';

// Collider: porta para a sala do puzzle de válvulas
const PUZZLE_DOOR_POS   = { top: '280px', left: '50px', width: '200px', height: '120px' };
// Collider: painel de senha (esquerda), aparece após resolver as válvulas
const PASSWORD_PANEL_POS = { top: '150px', left: '820px',  width: '130px', height: '100px' };
// Collider: passagem para a sala do coração de dragão, aparece após senha correta
const DRAGON_DOOR_POS   = { top: '100px', left: '500px', width: '200px', height: '100px' };

function HorseRoom({ onNavigate, onNavigateBack, onNavigateNext, onNavigatePrev, onObjectClick, debug, successFlashes, gameFlags }) {
  const valvesDone   = gameFlags.horse_puzzle_solved;
  const passwordDone = gameFlags.horse_password_puzzle_solved;

  const bg = !valvesDone ? bgDefault
           : !passwordDone ? bgAfter
           : bgAfter2;

  return (
    <div
      className="horse-room-scene"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <BackButton onClick={onNavigateBack} />
      <button className="nav-arrow left"  onClick={onNavigatePrev}>&#9664;</button>
      <button className="nav-arrow right" onClick={onNavigateNext}>&#9654;</button>

      {/* Estado 1 — antes de resolver as válvulas */}
      {!valvesDone && (
        <InteractiveObject
          id="horse_puzzle_door"
          position={PUZZLE_DOOR_POS}
          onClick={() => onObjectClick('horse_puzzle_door')}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}

      {/* Estado 2 — válvulas resolvidas, senha ainda não inserida */}
      {valvesDone && !passwordDone && (
        <InteractiveObject
          id="horse_password_panel"
          position={PASSWORD_PANEL_POS}
          onClick={() => onObjectClick('horse_password_panel')}
          debug={debug}
          successFlashes={successFlashes}
        >
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center',
            padding: '8px',
            boxSizing: 'border-box',
            fontSize: '13px',
            fontFamily: 'Courier New, monospace',
            fontWeight: 'bold',
            color: '#1a0a00',
            lineHeight: '1.4',
            pointerEvents: 'none',
          }}>
            Pssiiu, cuidado<br />tem _ _ _ _ _ _<br />aqui.
          </div>
        </InteractiveObject>
      )}

      {/* Estado 3 — senha correta, portal para o coração de dragão */}
      {valvesDone && passwordDone && (
        <InteractiveObject
          id="horse_dragon_door"
          position={DRAGON_DOOR_POS}
          onClick={() => onObjectClick('horse_dragon_door')}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}
    </div>
  );
}

export default HorseRoom;
