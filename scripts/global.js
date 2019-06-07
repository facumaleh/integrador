// Define variables.
const navbar = document.querySelector("nav");
const submenu = document.querySelector(".submenu");
const sticky = navbar.offsetTop;
const scrollToTop = document.getElementById("scrollToTop");

// MenuExpandible Menu.
const MenuExpandible = document.querySelector(".MenuExpandible");
const slide = document.querySelector(".slide");
let sideMenu = false;
const body = document.querySelector("body");
MenuExpandible.addEventListener("click", ()=>{
	MenuExpandible.classList.toggle("active");

	// Slide menu.
	slide.classList.toggle("slideIn");
	sideMenu = !sideMenu; // Change the flag variable from "false" to "true" or "true" to "false", to be used in the if statement for hiding/showing the scroll button.

	// Fixate body
	body.classList.toggle("bodyHidden");

	// Hide scroll to top button.
	if(sideMenu) {
		scrollToTop.classList.remove("scrollButtonActive");
	}
});
// Click on DROPDOWN - MOVIES on small screen to display/hide the list.
const smallMovies = document.getElementById("PeliculasChicas");
smallMovies.addEventListener("click", ()=>{
	const moviesDropdown = document.getElementById("moviesDropdown");
	moviesDropdown.classList.toggle("drop");
});

// Click on DROPDOWN - MY LISTS on small screen to display/hide the list.
const smallLists = document.getElementById("smallScreenList");
smallLists.addEventListener("click", ()=>{
	const smallListsDropdown = document.getElementById("myListsDropdown");
	smallListsDropdown.classList.toggle("drop");
})
