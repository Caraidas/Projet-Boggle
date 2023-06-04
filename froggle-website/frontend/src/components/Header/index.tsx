import React from 'react'
import { HeaderContainer, Logo, Text } from './HeaderElements'
import logo from "../../images/logo-2.png";
import { useNavigate } from 'react-router-dom';

const Header = ({ text }) => {

  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/');
  }

  return (
    <HeaderContainer>
        <Logo src={logo} onClick={clickHandler} />
        <Text>{text}</Text>
    </HeaderContainer>
  )
}

export default Header
