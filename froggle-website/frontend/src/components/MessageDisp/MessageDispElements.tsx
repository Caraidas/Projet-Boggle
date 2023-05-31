import styled, { keyframes } from "styled-components";

const appearAnim = keyframes`
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
`

export const MessageCont = styled.div`
  width: 100%;
  border: 2.5px solid #000;
  box-shadow: 0px 3px 0px #000;
  border-radius: 10px;
  padding: 10px;
  animation: ${appearAnim} 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
`;

export const MessageInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 7px;
`;

export const MessageContent = styled.div`
  width: 100%;
`;

export const MessageDate = styled.div`
  font-weight: bold;
`;

export const MessageName = styled.div`
  font-weight: 900;
  font-size: 1.5rem;
  -webkit-text-stroke: 1.25px #000;
  text-shadow: 0px 2px 0px #000;
  color: #fff;
`;
