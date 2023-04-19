import styled, { keyframes } from "styled-components";

const rotation = keyframes`
    from {
        transform:  translate(-50%, -50%) rotate(0deg);
    }
    to {
        transform:  translate(-50%, -50%) rotate(360deg);
    }
`

export const Bg = styled.img`
    object-fit: cover;
    height: 200vw;
    transform-origin: center;
    animation: ${rotation} 100s linear infinite;
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0.5;
    z-index:-1000;
`