var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=97feb9420c9c2cc675ee55c92f4a520c",
  "method": "GET",
  "headers": {},
  "data": "{}"
}



$.ajax(settings).done(function (response) {
  console.log(response.results[0].title);
  var pelicula1 = document.querySelector('#pelicula1')
  pelicula1.innerHTML = '<h2>' + response.results[0].title  + '</h2>'
  console.log(response.results[0].backdrop_path);
  var foto1 = document.querySelector('#foto1')
  var primerParteURL = "HTTPS://image.tmdb.org/t/p/original"
  primerParteURL+= response.results[0].backdrop_path
  console.log("Sus");
  console.log(primerParteURL);
  foto1.setAttribute("src",primerParteURL)
  console.log(response.results[0].overview);
  var pp1 = document.querySelector('#pp1')
  pp1.innerHTML = '<p>' + response.results[0].overview  + '</p>'
});

$.ajax(settings).done(function (response) {
  console.log(response.results[1]);
  var pelicula1 = document.querySelector('#pelicula2')
  pelicula2.innerHTML = '<h2>' + response.results[1].title  + '</h2>'
  console.log(response.results[1].backdrop_path);
  var foto2 = document.querySelector('#foto2')
  var primerParteURL = "HTTPS://image.tmdb.org/t/p/original"
  primerParteURL+= response.results[1].backdrop_path
  foto2.setAttribute("src",primerParteURL )
  console.log(response.results[1].overview);
  var pp2 = document.querySelector('#pp2')
  pp2.innerHTML = '<p>' + response.results[1].overview  + '</p>'

});


$.ajax(settings).done(function (response) {
  console.log(response.results[2].title);
  var pelicula3 = document.querySelector('#pelicula3')
  pelicula3.innerHTML = '<h2>' + response.results[2].title  + '</h2>'
  console.log(response.results[2].backdrop_path);
  var foto3 = document.querySelector('#foto3')
  var primerParteURL = "HTTPS://image.tmdb.org/t/p/original"
  primerParteURL+= response.results[2].backdrop_path
  foto3.setAttribute("src",primerParteURL )
  console.log(response.results[2].overview);
  var pp3 = document.querySelector('#pp3')
  pp3.innerHTML = '<p>' + response.results[2].overview  + '</p>'

});
$.ajax(settings).done(function (response) {
  console.log(response.results[3].title);
  var pelicula4 = document.querySelector('#pelicula4')
  pelicula4.innerHTML = '<h2>' + response.results[3].title  + '</h2>'
  var foto4 = document.querySelector('#foto4')
  var primerParteURL = "HTTPS://image.tmdb.org/t/p/original"
  primerParteURL+= response.results[3].backdrop_path
  foto4.setAttribute("src",primerParteURL )
  console.log(response.results[3].overview);
  var pp4 = document.querySelector('#pp4')
  pp4.innerHTML = '<p>' + response.results[3].overview  + '</p>'

});
$.ajax(settings).done(function (response) {
  console.log(response.results[4].title);
  var pelicula5 = document.querySelector('#pelicula5')
  pelicula5.innerHTML = '<h2>' + response.results[4].title  + '</h2>'
  var foto5 = document.querySelector('#foto5')
  var primerParteURL = "HTTPS://image.tmdb.org/t/p/original"
  primerParteURL+= response.results[4].backdrop_path
  foto5.setAttribute("src",primerParteURL )
  console.log(response.results[4].overview);
  var pp5 = document.querySelector('#pp5')
  pp5.innerHTML = '<p>' + response.results[4].overview  + '</p>'

});
$.ajax(settings).done(function (response) {
  console.log(response.results[5].title);
  var pelicula6 = document.querySelector('#pelicula6')
  pelicula6.innerHTML = '<h2>' + response.results[5].title  + '</h2>'
  var foto6 = document.querySelector('#foto6')
  var primerParteURL = "HTTPS://image.tmdb.org/t/p/original"
  primerParteURL+= response.results[5].backdrop_path
  foto6.setAttribute("src",primerParteURL )
  console.log(response.results[5].overview);
  var pp6 = document.querySelector('#pp6')
  pp6.innerHTML = '<p>' + response.results[5].overview  + '</p>'

});
