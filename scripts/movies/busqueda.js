<<<<<<< HEAD

window.onload = function() {
  // Tengo que capturar el formulario, querySelector
  // al formulario le agrego un evento para que cuando se submita el form, envie los datos por ajax(fetch)


  var queryString = new URLSearchParams(window.location.search)
  var idGenero = queryString.get("id")
  console.log(idGenero);
  console.log(idGenero===null);
  var busco = queryString.get("buscador")
  console.log(busco);

  //Se imprimen en pantalla los resultados del buscador
  document.getElementById("vosBuscaste").innerHTML = 'Estos son los resultados para:'+' '+ busco;

if (busco==null) {
  document.getElementById("vosBuscaste").style.display = "none";
}

  var select = document.getElementById('selectedGenres');
      select.onchange= function(){
        var idGenero = select.options[select.selectedIndex].value
        window.location.href = "busqueda.html?id="+idGenero;
      }
  if (idGenero != null ) {
    console.log("busco por genero");
    var url = ('https://api.themoviedb.org/3/discover/movie?api_key=15bb9ea0cc06d94a6a0f45e9487d7633&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&with_genres='+idGenero)
  } else if (busco != null) {
    console.log("busco una peli");
    var url = "https://api.themoviedb.org/3/search/movie?api_key=07be10560c3c4cf68794acc1da83356b&language=en-US&query=" + busco + "&page=1&include_adult=false"
  }

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
          <div class="peliculas">
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

            <div class="peliculas_img">
              <img src="${imgURL}${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';" >
            </div>
          </div>
          `;
        } else {
          output += `
                    <div class="peliculas">
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
                    <div class="peliculas_img">
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



// ** GUARDAR EN LISTA DE FAVORITOS **
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

//Agregar pelicula a favoritos
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



// **GENEROS**

// Crear la caja con todos los generos sacados de la API

const API_KEY = "07be10560c3c4cf68794acc1da83356b";

  var urlGeneros = "https://api.themoviedb.org/3/genre/movie/list?api_key="+API_KEY;


  fetch(urlGeneros)
  .then(function(response){
    // Esto sirve para poner los generos sacados de la API en la consola
    return response.json();
  })
  .then(function(responseJSON){
      var generos = responseJSON.genres;
        console.log(generos);
      var buscarGeneros = document.querySelector('.listaGenres');
        console.log(buscarGeneros);


    // Se pasan los generos que aparecen en la consola a el buscador
      var select = document.getElementById('selectedGenres');

            for (var i = 0; i < generos.length; i++) {
                      option = "<option id="+generos[i].id+" value='"+generos[i].id+"' class='tag'>"+generos[i].name+"</option>"
                      select.innerHTML += option
            }
      })
  .catch(function(error){
    console.log("The error was: "+ error);
  })
}
// Aca van los requerimientos minimos para que funcione el Buscador
// Tiene que validarse teniendo el campo al menos 3 caracteres y si no se cumple salta una alerta por 3 segundos

//if cajaBuscador tiene un numero menor a 3 de caracteres, mostrar una alerta por 3 segundos

var form = document.querySelector('#form')
console.log(form);
form.addEventListener("submit",function(event){
    console.log('form subido');
    var input = document.querySelector('#inputField')
    console.log(input.value);
    console.log(input.value.length);
    if (input.value.length <3) {
      event.preventDefault()
      UIkit.notification({
      message: 'Insertar al menos 3 caracteres para mostrar resultados',
      status: 'danger',
      pos: 'top-center',
      timeout: 3000
});

    }
})


// Aca va lo que la persona busco impreso en la pagina

// function cambiarTexto(){
// var buscador = new URLSearchParams(window.location.search).get('buscador')
// document.querySelector('div.busqueda').innerHTML += buscador
//
//
// console.log(cambiarTexto);
// }
=======
window.onload = function() {
  // Tengo que capturar el formulario, querySelector
  // al formulario le agrego un evento para que cuando se submita el form, envie los datos por ajax(fetch)


  var queryString = new URLSearchParams(window.location.search)
  var idGenero = queryString.get("id")
  console.log(idGenero);
  console.log(idGenero===null);
  var busco = queryString.get("buscador")
  console.log(busco);

  //Se imprimen en pantalla los resultados del buscador
  document.getElementById("vosBuscaste").innerHTML = 'Estos son los resultados para:'+' '+ busco;

if (busco==null) {
  document.getElementById("vosBuscaste").style.display = "none";
}

  var select = document.getElementById('selectedGenres');
      select.onchange= function(){
        var idGenero = select.options[select.selectedIndex].value
        window.location.href = "busqueda.html?id="+idGenero;
      }
  if (idGenero != null ) {
    console.log("busco por genero");
    var url = ('https://api.themoviedb.org/3/discover/movie?api_key=15bb9ea0cc06d94a6a0f45e9487d7633&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&with_genres='+idGenero)
  } else if (busco != null) {
    console.log("busco una peli");
    var url = "https://api.themoviedb.org/3/search/movie?api_key=07be10560c3c4cf68794acc1da83356b&language=en-US&query=" + busco + "&page=1&include_adult=false"
  }

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
          <div class="peliculas">
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

            <div class="peliculas_img">
              <img src="${imgURL}${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';" >
            </div>
          </div>
          `;
        } else {
          output += `
                    <div class="peliculas">
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
                    <div class="peliculas_img">
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



// ** GUARDAR EN LISTA DE FAVORITOS **
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

//Agregar pelicula a favoritos
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



// **GENEROS**

// Crear la caja con todos los generos sacados de la API

const API_KEY = "07be10560c3c4cf68794acc1da83356b";

  var urlGeneros = "https://api.themoviedb.org/3/genre/movie/list?api_key="+API_KEY;


  fetch(urlGeneros)
  .then(function(response){
    // Esto sirve para poner los generos sacados de la API en la consola
    return response.json();
  })
  .then(function(responseJSON){
      var generos = responseJSON.genres;
        console.log(generos);
      var buscarGeneros = document.querySelector('.listaGenres');
        console.log(buscarGeneros);


    // Se pasan los generos que aparecen en la consola a el buscador
      var select = document.getElementById('selectedGenres');

            for (var i = 0; i < generos.length; i++) {
                      option = "<option id="+generos[i].id+" value='"+generos[i].id+"' class='tag'>"+generos[i].name+"</option>"
                      select.innerHTML += option
            }
      })
  .catch(function(error){
    console.log("The error was: "+ error);
  })
}
// Aca van los requerimientos minimos para que funcione el Buscador
// Tiene que validarse teniendo el campo al menos 3 caracteres y si no se cumple salta una alerta por 3 segundos

//if cajaBuscador tiene un numero menor a 3 de caracteres, mostrar una alerta por 3 segundos

var form = document.querySelector('#form')
console.log(form);
form.addEventListener("submit",function(event){
    console.log('form subido');
    var input = document.querySelector('#inputField')
    console.log(input.value);
    console.log(input.value.length);
    if (input.value.length <3) {
      event.preventDefault()
      UIkit.notification({
      message: 'Insertar al menos 3 caracteres para mostrar resultados',
      status: 'danger',
      pos: 'top-center',
      timeout: 3000
});

    }
})


// Aca va lo que la persona busco impreso en la pagina

// function cambiarTexto(){
// var buscador = new URLSearchParams(window.location.search).get('buscador')
// document.querySelector('div.busqueda').innerHTML += buscador
//
//
// console.log(cambiarTexto);
// }
>>>>>>> master
