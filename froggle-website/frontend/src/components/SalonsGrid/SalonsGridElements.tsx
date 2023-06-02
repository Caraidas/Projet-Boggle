import styled, { keyframes } from "styled-components";

const appearAnim = keyframes`
    from {
        transform: scale(0);
    }

    to {
        transform: scale(1);
    }
`;

export const SalonsGridContainer = styled.div`
  width: 100%;
  border: 3.5px solid #000;
  box-shadow: 0px 4px 0px #000;
  background: #fff;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  grid-row-gap: 20px;
  padding: 20px;
  border-radius: 10px;
  transition: all 0.25s ease-in-out;
  animation: ${appearAnim} 0.25s cubic-bezier(.85,1.76,.75,.81);

  @media screen and (max-width: 750px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const SalonsGridWrapper = styled.div`
  display: flex;
  width: 90%;
  max-width: 750px;
  flex-direction: column;
  gap: 10px;
  transition: all 0.25s ease-in-out;
  margin: 0 auto;
  margin-top: 50px;
`;
