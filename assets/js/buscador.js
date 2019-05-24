
window.onload = function() {

  var queryString = new URLSearchParams(location.search)
  var idGenero = queryString.get("idGenero")
  var url = "https://api.themoviedb.org/3/discover/movie?api_key=97feb9420c9c2cc675ee55c92f4a520c&sort_by=popularity.des c&include_adult=true&include_video=true&page=1&with_genres=" + idGenero

  fetch(url)
    .then(function(respuesta) {

      return respuesta.json()
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



}
