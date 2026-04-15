import React, { useState, useEffect, useRef } from 'react';
import './WirePuzzle.css';

const TIMER_DURATION = 25;

// 5 possible combinations — symbol shown in module, answer = wireId → port number
const COMBINATIONS = [
  { symbol: '▲', name: 'TRIÂNGULO', answer: { red: 3, blue: 1, green: 5, yellow: 2, white: 4 } },
  { symbol: '■', name: 'QUADRADO',  answer: { red: 2, blue: 4, green: 1, yellow: 5, white: 3 } },
  { symbol: '●', name: 'CÍRCULO',   answer: { red: 5, blue: 1, green: 2, yellow: 4, white: 3 } },
  { symbol: '★', name: 'ESTRELA',   answer: { red: 1, blue: 5, green: 4, yellow: 3, white: 2 } },
  { symbol: '◆', name: 'LOSANGO',   answer: { red: 4, blue: 2, green: 3, yellow: 1, white: 5 } },
];

const WIRES = [
  { id: 'red',    color: '#FF3333', label: 'VERMELHO' },
  { id: 'blue',   color: '#4488FF', label: 'AZUL'     },
  { id: 'green',  color: '#33BB44', label: 'VERDE'    },
  { id: 'yellow', color: '#FFCC00', label: 'AMARELO'  },
  { id: 'white',  color: '#CCCCCC', label: 'BRANCO'   },
];

// Layout constants (pixels, relative to puzzle area)
const PUZZLE_W    = 560;
const PUZZLE_H    = 340;
const WIRE_NODE_X = 110;
const PORT_NODE_X = 450;
const NODE_RADIUS = 11;
const SNAP_RADIUS = 26;
const NODE_Y      = [40, 100, 160, 220, 280];


