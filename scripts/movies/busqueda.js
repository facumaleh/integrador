window.onload = function() {
var URLParams = new URLSearchParams (window.location.search);
var query = URLParams.get('buscador');
console.log(query);
const API_KEY = config.API_KEY;
console.log(API_KEY);
  var url = "https://api.themoviedb.org/3/search/movie?api_key=07be10560c3c4cf68794acc1da83356b&language=en-US&query=shrek&page=1&include_adult=false"

  fetch(url)
  .then (function(respond){
    return respond.json()
  })
  .then(function(){
    
  })
