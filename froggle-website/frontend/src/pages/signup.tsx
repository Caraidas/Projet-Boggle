import "../css/styleLogin.css"
import React, { useState } from 'react'
import { useNavigate , Link } from 'react-router-dom';
import axios from 'axios';
import eyeOpen from "../images/eyeOpen.png";
import eyeClose from "../images/eyeClose.png";

function Signup(props : { logo : any }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(false); //Ajout de l'état showError
    const [passwordStrength, setPasswordStrength] = useState(1);
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

    const handlePasswordChange = (event) => {
        const { value } = event.target;
        setPassword(value);

        let strength = 1;
    
        // Vérification de la force du mot de passe
        if (value.length > 6) {
            strength += 1;
            if (/[A-Z]/.test(value)) {
                strength += 1;
            } 

            if (/[!@#$%^&*(),.?":{}|<>_-]/.test(value)) {
                strength += 1;
            }

            if (/[\d]/.test(value)) {
                strength += 1;
            }

            if (value.length > 16) {
                strength += 1;
            }

        } 

        console.log(passwordStrength);
            

        setPasswordStrength(strength);
      };

  return (
    <>
        <div className='SignupCont'>
            <img src={props.logo} className='logoSignup' />
            <form className='formCont' onSubmit={handleSubmit}>
                <div className='errorContainer' style={{display: showError ? 'block' : 'none'}}>{errorMessage}</div>                
                <input type="text" className="inputLogin" placeholder="nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} />
                <input type="text" className="inputLogin" placeholder="e-mail" onChange={(e) => setEmail(e.target.value)} />
                <input style={{ color: passwordStrength >= 5 ? "#45BE5F" : passwordStrength >= 2 ? "#F4A459" : "#ED3E3E" }} type="password" className="inputLogin" placeholder="mot de passe" onChange={(e) => handlePasswordChange(e)} />
                <input type="password" className="inputLogin" placeholder="confirmez mot de passe" onChange={(e) => setPasswordConfirm(e.target.value)} />
                <button className='submit' disabled={passwordStrength <= 1}>Se connecter</button>
            </form>
            <div className='tosignup'>
                Vous avez déjà un compte ? <Link to="/login">Connectez vous.</Link>
            </div>
        </div>
    </>
  )
}

export default Signup
