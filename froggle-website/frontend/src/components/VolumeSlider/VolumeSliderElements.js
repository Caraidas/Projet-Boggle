import styled from "styled-components";

export const SliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 5%;
    gap: 10px;
    transition: all 0.1s linear;
    bottom: 20px;

    ${({ isSoundOpen }) => (isSoundOpen ? 'border: 3.5px solid #000;box-shadow: 0px 2px 0px #000;padding: 10px 20px;border-radius: 10px;background: #67C870;' : '')}
`

export const SliderToggle = styled.img`
    width: 60px;
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
    // filter: drop-shadow(3px 5px 3px #2A6533);
    transition: 0.2s ease-in;
    transform: scale(${({ isSoundOpen }) => (isSoundOpen ? '0' : '1')});

    &:active {
        transition: 0.1s ease-out;
        transform: scale(0.9);
    }

    @media screen and (max-width: 400px) {
        width: 50px;
    }
`

export const SliderSection = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    transition: 0.2s cubic-bezier(.85,1.76,.75,.81) ${({ animDelay }) => (animDelay ? animDelay : '0')}s;
    transform: scale(${({ isSoundOpen }) => (isSoundOpen ? '1' : '0')});
`

export const SoundIcon = styled.img`
    width: 35px;
`

// ce truc c'est la mort mdrr
export const Slider = styled.input`
    width: 150px;
    -webkit-appearance: none;
    appearance: none;
    height: 10px;
    border-radius: 50px;
    background: #fff;
    outline: none;
    border: 2px solid #000;
    box-shadow: 0px 1px 0px #000;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        transition: 0.1s ease-in-out;
        border: 2px solid #000;
    }

    &::-moz-range-thumb {
        -webkit-appearance: none;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        outline: none;
        border: none;
        transition: 0.1s ease-in-out;
        border: 2px solid #000;
    }

    &::-ms-thumb {
        -webkit-appearance: none;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        outline: none;
        transition: 0.1s ease-in-out;
        border: 2px solid #000;
    }

    &::-webkit-slider-thumb:hover {
        height: 20px;
        width: 20px;
    }

    &::-ms-thumb:hover {
        height: 20px;
        width: 20px;
    }

    &::-moz-range-thumb:hover {
        height: 20px;
        width: 20px;
    }

    &::-webkit-slider-thumb:active {  
        background: #ccc;
    }

    &::-ms-thumb:active {
        background: #ccc;
    }

    &::-moz-range-thumb:active {
        background: #ccc;
    }
` 