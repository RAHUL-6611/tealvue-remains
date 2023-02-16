import styled from 'styled-components';

export const Top = styled.div`
  padding: 1em;
  color: ${(p) => p.theme.palette.black};
  font-weight: 600;
  border-radius: ${(p) => p.theme.style.borderRadius};
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const Container = styled.div`
  box-shadow: ${(p) => p.theme.style.boxShadow};
  border-radius: ${(p) => p.theme.style.borderRadius};
  width: 100%;
`;

export const Button = styled.button`
  font-family: inherit;
  padding: 0.5rem 1rem;
  background-color: ${(p) => p.theme.palette.white};
  box-shadow: ${(p) => p.theme.style.boxShadow};
  border: none;
  cursor: pointer;
  font-weight: 500;
  border-radius: ${(p) => p.theme.style.borderRadius};
`;

export const CommonTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1em;

  thead {
    th {
      font-size: 1.3rem;
      color: ${(p) => p.theme.palette.secondary};
    }
  }

  tbody {
    td {
      border-bottom: ${(p) => p.theme.style.borderLight1};
    }
  }

  td {
    font-size: 1.35rem;
    font-weight: 400;
    color: ${(p) => p.theme.palette.secondary};
  }
`;

export const Special = styled.span<{ buy: boolean }>`
  border-radius: ${(p) => p.theme.style.borderRadius};
  padding: 0.3rem 0.5rem;
  box-shadow: ${(p) => p.theme.style.boxShadow};
  background: ${(p) => (p.buy ? p.theme.palette.primary : p.theme.palette.danger)};
  font-weight: 500;
  color: #fff;
`;
