// Array contendo os nomes dos arquivos JSON dos filmes e séries
const filmes = ['AsMarvels.json', 'BesouroAzul.json', 'Oppenheimer.json', 'napoleao.json', 'deadpool1.json','deadpool2.json']; // Adicione mais filmes conforme necessário
const series = ['Loki1.json', 'GenV.json', 'LastOfUs.json', 'CavaleiroDaLua.json',]; // Adicione mais séries conforme necessário

let currentEpisodeIndex = 0;

// Função para exibir todos os filmes e séries disponíveis
async function exibirCatalogo() {
  const filmeCatalogContainer = document.getElementById('filmeCatalogContainer');
  const serieCatalogContainer = document.getElementById('serieCatalogContainer');

  try {
    // Exibir filmes
    for (const fileName of filmes) {
      const response = await fetch(`dados/${fileName}`);
      const filme = await response.json();
      criarCard(filme, filmeCatalogContainer);
    }
    filmeCatalogContainer.classList.add('scrollable');

    // Exibir séries
    for (const fileName of series) {
      const response = await fetch(`dados/${fileName}`);
      const serie = await response.json();
      criarCard(serie, serieCatalogContainer);
    }
    serieCatalogContainer.classList.add('scrollable');
  } catch (error) {
    console.error('Erro ao buscar os filmes e séries:', error);
  }
}

// Função auxiliar para criar um card de filme ou série
function criarCard(item, container) {
  const card = document.createElement('div');
  card.classList.add('movie-card');

  const image = document.createElement('img');
  image.classList.add('movie-image');
  image.src = item.imagem;
  image.alt = item.titulo;

  const title = document.createElement('h2');
  title.classList.add('movie-title');
  title.textContent = item.titulo;

  const description = document.createElement('p');
  description.classList.add('movie-description');
  description.textContent = item.episodios[0].titulodoepisodio;

  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(description);

  card.addEventListener('click', () => {
    exibirPlayer(item);
  });

  container.appendChild(card);
}

// Função para exibir o player de vídeo
function exibirPlayer(item) {
  const videoPlayerContainer = document.getElementById('videoPlayerContainer');
  const videoPlayer = document.getElementById('videoPlayer');
  const episodeTitle = document.getElementById('episodeTitle');
  const episodeNumber = document.getElementById('episodeNumber');
  const previousBtn = document.getElementById('previousBtn');
  const nextBtn = document.getElementById('nextBtn');
  const closeBtn = document.getElementById('closeBtn');

  currentEpisodeIndex = 0;

  episodeNumber.textContent = `Episódio ${currentEpisodeIndex + 1}`;
  episodeTitle.textContent = item.episodios[currentEpisodeIndex].titulodoepisodio;
  videoPlayer.src = item.episodios[currentEpisodeIndex].link;

  videoPlayerContainer.style.display = 'flex';

  closeBtn.addEventListener('click', () => {
    videoPlayer.pause();
    videoPlayer.src = '';
    videoPlayerContainer.style.display = 'none';
  });

  previousBtn.addEventListener('click', () => {
    currentEpisodeIndex = Math.max(0, currentEpisodeIndex - 1);
    episodeNumber.textContent = `Episódio ${currentEpisodeIndex + 1}`;
    episodeTitle.textContent = item.episodios[currentEpisodeIndex].titulodoepisodio;
    videoPlayer.src = item.episodios[currentEpisodeIndex].link;
  });

  nextBtn.addEventListener('click', () => {
    currentEpisodeIndex = Math.min(item.episodios.length - 1, currentEpisodeIndex + 1);
    episodeNumber.textContent = `Episódio ${currentEpisodeIndex + 1}`;
    episodeTitle.textContent = item.episodios[currentEpisodeIndex].titulodoepisodio;
    videoPlayer.src = item.episodios[currentEpisodeIndex].link;
  });
}

// Chama a função para exibir o catálogo quando a página é carregada
document.addEventListener('DOMContentLoaded', exibirCatalogo);

// Adiciona evento de teclado para lidar com a navegação por teclado em elementos do catálogo
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('keydown', function(event) {
    const catalogContainers = document.querySelectorAll('.catalog-container');

    // Verifica se a tecla pressionada foi uma das setas
    if (event.key.startsWith('Arrow')) {
      // Itera sobre cada contêiner de catálogo
      catalogContainers.forEach(container => {
        // Verifica se o foco está dentro do contêiner
        if (container.contains(document.activeElement)) {
          const focusableElements = container.querySelectorAll('.movie-card');
          const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);

          // Calcula o próximo índice com base na direção da seta pressionada
          let nextIndex;
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % focusableElements.length;
          } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
          }

          // Move o foco para o próximo elemento navegável
          focusableElements[nextIndex].focus();
        }
      });
    }
  });
});
