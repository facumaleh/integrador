//API KEY.
const API_KEY = config.API_KEY;

//Spinner
const spinner = document.querySelector(".spinner");
const container = document.querySelector(".showcase");
spinner.style.display = "none";
container.style.display = "none"

//Pages
const pages = document.querySelector(".pages");
pages.style.display = "none";

window.onload = function getMovies(){
	spinner.style.display = "block";
	setTimeout(() => {
		spinner.style.display = "none";
		container.style.display = "flex";
		pages.style.display = "flex";
	}, 1000);


	axios.get("https://api.themoviedb.org/3/movie/popular?api_key="+API_KEY+'&language=es-ES&page=1')
		.then ((response)=>{
			console.log(response);
			let movie = response.data.results;
			let output = "";

			//Appends to the output the info for each fetched result.
			for(let i = 0; i < movie.length; i++){
				let id = response.data.results[i].id;
				id = JSON.stringify(id);
				let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
				if(favoriteMovies.indexOf(id) === -1){
					output += `
					<div class="peliculas">
						<div class="overlay">
						<div class="addBtn">
						<span><i class="material-icons favorite" onclick="favorite('${movie[i].id}')">favorite</i></span></div>
						<div class="movie">
							<h2>${movie[i].title}</h2>
								<p id="p_rating"><strong>Rating:</strong> <span>${movie[i].vote_average} / 10 </span> </p>
								<p><strong>Release date:</strong> <span>${movie[i].release_date} <i class="material-icons date">date_range</i> </span></p>
								<a onclick="movieSelected('${movie[i].id}')" href="#">Detalles</a>
						</div>
						</div>
						<div class="peliculas_img">
							<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
						</div>
					</div>`;
				} else {
					output += `
					<div class="peliculas">
					<div class="overlay">
					<div class="addBtn">
					<span><i class="material-icons favorite" onclick="favorite('${movie[i].id}')">favorite</i></span></div>
					<div class="movie">
						<h2>${movie[i].title}</h2>
							<p id="p_rating"><strong>Rating:</strong> <span>${movie[i].vote_average} / 10 </span> </p>
							<p><strong>Release date:</strong> <span>${movie[i].release_date} <i class="material-icons date">date_range</i> </span></p>
							<a onclick="movieSelected('${movie[i].id}')" href="#">Detalles</a>
					</div>
					</div>
					<div class="peliculas_img">
						<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
					</div>
				</div>`;
				}
			}
			// Display a las peliculas
			let movieInfo = document.getElementById("movies");
			movieInfo.innerHTML = output;

			//Display a los botons
            let totalPages = response.data.total_pages;
			let pages = document.querySelector(".pages");

            if(totalPages < 2){
				pages.style.display = "none";
			}
		})
		//If theres an error, it logs it in the console.
		.catch ((err)=>{
			console.log(err);
		})
}
// lleva al usuaruo a detalles
function movieSelected(id){
	sessionStorage.setItem("movieId", id);
	window.open("../detalle.html");
	return false;
}


//agrega peliculas a favoritos
function favorite(id){
    let storedId = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
	if(storedId.indexOf(id) === -1){
		storedId.push(id);
		localStorage.setItem("favoriteMovies", JSON.stringify(storedId));
		//notificacion que la pelicula esta siendo agregada
        const added = document.getElementById("added");
        added.innerHTML = "Added to Favorites !";
        added.classList.add("added");
        setTimeout(() => {
            added.classList.remove("added");
        }, 1500);
	} else {
		//notificacion que fue agregada
		const alreadyStored = document.getElementById("alreadyStored");
        alreadyStored.innerHTML = "Already in favorites !";
        alreadyStored.classList.add("alreadyStored");
        setTimeout(() => {
            alreadyStored.classList.remove("alreadyStored");
        }, 1500);
	}
}
