import React, { useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import ValvePuzzle from '../../components/ValvePuzzle/ValvePuzzle';
import './DragonPuzzle.css';

const DRAGON_TARGETS  = [91, 20, 45, 78];
const VALVES_POSITION = { top: '200px', left: '280px', width: '500px', height: '250px' };

function DragonPuzzle({ onNavigate, onNavigateBack, onObjectClick, debug, successFlashes, gameFlags }) {
  const [puzzleOpen, setPuzzleOpen] = useState(false);

  const heartPlaced = gameFlags.dragon_heart_placed;
  const done        = gameFlags.dragon_puzzle_solved;

  const handleSuccess = () => {
    setPuzzleOpen(false);
    onObjectClick('dragon_puzzle_success');
    onNavigate('dragon_room');
  };

  return (
    <div className="dragon-puzzle-scene">
      <BackButton onClick={onNavigateBack} />

      {!done && (
        <InteractiveObject
          id="dragon_valves"
          position={VALVES_POSITION}
          onClick={() => setPuzzleOpen(true)}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}

      {puzzleOpen && (
        <ValvePuzzle
          targets={DRAGON_TARGETS}
          blocked={!heartPlaced}
          onSuccess={handleSuccess}
          onClose={() => setPuzzleOpen(false)}
        />
      )}
    </div>
  );
}

export default DragonPuzzle;
