var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=97feb9420c9c2cc675ee55c92f4a520c",
  "method": "GET",
  "headers": {},
  "data": "{}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});


var pelicula1 = document.querySelector('#pelicula1')
pelicula1.innerHTML = '<ol>' + settings + '</ol>'
