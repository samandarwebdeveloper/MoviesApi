// DOM elements 
const elLoader = $_(".js-loader");
const elFilmsList = $_(".js-films-list");
const elPrev = $_(".js-prev");
const elNext = $_(".js-next");

let page = 1;

function myFunction() {
    var person = prompt("Please, enter movie name", "Harry Potter");
    if (person != null) {
        const movieName = person;

        // GET API
        function getData(page) {
            fetch(`http://www.omdbapi.com/?apikey=9fcd4d84&s=${movieName}&page=${page}`)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
          
                elLoader.style.display = "none";
                working(data.Search);
              });
          
            function working(array) {
              array.forEach((element) => {
                renderFilms(element);
              });
            }
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
  
  
  
  // Prev and Next buttons
  elPrev.addEventListener("click", prevPage);
  function prevPage() {
    if (page > 1) {
      elFilmsList.innerHTML = "";
      page = page - 1;
      getData(page);
    } 
    
  }
  
  elNext.addEventListener("click", nextPage);
  function nextPage() {
    elFilmsList.innerHTML = "";
    page = page + 1;
    getData(page);
  }
  
  getData(page);
  
  }
  
myFunction();
  
 
  