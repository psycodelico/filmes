let currentEpisodeIndex = 0;

// Array contendo os nomes dos arquivos JSON dos filmes
const filmes = ['Loki1.json', 'AsMarvels.json', 'GenV.json', 'BesouroAzul.json', 'Oppenheimer.json', 'napoleao.json', 'LastOfUs.json', 'CavaleiroDaLua.json']; // Adicione mais filmes conforme necessário

// Função para exibir todos os filmes disponíveis
async function exibirCatalogo() {
  const catalogContainer = document.getElementById('catalogContainer');

  try {
    // Iterar sobre cada arquivo na lista
    for (const fileName of filmes) {
      // Buscar o arquivo JSON
      const response = await fetch(`dados/${fileName}`);
      const filme = await response.json();

      // Criar o card do filme
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');

      const movieImage = document.createElement('img');
      movieImage.classList.add('movie-image');
      movieImage.src = filme.imagem;
      movieImage.alt = filme.titulo;

      const movieTitle = document.createElement('h2');
      movieTitle.classList.add('movie-title');
      movieTitle.textContent = filme.titulo;

      const movieDescription = document.createElement('p');
      movieDescription.classList.add('movie-description');
      movieDescription.textContent = filme.episodios[0].titulodoepisodio;

      movieCard.appendChild(movieImage);
      movieCard.appendChild(movieTitle);
      movieCard.appendChild(movieDescription);

      movieCard.addEventListener('click', () => {
        exibirPlayer(filme);
      });

      catalogContainer.appendChild(movieCard);
    }
  } catch (error) {
    console.error('Erro ao buscar os filmes:', error);
  }
}

// Função para exibir o player de vídeo
function exibirPlayer(filme) {
  const videoPlayerContainer = document.getElementById('videoPlayerContainer');
  const videoPlayer = document.getElementById('videoPlayer');
  const episodeTitle = document.getElementById('episodeTitle');
  const episodeNumber = document.getElementById('episodeNumber');
  const previousBtn = document.getElementById('previousBtn');
  const nextBtn = document.getElementById('nextBtn');
  const closeBtn = document.getElementById('closeBtn');

  currentEpisodeIndex = 0;

  episodeNumber.textContent = `Episódio ${currentEpisodeIndex + 1}`;
  episodeTitle.textContent = filme.episodios[currentEpisodeIndex].titulodoepisodio;
  videoPlayer.src = filme.episodios[currentEpisodeIndex].link;

  videoPlayerContainer.style.display = 'flex';

  closeBtn.addEventListener('click', () => {
    videoPlayer.pause();
    videoPlayer.src = '';
    videoPlayerContainer.style.display = 'none';
  });

  previousBtn.addEventListener('click', () => {
    currentEpisodeIndex = Math.max(0, currentEpisodeIndex - 1);
    episodeNumber.textContent = `Episódio ${currentEpisodeIndex + 1}`;
    episodeTitle.textContent = filme.episodios[currentEpisodeIndex].titulodoepisodio;
    videoPlayer.src = filme.episodios[currentEpisodeIndex].link;
  });

  nextBtn.addEventListener('click', () => {
    currentEpisodeIndex = Math.min(filme.episodios.length - 1, currentEpisodeIndex + 1);
    episodeNumber.textContent = `Episódio ${currentEpisodeIndex + 1}`;
    episodeTitle.textContent = filme.episodios[currentEpisodeIndex].titulodoepisodio;
    videoPlayer.src = filme.episodios[currentEpisodeIndex].link;
  });
}

// Chama a função para exibir o catálogo quando a página é carregada
document.addEventListener('DOMContentLoaded', exibirCatalogo);
