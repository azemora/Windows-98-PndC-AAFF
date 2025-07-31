import React, { useState, useEffect } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';

// --- Imports ---
import { ITEMS_DB } from './database/items.js';
import { PUZZLES_DB } from './database/puzzles.js';
import MainRoom from './scenes/MainRoom/MainRoom';
import TableView from './scenes/TableView/TableView';
import ChandelierPuzzleScene from './scenes/ChandelierPuzzleScene/ChandelierPuzzleScene';
import MainRoomFireplace from './scenes/MainRoomFireplace/MainRoomFireplace';
import Inventory from './components/Inventory/Inventory';
import DialogueBox from './components/DialogueBox/DialogueBox';
import Library from './scenes/Library/Library';
import Map from './scenes/Map/Map';
import Skeleton from './scenes/Skeleton/Skeleton';
import ContextMenu from './components/ContextMenu/ContextMenu';
import HiddenRedGem from './scenes/HiddenRedGem/HiddenRedGem';
import LibraryDrawerHammer from './scenes/LibraryDrawerHammer/LibraryDrawerHammer';
import PC_main from './scenes/PC_main/PC_main';
import PC_mapscreen from './scenes/PC_mapscreen/PC_mapscreen';
import PC_gemuncloker from './scenes/PC_gemuncloker/PC_gemuncloker';
import TerminalWindow from './components/TerminalWindow/TerminalWindow';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import ActionPrompt from './components/ActionPrompt/ActionPrompt';
import InspectWindow from './components/InspectWindow/InspectWindow';
import Final from './scenes/Final/Final';
import IntroAnimation from './components/IntroAnimation/IntroAnimation';
import LetterWindow from './components/LetterWindow/LetterWindow';
import './App.css';
import inventoryButtonIcon from './assets/inventoryicon.png';
import unlockAnimation from './assets/unlock-animation.mp4';

