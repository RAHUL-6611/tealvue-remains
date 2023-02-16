import { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Select from 'components/Select';
import { Buy, Item, Sell } from './style';
import { commonObject } from 'interfaces';

interface props {
  data: any[];
}

export default function Future({ data }: props) {
  return (
    <>
      <div className="header">
        <div>
          <h3>Expiry</h3>
        </div>
        <div>
          <h3>Price</h3>
        </div>
      </div>
      <div className="main sliderMainContent">
        {data.map((val, ind) => {
          return <Row key={ind} index={ind} data={val} />;
        })}
      </div>
    </>
  );
}

const Row = ({ index, data }: { index: number; data: commonObject }) => {
  const [option, setOption] = useState({
    active: false,
    type: 'buy',
  });

  return (
    <ItemContainer>
      <CustomItem>
        <div className="call">
          <p>{moment(data.time).format('D MMM')}</p>
        </div>
        <div className="strike">
          <Buy
            onClick={() => {
              setOption((old) => {
                if (old.active && old.type === 'buy') {
                  return {
                    ...old,
                    active: false,
                  };
                }
                return {
                  type: 'buy',
                  active: true,
                };
              });
            }}
            active={option.type === 'buy' && option.active}
            className="buy"
          >
            <p>B</p>
          </Buy>
          <Sell
            onClick={() => {
              setOption((old) => {
                if (old.active && old.type === 'sell') {
                  return {
                    ...old,
                    active: false,
                  };
                }
                return {
                  type: 'sell',
                  active: true,
                };
              });
            }}
            active={option.type === 'sell' && option.active}
            className="sell"
          >
            <p>S</p>
          </Sell>
        </div>
        <div className="put">
          <p>{data.price}</p>
        </div>
      </CustomItem>
      {option.active && (
        <div className="counter">
          <p>** 50 stock in each lot</p>
          <Select
            style={{ width: '100px' }}
            options={[...Array(150)].map((val, ind) => ({
              label: ind.toString(),
              value: ind.toString(),
            }))}
          />
        </div>
      )}
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: ${(p) => p.theme.style.border};
  .counter {
    margin-bottom: 1em;
  }
`;

const CustomItem = styled(Item)`
  border-bottom: none;

  .call {
    border-right: none;
  }
`;
