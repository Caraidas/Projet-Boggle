import styled, { keyframes } from "styled-components";

export const MessagesContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 50vh;
    overflow-y: auto;
    padding: 10px;
    backdrop-filter: blur(2px);
`