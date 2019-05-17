
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=97feb9420c9c2cc675ee55c92f4a520c",
  "method": "GET",
  "headers": {},
  "data": "{}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[0].name);
  var uno = document.querySelector('#uno')
  uno.innerHTML = '<li>' + response.genres[0].name + '</li>'
});

$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[1].name);
  var dos = document.querySelector('#dos')
  dos.innerHTML = '<li>' + response.genres[1].name + '</li>'
});
$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[2].name);
  var tres = document.querySelector('#tres')
  tres.innerHTML = '<li>' + response.genres[2].name + '</li>'
});
$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[3].name);
  var cuatro = document.querySelector('#cuatro')
  cuatro.innerHTML = '<li>' + response.genres[3].name + '</li>'
});
$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[4].name);
  var cinco = document.querySelector('#cinco')
  cinco.innerHTML = '<li>' + response.genres[4].name + '</li>'
});

$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[5].name);
  var seis = document.querySelector('#seis')
  seis.innerHTML = '<li>' + response.genres[5].name + '</li>'
});
$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[6].name);
  var siete = document.querySelector('#siete')
  siete.innerHTML = '<li>' + response.genres[6].name + '</li>'
});

$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[7].name);
  var ocho = document.querySelector('#ocho')
  ocho.innerHTML = '<li>' + response.genres[7].name + '</li>'
});

$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[8].name);
  var nueve = document.querySelector('#nueve')
  nueve.innerHTML = '<li>' + response.genres[8].name + '</li>'
});

$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[9].name);
  var diez = document.querySelector('#diez')
  diez.innerHTML = '<li>' + response.genres[9].name + '</li>'
});

$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[10].name);
  var once = document.querySelector('#once')
  once.innerHTML = '<li>' + response.genres[10].name + '</li>'
});


$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[11].name);
  var doce = document.querySelector('#doce')
  doce.innerHTML = '<li>' + response.genres[11].name + '</li>'
})


$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[12].name);
  var trece = document.querySelector('#trece')
  trece.innerHTML = '<li>' + response.genres[12].name + '</li>'
});


$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[13].name);
  var catorce = document.querySelector('#catorce')
  catorce.innerHTML = '<li>' + response.genres[13].name + '</li>'
})


$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[14].name);
  var quince = document.querySelector('#quince')
  quince.innerHTML = '<li>' + response.genres[14].name + '</li>'
});


$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[15].name);
  var dieciseis = document.querySelector('#dieciseis')
  dieciseis.innerHTML = '<li>' + response.genres[15].name + '</li>'
});
$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[16].name);
  var diecisiete = document.querySelector('#diecisiete')
  diecisiete.innerHTML = '<li>' + response.genres[16].name + '</li>'
});

$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[17].name);
  var dieciocho = document.querySelector('#dieciocho')
  dieciocho.innerHTML = '<li>' + response.genres[17].name + '</li>'
});

$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.genres[18].name);
  var diecinueve = document.querySelector('#diecinueve')
  diecinueve.innerHTML = '<li>' + response.genres[18].name + '</li>'
});
