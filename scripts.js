const filmes = ['AsMarvels.json']; // Adicione mais filmes conforme necessário
const series = ['Brabo.json']; 
const animes = []; 

let currentEpisodeIndex = 0;


async function exibirCatalogo() {
  const filmeCatalogContainer = document.getElementById('filmeCatalogContainer');
  const serieCatalogContainer = document.getElementById('serieCatalogContainer');
  const animeCatalogContainer = document.getElementById('animeCatalogContainer');

  try {

    for (const fileName of filmes) {
      const response = await fetch(`dados/${fileName}`);
      const filme = await response.json();
      criarCard(filme, filmeCatalogContainer);
    }
    filmeCatalogContainer.classList.add('scrollable');


    for (const fileName of series) {
      const response = await fetch(`dados/${fileName}`);
      const serie = await response.json();
      criarCard(serie, serieCatalogContainer);
    }
    serieCatalogContainer.classList.add('scrollable');


    for (const fileName of animes) {
      const response = await fetch(`dados/${fileName}`);
      const anime = await response.json();
      criarCard(anime, animeCatalogContainer);
    }
    animeCatalogContainer.classList.add('scrollable');
  } catch (error) {
    console.error('Erro ao buscar os filmes, séries e animes:', error);
  }
}


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

function exibirPlayer(item) {
  const videoPlayerContainer = document.getElementById('videoPlayerContainer');
  const videoPlayer = document.getElementById('videoPlayer');
  const episodeTitle = document.getElementById('episodeTitle');
  const episodeNumber = document.getElementById('episodeNumber');
  const previousBtn = document.getElementById('previousBtn');
  const nextBtn = document.getElementById('nextBtn');
  const closeBtn = document.getElementById('closeBtn');

  let currentEpisodeIndex = 0;

  function loadEpisode(index) {
    currentEpisodeIndex = index;
    episodeNumber.textContent = `Episódio ${currentEpisodeIndex + 1}`;
    episodeTitle.textContent = item.episodios[currentEpisodeIndex].titulodoepisodio;
    videoPlayer.src = item.episodios[currentEpisodeIndex].link;
    videoPlayer.play();
  }

  loadEpisode(currentEpisodeIndex);

  videoPlayerContainer.style.display = 'flex';

  closeBtn.addEventListener('click', () => {
    videoPlayer.pause();
    videoPlayer.src = '';
    videoPlayerContainer.style.display = 'none';
  });

  previousBtn.addEventListener('click', () => {
    currentEpisodeIndex = Math.max(0, currentEpisodeIndex - 1);
    loadEpisode(currentEpisodeIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentEpisodeIndex = Math.min(item.episodios.length - 1, currentEpisodeIndex + 1);
    loadEpisode(currentEpisodeIndex);
  });

//  videoPlayer.addEventListener('ended', () => {
//    // Verifica se há um próximo episódio
//    if (currentEpisodeIndex < item.episodios.length - 1) {
//      currentEpisodeIndex++;
//      loadEpisode(currentEpisodeIndex);
//    } else {
//      // Caso contrário, pausa o player
//      videoPlayer.pause();
//    }
//  });
}


document.addEventListener('DOMContentLoaded', exibirCatalogo);
