import React, { useState, useEffect, useRef } from 'react';
import './ClockPuzzle.css';

// SVG clock dimensions
const CX       = 150;   // center x
const CY       = 150;   // center y
const R        = 118;   // clock radius
const HOUR_LEN = 68;    // hour hand length
const MIN_LEN  = 98;    // minute hand length
const SNAP_DEG = 30;    // 30° per hour / per 5 minutes (12 positions each)

// Compute hand tip from position index (0 = 12, 1 = 1, ..., 9 = 9 o'clock)
function handTip(posIndex, length) {
  const rad = (posIndex * SNAP_DEG * Math.PI) / 180;
  return {
    x: CX + length * Math.sin(rad),
    y: CY - length * Math.cos(rad),
  };
}

// Convert raw mouse angle (0° = top, clockwise) → snapped position index 0–11
function angleToPos(deg) {
  return Math.round(((deg % 360) + 360) % 360 / SNAP_DEG) % 12;
}

// Angle in degrees from clock center to mouse, 0° at top, clockwise
function mouseAngle(rect, e) {
  const dx = e.clientX - rect.left  - CX;
  const dy = e.clientY - rect.top   - CY;
  return ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360;
}

function ClockPuzzle({ onSuccess, onClose }) {
  const [hourPos,   setHourPos]   = useState(2);   // 2 = 2 o'clock
  const [minutePos, setMinutePos] = useState(8);   // 8 = 40 minutes
  const [solved,    setSolved]    = useState(false);
  const draggingRef = useRef(null);   // 'hour' | 'minute' | null
  const solvedRef   = useRef(false);
  const svgRef      = useRef(null);

  // Win check — 9:00 means hour at position 9, minute at position 0
  useEffect(() => {
    if (hourPos === 9 && minutePos === 0 && !solvedRef.current) {
      solvedRef.current = true;
      setSolved(true);
      setTimeout(onSuccess, 1000);
    }
  }, [hourPos, minutePos]); // eslint-disable-line react-hooks/exhaustive-deps

  // Global mouse handlers (set up once)
  useEffect(() => {
    const onMove = (e) => {
      if (!draggingRef.current || solvedRef.current) return;
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const pos = angleToPos(mouseAngle(rect, e));
      if (draggingRef.current === 'hour')   setHourPos(pos);
      if (draggingRef.current === 'minute') setMinutePos(pos);
    };
    const onUp = () => { draggingRef.current = null; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
    };
  }, []);

  const hourTip   = handTip(hourPos,   HOUR_LEN);
  const minuteTip = handTip(minutePos, MIN_LEN);

  // Hour label shown at top (hourPos 0 = "12", 9 = "9")
  const displayHour   = hourPos   === 0 ? 12 : hourPos;
  const displayMinute = String(minutePos * 5).padStart(2, '0');

  return (
    <div className="clock-overlay" onClick={e => e.stopPropagation()}>
      <div className="clock-window win98-window">

        <div className="win98-title-bar">
          <span>MECANISMO DE RELÓGIO</span>
          <button className="win98-close-button" onClick={onClose}>X</button>
        </div>

        <div className="clock-body">
          <div className="clock-time-display">
            {displayHour}:{displayMinute}
          </div>

          <svg
            ref={svgRef}
            width={300}
            height={300}
            className="clock-svg"
          >
            {/* Face */}
            <circle cx={CX} cy={CY} r={R}
              fill="#0d0d0d" stroke="#666" strokeWidth="4" />

            {/* Tick marks + numbers */}
            {Array.from({ length: 12 }, (_, i) => {
              const rad  = (i * 30 * Math.PI) / 180;
              const sin  = Math.sin(rad);
              const cos  = Math.cos(rad);
              const x1   = CX + (R - 6)  * sin;
              const y1   = CY - (R - 6)  * cos;
              const x2   = CX + (R - 22) * sin;
              const y2   = CY - (R - 22) * cos;
              const nx   = CX + (R - 40) * sin;
              const ny   = CY - (R - 40) * cos;
              const lbl  = i === 0 ? 12 : i;
              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#555" strokeWidth={i % 3 === 0 ? 3 : 1.5} />
                  <text x={nx} y={ny + 5}
                    textAnchor="middle" dominantBaseline="middle"
                    fill="#888" fontSize="14" fontFamily="Courier New"
                    fontWeight="bold">
                    {lbl}
                  </text>
                </g>
              );
            })}

            {/* Minute hand (thin, white) */}
            <line
              x1={CX} y1={CY}
              x2={minuteTip.x} y2={minuteTip.y}
              stroke="#cccccc" strokeWidth="3" strokeLinecap="round"
              style={{ cursor: solved ? 'default' : 'grab' }}
              onMouseDown={() => { if (!solved) draggingRef.current = 'minute'; }}
            />

            {/* Hour hand (thick, gold) */}
            <line
              x1={CX} y1={CY}
              x2={hourTip.x} y2={hourTip.y}
              stroke="#FFD700" strokeWidth="6" strokeLinecap="round"
              style={{ cursor: solved ? 'default' : 'grab' }}
              onMouseDown={() => { if (!solved) draggingRef.current = 'hour'; }}
            />

            {/* Center cap */}
            <circle cx={CX} cy={CY} r={7} fill="#888" />
            <circle cx={CX} cy={CY} r={4} fill="#FFD700" />

            {/* Solved overlay */}
            {solved && (
              <>
                <rect x={0} y={108} width={300} height={84}
                  fill="rgba(0,160,60,0.72)" />
                <text x={CX} y={155}
                  textAnchor="middle" dominantBaseline="middle"
                  fill="#44FF88" fontSize="19" fontWeight="bold"
                  fontFamily="Courier New" letterSpacing="3">
                  DESBLOQUEADO
                </text>
              </>
            )}
          </svg>

          <p className="clock-hint">
            Arraste os ponteiros para acertar o horário.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClockPuzzle;
