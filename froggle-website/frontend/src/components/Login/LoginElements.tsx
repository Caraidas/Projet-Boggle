import styled, { keyframes } from "styled-components";

export const LoginPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    width: 100%;
    height: 100vh;
`

const appearAnim = keyframes`
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1)
    }
`

export const LoginContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80vmin;
    max-height:100vh
`


export const Logo = styled.img`
    width: 70vmin;
    animation: ${appearAnim} 0.5s cubic-bezier(.85,1.76,.75,.81) forwards;
`

export const ErrorContainer = styled.div`
    width: 70vmin;
    height:50px;
    color:red;
    background-color:#f5d6d9;
    border: 5px solid rgba(255,129,130,0.4);
    border-radius:5px;
    text-align: center;
    vertical-align: middle;
    line-height: 50px;   
    display: none  
`
export const LoginInput = styled.input`
    width: 70vmin;
    animation: ${appearAnim} 0.5s cubic-bezier(.85,1.76,.75,.81) forwards;
    border-radius:40px;
    height:70px;
    margin:1rem auto;
    border: black solid;
    border-width: 3px 4px 6px;
    font-size:24px;
    font-weight:bold;
    text-align: center;

    &:focus{
        outline:none !important;
    }
`

export const Submit = styled.button`
    width: 30vmin;
    height:80px;
    animation: ${appearAnim} 0.5s cubic-bezier(.85,1.76,.75,.81) forwards;
    border-radius:40px;
    border: black solid;
    border-width: 3px 4px 6px;
    margin:1rem auto;
    background-color:#20B544;
    text-align: center;
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    -webkit-text-stroke: 1.5px #000;
    text-shadow: 0px 1.5px 0px #000;

    &:focus{
        outline:none !important;
    }
`