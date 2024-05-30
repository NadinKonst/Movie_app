const api_url_trending =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1";

getTrending(api_url_trending);

async function getTrending(url) {
  try {
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "475b780a-eb7a-4f03-ab2c-288319493865",
      },
    });
    if (!resp.ok) {
      throw new Error("Failed to fetch data");
    }
    const respData = await resp.json();
    createTrending(respData);
  } catch (error) {
    document.querySelector(".error").textContent =
      error + ".😞Please try later.";
  }
}

function createTrending(data) {
  const trendingMoviesContainer = document.querySelector(
    ".trendingMoviesContainer"
  );

  data.items.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movieCardNew");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movieCoverNew");
    movieImg.src = movie.posterUrlPreview;
    movieImg.alt = movie.title;

    const infoElement = document.createElement("div");
    infoElement.classList.add("movieInfoNew");
    infoElement.innerHTML = `  <p class = "year">${movie.year}</p>
    <p class = "category">${movie.type}</p>
    <p class = "rating">${movie.ratingKinopoisk}</p>
    <p class = "title">${
      movie.nameOriginal ? movie.nameOriginal : movie.nameRu
    }</p>`;

    const playButton = document.createElement("button");
    playButton.classList.add("playButton");
    playButton.textContent = "More info";

    movieCard.addEventListener("mouseenter", () => {
      playButton.style.display = "block";
    });

    movieCard.addEventListener("mouseleave", () => {
      playButton.style.display = "none";
    });

    movieCard.appendChild(movieImg);
    movieCard.appendChild(infoElement);
    trendingMoviesContainer.appendChild(movieCard);

    movieCard.appendChild(playButton);
    playButton.addEventListener("click", () =>
      openModalTrending(movie.kinopoiskId)
    );
  });
}

const modalEl = document.querySelector(".modal");

async function openModalTrending(kinopoiskId) {
  try {
    const resp = await fetch(
      "https://kinopoiskapiunofficial.tech/api/v2.2/films/" + kinopoiskId,
      {
        headers: {
          "X-API-KEY": "475b780a-eb7a-4f03-ab2c-288319493865",
          "Content-Type": "application/json",
        },
      }
    );

    if (!resp.ok) {
      throw new Error("Failed to fetch data");
    }

    const respData = await resp.json();

    modalEl.classList.add("modal--show");
    document.body.classList.add("stop-scrolling");

    modalEl.innerHTML = `
  <div class = "modal__card">
  <img class="modal__movie-img" src="${respData.posterUrl}"  alt="${
      respData.nameOriginal ? respData.nameOriginal : respData.nameRu
    }">
  <h2 class="modal__movie-title">
  ${respData.nameOriginal ? respData.nameOriginal : respData.nameRu} (${
      respData.year ? respData.year : ""
    })
  </h2>
  <div class="modal__movie-info">
  ${
    respData.filmLength
      ? `<p class="modal__movie-runtime">Продолжительность: ${respData.filmLength} мин.</p>`
      : ""
  }
  <p class="modal__movie-genre">Жанр - ${respData.genres
    .map((el) => el.genre)
    .join(", ")}</p>
  <p class="modal__movie-site">Трейлер можно посмотреть <a class="modal-site-link" href="${
    respData.webUrl
  }/video" target="_blank">здесь</a></p>
  <p class="modal__movie-overview">${respData.description}</p>
  </div>
  <button type="button" class="modal__button-close">✕</button>
  </div>`;

    const btnClose = document.querySelector(".modal__button-close");
    btnClose.addEventListener("click", () => closeModalTrending());
  } catch (error) {
    document.querySelector(".error").textContent =
      error + ".😞Please try later.";
  }
}

function closeModalTrending() {
  modalEl.classList.remove("modal--show");
  document.body.classList.remove("stop-scrolling");
}

window.addEventListener("click", (evt) => {
  if (evt.target === modalEl) {
    closeModalTrending();
  }
});

window.addEventListener("keydown", (evt) => {
  if (evt.keyCode === 27) {
    closeModalTrending();
  }
});

const container = document.querySelector(".trendingMoviesContainer");
const isDown = false;
let startX;
let scrollLeft;

container.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

container.addEventListener("mouseleave", () => {
  isDown = false;
});

container.addEventListener("mouseup", () => {
  isDown = false;
});

container.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 2;
  container.scrollLeft = scrollLeft - walk;
});
