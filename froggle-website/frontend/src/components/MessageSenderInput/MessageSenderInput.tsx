import styled, { keyframes } from "styled-components";

export const MessageSenderCont = styled.div`
    width: 100%;
    display: flex;
    gap: 5px;
    align-items: center;
    margin-top: 10px;
`

export const MessageInputText = styled.input`
    width: 75%;
    height: 35px;
    border: 2.5px solid #000;
    box-shadow: 0px 2px 0px #000;
    padding-left: 20px;
    border-radius: 1000px;
    outline: none;
`

export const MessageSenderButton = styled.button`
    width: 15%;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.primaryColor};
    border: 3px solid #000;
    box-shadow: 0px 1px 0px #000;
    border-radius: 7px;
    outline: none;
    cursor: pointer;
`

export const MessageSenderImg = styled.img`
    height: 80%;
`