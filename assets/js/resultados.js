var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&api_key=97feb9420c9c2cc675ee55c92f4a520c",
  "method": "GET",
  "headers": {},
  "data": "{}"
}


var URL =  "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&api_key=97feb9420c9c2cc675ee55c92f4a520c"
fetch(URL)
.then(function(response) {
  return response.json()
})
// .then(function(respuesta) {
//     console.log(respuesta);
//     console.log(respuesta.results);
//     console.log(respuesta.results[0]);
//
//     var arrayDeDivs = document.querySelectorAll("div.slideshow-container div.mySlides")
//     for (var i = 0; i < arrayDeDivs.length; i++) {
//         console.log(arrayDeDivs[i]);
//         arrayDeDivs[i].querySelector("img").src = " https://image.tmdb.org/t/p/original/"+ respuesta.results[i].backdrop_path
//         arrayDeDivs[i].querySelector('.text').innerText = respuesta.results[i].original_title
//         arrayDeDivs[i].querySelector('.descripcion').innerText = respuesta.results[i].overview
//     }

// })
.catch(function(error) {
  console.log("Error: " + error);
})

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
