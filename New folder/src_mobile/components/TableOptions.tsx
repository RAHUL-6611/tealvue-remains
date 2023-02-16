import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { useSticky } from 'react-table-sticky';
import '../styles/table.css';
import { percentFormatter, typeFormatter } from '../functions/function';
import { useHistory } from 'react-router-dom';
import { tableDataProps } from 'interfaces';
import { useAppDispatch } from '../redux/hooks';
import { updateStock } from '../redux/slices/global';

const OptionTable = ({ tableData, option }: tableDataProps) => {
  const data = useMemo(() => tableData, [tableData]);

  const history = useHistory();
  const dispatch = useAppDispatch();

  const columns = useMemo(
    () => [
      {
        Header: 'Type',
        accessor: 'type',
        sticky: 'top',
        Cell: ({ value }: any) => {
          return <p className={`p-2 text-black text-center w-full ${option === 'price' && 'bg-gray-100'}`}>{typeFormatter(value)}</p>;
        },
      },
      {
        Header: 'Symbol',
        accessor: 'symbol',
        sticky: 'top',
        Cell: (value: any) => {
          const priceChange = value.data.find((v: any) => v.symbol === value.value)?.price_change ?? 0;
          return (
            <button
              className={`p-2 text-center w-full ${option === 'symbol' && 'bg-gray-100'} ${
                priceChange > 0 ? 'text-green-600' : 'text-red-600'
              }`}
              onClick={() => {
                dispatch(
                  updateStock({
                    value: value.value,
                    label: value.value,
                  }),
                );

                history.push('/option/chain');
              }}
            >
              {value.value}
            </button>
          );
        },
      },
      {
        Header: 'Strike Price',
        accessor: 'strike',
        sticky: 'top',
        Cell: ({ value }: any) => {
          return <p className={`p-2 text-black text-center w-full ${option === 'price' && 'bg-gray-100'}`}>{Number(value).toFixed(0)}</p>;
        },
      },
      {
        Header: 'Price',
        accessor: 'price',
        sticky: 'top',
        Cell: ({ value }: any) => {
          return <p className={`p-2 text-black text-center w-full ${option === 'price' && 'bg-gray-100'}`}>{Number(value).toFixed(0)}</p>;
        },
      },

      {
        Header: 'Inference',
        accessor: 'build_up',
        sticky: 'top',
        Cell: ({ value }: any) => {
          return <p className={`p-2 text-black text-center w-full ${option === 'build_up' && 'bg-gray-100'}`}>{value}</p>;
        },
      },

      {
        Header: 'Spot',
        accessor: 'spot',
        sticky: 'top',
        Cell: ({ value }: any) => {
          return <p className={`p-2 text-black text-center w-full ${option === 'spot' && 'bg-gray-100'}`}>{Number(value).toFixed(1)}</p>;
        },
      },

      {
        Header: 'Price Change (%)',
        accessor: 'price_change',
        sticky: 'top',
        Cell: ({ value }: any) => {
          return <p className={`p-2 text-center w-full ${option === 'price_change' && 'bg-gray-100'}`}>{percentFormatter(value)}</p>;
        },
      },

      {
        Header: 'Volume',
        accessor: 'volume',
        Cell: ({ value }: any) => {
          return <p className={`p-2  text-black text-center w-full ${option === 'volume' && 'bg-gray-100'}`}>{Number(value).toFixed(0)}</p>;
        },
      },

      {
        Header: 'Volume Change',
        accessor: 'volume_change',
        sticky: 'top',
        Cell: ({ value }: any) => {
          return <p className={`p-2 text-center w-full ${option === 'vol_change' && 'bg-gray-100'}`}>{percentFormatter(value)}</p>;
        },
      },

      {
        Header: 'TTV',
        accessor: 'ttv',
        sticky: 'top',
        Cell: ({ value }: any) => {
          return <div className={`text-black text-center w-full p-2 ${option === 'ttv' && 'bg-gray-100'}`}>{Number(value).toFixed(0)}</div>;
        },
      },

      {
        Header: 'OI',
        accessor: 'oi',
        sticky: 'top',
        Cell: ({ value }: any) => {
          return <p className={`p-2 text-black text-center w-full ${option === 'oi' && 'bg-gray-100'}`}>{Number(value).toFixed(0)}</p>;
        },
      },

      {
        Header: 'Change in OI (%)',
        accessor: 'oi_change',
        Cell: ({ value }: any) => {
          return <p className={`p-2 text-center w-full ${option === 'oi_change' && 'bg-gray-100'}`}>{percentFormatter(value)}</p>;
        },
        sticky: 'top',
      },
    ],
    [dispatch, history, option],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSticky);

  return (
    <>
      <div className="relative w-full max-h-full overflow-scroll no-scrollbar">
        <table {...getTableProps()} className="overflow-x-scroll top-0">
          <thead>
            {headerGroups.map(
              (headerGroup: {
                getHeaderGroupProps: () => JSX.IntrinsicAttributes &
                  React.ClassAttributes<HTMLTableRowElement> &
                  React.HTMLAttributes<HTMLTableRowElement>;
                headers: any[];
              }) => (
                <tr className="sticky" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th className="p-2 bg-gray-100 text-gray-800 border-0 border-gray-100" {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ),
            )}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(
              (row: {
                getRowProps: () => JSX.IntrinsicAttributes &
                  React.ClassAttributes<HTMLTableRowElement> &
                  React.HTMLAttributes<HTMLTableRowElement>;
                cells: {
                  getCellProps: () => JSX.IntrinsicAttributes;
                  render: (arg0: string) => React.ReactChild | React.ReactFragment | null | undefined;
                }[];
              }) => {
                prepareRow(row);
                return (
                  <tr className="hover:shadow-lg hover:bg-white hover:border-l-8 hover:border-green-600" {...row.getRowProps()}>
                    {row.cells.map(
                      (cell: {
                        getCellProps: () => JSX.IntrinsicAttributes;
                        render: (arg0: string) => React.ReactChild | React.ReactFragment | null | undefined;
                      }) => {
                        return (
                          <td className=" text-black p-0 border-0 border-b-2" {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
                        );
                      },
                    )}
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OptionTable;
