//API KEY.
const API_KEY = config.API_KEY;

//Spinner.
const spinner = document.querySelector(".spinner");
const container = document.querySelector(".container");
spinner.style.display = "none";
container.style.display = "none";

//Gets the movie ID stored in the Session storage and uses it to display information about
//the movie that has that ID.
function getMovie(){
	spinner.style.display = "block";
	setTimeout(() => {
		spinner.style.display = "none";
		container.style.display = "block";
	}, 1000);

	let movieId = sessionStorage.getItem("movieId");

	const movieInfo = axios.get("https://api.themoviedb.org/3/movie/"+movieId+'?api_key='+API_KEY+'&language=es-ES');
	const movieCast = axios.get("https://api.themoviedb.org/3/movie/"+movieId+'/credits?api_key='+API_KEY)
	Promise.all([movieInfo, movieCast])
		.then( ([movieInfoResponse, movieCastResponse]) =>{
			const movie = movieInfoResponse.data;
			const cast = movieCastResponse.data.cast;
			const genres = movieInfoResponse.data.genres;
			cast.length = 5;

			//Grab the popularity parameter from the data and rounds it to a whole number%.
			popularity = movieInfoResponse.data.popularity;
			popularity = Math.floor(popularity)

			//Revenue - dynamically make it format itself into a standard looking currency.
			let revenue = movieInfoResponse.data.revenue;
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

		//Targets the "movie" element and appends the output to it.
		const info = document.getElementById("movie");
		info.innerHTML = output;

		})
		//If there is an error, show this.
		.catch ((err)=>{
			let output = "";
			output += `<h1 id="errorTitle">SORRY !</h1>
			<p id="errorText">We could not provide informations about this movie at this particular moment. Be sure to come back again. Thank you for your understanding. </p>
			<div class="buttons errorBack">
				<a onclick="goBack()"> Go back </a>
			</div>`;
			// Hide elements if theres an error.
			let info = document.getElementById("movie");
			info.innerHTML = output;
			document.getElementById("rec_title").style.display = 'none';
			document.querySelector(".page").style.display = "none";
			document.getElementById("recommended").style.display = "none";
			document.getElementById("trailer").style.display = "none";
			document.getElementById("trailer_title").style.display = "none";
			document.getElementById("rec_title").style.display = "none";
		});



fetch("https://api.themoviedb.org/3/movie/"+movieId+'/videos?api_key='+API_KEY+'&language=es-ES')
.then(function(response) {
	return response.json();
})
.then(function(response) {
	console.log(response);
  console.log(response.results);
  let movie = response.results;
	let trailer = response.results;

	// RANDOM NUMBER FOR TRAILER OUTPUT (ON EVERY PAGE LOAD, A DIFFERENT TRAILER WILL SHOW).
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
	// Display the trailer.
	let video = document.getElementById("trailer");
	video.innerHTML = output;
})

fetch("https://api.themoviedb.org/3/movie/"+movieId+'/recommendations?api_key='+API_KEY+'&language=es-ES&page=1')
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    console.log(response);
		const movie = response.results;
		//Set the movie length (output) to 4.
		movie.length = 4;
		let output = "";
		for(let i = 0; i < movie.length; i++){
			output += `

			<div class="peliculas">
				<div class="overlay">
				<div class="movie">
					<h2>${movie[i].title}</h2>
						<p><strong>Release date:</strong> <span>${movie[i].release_date} <i class="material-icons date">date_range</i> </span></p>

				</div>
				</div>
				<div class="peliculas_img">
					<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
				</div>
			</div>
			`;
		}
		//Target "recommended" and output the similar movies into it.
		let recommended = document.getElementById("recommended");
		recommended.innerHTML = output;
		// Hide the previous page button of the first page.
		document.getElementById("prev").style.display = "none";
	})
	//If there is an error, it logs it in the console.
	.catch ((err)=>{
		let recommended = document.getElementById("recommended");
		document.getElementById("rec_title").style.display = "none";
		document.querySelector(".page").style.display = "none";
		recommended.innerHTML =
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

// Take user to details page.
function movieSelected(id){
sessionStorage.setItem("movieId", id);
location.replace("movie-page.html");
return false;
}

//Page number.
let pageNum = 1;
