import React, { useState, useEffect } from 'react';
import './App.css';
import Node from './components/Node';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cargoFilter, setCargoFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // Função recursiva para buscar todos os colaboradores que atendem aos critérios de pesquisa, independentemente da hierarquia
  const searchAllLevels = (nodes) => {
    let results = [];

    nodes.forEach((node) => {
      const matchesSearch =
        node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.cargo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCargo = cargoFilter ? node.cargo === cargoFilter : true;

      // Se o nó atende aos critérios, adiciona ao resultado
      if (matchesSearch && matchesCargo) {
        results.push(node);
      }

      // Executa a busca nos subordinados do nó
      if (node.subordinados && node.subordinados.length > 0) {
        results = results.concat(searchAllLevels(node.subordinados));
      }
    });

    return results;
  };

  useEffect(() => {
    if (searchTerm || cargoFilter) {
      setFilteredData(searchAllLevels(data));
    } else {
      setFilteredData(data);
    }
  }, [searchTerm, cargoFilter, data]);

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <h1>Organograma - Agiliza Itaú</h1>

      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Modo Claro' : 'Modo Escuro'}
      </button>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Pesquisar por colaborador ou cargo"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={cargoFilter} onChange={(e) => setCargoFilter(e.target.value)}>
          <option value="">Todos os cargos</option>
          <option value="Gerente">Gerente</option>
          <option value="Analista">Analista</option>
          <option value="Desenvolvedor">Desenvolvedor</option>
        </select>
        <button className="search-button">Pesquisar</button>
      </div>

      <div>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Node
              key={item.name}
              name={item.name}
              cargo={item.cargo}
              descricao={item.descricao}
              subordinados={item.subordinados}
            />
          ))
        ) : (
          <p>Nenhum colaborador encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default App;
