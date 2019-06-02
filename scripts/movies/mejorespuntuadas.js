// API KEY.
const API_KEY = config.API_KEY;
// => es una function


// Pages.
const pages = document.querySelector(".pages");
pages.style.display = "none";


fetch("https://api.themoviedb.org/3/movie/top_rated?api_key="+API_KEY+'&language=es-ES&page=1')
.then(function(response) {
	return response.json();
})
.then(function(response) {
	console.log(response);
	console.log(response.results);
	let movie = response.results;
	let output = "";
	for(let i = 0; i < movie.length; i++){
		let id = response.results[i].id;
		id = JSON.stringify(id);
		let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
		if(favoriteMovies.indexOf(id) === -1){
			output += `
			<div class="card">
				<div class="overlay">
				<div class="addBtn"><span><i class="material-icons watch" onclick="addToList('${movie[i].id}')">visibility</i></span>
				<span><i class="material-icons favorite" onclick="favorite('${movie[i].id}')">favorite</i></span></div>
				<div class="movie">
					<h2>${movie[i].title}</h2>
						<p id="p_rating"><strong>Rating:</strong> <span>${movie[i].vote_average} / 10 </span> </p>
						<p><strong>Release date:</strong> <span>${movie[i].release_date} <i class="material-icons date">date_range</i> </span></p>
						<a onclick="movieSelected('${movie[i].id}')" href="#">Detalles</a>
				</div>
				</div>
				<div class="card_img">
					<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
				</div>
			</div>`;
		} else {
			output += `
			<div class="card">
			<div class="overlay">
			<div class="addBtn"><span><i class="material-icons watch" onclick="addToList('${movie[i].id}')">visibility</i></span>
			<span><i class="material-icons favoriteMarked" onclick="favorite('${movie[i].id}')">favorite</i></span></div>
			<div class="movie">
				<h2>${movie[i].title}</h2>
					<p id="p_rating"><strong>Rating:</strong> <span>${movie[i].vote_average} / 10 </span> </p>
					<p><strong>Release date:</strong> <span>${movie[i].release_date} <i class="material-icons date">date_range</i> </span></p>
					<a onclick="movieSelected('${movie[i].id}')" href="#">Detalles</a>
			</div>
			</div>
			<div class="card_img">
				<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
			</div>
		</div>`;
		}
	}

	//Append the output to "movies" element.
	let movieInfo = document.getElementById("movies");
	movieInfo.innerHTML = output;


})


//Takes the user to detailed info page.
function movieSelected(id){
sessionStorage.setItem("movieId", id);
window.open("../detalle.html");
return false;
}

//Creates a variable for the page number to make it dynamic.
let pageNum = 1;









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
