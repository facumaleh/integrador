// Define variables.
const navbar = document.querySelector("nav");
const submenu = document.querySelector(".submenu");
const sticky = navbar.offsetTop;
const scrollToTop = document.getElementById("scrollToTop");
// When window scroll reaches pageYOffset >=30, show the "sticky" navbar.
window.onscroll = function scrollFunction(){
	// When window scroll reaches pageYOffset that is higher than 350, show the scrollToTop button.
	if(window.pageYOffset >= 250){
		scrollToTop.classList.add("scrollButtonActive");
	} else {
		scrollToTop.classList.remove("scrollButtonActive");
	}

    if(window.pageYOffset >= 30){
		navbar.style.top = "0px"
		navbar.style.boxShadow = "0px 3px 5px rgba(0,0,0,0.1)";
    } else {
		navbar.style.boxShadow = "none";
	}
}

// Burger Menu.
const burger = document.querySelector(".burger");
const slide = document.querySelector(".slide");
let sideMenu = false;
const body = document.querySelector("body");
burger.addEventListener("click", ()=>{
	burger.classList.toggle("active");

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
// SMOOTH SCROLLING
scrollToTop.addEventListener("click", ()=>{
	window.scroll({
		top: 0,
		left: 0,
		behavior: "smooth"
	});
})
// Modal box and question mark.
let questionMark = document.getElementById("questionMark");
let modal = document.querySelector(".modal");
if(questionMark){
	questionMark.addEventListener("click", ()=>{
		modal.classList.add("modalActive");
	})
}
const modalGotIt = document.getElementById("modalGotIt");
if(modalGotIt){
	modalGotIt.addEventListener("click", ()=>{
		modal.classList.remove("modalActive");
	})
}
// Close modal with escape key.
document.body.addEventListener("keydown", (e)=>{
	if( e.code === "Escape") {
		modal.classList.remove("modalActive");
	}
})
