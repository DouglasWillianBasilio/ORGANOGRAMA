// Carregar o JSON
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    const organograma = document.getElementById('organograma');
    organograma.innerHTML = createHierarchy(data[0]);
    addEventListeners();
  });

// Função para criar a estrutura do organograma
function createHierarchy(node) {
  return `
    <div class="node" data-cargo="${node.cargo}">
      <div class="node-header">
        <h3>${node.nome}</h3>
        <button>${node.subordinados && node.subordinados.length ? '➕' : ''}</button>
      </div>
      <p>${node.cargo}</p>
      <p>${node.descricao}</p>
      ${node.subordinados && node.subordinados.length ? `<div class="subordinados">${node.subordinados.map(createHierarchy).join('')}</div>` : ''}
    </div>
  `;
}

// Função para adicionar eventos de clique para exibir/ocultar subordinados
function addEventListeners() {
  const nodes = document.querySelectorAll('.node');
  nodes.forEach(node => {
    const button = node.querySelector('button');
    if (button) {
      button.addEventListener('click', () => {
        const subordinados = node.querySelector('.subordinados');
        if (subordinados.style.display === 'block') {
          subordinados.style.display = 'none';
          button.textContent = '➕';
        } else {
          subordinados.style.display = 'block';
          subordinados.style.animation = 'slide-down 0.3s ease';
          button.textContent = '➖';
        }
      });
    }
  });
}
