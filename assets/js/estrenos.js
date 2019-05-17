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
});

$.ajax(settings).done(function (response) {
  console.log(response.results[1].title);
  var pelicula1 = document.querySelector('#pelicula2')
  pelicula2.innerHTML = '<h2>' + response.results[1].title  + '</h2>'
});


$.ajax(settings).done(function (response) {
  console.log(response.results[2].title);
  var pelicula3 = document.querySelector('#pelicula3')
  pelicula3.innerHTML = '<h2>' + response.results[2].title  + '</h2>'
});
$.ajax(settings).done(function (response) {
  console.log(response.results[3].title);
  var pelicula4 = document.querySelector('#pelicula4')
  pelicula4.innerHTML = '<h2>' + response.results[3].title  + '</h2>'
});
