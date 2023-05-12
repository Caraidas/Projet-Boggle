import React, { useState } from 'react'
import { useNavigate , Link } from 'react-router-dom';
import {LoginContainer, LoginPageContainer,Logo, ErrorContainer, LoginInput, Submit} from './../Login/LoginElements' //Importer les composants de LoginElements
import axios from 'axios'

const LoginPage = ({logo, submitText}) => {

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
      <LoginPageContainer>
          <LoginContainer onSubmit = {handleSubmit}>
              <Logo src={logo}></Logo>
              <ErrorContainer style={{display: showError ? 'block' : 'none'}}>{errorMessage}</ErrorContainer>
              <LoginInput type="text" placeholder="Saisissez votre nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} />
              <LoginInput type="email" placeholder="Saisissez votre adresse E-mail" onChange={(e) => setEmail(e.target.value)} />
              <LoginInput type="password" placeholder="Saisissez votre mot de passe" onChange={(e) => setPassword(e.target.value)} />
              <LoginInput type="password" placeholder="Confirmez votre mot de passe" onChange={(e) => setPasswordConfirm(e.target.value)} />
              <Submit>{submitText}</Submit>
              <p>Vous avez déjà un compte ? <Link to="/login">Connectez-vous.</Link></p>
          </LoginContainer>
      </LoginPageContainer>
    )
  }
  
export default LoginPage
