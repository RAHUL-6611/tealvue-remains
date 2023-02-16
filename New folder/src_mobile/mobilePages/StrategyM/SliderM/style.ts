import styled, { css } from 'styled-components';

export const Item = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  border-bottom: ${(p) => p.theme.style.border};

  p {
    font-size: 1rem;
    font-weight: 500;
  }

  .call,
  .put {
    padding: 1em;

    .counter-left,
    .counter-right {
      p {
        font-weight: 400;
      }

      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 2em;
      gap: 0.5rem;

      div {
        margin: 0;
        padding: 0 0.1rem 0 0.2rem;
        font-size: 14px;

        &::-webkit-scrollbar {
          width: 4px;
        }

        &::-webkit-scrollbar-track {
          border-radius: 10p x;
        }

        svg {
          width: 15px;
        }
      }
    }
  }

  .call {
    border-right: ${(p) => p.theme.style.border};

    display: grid;
    grid-template-columns: 1fr;

    .counter-left {
      justify-self: flex-end;
    }
  }

  .put {
    display: grid;
    grid-template-columns: 1fr;

    p {
      justify-self: flex-end;
    }

    .counter-right {
      /* margin-left: 1em; */
      justify-self: flex-start;
    }
  }

  .strike {
    display: flex;
    gap: 1em;
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);

    .value {
      display: flex;
      align-items: center;
      gap: 1em;
      padding: 0.5em 1em;
      border-radius: ${(p) => p.theme.style.borderRadius};
      background-color: ${(p) => p.theme.palette.lightGreyLevel[0]};
      /* border: ${(p) => p.theme.style.border}; */
    }
  }
`;

const commonBuyAndCell = css`
  border: ${(p) => p.theme.style.border};
  border-radius: ${(p) => p.theme.style.borderRadius};
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  user-select: none;
`;

export const Buy = styled.div<{ active: boolean }>`
  ${commonBuyAndCell}
  background-color: ${(p) => (p.active ? p.theme.palette.primary : p.theme.palette.white)};
  color: ${(p) => (p.active ? p.theme.palette.white : p.theme.palette.black)};
  transition: all 0.125s ease-in;

  &:hover {
    background-color: ${(p) => p.theme.palette.primary};
    color: ${(p) => p.theme.palette.white};
  }
`;

export const Sell = styled.div<{ active: boolean }>`
  ${commonBuyAndCell}
  color: ${(p) => (p.active ? p.theme.palette.white : p.theme.palette.black)};
  background-color: ${(p) => (p.active ? p.theme.palette.danger : p.theme.palette.white)};
  transition: all 0.125s ease-in;

  &:hover {
    background-color: ${(p) => p.theme.palette.danger};
    color: ${(p) => p.theme.palette.white};
  }
`;

export const CallItem = styled.div<{ bgColor: string }>`
  background: ${(p) => p.bgColor};
`;

export const PutItem = styled.div<{ bgColor: string }>`
  background: ${(p) => p.bgColor};
`;

export const LeftSelectContainer = styled.div<{ selectedOptionColor: string }>`
  svg {
    color: ${(p) => p.selectedOptionColor} !important;
  }
`;

export const RightSelectContainer = styled.div<{ selectedOptionColor: string }>`
  svg {
    color: ${(p) => p.selectedOptionColor} !important;
  }
`;
