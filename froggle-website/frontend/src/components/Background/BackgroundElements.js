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
    z-index:-1000;
    overflow: hidden;
    height: 100vh;
    width: 100%;
`

// Code pour trouver la taille la plus grande entre la hauteur et la largeur de l'ecran

let height = window.innerHeight;
let width = window.innerWidth;

let size = "vw"
if (height > width) {
    size = "vh";
}

export const Bg = styled.img`
    height: 200${{size}};
    transform-origin: center;
    animation: ${rotation} 100s linear infinite;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
    opacity: 0.5;
`