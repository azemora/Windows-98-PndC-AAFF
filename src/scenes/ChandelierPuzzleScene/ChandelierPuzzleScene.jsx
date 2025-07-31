import React from 'react';
import './ChandelierPuzzleScene.css';
import BackButton from '../../components/BackButton/BackButton';
// Por enquanto, esta cena é apenas um placeholder
function ChandelierPuzzleScene({ onNavigate }) {
  return (
    <div className="chandelier-puzzle-scene">
      <h1>Passagem Secreta do Candelabro</h1>
        <div className="table-view-scene">
      <BackButton onClick={() => onNavigate('main_room')} />
    </div>
    </div>
  );
}

export default ChandelierPuzzleScene;