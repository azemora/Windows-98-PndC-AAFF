import React from 'react';
import './BackButton.css';
import returnIcon from '../../assets/return.png'; // Importa o ícone

// Este componente recebe apenas a função que deve ser executada ao clicar
function BackButton({ onClick }) {
  return (
    <button className="std-back-button" onClick={onClick} title="Voltar">
      <img src={returnIcon} alt="Voltar" />
    </button>
  );
}

export default BackButton;