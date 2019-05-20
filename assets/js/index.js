// var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "https://api.themoviedb.org/3/movie/now_playing?page=1&language=en-US&api_key=97feb9420c9c2cc675ee55c92f4a520c",
//   "method": "GET",
//   "headers": {},
//   "data": "{}"
// }
//
//
// var ruta = "HTTPS://image.tmdb.org/t/p/original"
//
// fetch(settings.url)
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(response) {
//     console.log("Esto es lo que me devuele, la API de movies: "+response);
//     console.log(response);
//     console.log(response.results);
//
// // capturo los 3 divs, donde voy a insertar la data de los estrenos
// var arrayDeDivs = document.querySelectorAll("div.estrenos")
// console.log(arrayDeDivs);
// // voy a recorrer los divs, de los estrenos y les voy a insertar la darta
//       for (var i = 0; i < arrayDeDivs.length; i++) {
//         console.log(response.results[i].title);
//         console.log(response.results[i].backdrop_path);
//         console.log(response.results[i].release_date);
//
//         console.log(arrayDeDivs[i]);
//         arrayDeDivs[i].querySelector("h2 a").innerText = response.results[i].title
// console.log(arrayDeDivs[i].querySelector("a img"));
//         arrayDeDivs[i].querySelector("a img").setAttribute("src", ruta + response.results[i].backdrop_path)
//         arrayDeDivs[i].querySelector("p.overview").innerText = response.results[i].overview
//         arrayDeDivs[i].querySelector("p").innerText = response.results[i].release_date
//       }
//
//
//   })
//   .catch(function(error) {
//   console.log('Hubo un problema con la petición Fetch:' + error.message);
// });


var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=15bb9ea0cc06d94a6a0f45e9487d7633",
  "method": "GET",
  "headers": {},
  "data": "{}"
}

var URL = "https://api.themoviedb.org/3/movie/upcoming?page=1&language=en-US&api_key=15bb9ea0cc06d94a6a0f45e9487d7633"
fetch(URL)
.then(function(response) {
  return response.json()
})
.then(function(respuesta) {
    console.log(respuesta);
    console.log(respuesta.results);
    console.log(respuesta.results[0]);

    var arrayDeDivs = document.querySelectorAll("div.slideshow-container div.mySlides")
    for (var i = 0; i < arrayDeDivs.length; i++) {
        console.log(arrayDeDivs[i]);
        arrayDeDivs[i].querySelector("img").src = " https://image.tmdb.org/t/p/original/"+ respuesta.results[i].backdrop_path
        arrayDeDivs[i].querySelector('.text').innerText = respuesta.results[i].original_title
        arrayDeDivs[i].querySelector('.descripcion').innerText = respuesta.results[i].overview
    }

})
.catch(function(error) {
  console.log("Error: " + error);
})
