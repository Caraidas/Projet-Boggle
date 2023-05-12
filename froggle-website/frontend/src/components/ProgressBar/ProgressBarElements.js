import styled, { keyframes } from "styled-components";

export const ProgressContainer = styled.div`
    width: ${props => props.width}%;
    height: ${props => props.height}px;
    border: 3.5px solid #000;
    box-shadow: 0px 4px 0px #000;
    border-radius: 5px;
    background: #fff;
`

export const ProgressGauge = styled.div`
    background: ${props => props.color};
    width: ${props => props.ratio}%;
    height: 100%;
    border-radius: 2px;
`