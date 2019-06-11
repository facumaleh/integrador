
// SACAR MODAL (POP-UP)
var modal = document.getElementById('id01');

// SALIR DEL POP UP CUANDO APRETAS AFUERA DEL MISMO
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
