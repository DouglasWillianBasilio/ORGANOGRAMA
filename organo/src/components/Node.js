import React, { useState } from 'react';
import './Node.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Node = ({ name, cargo, descricao, subordinados }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="node">
      <div className="node-header" onClick={handleToggle}>
        <span>
          <FontAwesomeIcon icon={faUser} /> {name}
        </span>
        <span className="role"> - {cargo}</span>
        <span className="toggle-icon">{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && (
        <div className="node-details">
          <p>{descricao}</p>
          {subordinados.length > 0 && (
            <div className="subordinates">
              {subordinados.map((subordinate, index) => (
                <div className="subordinate" key={index}>
                  <Node
                    name={subordinate.name}
                    cargo={subordinate.cargo}
                    descricao={subordinate.descricao}
                    subordinados={subordinate.subordinados}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Node;
