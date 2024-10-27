// src/components/Node.js

import React, { useState } from 'react';
import './Node.css';

function Node({ name, cargo, descricao, subordinados }) {
  // Estado para controlar se o nó está expandido ou recolhido
  const [isExpanded, setIsExpanded] = useState(false);

  // Função para alternar o estado de expansão
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`node ${isExpanded ? 'node-expanded' : ''}`}>
      {/* Cabeçalho do nó com nome, cargo e botão de expansão */}
      <div className="node-header" onClick={toggleExpand}>
        <span>{name}</span> <span className="role">({cargo})</span>
        <span className="toggle-icon">{isExpanded ? '-' : '+'}</span>
      </div>
      
      {/* Detalhes do nó com transição suave para expandir/recolher */}
      <div className="node-details">
        {descricao}
      </div>
      
      {/* Renderização dos subordinados somente se o nó estiver expandido */}
      {isExpanded && (
        <div className="subordinates">
          {subordinados.map((sub, index) => (
            <div className="subordinate" key={index}>
              <Node
                name={sub.name}
                cargo={sub.cargo}
                descricao={sub.descricao}
                subordinados={sub.subordinados}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Node;
