import React from 'react'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import './Login.css'

const Login = () => {
    const email = "jdilernia99@gmail.com"
    const contra = "altolett123"

    const validar = (e) => {
        e.preventDefault()
        const usuario = document.getElementById('usuario').value
        const password = document.getElementById('password').value
        if (usuario === email && password === contra) {
            alert("Ingreso exitoso")
            window.location.href = "/home"
        } else {
            alert("Usuario o contraseña incorrectos")
        }
    }



  return (
    <div className='login'>


<div className='login-contenedor'>
    <div className='login-contenedor__titulo'>
        <h1>LOGIN</h1>

    </div>

    <div className='login-contenedor__formulario'>
        <form onSubmit={validar}>
            <div className='login-contenedor__formulario__email'>
                <label >Email</label>
                <input type='text' id='usuario' placeholder='Ingrese su email' required />
            </div>
            <div className='login-contenedor__formulario__contra'>
                <label >Contraseña</label>
                <input type='password' id='password' placeholder='Ingrese su contraseña' required />
            </div>
            <div className='login-contenedor__formulario__boton'>
                <button type='submit'>Acceder</button>
              
            </div>
        </form>



  </div>



</div>
</div>


  )
}

export default Login