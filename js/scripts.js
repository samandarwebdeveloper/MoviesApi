// DOM elements 
const elLoader = $_(".js-loader");
const elFilmsList = $_(".js-films-list");
const elPrev = $_(".js-prev");
const elNext = $_(".js-next");
const elForm = $_(".js-form");
const elFormInput = $_(".js-form-input");
const elFormSubmitBtn = $_(".js-submit-btn");
const elAlert = $_(".alert");

let page = 1;

elPrev.style.display = "none";
elNext.style.display = "none";

// INPUT PROMPT
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  elFilmsList.innerHTML = "";
  let page = 1;

  elLoader.style.display = "flex";
  const inputValue = elFormInput.value.trim();
  if (inputValue == "") {
    elAlert.style.display = "block";
    
  }  else {
    elAlert.style.display = "none";

  }

  getData(page, inputValue);

});



// GET API
function getData(page, value) {
  fetch(`https://www.omdbapi.com/?apikey=9fcd4d84&s=${value}&page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (page <= 1) {
        elPrev.disabled = true;
      }
      if (page > 1) {
        elPrev.disabled = false;
      }
      if (page == Math.ceil(data.totalResults / 10)) {
        elNext.disabled = true;
      }
      if (page < Math.ceil(data.totalResults / 10)) {
        elNext.disabled = false;
      }
      if (Math.ceil(data.totalResults / 10) < 2) {
        elPrev.disabled = true;
        elNext.disabled = true;
      }

    setTimeout(() => {
      elLoader.style.display = "none";
    }, 500);
    
    
      elPrev.style.display = "block";
      elNext.style.display = "block";
    
      
      working(data.Search);
    });

  function working(array) {
    array.forEach((element) => {
      renderFilms(element);
    });
  }
}

// Created elements
function renderFilms(object) {
  const newLi = createElement("li", "movie-card");
  const newMovieImg = createElement("img", "movie-poster");
  const newCardBox = createElement("div", "card-content");
  const newMovieTitle = createElement("h5", "movie-title", object.Title);
  const newMovieYear = createElement("strong", "movie-year", object.Year);
  const newMovieType = createElement("p", "movie-type", object.Type)
  newMovieImg.src = object.Poster

  elFilmsList.appendChild(newLi);
  newLi.appendChild(newMovieImg);
  newCardBox.appendChild(newMovieTitle);
  newCardBox.appendChild(newMovieYear);
  newCardBox.appendChild(newMovieType);
  newLi.appendChild(newCardBox);
}

function nextPage() {
  page = page + 1;

  elPrev.disabled = false;
  elFilmsList.innerHTML = "";
  elLoader.style.display = "flex";
  const inputValue = elFormInput.value.trim();
  getData(page, inputValue);
}
elNext.addEventListener("click", nextPage);

function prevPage() {
  page = page - 1;

  elFilmsList.innerHTML = "";
  elLoader.style.display = "flex";
  const inputValue = elFormInput.value.trim();
  getData(page, inputValue);
}
elPrev.addEventListener("click", prevPage);






// // Prev and Next buttons
// elPrev.addEventListener("click", prevPage);

// function prevPage() {
//   if (page > 1) {
//     elFilmsList.innerHTML = "";
//     page = page - 1;
//     getData(page);
//   } else {
//     elPrev.style.background = "#8486868e";
//   }

// }

// elNext.addEventListener("click", nextPage);

// function nextPage() {
//   elFilmsList.innerHTML = "";
//   page = page + 1;
//   getData(page);
// }

// getData(page);


