import React, { useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import WirePuzzle from '../../components/WirePuzzle/WirePuzzle';
import './OwlFocus.css';

const MODULE_POSITION = { top: '200px', left: '340px', width: '350px', height: '340px' };
const TOTAL_PUZZLES   = 3;
const TOTAL_COMBOS    = 5; // must match COMBINATIONS.length in WirePuzzle

// Returns an array of `count` unique random indices from [0, TOTAL_COMBOS)
function uniqueSequence(count) {
  const pool = Array.from({ length: TOTAL_COMBOS }, (_, i) => i);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

function OwlFocus({ onNavigate, onNavigateBack, onObjectClick, debug, successFlashes, gameFlags }) {
  const [completed,  setCompleted]  = useState(0);
  const [sequence,   setSequence]   = useState([]);   // indices into COMBINATIONS
  const [puzzleKey,  setPuzzleKey]  = useState(0);
  const [puzzleOpen, setPuzzleOpen] = useState(false);

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
      // Todos os 3 concluídos: seta flag, volta para owl_room
      setPuzzleOpen(false);
      onObjectClick('wire_puzzle_solved');
      onNavigate('owl_room');
    }
  };

  const handleFail = () => {
    setPuzzleOpen(false);
    setCompleted(0);
    onObjectClick('wire_puzzle_failed');
  };

  return (
    <div className="owl-focus-scene">
      <BackButton onClick={onNavigateBack} />

      <InteractiveObject
        id="owl_wire_module"
        position={MODULE_POSITION}
        onClick={openPuzzle}
        debug={debug}
        successFlashes={successFlashes}
      />

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

export default OwlFocus;
