//API KEY.
const API_KEY = config.API_KEY;

//Spinner.
const spinner = document.querySelector(".spinner");
const container = document.querySelector(".container");
spinner.style.display = "none";
container.style.display = "none";

//Agarra el ID lo guarda en el locoal storage y lo usa para mostrar la info de la peli que tiene ese id
//the movie that has that ID.
function getMovie(){
	spinner.style.display = "block";
	setTimeout(() => {
		spinner.style.display = "none";
		container.style.display = "block";
	}, 1000);

	let movieId = sessionStorage.getItem("movieId");

	fetch("https://api.themoviedb.org/3/movie/"+movieId+'?api_key='+API_KEY+'&language=es-ES')
		.then(function(response) {
			return response.json()
		})
		.then(function(movieInfoResponse) {
			fetch("https://api.themoviedb.org/3/movie/"+movieId+'/credits?api_key='+API_KEY)
				.then(function(response2) {
					return response2.json()
				})
				.then(function(movieCastResponse) {

					const movie = movieInfoResponse;
					const cast = movieCastResponse.cast;
					const genres = movieInfoResponse.genres;
					cast.length = 5;

					//Redondea el numero de popularidad de la pelicula
					popularity = movieInfoResponse.popularity;
					popularity = Math.floor(popularity)


					let revenue = movieInfoResponse.revenue;
					revenue = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(revenue);

					let output = `
					<div class="moviePage">
					<div class="poster"><img src="http://image.tmdb.org/t/p/w300/${movie.poster_path}"></div>
					<div class="info">
						<h2>${movie.title}</h2>
						<ul>
							<li><strong>Elenco:</strong> `;
							for (let i = 0; i < cast.length; i++) {
								if (i != cast.length - 1) {
									output += `${cast[i].name}, `;
								} else {
									output += `${cast[i].name}.`;
								}
							}
							output += `</li>
							<li><strong>Genros:</strong> `;
							for(let i = 0; i < genres.length; i++){
								if ( i != genres.length -1){
									output += `${genres[i].name}, `;
								} else {
									output += `${genres[i].name}.`;
								}
							}
							output += `<ul>
								<li><strong>estreno:</strong> ${movie.release_date}</li>
								<li><strong>duracion:</strong> ${movie.runtime} (min)</li>
								<li><strong>Rating:</strong> ${movie.vote_average} / 10 <span id="smallText">(${movie.vote_count} votes)</span></li>
								<li><strong>recaudacion:</strong> ${revenue}</li>
								<li><strong>estado:</strong> ${movie.status}</li>
								<li><strong>Productora:</strong> ${movie.production_companies[0].name}</li>
							</ul>

						</div>
					</div>
					<div class="plot">
						<h3>resumen</h3>
						<p>${movie.overview}</p>
					</div>`;


					const info = document.getElementById("movie");
					info.innerHTML = output;
				})
		})


fetch("https://api.themoviedb.org/3/movie/"+movieId+'/videos?api_key='+API_KEY+'&language=es-ES')
.then(function(response) {
	return response.json();
})
.then(function(response) {

  let movie = response.results;
	let trailer = response.results;

	// Se muestra un trailer distinto cada vez
	let min = 0;
	// -1 so it takes into account if theres only 1 item in the trailer length( at position 0).
	let max = trailer.length - 1;
	min = Math.ceil(min);
	max = Math.floor(max);
	let trailerNumber = Math.floor(Math.random() * (max-min +1)) + min;

	let output = `
		<div class="video">
		<iframe width="620" height="400" src="https://www.youtube.com/embed/${trailer[trailerNumber].key}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
		</div>`;
	// Muestra el trailer
	let video = document.getElementById("trailer");
	video.innerHTML = output;
})
// recomendaciones
fetch("https://api.themoviedb.org/3/movie/"+movieId+'/recommendations?api_key='+API_KEY+'&language=es-ES&page=1')
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {

		const movie = response.results;
		//Set the movie length (output) to 4.
		movie.length = 4;
		let output = "";
		for(let i = 0; i < movie.length; i++){
let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
			output += `
			<div class="peliculas">
				<div class="overlay">
				<div class="movie">
					<h2>${movie[i].title}</h2>
						<p><strong>Release date:</strong> <span>${movie[i].release_date} <i class="material-icons date">date_range</i> </span></p>
							<a onclick="movieSelected('${movie[i].id}')" >Detalles</a>

				</div>
				</div>
				<div class="peliculas_img">
					<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
				</div>
			</div>
			`;
		}

		let recommended = document.getElementById("recommended");
		recommended.innerHTML = output;

		document.getElementById("prev").style.display = "none";
	})

	.catch ((err)=>{
		let recommended = document.getElementById("recommended");

		 `<div class="recommendations_error">
			<h3>Perdon! </h3>
			<br>
			<p>No hay recomendacones</p>
		 </div>`;
	})
}

//Go back button function.
function goBack(){
window.close();
}

// Lleva al usuario a la pagina de detalles
function movieSelected(id){
	sessionStorage.setItem("movieId", id);
	window.open("../integrador/detalle.html");
	// return false;
}


//Numero de pagina
