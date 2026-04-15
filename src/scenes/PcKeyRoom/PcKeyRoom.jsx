import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import './PcKeyRoom.css';

import bgPcKey     from '../../assets/scene-room-pckey.jpg';
import bgPcKeyOpen from '../../assets/scene-room-pckeyopen.jpg';
import bgPcKeyDone from '../../assets/scene-room-pckeydone.jpg';

const TERMINAL_POS = { top: '150px', left: '160px', width: '200px', height: '150px' };
const KEY_POS      = { top: '230px', left: '410px', width: '150px',  height: '110px'  };

function PcKeyRoom({ onNavigate, onNavigateBack, onObjectClick, debug, successFlashes, gameFlags }) {
  const puzzleSolved = gameFlags.owlbear_pckey_puzzle_solved;
  const keyTaken     = gameFlags.owlbear_key_taken;

  let bg;
  if (keyTaken)      bg = bgPcKeyDone;
  else if (puzzleSolved) bg = bgPcKeyOpen;
  else               bg = bgPcKey;

  return (
    <div
      className="pckey-room-scene"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <BackButton onClick={onNavigateBack} />

      {!puzzleSolved && (
        <InteractiveObject
          id="owlbear_pc_terminal"
          position={TERMINAL_POS}
          onClick={() => onObjectClick('owlbear_pc_terminal')}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}

      {puzzleSolved && !keyTaken && (
        <InteractiveObject
          id="owlbearkey_pickup"
          position={KEY_POS}
          onClick={() => onObjectClick('owlbearkey_pickup')}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}
    </div>
  );
}

export default PcKeyRoom;
