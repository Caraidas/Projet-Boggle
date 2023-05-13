import React, { useState } from 'react'
import { useNavigate, Link  } from 'react-router-dom';
import {LoginContainer, LoginPageContainer,Logo, ErrorContainer, LoginInput, Submit} from './LoginElements' //Importer les composants de LoginElements
import axios from 'axios'

const LoginPage = ({logo, submitText, errorMessage}) => {

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
      <LoginPageContainer>
          <LoginContainer onSubmit = {handleSubmit}>
              <Logo src={logo}></Logo>
              <ErrorContainer style={{display: showError ? 'block' : 'none'}}>{errorMessage}</ErrorContainer>
              <LoginInput type="email" placeholder="Saisissez votre adresse E-mail" onChange={(e) => setEmail(e.target.value)} />
              <LoginInput type="password" placeholder="Saisissez votre mot de passe" onChange={(e) => setPassword(e.target.value)} />
              <Submit>{submitText}</Submit>
              <p>Vous n'avez pas encore de compte ? <Link to="/register">Inscrivez-vous.</Link></p>
          </LoginContainer>
      </LoginPageContainer>
    )
  }
  
export default LoginPage
