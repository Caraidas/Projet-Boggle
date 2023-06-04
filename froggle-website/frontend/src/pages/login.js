import React, { useState } from 'react'
import "../css/styleLogin.css"
import { useNavigate, Link  } from 'react-router-dom';
import axios from 'axios'

const Login = ({ logo, errorMessage }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState(false); //Ajout de l'état showError
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost/boggle/php/login.php", {email, password})
        .then((response) => {
            console.log(response.data.status);
            console.log(response.data.classementData);
            if (response.data.status === "success") {
                const userData = {ID_Joueur: response.data.sessionData.ID_Joueur, classementData: response.data.classementData, historique: response.data.historique,pseudo: response.data.sessionData.pseudo, XP_Actuel: response.data.sessionData.XP_Actuel, Photo_De_Profile: response.data.sessionData.Photo_De_Profile, Est_Prive:response.data.sessionData.Est_Prive};
                localStorage.setItem('userData', JSON.stringify(userData));
                navigate('/');
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
                <input type="text" className="inputLogin" placeholder="e-mail" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="inputLogin" placeholder="mot de passe" onChange={(e) => setPassword(e.target.value)} />
                <button className='submit'>S'identifier</button>
            </form>
            <div className='tosignup'>
                Vous n'avez pas encore de compte ? <Link to="/signup">Inscrivez-vous.</Link>
            </div>
        </div>
    </>
  )
}

export default Login
