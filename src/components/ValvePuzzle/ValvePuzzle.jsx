import React, { useState, useEffect } from 'react';
import './ValvePuzzle.css';

const DEFAULT_TARGETS = [40, 90, 10, 70];
const MIN_VAL   = 0;
const MAX_VAL   = 100;
const SVG_W     = 520;
const SVG_H     = 130;
const CY        = SVG_H / 2;       // vertical center
const SEC_W     = SVG_W / 4;       // 130px per section
const AMP_SCALE = 0.65;            // pixels per unit away from target
const STEPS     = 80;              // line points per section
const CORRECT_RANGE = 5;           // ±5 around target = "correct zone"

// Stable pseudo-random: deterministic float [0, 1) for any integer seed
function seededRand(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// Returns amplitude colour: green if exact, yellow if close, red otherwise
function sectionColor(value, target) {
  const d = Math.abs(value - target);
  if (d === 0)  return '#00FF66';
  if (d <= 2)   return '#FFCC00';
  return '#FF3333';
}

// Builds an SVG path string for one section
// Inside ±CORRECT_RANGE of target: clean sine wave (amplitude → 0 at exact)
// Outside: stable chaotic wave seeded by (sectionIndex, value)
function sectionPath(sectionIndex, value, targets) {
  const target = targets[sectionIndex];
  const dist   = Math.abs(value - target);
  const pts    = [];

  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    const x = sectionIndex * SEC_W + t * SEC_W;
    let y;

    if (dist <= CORRECT_RANGE) {
      // Clean sine — amplitude shrinks linearly to 0 at exact match
      const amp = dist * AMP_SCALE;
      y = CY + amp * Math.sin(t * Math.PI * 4);
    } else {
      // Chaotic — stable per (sectionIndex, value, step)
      const base = sectionIndex * 1000000 + value * 1000;
      const r1   = seededRand(base + i * 7);
      const r2   = seededRand(base + i * 13 + 333);
      const r3   = seededRand(base + i * 19 + 777);
      const amp  = 22;
      y = CY
        + amp       * Math.sin(t * Math.PI * (3 + r1 * 6))
        + amp * 0.5 * Math.sin(t * Math.PI * (7 + r2 * 5))
        + (r3 - 0.5) * 16;
    }

    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return 'M ' + pts.join(' L ');
}

function ValvePuzzle({ onSuccess, onClose, targets = DEFAULT_TARGETS, blocked = false }) {
  const [values,  setValues]  = useState([0, 0, 0, 0]);
  const [solved,  setSolved]  = useState(false);

  // Check win condition on every value change (only when not blocked)
  useEffect(() => {
    if (blocked) return;
    if (targets.every((t, i) => values[i] === t)) {
      setSolved(true);
      setTimeout(onSuccess, 1000);
    }
  }, [values, blocked]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (index, raw) => {
    if (solved || blocked) return;
    const v = Number(raw);
    setValues(prev => { const n = [...prev]; n[index] = v; return n; });
  };

  return (
    <div className="valve-overlay" onClick={e => e.stopPropagation()}>
      <div className="valve-window win98-window">

        {/* Title bar */}
        <div className="win98-title-bar">
          <span>SISTEMA DE VÁLVULAS — CALIBRAÇÃO</span>
          <button className="win98-close-button" onClick={onClose}>X</button>
        </div>

        <div className="valve-body">

          {/* Line display */}
          <div className="valve-line-panel">
            {blocked ? (
              <div className="valve-blocked-display" style={{ width: SVG_W, height: SVG_H }}>
                FALTAM COMPONENTES
              </div>
            ) : (
              <svg width={SVG_W} height={SVG_H} className="valve-svg">
                {/* Section dividers */}
                {[1, 2, 3].map(i => (
                  <line key={i}
                    x1={i * SEC_W} y1={0} x2={i * SEC_W} y2={SVG_H}
                    stroke="#333" strokeWidth="1" strokeDasharray="4 3"
                  />
                ))}
                {/* Center reference line */}
                <line x1={0} y1={CY} x2={SVG_W} y2={CY}
                  stroke="#222" strokeWidth="1" strokeDasharray="6 4"
                />
                {/* Coloured signal lines */}
                {values.map((v, i) => (
                  <path key={i}
                    d={sectionPath(i, v, targets)}
                    stroke={sectionColor(v, targets[i])}
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
              </svg>
            )}

            {/* Solved overlay */}
            {solved && (
              <div className="valve-solved-overlay">CALIBRADO</div>
            )}
          </div>

          {/* Knobs */}
          <div className="valve-knobs">
            {[0, 1, 2, 3].map(i => {
              const d = Math.abs(values[i] - targets[i]);
              return (
                <div key={i} className="valve-row">
                  <span className="valve-label">VÁLVULA {i + 1}</span>
                  <div className="valve-slider-wrap">
                    <span className="valve-min">{MIN_VAL}</span>
                    <input
                      type="range"
                      className="valve-slider"
                      min={MIN_VAL}
                      max={MAX_VAL}
                      value={values[i]}
                      onChange={e => handleChange(i, e.target.value)}
                      style={{ accentColor: sectionColor(values[i], targets[i]) }}
                    />
                    <span className="valve-max">{MAX_VAL}</span>
                  </div>
                  <span
                    className="valve-value"
                    style={{ color: sectionColor(values[i], targets[i]) }}
                  >
                    {String(values[i]).padStart(2, '0')}
                  </span>
                  <div
                    className="valve-indicator"
                    style={{ background: sectionColor(values[i], targets[i]) }}
                    title={d === 0 ? 'OK' : `±${d}`}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ValvePuzzle;
