//API KEY.
const API_KEY = config.API_KEY;

//Define "spinner" and set it to display none.
const spinner = document.querySelector(".spinner");
spinner.style.display = "none";

//Define the container where movies will be listed.
const container = document.querySelector(".showcase");
container.style.display = "none"

//Pages


//Run "getMovies()" on page load.
window.onload = function getMovies(){
	spinner.style.display = "block";
	setTimeout(() => {
		spinner.style.display = "none";
		container.style.display = "flex";
	
	}, 1000);

	//Get the API.

	fetch("https://api.themoviedb.org/3/movie/now_playing?api_key="+API_KEY+'&language=es-ES&page=1&region=US')
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
					</div>
					`;
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
							<a onclick="movieSelected('${movie[i].id}')" href="#">DEtalles</a>
					</div>
					</div>
					<div class="card_img">
						<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
					</div>
				</div>
				`;
				}
			}
			// Display movies.
			let movieInfo = document.getElementById("movies");
			movieInfo.innerHTML = output;


		})
		// If theres an error, logs the error in console.
		.catch( (err) =>{
			console.log(err);
		})
}

// 	axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key="+API_KEY+'&language=es-ES&page=1&region=US')
// 		.then( (response) =>{
// 			let movie = response.data.results;
// 			let output = "";
//
// 			//Appends to the output the info for each fetched result.
// 			for(let i = 0; i < movie.length; i++){
// 				let id = response.data.results[i].id;
// 				id = JSON.stringify(id);
// 				let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
// 				if(favoriteMovies.indexOf(id) === -1){
// 					output += `
// 					<div class="card">
// 						<div class="overlay">
// 						<div class="addBtn"><span><i class="material-icons watch" onclick="addToList('${movie[i].id}')">visibility</i></span>
// 						<span><i class="material-icons favorite" onclick="favorite('${movie[i].id}')">favorite</i></span></div>
// 						<div class="movie">
// 							<h2>${movie[i].title}</h2>
// 								<p id="p_rating"><strong>Rating:</strong> <span>${movie[i].vote_average} / 10 </span> </p>
// 								<p><strong>Release date:</strong> <span>${movie[i].release_date} <i class="material-icons date">date_range</i> </span></p>
// 								<a onclick="movieSelected('${movie[i].id}')" href="#">Detalles</a>
// 						</div>
// 						</div>
// 						<div class="card_img">
// 							<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
// 						</div>
// 					</div>
// 					`;
// 				} else {
// 					output += `
// 					<div class="card">
// 					<div class="overlay">
// 					<div class="addBtn"><span><i class="material-icons watch" onclick="addToList('${movie[i].id}')">visibility</i></span>
// 					<span><i class="material-icons favoriteMarked" onclick="favorite('${movie[i].id}')">favorite</i></span></div>
// 					<div class="movie">
// 						<h2>${movie[i].title}</h2>
// 							<p id="p_rating"><strong>Rating:</strong> <span>${movie[i].vote_average} / 10 </span> </p>
// 							<p><strong>Release date:</strong> <span>${movie[i].release_date} <i class="material-icons date">date_range</i> </span></p>
// 							<a onclick="movieSelected('${movie[i].id}')" href="#">DEtalles</a>
// 					</div>
// 					</div>
// 					<div class="card_img">
// 						<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
// 					</div>
// 				</div>
// 				`;
// 				}
// 			}
// 			// Display movies.
// 			let movieInfo = document.getElementById("movies");
// 			movieInfo.innerHTML = output;
//
//
// 		})
// 		// If theres an error, logs the error in console.
// 		.catch( (err) =>{
// 			console.log(err);
// 		})
// }

// Takes you to detailed info page.
function movieSelected(id){
	sessionStorage.setItem("movieId", id);
	window.open("../detalle.html");
	return false;
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