function WirePuzzle({ onSuccess, onFail, puzzleNumber = 1, totalPuzzles = 3, comboIndex }) {
  const [combo] = useState(() =>
    comboIndex !== undefined
      ? COMBINATIONS[comboIndex]
      : COMBINATIONS[Math.floor(Math.random() * COMBINATIONS.length)]
  );
  const [connections, setConnections] = useState({});   // { wireId: portNumber }
  const [drag,        setDrag]        = useState(null); // { wireIdx, mouseX, mouseY }
  const [timeLeft,    setTimeLeft]    = useState(TIMER_DURATION);
  const [status,      setStatus]      = useState('playing'); // 'playing' | 'won' | 'lost'
  const containerRef = useRef(null);

  // ── Timer ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (status !== 'playing') return;
    if (timeLeft <= 0) {
      setStatus('lost');
      setTimeout(onFail, 900);
      return;
    }
    const t = setInterval(() => setTimeLeft(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, status]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Win / lose check ──────────────────────────────────────────────
  useEffect(() => {
    if (status !== 'playing') return;
    const allConnected = WIRES.every(w => connections[w.id] !== undefined);
    if (!allConnected) return;
    const correct = WIRES.every(w => connections[w.id] === combo.answer[w.id]);
    if (correct) {
      setStatus('won');
      setTimeout(onSuccess, 800);
    } else {
      setStatus('lost');
      setTimeout(onFail, 900);
    }
  }, [connections]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Global mouse handlers (set up once) ───────────────────────────
  useEffect(() => {
    const onMove = (e) => {
      setDrag(prev => {
        if (!prev || !containerRef.current) return prev;
        const rect = containerRef.current.getBoundingClientRect();
        return { ...prev, mouseX: e.clientX - rect.left, mouseY: e.clientY - rect.top };
      });
    };

    const onUp = (e) => {
      setDrag(prev => {
        if (!prev || !containerRef.current) return null;
        const rect  = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        NODE_Y.forEach((portY, portIdx) => {
          if (Math.abs(x - PORT_NODE_X) <= SNAP_RADIUS && Math.abs(y - portY) <= SNAP_RADIUS) {
            const wireId  = WIRES[prev.wireIdx].id;
            const portNum = portIdx + 1;
            setConnections(prevConn => {
              const next = {};
              // remove any prior wire connected to this port
              Object.entries(prevConn).forEach(([wId, pNum]) => {
                if (pNum !== portNum) next[wId] = pNum;
              });
              next[wireId] = portNum;
              return next;
            });
          }
        });
        return null;
      });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
    };
  }, []);

  // ── Wire mousedown: start drag, disconnect existing ───────────────
  const handleWireMouseDown = (wireIdx, e) => {
    e.preventDefault();
    if (status !== 'playing') return;
    const rect   = containerRef.current.getBoundingClientRect();
    const wireId = WIRES[wireIdx].id;
    setConnections(prev => { const n = { ...prev }; delete n[wireId]; return n; });
    setDrag({ wireIdx, mouseX: e.clientX - rect.left, mouseY: e.clientY - rect.top });
  };

  const timerColor = timeLeft <= 5 ? '#FF3333' : timeLeft <= 10 ? '#FFAA00' : '#44FF66';

  return (
    <div className="wire-puzzle-overlay" onClick={e => e.stopPropagation()}>
      <div className="wire-puzzle-window win98-window">

        {/* Title bar */}
        <div className="win98-title-bar">
          <span>MÓDULO DE FIOS [{puzzleNumber}/{totalPuzzles}] — {combo.symbol} {combo.name}</span>
          <div className="wire-titlebar-actions">
            <button className="win98-close-button" onClick={onFail}>X</button>
          </div>
        </div>

        {/* Body */}
        <div className="wire-puzzle-body">

          {/* Timer + Symbol */}
          <div className="wire-timer-row">
            <span className="wire-combo-symbol" style={{ color: timerColor }}>
              {combo.symbol}
            </span>
            <div className="wire-timer" style={{ color: timerColor }}>
              {String(timeLeft).padStart(2, '0')}s
            </div>
          </div>

          {/* Puzzle canvas */}
          <div
            className="wire-puzzle-area"
            ref={containerRef}
            style={{ width: PUZZLE_W, height: PUZZLE_H }}
          >
            {/* SVG — lines only, no pointer events */}
            <svg
              width={PUZZLE_W}
              height={PUZZLE_H}
              className="wire-svg"
            >
              {/* Static: short decorative wire stubs on left */}
              {WIRES.map((wire, i) => (
                <line key={`stub-${wire.id}`}
                  x1={20} y1={NODE_Y[i]}
                  x2={WIRE_NODE_X - NODE_RADIUS - 2} y2={NODE_Y[i]}
                  stroke={wire.color} strokeWidth="3" strokeLinecap="round"
                />
              ))}

              {/* Static: short decorative stubs on right */}
              {NODE_Y.map((y, i) => (
                <line key={`pstub-${i}`}
                  x1={PORT_NODE_X + NODE_RADIUS + 2} y1={y}
                  x2={PUZZLE_W - 20} y2={y}
                  stroke="#555" strokeWidth="3" strokeLinecap="round"
                />
              ))}

              {/* Connected lines */}
              {WIRES.map((wire, wireIdx) => {
                const portNum = connections[wire.id];
                if (portNum === undefined) return null;
                return (
                  <line key={`conn-${wire.id}`}
                    x1={WIRE_NODE_X} y1={NODE_Y[wireIdx]}
                    x2={PORT_NODE_X} y2={NODE_Y[portNum - 1]}
                    stroke={wire.color} strokeWidth="3" strokeLinecap="round"
                  />
                );
              })}

              {/* Drag preview line */}
              {drag && (
                <line
                  x1={WIRE_NODE_X} y1={NODE_Y[drag.wireIdx]}
                  x2={drag.mouseX}  y2={drag.mouseY}
                  stroke={WIRES[drag.wireIdx].color}
                  strokeWidth="3" strokeDasharray="8 5" strokeLinecap="round"
                />
              )}
            </svg>

            {/* Wire labels */}
            {WIRES.map((wire, i) => (
              <div key={`lbl-${wire.id}`} className="wire-label"
                style={{ top: NODE_Y[i] - 9, left: 24, color: wire.color }}>
                {wire.label}
              </div>
            ))}

            {/* Wire endpoints (draggable) */}
            {WIRES.map((wire, wireIdx) => (
              <div
                key={`node-${wire.id}`}
                className={`wire-node${drag?.wireIdx === wireIdx ? ' dragging' : ''}${connections[wire.id] !== undefined ? ' connected' : ''}`}
                style={{
                  left: WIRE_NODE_X, top: NODE_Y[wireIdx],
                  background: wire.color,
                  boxShadow: `0 0 8px ${wire.color}`,
                }}
                onMouseDown={(e) => handleWireMouseDown(wireIdx, e)}
              />
            ))}

            {/* Port endpoints */}
            {[1, 2, 3, 4, 5].map((portNum, portIdx) => {
              const cw = WIRES.find(w => connections[w.id] === portNum);
              return (
                <div key={`port-${portNum}`} className={`port-node${cw ? ' connected' : ''}`}
                  style={{
                    left: PORT_NODE_X, top: NODE_Y[portIdx],
                    borderColor: cw ? cw.color : '#666',
                    background:  cw ? `${cw.color}33` : '#1a1a1a',
                    boxShadow:   cw ? `0 0 8px ${cw.color}` : 'none',
                  }}
                />
              );
            })}

            {/* Port number labels */}
            {[1, 2, 3, 4, 5].map((portNum, portIdx) => (
              <div key={`plbl-${portNum}`} className="port-label"
                style={{ top: NODE_Y[portIdx] - 9, left: PORT_NODE_X + NODE_RADIUS + 10 }}>
                {portNum}
              </div>
            ))}

            {/* Win / lose overlay */}
            {status === 'won' && (
              <div className="wire-status-overlay won">CONEXÃO ESTABELECIDA</div>
            )}
            {status === 'lost' && (
              <div className="wire-status-overlay lost">FALHA NO SISTEMA</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WirePuzzle;
