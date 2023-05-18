import React, { useState } from 'react'
import "../css/styleLogin.css"
import { useNavigate, Link  } from 'react-router-dom';
import axios from 'axios'

const Login2 = ({ logo, errorMessage }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState(false); //Ajout de l'état showError
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost/boggle/php/login.php", {email, password})
        .then((response) => {
            console.log(response.data.status);
            if (response.data.status === "success") {
              navigate('/home');
            } else if(response.data.status === "error") {
                console.log("Authentification échouée");
                setShowError(true); //Modifier la valeur de showError si une erreur survient
            }
        })
        .catch(error => console.log(error));
    }

  return (
    <>
        <div className='loginCont'>
            <img src={logo} className='logo' />
            <form className='formCont' onSubmit={handleSubmit}>
                <div className='errorContainer' style={{display: showError ? 'block' : 'none'}}>{errorMessage}</div>
                <input type="text" className="input" placeholder="e-mail" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="input" placeholder="mot de passe" onChange={(e) => setPassword(e.target.value)} />
                <button className='submit'>S'identifier</button>
            </form>
            <div className='tosignup'>
                Vous n'avez pas encore de compte ? <Link to="/signup">Inscrivez-vous.</Link>
            </div>
        </div>
    </>
  )
}

export default Login2
