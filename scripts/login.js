function validar() {var usuario, email;
  usuario=document.getElementById('usuario').value;
    email=document.getElementById('email')
    if (usuario==="")
    alert("El campo esta vacio");

    }



document.querySelector("form").addEventListener("submit",function(event){
  event.preventDefault()


  // tiene usaurio?
    var usuario = window.localStorage.getItem("usuario");
    console.log(usuario);
  // si tiene comparo con el que ingreso
  // es igual al ingresado , remplazo login por el nombre
    var nuevoUsuario= document.getElementById("usuario").value
      console.log(nuevoUsuario);
    if (nuevoUsuario === usuario) {
      // innerHTML capturo login y lo remplazo
      console.log("son iguales");
      document.getElementById('login').innerText=nuevoUsuario

    }
    else {
      // guardar dato en local storage, set item
      registerUser(nuevoUsuario)
      console.log("usuario registrado");
    }
    function registerUser(usuario){
        window.localStorage.setItem("usuario", nuevoUsuario);
        return `New user ${nuevoUsuario} now registered!`;
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
