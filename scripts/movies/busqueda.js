
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
                    <span>${movie[i].vote_average} / 10  <i class="material-icons star">star_rate</i></span>
                </p>

                <p>
                  <strong>Release date:</strong>
                    <span>${movie[i].release_date} <i class="material-icons date">date_range</i> </span>
                </p>

                <a onclick="movieSelected('${movie[i].id}')" href="#">Detalles</a>
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
                                  <span>${movie[i].vote_average} / 10  <i class="material-icons star">star_rate</i></span>
                              </p>
                              <p>
                                <strong>Release date:</strong>
                                  <span>${movie[i].release_date} <i class="material-icons date">date_range</i> </span>
                              </p>
                            <a onclick="movieSelected('${movie[i].id}')" href="#">Detalles</a>
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
