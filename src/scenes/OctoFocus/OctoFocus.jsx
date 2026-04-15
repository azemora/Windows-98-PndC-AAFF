import React, { useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import WirePuzzle from '../../components/WirePuzzle/WirePuzzle';
import './OctoFocus.css';

import bgDefault from '../../assets/scene-room-octo-focus.jpg';
import bgDone    from '../../assets/scene-room-octo-focus-done.jpg';

const MODULE_POSITION  = { top: '150px', left: '300px', width: '350px', height: '340px' };
const CRYSTAL_POSITION = { top: '180px', left: '420px', width: '180px', height: '220px' };

const TOTAL_PUZZLES = 3;
const TOTAL_COMBOS  = 5;

function uniqueSequence(count) {
  const pool = Array.from({ length: TOTAL_COMBOS }, (_, i) => i);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

function OctoFocus({ onNavigate, onNavigateBack, onObjectClick, debug, successFlashes, gameFlags }) {
  const [completed,  setCompleted]  = useState(0);
  const [sequence,   setSequence]   = useState([]);
  const [puzzleKey,  setPuzzleKey]  = useState(0);
  const [puzzleOpen, setPuzzleOpen] = useState(false);

  const wireDone    = gameFlags.octo_wire_solved;
  const crystalGone = gameFlags.crystal_blood_taken;

  const bg = crystalGone ? bgDone : bgDefault;

  const openPuzzle = () => {
    setSequence(uniqueSequence(TOTAL_PUZZLES));
    setCompleted(0);
    setPuzzleKey(k => k + 1);
    setPuzzleOpen(true);
  };

  const handleSuccess = () => {
    const next = completed + 1;
    if (next < TOTAL_PUZZLES) {
      setCompleted(next);
      setPuzzleKey(k => k + 1);
    } else {
      setPuzzleOpen(false);
      onObjectClick('octo_wire_solved');
    }
  };

  const handleFail = () => {
    setPuzzleOpen(false);
    setCompleted(0);
  };

  return (
    <div
      className="octo-focus-scene"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <BackButton onClick={onNavigateBack} />

      {/* Wire puzzle module — hidden once wire puzzles are done */}
      {!wireDone && (
        <InteractiveObject
          id="octo_wire_module"
          position={MODULE_POSITION}
          onClick={openPuzzle}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}

      {/* Crystal collider — appears after wire done, until crystal taken */}
      {wireDone && !crystalGone && (
        <InteractiveObject
          id="crystal_blood_pickup"
          position={CRYSTAL_POSITION}
          onClick={() => onObjectClick('crystal_blood_pickup')}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}

      {puzzleOpen && (
        <WirePuzzle
          key={puzzleKey}
          comboIndex={sequence[completed]}
          puzzleNumber={completed + 1}
          totalPuzzles={TOTAL_PUZZLES}
          onSuccess={handleSuccess}
          onFail={handleFail}
        />
      )}
    </div>
  );
}

export default OctoFocus;
