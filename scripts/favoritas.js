//API KEY
const API_KEY = config.API_KEY;

// OUTPUT PELICULAS.
let movieOutput = document.getElementById("movies");



const removeAllMovies = document.getElementById("removeAllMovies");

// MOSTRAR WATCHLIST CUANDO CARGA
window.onload = function displayWatchlist(){
    // PELICULAS
    let toWatch = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    for(let i = 0; i < toWatch.length; i++){
        axios.get("https://api.themoviedb.org/3/movie/"+toWatch[i]+'?api_key='+API_KEY+'&language=en-US')
        .then((response)=>{
            let movie = response.data;
            movieOutput.innerHTML +=
             `<div class="peliculas">
             <div class="overlay">
             <div class="addBtn"><span><i class="material-icons trash" onclick="movieSplice('${movie.id}')">delete_forever</i></span></div>
             <div class="movie">
                 <h2>${movie.title}</h2>
                 <p id="p_rating"><strong>Rating:</strong> <span>${movie.vote_average} / 10 </span> </p>
                 <p><strong>First air date:</strong> <span>${movie.release_date} <i class="material-icons date">date_range</i> </span></p>
                 <a onclick="movieSelected('${movie.id}')" href="detalle.html">Detalle</a>
              </div>
             </div>
             <div class="peliculas_img">
                 <img src="http://image.tmdb.org/t/p/w400/${movie.poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
             </div>
         </div>`;
        })
        //MOSTRAR BOTON DE BORRAR TODAS
        removeAllMovies.style.display = "block";
    }
    if(toWatch.length == 0) {
        // MENSAJE SI NO HAY NINGUNA PELICULA EN LA LISTA
        movieOutput.innerHTML +=
      `<p class="infoText">  </p>`;
    }

    if(toWatchTvShows == 0){
        // MENSAJE SI NO HAY NINGUNA PELICULA EN LA LISTA
        tvShowsOutput.innerHTML +=
        `<p class="infoText"> There are no favorite tv shows. Go watch some. <a href="#" onclick="openRecommendTvShowsBox()"> Here are some recommendations !</a> </p>`;
    }
}
// PELIS RECOMENDADAS
const recommendedBox = document.querySelector(".recommendedBox");
function openRecommendMoviesBox(){
    document.getElementById("recommendedTitle").innerHTML = `Recommended Movies: <span class="reload"><i class="material-icons refresh" onclick="reloadRecommendedMovies()">autorenew</i></span>`;
    recommendedBox.classList.add("recommendedBoxActive");
    recommendMovies();
}


//SACAR PELICULA DE LA WATCHLIST
  function movieSplice(id){
    let storedId = JSON.parse(localStorage.getItem("favoriteMovies")) ||  [];
    let index = storedId.indexOf(id);
    storedId.splice(index, 1);
    localStorage.setItem("favoriteMovies", JSON.stringify(storedId));

    //NOTIFICACION DE QUE SACAS UNA PELI DE LA WATCHLIST
    const removedWatchlist = document.getElementById("alreadyStored");
    removedWatchlist.innerHTML = "Removed from watchlist !";
    removedWatchlist.classList.add("alreadyStored");
    setTimeout(() => {
        added.classList.remove("alreadyStored");
        location.reload();
    }, 1500);
}


//FUNCION QUE TE LLEVA A LA PAGINA DEL DETALLE DE LA PELICULA
function movieSelected(id){
    sessionStorage.setItem("movieId",id);
    window.open("detalle.html");
    return false;
}


// SLIDER PARA LAS RECOMENDACIONES ABAJO DEL DETALLE
let isDown = false;
let startX;
let scrollLeft;
const recommendedOutput = document.getElementById("recommendedOutput");
recommendedOutput.addEventListener("mousedown", (e)=>{
    isDown = true;
    startX = e.pageX - recommendedOutput.offsetLeft;
    scrollLeft = recommendedOutput.scrollLeft;
    e.preventDefault();
    console.log(startX);
})
recommendedOutput.addEventListener("mouseup", ()=>{
    isDown = false;
})
recommendedOutput.addEventListener("mouseenter", ()=>{
    recommendedOutput.classList.add("active");
})
recommendedOutput.addEventListener("mouseleave", (e)=>{
    recommendedOutput.classList.remove("active");
    isDown = false;
})
recommendedOutput.addEventListener("mousemove", (e)=>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - recommendedOutput.offsetLeft;
    const walk = x - startX;
    recommendedOutput.scrollLeft = scrollLeft - walk;
})

// SACAR TODAS LAS PELICULAS
removeAllMovies.addEventListener("click", ()=>{
    localStorage.removeItem("favoriteMovies");

    //NOTIFICACION DE QUE SACAS TODAS LAS PELICULAS DE LA LISTA
    const removedAll = document.getElementById("alreadyStored");
    removedAll.innerHTML = "eliminada!";
    removedAll.classList.add("alreadyStored");
    setTimeout(() => {
        added.classList.remove("alreadyStored");
        location.reload();
    }, 1500);
})
