document.querySelector("form").addEventListener("submit",function(event){
  event.preventDefault()

  // tiene usaurio?
    var email = window.localStorage.getItem("email");
    console.log(email);
  // si tiene comparo con el que ingreso
  // es igual al ingresado , remplazo login por el nombre
    var emailform= document.getElementById("email").value
      console.log(emailform);
    if (emailform === email) {
      // innerHTML capturo login y lo remplazo
      console.log("son iguales");
      document.getElementById('Login').innerText=emailform document.getElementById('Login').innerText=email
    }
    else {
      // guardar dato en local storage, set item
      registerUser(emailform)
      console.log("usuario registrado");
    }
    function registerUser(email){
        window.localStorage.setItem("email", emailform);
        return `New user ${email} now registered!`;
    }
})

// SACAR MODAL (POP-UP)
var modal = document.getElementById('id01');

// SALIR DEL POP UP CUANDO APRETAS AFUERA DEL MISMO
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

  //
