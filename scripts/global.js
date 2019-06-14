// DEFINICION DE VARIABLES
const navbar = document.querySelector("nav");
const submenu = document.querySelector(".submenu");
const sticky = navbar.offsetTop;
const scrollToTop = document.getElementById("scrollToTop");

// MENU EXPANDIBLE
const MenuExpandible = document.querySelector(".MenuExpandible");
const slide = document.querySelector(".slide");
let sideMenu = false;
const body = document.querySelector("body");
MenuExpandible.addEventListener("click", ()=>{
	MenuExpandible.classList.toggle("active");

//Slide MENU
slide.classList.toggle("slideIn")
slideMenu = !sideMenu;

	// DEJAR BODY FIJO
	body.classList.toggle("bodyHidden");


// MENU DROPDOWN - SIRVE PARA MOSTRAR U OCULTAR EL MENU
const smallMovies = document.getElementById("PeliculasChicas");
smallMovies.addEventListener("click", ()=>{
	const moviesDropdown = document.getElementById("moviesDropdown");
	moviesDropdown.classList.toggle("drop");
});

// MENU DROPDOWN - SIRVE EN LA PANTALLA DE LA LISTA
const smallLists = document.getElementById("smallScreenList");
smallLists.addEventListener("click", ()=>{
	const smallListsDropdown = document.getElementById("myListsDropdown");
	smallListsDropdown.classList.toggle("drop");
})
})
