
window.onload = function() {
  // TEngo que capturar el formulario, querySelector
  // al formulario le agrego un evento para que cuando se submita el form, envie los datos por ajax(fetch)

  var queryString = new URLSearchParams(window.location.search)

  var busco = queryString.get("buscador")

  var url = "https://api.themoviedb.org/3/search/movie?api_key=07be10560c3c4cf68794acc1da83356b&language=en-US&query=" + busco + "&page=1&include_adult=false"

  var imgURL='https://image.tmdb.org/t/p/original'

  fetch(url)
  .then(function(response){
    return response.json();
  })
  .then(function(responseJSON){
      let movie = responseJSON.results;
      let output = "";
      for(let i = 0; i < movie.length; i++){
          let id = responseJSON.results[i].id;
        id = JSON.stringify(id);
        let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
        if(favoriteMovies.indexOf(id) === -1){
          output += `
          <div class="card">
            <div class="overlay">
            <div class="addBtn">
              <span>
                <i class="material-icons watch" onclick="addToList('${movie[i].id}')">visibility</i>
              </span>

              <span>
                <i class="material-icons favorite" onclick="favorite('${movie[i].id}')">favorite</i>
              </span>
            </div>

            <div class="movie">
              <h2>${movie[i].title}</h2>
                <p id="p_rating">
                  <strong>Rating:</strong>
                    <span>${movie[i].vote_average} / 10 </span>
                </p>

                <p>
                  <strong>Release date:</strong>
                    <span>${movie[i].release_date} <i class="material-icons date">date_range</i> </span>
                </p>

                <a onclick="movieSelected('${movie[i].id}')" href="../detalle.html">Detalles</a>
            </div>
            </div>

            <div class="card_img">
              <img src="${imgURL}${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';" >
            </div>
          </div>
          `;
        } else {
          output += `
                    <div class="card">
                    <div class="overlay">
                    <div class="addBtn">
                      <span>
                        <i class="material-icons watch" onclick="addToList('${movie[i].id}')">visibility</i>
                      </span>

                      <span>
                        <i class="material-icons favoriteMarked" onclick="favorite('${movie[i].id}')">favorite</i></span></div>
                          <div class="movie">
                            <h2>${movie[i].title}</h2>
                              <p id="p_rating">
                                <strong>Rating:</strong>
                                  <span>${movie[i].vote_average} / 10 </span>
                              </p>
                              <p>
                                <strong>Release date:</strong>
                                  <span>${movie[i].release_date} <i class="material-icons date">date_range</i> </span>
                              </p>
                            <a onclick="movieSelected('${movie[i].id}')" href="../detalle.html'>Detalles</a>
                    </div>
                    </div>
                    <div class="card_img">
                        <img src="${imgURL}${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';" >
                    </div>
                </div>
        `;
        }
      }
      let moviesInfo = document.getElementById("movies");
      moviesInfo.innerHTML = output;
  })
  .catch(function(error){
    console.log("The error was: "+ error);
  })
}


// ********* STORING INTO LISTS *********
//Add movie to watch list.
function addToList(id){
    let storedId = JSON.parse(localStorage.getItem("movies")) || [];
	if(storedId.indexOf(id) === -1){
		storedId.push(id);
		localStorage.setItem("movies", JSON.stringify(storedId));
		//Notification that it will be added to Watchlist.
        const added = document.getElementById("added");
        added.innerHTML = "Added to watchlist !"
        added.classList.add("added");
        setTimeout(() => {
            added.classList.remove("added");
        }, 1500);
	} else {
		//Notification that it has already been added to the watchlist.
        const alreadyStored = document.getElementById("alreadyStored");
        alreadyStored.innerHTML = "Already in watchlist !"
        alreadyStored.classList.add("alreadyStored");
        setTimeout(() => {
            alreadyStored.classList.remove("alreadyStored");
        }, 1500);
	}
}

//Add movie to favorite movies.
function favorite(id){
    let storedId = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
	if(storedId.indexOf(id) === -1){
		storedId.push(id);
		localStorage.setItem("favoriteMovies", JSON.stringify(storedId));
		//Notification that it will be added to Watchlist.
        const added = document.getElementById("added");
        added.innerHTML = "Added to Favorites !";
        added.classList.add("added");
        setTimeout(() => {
            added.classList.remove("added");
        }, 1500);
	} else {
		//Notification that it has already been added to the watchlist.
		const alreadyStored = document.getElementById("alreadyStored");
        alreadyStored.innerHTML = "Already in favorites !";
        alreadyStored.classList.add("alreadyStored");
        setTimeout(() => {
            alreadyStored.classList.remove("alreadyStored");
        }, 1500);
	}
}

//Get the movie ID, set it to storageSession and then re-direct the user to movie details page.
function movieSelected(id){
    sessionStorage.setItem("movieId", id);
    window.open("../detalle.html");
    return false;
}


//Get the value from the form on submit and then run the functions.
const form = document.getElementById("form");

// Object.freeze makes the object read-only, defending it from "hacky" activities.
// Object containing the genres for the movies.
const genresObject = Object.freeze({
    "ACTION": 28,
    "ADVENTURE": 12,
    "ANIMATION": 16,
    "COMEDY": 35,
    "CRIME": 80,
    "DOCUMENTARY":99,
    "DRAMA": 18,
    "FAMILY": 10751,
    "FANTASY": 14,
    "HISTORY": 36,
    "HORROR": 27,
    "MUSIC": 10402,
    "MYSTERY":9648,
    "ROMANCE": 10749,
    "THRILLER": 53,
    "WAR": 10752,
    "WESTERN": 37,
    "SCIFI": 878,
    "TV MOVIE": 10770
})

form.addEventListener("submit", (e)=>{
    let input = document.getElementById("inputField").value;
    let searchedFor = document.getElementById("searchedFor");
})

// // ON PAGE RELOAD, CLEAR SESSION STORAGE.
// window.onload = function clearStorage(){
//     sessionStorage.removeItem("movieByYearGenre");
//     sessionStorage.removeItem("movieByTitleGenre");
// }
