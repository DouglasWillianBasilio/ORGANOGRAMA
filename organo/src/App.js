import React, { useState, useEffect } from 'react';
import './App.css';
import Node from './components/Node';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cargoFilter, setCargoFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // Estado para o tema

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((item) => {
        const matchesSearch =
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.cargo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCargo = cargoFilter ? item.cargo === cargoFilter : true;
        return matchesSearch && matchesCargo;
      })
    );
  }, [searchTerm, cargoFilter, data]);

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}> {/* Classe para tema */}
      <h1>Organograma - Agiliza Itaú</h1>
      {/* <img src="/logo-itau.png" alt="Itaú Logo" style={{ display: 'block', margin: '0 auto 20px' }} /> */}
      
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
          <option value="Analista">Desenvolvedor</option>
          {/* Adicione outros cargos conforme necessário */}
        </select>
        <button className="search-button">Pesquisar</button>
      </div>
      <div>
        {filteredData.map((item) => (
          <Node
            key={item.name}
            name={item.name}
            cargo={item.cargo}
            descricao={item.descricao}
            subordinados={item.subordinados}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
