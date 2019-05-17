
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=97feb9420c9c2cc675ee55c92f4a520c",
  "method": "GET",
  "headers": {},
  "data": "{}"
}



$.ajax(settings).done(function (response) {
  for (var i = 0; i < response.genres.length; i++) {
    console.log(response);
    console.log(response.genres[i].name);
    var lista = document.querySelector('.generos-list')
    lista.innerHTML += '<li class="list-group-item" id="'+response.genres[i].id + '">' + response.genres[i].name + '</li>'
  }
});
