import React, { useState, useEffect } from 'react';
import './CombinationLock.css';

// All available characters: A-Z then 0-9
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

function CombinationLock({ onSuccess, onClose, answer }) {
  const ANSWER = answer.toUpperCase().split('');
  const SLOTS  = ANSWER.length;

  const [indices, setIndices] = useState(Array(SLOTS).fill(0));
  const [solved,  setSolved]  = useState(false);

  const adjust = (slot, dir) => {
    if (solved) return;
    setIndices(prev => {
      const next = [...prev];
      next[slot] = (next[slot] + dir + CHARS.length) % CHARS.length;
      return next;
    });
  };

  useEffect(() => {
    if (indices.every((idx, i) => CHARS[idx] === ANSWER[i])) {
      setSolved(true);
      setTimeout(onSuccess, 900);
    }
  }, [indices]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="lock-overlay" onClick={e => e.stopPropagation()}>
      <div className="lock-window win98-window" style={{ width: Math.max(420, SLOTS * 66 + 40) }}>

        <div className="win98-title-bar">
          <span>CADEADO DE COMBINAÇÃO</span>
          <button className="win98-close-button" onClick={onClose}>X</button>
        </div>

        <div className="lock-body">
          <div className="lock-wheels">
            {indices.map((idx, slot) => {
              const prev = CHARS[(idx - 1 + CHARS.length) % CHARS.length];
              const curr = CHARS[idx];
              const next = CHARS[(idx + 1) % CHARS.length];
              return (
                <div key={slot} className="lock-wheel">
                  <button
                    className="lock-arrow"
                    onClick={() => adjust(slot, -1)}
                    disabled={solved}
                  >▲</button>

                  <div className="lock-drum">
                    <span className="lock-char ghost">{prev}</span>
                    <span className="lock-char active">{curr}</span>
                    <span className="lock-char ghost">{next}</span>
                  </div>

                  <button
                    className="lock-arrow"
                    onClick={() => adjust(slot, 1)}
                    disabled={solved}
                  >▼</button>
                </div>
              );
            })}
          </div>

          {solved && (
            <div className="lock-solved-overlay">DESTRAVADO</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CombinationLock;
