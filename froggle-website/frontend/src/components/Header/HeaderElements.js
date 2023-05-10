import styled, { keyframes } from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0px 0px 0px 0px;
    margin: 0 auto;
    height: 75px;
`

export const Logo = styled.img`
    height: 100%;
    object-fit: cover;
    cursor: pointer;
`

export const Text = styled.p`
    font-size: 3rem;
    font-weight: bold;
    color: #fff;
    -webkit-text-stroke: 2px #000;
    text-shadow: 0px 4px 0px #000;
`