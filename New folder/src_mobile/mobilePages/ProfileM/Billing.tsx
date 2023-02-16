import styled from 'styled-components';

const data = [
  { Plan: 'Pro plan', Type: 'NIFTY', Qty: 1, Avgprice: '00.00', startDate: '12 - 12 - 2022', Status: 'Active' },
  { Plan: 'Basic Plan', Type: 'NIFTY', Qty: 1, Avgprice: '00.00', startDate: ' 12 - 12 - 2022', Status: '-' },
  { Plan: 'Pro plan', Type: 'NIFTY', Qty: 1, Avgprice: '00.00', startDate: '12 - 12 - 2022', Status: '-' },
];

function App() {
  return (
    <Billing>
      <table>
        <tr>
          <th>Plan</th>
          <th>Type</th>
          <th>Qty</th>
          <th>Avg price</th>
          <th>Start Date</th>
          <th>Status</th>
          <th>Download</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.Plan}</td>
              <td>{val.Type}</td>
              <td>{val.Qty}</td>
              <td>{val.Avgprice}</td>
              <td>{val.startDate}</td>
              <td>{val.Status}</td>
              <td>
                <button>Download</button>
              </td>
            </tr>
          );
        })}
      </table>
    </Billing>
  );
}

export default App;

const Billing = styled.div`
  display: flex;
  background: ${(p) => p.theme.palette.lightBlue};
  height: 80vh;
  overflow: auto;
  padding: 5em;
  text-align: center;
  justify-content: center;
  &::-webkit-scrollbar {
    height: 0.5em;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${(p) => p.theme.palette.primary};
    transition: all 0.2s;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #56a0a0;
  }
  table {
    height: 200px;
    border-collapse: collapse;
    border-collapse: separate;
    border-spacing: 0 5px;
    overflow: auto;
  }
  th {
    height: 4em;
    padding-left: 4.5em;
    padding-right: 4.5em;
    background: ${(p) => p.theme.palette.white};
    font-family: inherit;
    font-weight: 600;
    font-size: 1.5rem;
    color: ${(p) => p.theme.palette.grey};
    @media (max-width: 1024px) {
      padding-left: 4em;
      padding-right: 4em;
    }
  }
  td {
    height: 4.5em;
    background: ${(p) => p.theme.palette.white};
    font-family: inherit;
    font-style: normal;
    font-weight: 600;
    font-size: 1.3rem;
    line-height: 30px;
    align-items: center;
    text-align: center;
    color: ${(p) => p.theme.palette.grey};
    button {
      padding: 0.5em 2em 0.5em 2em;
      border-radius: 6px;
      border: none;
      color: ${(p) => p.theme.palette.white};
      background: ${(p) => p.theme.palette.primary};
    }
  }
`;
