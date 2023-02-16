import styled from 'styled-components';

export const Section = styled.section`
  padding: 1rem;
  overflow: hidden;
`;

export const Top = styled.div`

  display: flex;
  padding: 1em;
  margin: 0 0 1rem 0;
  border-radius: ${(p) => p.theme.style.borderRadius};
  box-shadow: ${(p) => p.theme.style.boxShadow};
  background-color: ${(p) => p.theme.palette.white};

  align-items: flex-end;
  flex-wrap: wrap;
  gap: 2em;
  width:100%;
`;

export const GraphContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 1em;
`;

export const Graph = styled.div`
  padding: 1em;
  box-shadow: ${(p) => p.theme.style.boxShadow};
  border-radius: ${(p) => p.theme.style.borderRadius};
  background-color: ${(p) => p.theme.palette.white};
  color: ${(p) => p.theme.palette.secondary};

  .top {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 1.5rem;
      cursor: pointer;
    }

    h3 {
      font-size: 1rem;
      font-weight: 400;
    }
  }
`;

export const ScreenerDiv = styled.div`
  height: 80vh;
  width: 100%;
  margin: 1em auto;
  padding: 0.5em;
  background-color: ${(p) => p.theme.palette.white};
  border-radius: ${(p) => p.theme.style.borderRadius};

  .ag-header-cell-label .ag-header-cell-text {
    white-space: normal !important;
  }

  .ag-cell,
  .ag-cell-label-container {
    font-family: Poppins;
    font-weight: 600;
    color: ${(p) => p.theme.palette.secondary};
  }

  .ag-center-cols-viewport {
    overflow: hidden;
  }

  .ag-header-group-cell-label {
    font-family: Poppins;
    font-weight: 600;
    color: ${(p) => p.theme.palette.primary};
    justify-content: center;
  }
  .ag-cell-label-container {
    font-weight: 800;
    color: ${(p) => p.theme.palette.black};
  }

  .ag-body-viewport::-webkit-scrollbar {
    width: 0.8em;
  }

  .ag-body-viewport::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  .ag-body-viewport::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${(p) => p.theme.palette.primary};
    transition: all 0.2s;
  }

  .ag-body-viewport::-webkit-scrollbar-thumb:hover {
    background: #56a0a0;
  }

  .ag-body-horizontal-scroll ::-webkit-scrollbar {
    height: 0.8em;
  }

  .ag-body-horizontal-scroll ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  .ag-body-horizontal-scroll ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${(p) => p.theme.palette.primary};
    transition: all 0.2s;
  }

  .ag-body-horizontal-scroll ::-webkit-scrollbar-thumb:hover {
    background: #56a0a0;
  }

  .ag-cell-focus,
  .ag-cell-no-focus {
    border: none !important;
  }
  .ag-cell:focus {
    border: none !important;
    outline: none;
  }
`;
export const ChartContainer = styled.div`
  background-color: ${(props) => props.theme.palette.white};
  padding: 0.5rem 2rem;
  border-radius: 5%;
`;
export const ChartNoData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
  color: ${(p) => p.theme.palette.secondary};
`;
