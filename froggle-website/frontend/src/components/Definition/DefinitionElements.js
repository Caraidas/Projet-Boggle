import styled, { keyframes } from "styled-components";

export const DefinitionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    width: 100%;
    height:auto;
`

export const DefinitionInput = styled.input`
    width: 70vmin;
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
}
`

export const DefinitionBox =  styled.div`
    width:500px;
    height:200px;
    overflow-y:scroll;
    background-color:white;
    margin-bottom:10px;
    padding: 1rem;
    border: solid black 2px
`