import { CommonTable, Special } from '../style';

export default function StrategyChart() {
  const data = [
    {
      type: 'BUY',
      name: '1x06 JAN 17600 CE',
      pAndL: -1208,
      targetPrice: 5287,
      entryPrice: 6495,
      ltp: 6495,
    },
    {
      type: 'SELL',
      name: '1x06 JAN 17700 CE',
      pAndL: 1040,
      targetPrice: 2840,
      entryPrice: 3880,
      ltp: 3880,
    },
  ];

  return (
    <div>
      <CommonTable>
        <thead>
          <tr>
            <th align="left">Instrument</th>
            <th align="right">Target P&L</th>
            <th align="right">Target Price</th>
            <th align="right">Entry Price</th>
            <th align="right">LTP</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val, ind) => {
            return (
              <tr key={ind}>
                <td>
                  <Special buy={val.type === 'BUY'}>{val.type[0]}</Special> {val.name}
                </td>
                <td align="right">{val.pAndL}</td>
                <td align="right">{val.targetPrice}</td>
                <td align="right">{val.entryPrice}</td>
                <td align="right">{val.ltp}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td style={{ fontWeight: '600' }}>Total</td>
            <td align="right">-168</td>
            <td align="right">2447</td>
            <td align="right">2115</td>
            <td align="right">2615</td>
          </tr>
        </tfoot>
      </CommonTable>
    </div>
  );
}
