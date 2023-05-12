import styled, { keyframes } from "styled-components";

const rotation = keyframes`
    from {
        transform:  translate(-50%, -50%) rotate(0deg);
    }
    to {
        transform:  translate(-50%, -50%) rotate(360deg);
    }
`

export const BgCont = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.5;
    z-index:-1000;
    overflow: hidden;
    height: 100vh;
    width: 100%;
`

export const Bg = styled.img`
    height: 200vw;
    transform-origin: center;
    animation: ${rotation} 100s linear infinite;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
`