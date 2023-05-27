import "../css/styleLogin.css"
import React, { useState } from 'react'
import { useNavigate , Link } from 'react-router-dom';
import axios from 'axios';

function Signup({ logo }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(false); //Ajout de l'état showError
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost/boggle/php/register.php", {username, email, password, passwordConfirm})
        .then((response) => {
            console.log(response.data.status);
            if (response.data.status === "success") {
              navigate('/login');
            } else if(response.data.status === "error") {
                console.log("Authentification échouée");
                setErrorMessage(response.data.message);
                console.log(response.data.message)
                setShowError(true); //Modifier la valeur de showError si une erreur survient
            }
        })
        .catch(error => console.log(error));
    }

  return (
    <>
        <div className='SignupCont'>
            <img src={logo} className='logoSignup' />
            <form className='formCont' onSubmit={handleSubmit}>
                <div className='errorContainer' style={{display: showError ? 'block' : 'none'}}>{errorMessage}</div>                
                <input type="text" className="input" placeholder="nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} />
                <input type="text" className="input" placeholder="e-mail" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="input" placeholder="mot de passe" onChange={(e) => setPassword(e.target.value)} />
                <input type="password" className="input" placeholder="confirmez mot de passe" onChange={(e) => setPasswordConfirm(e.target.value)} />
                <button className='submit'>Se connecter</button>
            </form>
            <div className='tosignup'>
                Vous avez déjà un compte ? <Link to="/login">Connectez vous.</Link>
            </div>
        </div>
    </>
  )
}

export default Signup