// =================================================================
// REGRAS DO JOGO
// =================================================================
const itemCombinations = { 'key_piece_1': { 'key_piece_2': { creates: 'key_complete', consumes: true } }, 'key_piece_2': { 'key_piece_1': { creates: 'key_complete', consumes: true } } };
const gameInteractions = {
  'fireplace': { onClick: { action: 'navigate', payload: 'mainroom_fireplace' } }, 'table': { onClick: { action: 'navigate', payload: 'table_view' } }, 'chandelier': { onClick: { action: 'dialogue', payload: 'É um lustre antigo.' }, onDrop: { 'key_1': { action: 'unlock_and_navigate', payload: { flagToSet: 'chandelier_unlocked', itemIdToConsume: 'key_1', viewName: 'chandelier_puzzle_scene' } }, 'default': { action: 'dialogue', payload: 'Isso não funciona aqui.' } } }, 'main_door': { onClick: (flags) => flags.library_door_unlocked ? { action: 'navigate', payload: 'library' } : { action: 'dialogue', payload: 'A porta para a biblioteca está trancada.' }, onDrop: { 'key_complete': { action: 'unlock_door', payload: { flagToSet: 'library_door_unlocked', itemIdToConsume: 'key_complete', successMessage: 'Você destranca a porta.' } }, 'default': { action: 'dialogue', payload: 'A chave errada.' } } }, 'desk': { onClick: { action: 'navigate', payload: 'library-drawer-hammer' } }, 'bookshelf': { onClick: { action: 'navigate', payload: 'hidden-red-gem' } }, 'dino_skeleton': { onClick: (flags) => flags.dino_hand_placed ? { action: 'dialogue', payload: 'O esqueleto de dinossauro está completo.'} : { action: 'dialogue', payload: 'Um esqueleto de T-Rex. Mas parece incompleto.' }, onDrop: { 'dino_hand_1': { action: 'solve_puzzle', payload: { flagToSet: 'library_secret_door_unlocked', flagToSet2: 'dino_hand_placed', itemIdToConsume: 'dino_hand_1', successMessage: 'Você encaixa a mão. Você ouve uma porta se abrindo!' } }, 'default': { action: 'dialogue', payload: 'Isso não se encaixa aqui.' } } }, 'secret_door': { onClick: { action: 'navigate', payload: 'pc_main' } }, 'world_map': { onClick: { action: 'dialogue', payload: 'Um mapa antigo.' }, onDrop: { 'default': { action: 'dialogue', payload: 'Isso não se encaixa no mapa.' } } }, 'gem1_socket': { onDrop: { 'gem_blue': { action: 'place_gem', payload: { flagToSet: 'map_gem_blue_placed', itemIdToConsume: 'gem_blue' } }, 'default': { action: 'dialogue', payload: 'A gema errada.' } } }, 'gem2_socket': { onDrop: { 'gem_red': { action: 'place_gem', payload: { flagToSet: 'map_gem_red_placed', itemIdToConsume: 'gem_red' } }, 'default': { action: 'dialogue', payload: 'A gema errada.' } } }, 'skeleton_body': { onClick: (flags) => flags.dino_hand_taken ? { action: 'dialogue', payload: 'O esqueleto não tem uma das mãos.' } : { action: 'dialogue', payload: 'Um esqueleto humano. Uma de suas mãos parece... diferente.' } }, 'skeleton_hand': { onDrop: { 'hammer_1': { action: 'get_item_with_tool', payload: { flagToCheck: 'dino_hand_taken', flagToSet: 'dino_hand_taken', itemToAdd: 'dino_hand_1', successMessage: 'Você usa o martelo para quebrar a mão estranha e pegá-la.', failMessage: 'Você já pegou a mão.' } }, 'default': { action: 'dialogue', payload: 'Não acho que isso vá funcionar.' } } }, 'skull_cage': { onDrop: { 'knife_1': { action: 'get_item_with_tool', payload: { flagToCheck: 'skull_taken', flagToSet: 'skull_taken', itemToAdd: 'skull_1', successMessage: 'Você usa a faca para cortar as amarras e pega a caveira.' } }, 'default': { action: 'dialogue', payload: 'Preciso de algo afiado.' } } }, 'scan_machine': { onDrop: { 'skull_1': { action: 'place_puzzle_item', payload: { flagToSet: 'skull_placed_on_scanner', itemIdToConsume: 'skull_1', successMessage: 'Você coloca a caveira na máquina. Ela se encaixa perfeitamente.' } }, 'default': { action: 'dialogue', payload: 'Isso não parece se encaixar aqui.' } } }, 'pc_main_computer': { onClick: { action: 'open_terminal', payload: 'main_pc_puzzle' } }, 'pc_gem_computer': { onClick: { action: 'open_terminal', payload: 'gem_unlocker_puzzle' } }, 'pc_map_computer': { onClick: { action: 'open_terminal', payload: 'map_screen_puzzle' } }, 'blue_gem_pickup': { onClick: { action: 'add_item_and_set_flag', payload: { itemId: 'gem_blue', flag: 'blue_gem_taken' } } }, 'key_piece_1_pickup': { onClick: { action: 'add_item_and_set_flag', payload: { itemId: 'key_piece_1', flag: 'key_piece_1_taken' } } }, 'key_piece_2_pickup': { onClick: { action: 'add_item_and_set_flag', payload: { itemId: 'key_piece_2', flag: 'key_piece_2_taken' } } }, 'knife_1_pickup': { onClick: { action: 'add_item_and_set_flag', payload: { itemId: 'knife_1', flag: 'knife_1_taken' } } }, 'book_1_pickup': { onClick: { action: 'add_item_and_set_flag', payload: { itemId: 'book_1', flag: 'book_1_taken' } } }, 'candle_1_pickup': { onClick: { action: 'add_item_and_set_flag', payload: { itemId: 'candle_1', flag: 'candle_1_taken' } } }, 'gem_red_pickup': { onClick: { action: 'add_item_and_set_flag', payload: { itemId: 'gem_red', flag: 'gem_red_taken' } } }, 'hammer_pickup': { onClick: { action: 'add_item_and_set_flag', payload: { itemId: 'hammer_1', flag: 'hammer_taken' } } }, 'final_scene_portal': { onClick: { action: 'navigate', payload: 'final' } }, 'secret_location': { onClick: { action: 'set_flag_and_dialogue', payload: { flagToSet: 'map_secret_found', successMessage: 'Você nota uma anotação sutil que não estava lá antes...' } } }, 'can_wall_puzzle': { onClick: { action: 'open_terminal', payload: 'wall_can_puzzle' } },
};
const DEBUG_MODE = true; 
const libraryRooms = ['library', 'map', 'skeleton'];
const pcRooms = ['pc_main', 'pc_mapscreen', 'pc_gemuncloker'];

