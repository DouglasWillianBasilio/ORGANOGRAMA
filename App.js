import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [colaboradores, setColaboradores] = useState([]); // Inicialize como um array vazio
  const [subordinadosVisiveis, setSubordinadosVisiveis] = useState({});
  const [selectedColaborador, setSelectedColaborador] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Carrega os dados do JSON ao montar o componente
  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setColaboradores(data); // Certifique-se de que é um array
        } else {
          console.error("Os dados carregados não são um array");
        }
      })
      .catch((error) => console.error('Erro ao carregar os dados', error));
  }, []);

  const handleColaboradorClick = (colaborador) => {
    setSelectedColaborador(colaborador);
    setIsExpanded(true); // Expande o painel

    // Mostrar os subordinados quando clicar no colaborador
    setSubordinadosVisiveis((prev) => ({
      ...prev,
      [colaborador.id]: !prev[colaborador.id],
    }));
  };

  const handleClose = () => {
    setIsExpanded(false); // Fecha o painel
    setSelectedColaborador(null);
  };

  const renderColaboradores = (ids) => {
    if (!Array.isArray(colaboradores)) return null; // Evitar erros se colaboradores não for um array

    return colaboradores
      .filter((colaborador) => ids.includes(colaborador.id)) // Filtrar pelos IDs passados
      .map((colaborador) => (
        <li key={colaborador.id}>
          <button
            className="colaborador-button"
            onClick={() => handleColaboradorClick(colaborador)}
          >
            {colaborador.nome} - {colaborador.cargo}
          </button>

          {/* Mostrar subordinados */}
          {subordinadosVisiveis[colaborador.id] &&
            colaborador.subordinados &&
            renderColaboradores(colaborador.subordinados)}
        </li>
      ));
  };

  return (
    <div className="App">
      <h1>Organograma</h1>
      <ul>{renderColaboradores([1]) /* Começa com o colaborador de nível mais alto */}</ul>

      {/* Painel de detalhes */}
      <div className={`colaborador-detalhes ${isExpanded ? 'expanded' : ''}`}>
        {selectedColaborador && (
          <div>
            <button className="close-button" onClick={handleClose}>
              X
            </button>
            <h2>{selectedColaborador.nome}</h2>
            <p>
              <strong>Cargo:</strong> {selectedColaborador.cargo}
            </p>
            <p>
              <strong>Descrição:</strong> {selectedColaborador.descricao}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
