
window.onload = function() {

  var queryString = new URLSearchParams(location.search)
  var idGenero = queryString.get("idGenero")
  var url = "https://api.themoviedb.org/3/discover/movie?api_key=97feb9420c9c2cc675ee55c92f4a520c&sort_by=popularity.des c&include_adult=true&include_video=true&page=1&with_genres=" + idGenero

  fetch(url)
    .then(function(respuesta) {

      return respuesta.json()
    })
    .then(function(informacion) {
      console.log(informacion);

      var arrayDePeliculas = informacion.results
      console.log(arrayDePeliculas);
      var ruta = "HTTPS://image.tmdb.org/t/p/original"

      for (var i = 0; i < arrayDePeliculas.length; i++) {

          var title = arrayDePeliculas[i].title;
          var path = arrayDePeliculas[i].poster_path;
          var date = arrayDePeliculas[i].release_date;
          var overview = arrayDePeliculas[i].overview;

          // console.log(arrayDePeliculas[i]);
          document.querySelector("h2 a").innerText = title
      // console.log(arrayDePeliculas[i].querySelector("a img"));
          var fotos =document.querySelectorAll(".foto1")
          console.log(fotos);
          fotos[i].setAttribute("src", ruta + path)
          document.querySelector("p.overview").innerText = overview
          document.querySelector("p").innerText = date


      }
    })
    .catch(function(error) {
      console.log("Error: " + error);
    })



}
