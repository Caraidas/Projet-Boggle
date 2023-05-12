import React from 'react'
import { HeaderContainer, Logo, Text } from './HeaderElements'
import logo from "../../images/logo-2.png"

const Header = ({ text }) => {
  return (
    <HeaderContainer>
        <Logo src={logo} />
        <Text>{text}</Text>
    </HeaderContainer>
  )
}

export default Header