function App() {
  // ESTADOS
  const [gameState, setGameState] = useState('intro_animation');
  const [inventoryItems, setInventoryItems] = useState([]);
  const [gameFlags, setGameFlags] = useState({ map_secret_found: false, map_location_revealed: false,chandelier_unlocked: false, library_door_unlocked: false, key_piece_1_taken: false, key_piece_2_taken: false, knife_1_taken: false, book_1_taken: false, candle_1_taken: false, map_gem_blue_placed: false, map_gem_red_placed: false, gem_red_taken: false, hammer_taken: false, dino_hand_taken: false, library_secret_door_unlocked: false, dino_hand_placed: false, skull_taken: false, skull_placed_on_scanner: false, gem_unlocker_puzzle_solved: false, blue_gem_spawned: false, blue_gem_taken: false, final_portal_unlocked: false });
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [dialogue, setDialogue] = useState({ isOpen: false, text: '' });
  const [currentView, setCurrentView] = useState('main_room');
  const [activeId, setActiveId] = useState(null);
  const [successFlashes, setSuccessFlashes] = useState({});
  const [terminalState, setTerminalState] = useState({ isOpen: false, puzzleId: null });
  const [inventoryPosition, setInventoryPosition] = useState({ x: 0, y: 0, isInitial: true });
  const [videoState, setVideoState] = useState({ isPlaying: false, src: null });
  const [isCombineMode, setIsCombineMode] = useState(false);
  const [itemToCombine, setItemToCombine] = useState(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, itemId: null });
  const [actionPrompt, setActionPrompt] = useState({ isOpen: false, puzzleId: null, title: '', buttonText: '' });
  const [inspectState, setInspectState] = useState({ isOpen: false, itemId: null });
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  // FUNÇÕES E LÓGICA
  const handleIntroAnimationComplete = () => setGameState('intro_login');
  const handleIntroLoginSuccess = () => { setTimeout(() => { setGameState('playing'); }, 1500); };
  const openInventory = () => { setInventoryPosition({ x: 0, y: 0, isInitial: true }); setIsInventoryOpen(true); };
  const closeContextMenu = () => setContextMenu({ visible: false, x: 0, y: 0, itemId: null });
  const handleShowContextMenu = (x, y, itemId) => setContextMenu({ visible: true, x, y, itemId });
  const handleActivateCombineMode = () => { setIsCombineMode(true); setItemToCombine(contextMenu.itemId); closeContextMenu(); showDialogue(`Combinar com: ${ITEMS_DB[contextMenu.itemId].name}.`); };
  const handleActivateInspectMode = () => { openInspectWindow(contextMenu.itemId); closeContextMenu(); };
  const openInspectWindow = (itemId) => setInspectState({ isOpen: true, itemId: itemId });
  const closeInspectWindow = () => setInspectState({ isOpen: false, itemId: null });
  const handleItemCombination = (draggedId, droppedOnId) => { const recipe = itemCombinations[draggedId]?.[droppedOnId] || itemCombinations[droppedOnId]?.[droppedOnId]; if (recipe) { if (recipe.consumes) { setInventoryItems(prev => prev.filter(id => id !== draggedId && id !== droppedOnId)); } addItemToInventory(recipe.creates); showDialogue(`Você criou: ${ITEMS_DB[recipe.creates].name}!`); } else { showDialogue("Esses itens não podem ser combinados."); } setIsCombineMode(false); setItemToCombine(null); };
  const openTerminal = (puzzleId) => setTerminalState({ isOpen: true, puzzleId });
  const closeTerminal = () => setTerminalState({ isOpen: false, puzzleId: null });
  const handlePasswordSuccess = (puzzleId) => { if (puzzleId === 'initial_login') { handleIntroLoginSuccess(); return; } setFlag(`${puzzleId}_solved`, true); const puzzle = PUZZLES_DB[puzzleId]; if (puzzle.successButtonText) { setActionPrompt({ isOpen: true, puzzleId: puzzleId, title: 'Acesso Remoto', buttonText: puzzle.successButtonText }); } if (puzzleId === 'wall_can_puzzle') { if (inventoryItems.includes('candle_1')) { transformItem('candle_1', 'candle_revealed_1'); showDialogue('A vela esquenta em sua mão e uma linguagem antiga é revelada!'); } else { showDialogue('Uma energia estranha emana do painel, mas nada acontece.'); } } };
  const handleActionPromptExecute = (puzzleId) => { if (puzzleId === 'gem_unlocker_puzzle') { playVideo(unlockAnimation); } if (puzzleId === 'main_pc_puzzle') { setFlag('final_portal_unlocked', true); showDialogue('Protocolo final iniciado. Acesso a uma nova área foi liberado.'); } if (puzzleId === 'map_screen_puzzle') { setFlag('map_location_revealed', true); showDialogue('Coordenadas recebidas. Um novo local foi marcado no mapa.'); } setActionPrompt({ isOpen: false, puzzleId: null, title: '', buttonText: '' }); };
  const playVideo = (src) => setVideoState({ isPlaying: true, src });
  const stopVideo = () => { setVideoState({ isPlaying: false, src: null }); setFlag('blue_gem_spawned', true); showDialogue('A máquina estala e uma gema azul aparece!'); };
  const setFlag = (flagName, value) => setGameFlags(prev => ({ ...prev, [flagName]: value }));
  const flashSuccessOnZone = (zoneId) => { setSuccessFlashes(prev => ({ ...prev, [zoneId]: true })); setTimeout(() => { setSuccessFlashes(prev => ({ ...prev, [zoneId]: false })); }, 1000); };
  const navigateNextRoom = () => { const idx = libraryRooms.indexOf(currentView); setCurrentView(libraryRooms[(idx + 1) % libraryRooms.length]); };
  const navigatePreviousRoom = () => { const idx = libraryRooms.indexOf(currentView); setCurrentView(libraryRooms[(idx - 1 + libraryRooms.length) % libraryRooms.length]); };
  const navigateNextPCRoom = () => { const idx = pcRooms.indexOf(currentView); setCurrentView(pcRooms[(idx + 1) % pcRooms.length]); };
  const navigatePrevPCRoom = () => { const idx = pcRooms.indexOf(currentView); setCurrentView(pcRooms[(idx - 1 + pcRooms.length) % pcRooms.length]); };
  const handleNavigation = (viewName) => setCurrentView(viewName);
  const showDialogue = (text) => setDialogue({ isOpen: true, text });
  const closeDialogue = () => setDialogue({ isOpen: false, text: '' });
  const addItemToInventory = (itemId) => { if (!inventoryItems.includes(itemId) && ITEMS_DB[itemId]) { setInventoryItems(prevItems => [...prevItems, itemId]); } };
  const consumeItem = (itemId) => setInventoryItems(prev => prev.filter(id => id !== itemId));
  const openLetter = () => setIsLetterOpen(true);
  const closeLetter = () => setIsLetterOpen(false);
  const transformItem = (oldItemId, newItemId) => { setInventoryItems(prevItems => { const index = prevItems.indexOf(oldItemId); if (index === -1) return prevItems; const newInventory = [...prevItems]; newInventory[index] = newItemId; return newInventory; }); };

  function executeAction(rule, zoneId) {
    if (!rule) return;
    switch (rule.action) {
      case 'navigate': handleNavigation(rule.payload); break;
      case 'dialogue': showDialogue(rule.payload); break;
      case 'open_terminal': openTerminal(rule.payload); break;
      case 'unlock_and_navigate': flashSuccessOnZone(zoneId); setFlag(rule.payload.flagToSet, true); consumeItem(rule.payload.itemIdToConsume); handleNavigation(rule.payload.viewName); break;
      case 'add_item_and_set_flag': addItemToInventory(rule.payload.itemId); setFlag(rule.payload.flag, true); showDialogue(`Você pegou: ${ITEMS_DB[rule.payload.itemId].name}`); break;
      case 'unlock_door': flashSuccessOnZone(zoneId); setFlag(rule.payload.flagToSet, true); consumeItem(rule.payload.itemIdToConsume); showDialogue(rule.payload.successMessage); break;
      case 'get_item_with_tool': if (gameFlags[rule.payload.flagToCheck]) { showDialogue(rule.payload.failMessage); } else { flashSuccessOnZone(zoneId); setFlag(rule.payload.flagToSet, true); addItemToInventory(rule.payload.itemToAdd); showDialogue(rule.payload.successMessage); } break;
      case 'solve_puzzle': flashSuccessOnZone(zoneId); setFlag(rule.payload.flagToSet, true); if (rule.payload.flagToSet2) { setFlag(rule.payload.flagToSet2, true); } consumeItem(rule.payload.itemIdToConsume); showDialogue(rule.payload.successMessage); break;
      case 'place_gem': flashSuccessOnZone(zoneId); setFlag(rule.payload.flagToSet, true); consumeItem(rule.payload.itemIdToConsume); showDialogue("Você encaixou a gema. *click*"); break;
      case 'place_puzzle_item': flashSuccessOnZone(zoneId); setFlag(rule.payload.flagToSet, true); consumeItem(rule.payload.itemIdToConsume); showDialogue(rule.payload.successMessage); break;
      case 'set_flag_and_dialogue': setFlag(rule.payload.flagToSet, true); showDialogue(rule.payload.successMessage); break;
      default: console.log(`Ação desconhecida: ${rule.action}`);
    }
  }

  function handleObjectClick(zoneId) { let rule = gameInteractions[zoneId]?.onClick; if (typeof rule === 'function') { rule = rule(gameFlags); } executeAction(rule, zoneId); }
  function handleDragStart(event) { setActiveId(event.active.id); if (!isCombineMode && isInventoryOpen) { setIsInventoryOpen(false); } }
  function handleDragMove(event) { if (event.active.id === 'draggable_inventory_window') { setInventoryPosition(pos => ({ x: pos.x + event.delta.x, y: pos.y + event.delta.y, isInitial: false })); } }
  function handleDragEnd(event) {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id || active.id === 'draggable_inventory_window') return;
    const draggedId = active.id; const droppedOnId = over.id;
    if (isCombineMode) { if (inventoryItems.includes(draggedId) && inventoryItems.includes(droppedOnId)) { handleItemCombination(draggedId, droppedOnId); } else { setIsCombineMode(false); setItemToCombine(null); } return; }
    if (gameInteractions[droppedOnId]) { const dropRules = gameInteractions[droppedOnId]?.onDrop; const rule = dropRules?.[draggedId] || dropRules?.default; executeAction(rule, droppedOnId); }
  }
  
  useEffect(() => { if (contextMenu.visible) { window.addEventListener('click', closeContextMenu); } return () => { window.removeEventListener('click', closeContextMenu); }; }, [contextMenu.visible]);
  useEffect(() => {
    const handleKeyDown = (event) => { if (event.key === 'Escape') { if(isLetterOpen) closeLetter(); else if (inspectState.isOpen) closeInspectWindow(); else if (actionPrompt.isOpen) setActionPrompt({ isOpen: false }); else if (videoState.isPlaying) { /* Não faz nada */ } else if (terminalState.isOpen) closeTerminal(); else if (dialogue.isOpen) closeDialogue(); else if (isInventoryOpen) setIsInventoryOpen(false); } };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isInventoryOpen, dialogue.isOpen, terminalState.isOpen, videoState.isPlaying, actionPrompt.isOpen, inspectState.isOpen, isLetterOpen]);

  const renderCurrentView = () => {
    const sceneProps = { onNavigate: handleNavigation, onObjectClick: handleObjectClick, debug: DEBUG_MODE, successFlashes, gameFlags };
    if (libraryRooms.includes(currentView)) { const SceneComponent = { library: Library, map: Map, skeleton: Skeleton }[currentView]; return <SceneComponent {...sceneProps} onNavigateNext={navigateNextRoom} onNavigatePrev={navigatePreviousRoom} />; }
    if (pcRooms.includes(currentView)) { const SceneComponent = { pc_main: PC_main, pc_mapscreen: PC_mapscreen, pc_gemuncloker: PC_gemuncloker }[currentView]; return <SceneComponent {...sceneProps} onNavigateNext={navigateNextPCRoom} onNavigatePrev={navigatePrevPCRoom} />; }
    switch (currentView) {
      case 'table_view': return <TableView {...sceneProps} />;
      case 'chandelier_puzzle_scene': return <ChandelierPuzzleScene {...sceneProps} />;
      case 'mainroom_fireplace': return <MainRoomFireplace {...sceneProps} />;
      case 'library-drawer-hammer': return <LibraryDrawerHammer {...sceneProps} />;
      case 'hidden-red-gem': return <HiddenRedGem {...sceneProps} />;
      case 'final': return <Final onOpenLetter={openLetter} />;
      case 'main_room':
      default: return <MainRoom {...sceneProps} />;
    }
  };

  const renderGameContent = () => {
    switch (gameState) {
      case 'intro_animation': return <IntroAnimation onAnimationComplete={handleIntroAnimationComplete} />;
      case 'intro_login': return <TerminalWindow puzzleId="initial_login" onClose={() => {}} onPasswordSuccess={handlePasswordSuccess} gameFlags={gameFlags} />;
      case 'playing':
      default:
        return (
          <>
            {renderCurrentView()}
            <button className="inventory-button" onClick={openInventory} aria-label="Abrir Inventário"><img src={inventoryButtonIcon} alt="Inventário" className="inventory-button-image" /></button>
            {isInventoryOpen && <Inventory onClose={() => setIsInventoryOpen(false)} items={inventoryItems} onItemContextMenu={handleShowContextMenu} position={inventoryPosition} />}
            {dialogue.isOpen && <DialogueBox text={dialogue.text} onClose={closeDialogue} />}
            {terminalState.isOpen && <TerminalWindow puzzleId={terminalState.puzzleId} onClose={closeTerminal} onPasswordSuccess={handlePasswordSuccess} onSuccessAction={handleActionPromptExecute} gameFlags={gameFlags} />}
            {videoState.isPlaying && <VideoPlayer src={videoState.src} onEnded={stopVideo} />}
            {actionPrompt.isOpen && <ActionPrompt title={actionPrompt.title} buttonText={actionPrompt.buttonText} onExecute={() => handleActionPromptExecute(actionPrompt.puzzleId)} />}
            {inspectState.isOpen && <InspectWindow itemId={inspectState.itemId} onClose={closeInspectWindow} />}
            {isLetterOpen && <LetterWindow title="Para Amanda Outuki" text={`
             Querida Pitchubaby,

            Meu amor, você é o meu maior tesouro. Obrigado por esses dias maravilhosos. Tive a ideia de criar o puzzle depois de dançar com você na quadrilha. Eu estava tão feliz naquele momento, é tão gostoso compartilhar os momentos com você. Estou escrevendo agora enquanto você está com os olhinhos fechados na clínica. Foi um desafio criar todos os códigos e prompts de imagens sem você notar (estou assumindo que você não notou, porque sabemos como você é fiscalzinha e sheroquinha). Fiquei duas noites codando até às 3 am, foram cruciais para terminar a tempo. Mas chegava uma hora em que eu me sentia culpado por não estar aproveitando sua companhia, nem que fosse só te segurar no escuro. Sentir você pertinho, sentir o seu cheirinho, é a definição de conforto para mim. Você é o conforto da minha vida. Eu amo segurar sua mão quentinha, eu amo seus olhinhos, e amo acima de tudo o seu jeitinho. Seu jeitinho é o que me conquista todos os dias. Quando olho para você eu não vejo apenas a mulher linda que você é, eu vejo algo mais, vejo um futuro, vejo um porto seguro. É um sentimento que nunca senti antes e toda vez que te vejo esse feeling apenas cresce. Eu me sinto bobo e me sinto culpado de algumas coisas, de ficar reclamando de ter que participar dos eventos, por exemplo. Dançar a quadrilha com você foi uma das melhores noites que eu tive. Você é a melhor namorada do mundo. E você estava tão linda no aniversário da Monica, eu me senti tão privilegiado de ser seu par naquela noite. Eu quero ser a melhor versão possível, quero ser o melhor que você merece. Quero merecer estar ao seu lado. Você me torna uma pessoa melhor e eu te amo muito. Sempre irei te amar, uma lei imutável como a gravidade. Espero que você tenha gostado do novo puzzle, me dê seu feedback. Minha paixão e meu amor por você só crescem, os puzzles não acabaram, eles apenas começaram. O que será que vem pela frente?

              Com todo o meu amor,
              Pitchuquinho banho banho.
.`} onClose={closeLetter} />}
          </>
        );
    }
  };

  // RENDERIZAÇÃO
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragMove={handleDragMove}>
      <div className="window-frame">
        <div className="title-bar"><div className="title-text">A.A.F.F</div><div className="title-bar-buttons"><button className="window-button close">X</button></div></div>
        <div className="game-container">
          {renderGameContent()}
        </div>
      </div>
      <DragOverlay>{activeId && ITEMS_DB[activeId] ? (<div className="drag-overlay-item"><img src={ITEMS_DB[activeId].image} alt={ITEMS_DB[activeId].name} /></div>) : null}</DragOverlay>
      {contextMenu.visible && <ContextMenu x={contextMenu.x} y={contextMenu.y} onCombineClick={handleActivateCombineMode} onInspectClick={handleActivateInspectMode} />}
    </DndContext>
  );
}

export default App;