import React from 'react';
import './Final.css';

// A cena agora recebe uma prop 'onOpenLetter'
function Final({ onOpenLetter }) {
  return (
    <div className="final-scene">
      <button className="final-scene-button" onClick={onOpenLetter}>
        Ler a Carta
      </button>
    </div>
  );
}

export default Final;