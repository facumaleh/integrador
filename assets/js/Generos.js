
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
    // lista.innerHTML += "<a href='listadegeneros.html?query'"+response.genres[i].id+" ><li class='list-group-item' id='"+response.genres[i].id + "'>" + response.genres[i].name + "</li></a>"
    lista.innerHTML += "<form action='listadegeneros.html' method='GET'><input class='display-none' type='' name='idGenero' value='"+ response.genres[i].id +"' style='display:none;'><button class='list-group-item' id='"+response.genres[i].id + "'>" + response.genres[i].name + "</buton></form>"
  }
});
