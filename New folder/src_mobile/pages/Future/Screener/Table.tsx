import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { useSticky } from 'react-table-sticky';
// import '../styles/table.css';
import { percentFormatter } from '../../../functions/function';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { tableDataProps } from 'interfaces';

const FutureTable = ({ tableData, option }: tableDataProps) => {
  const data = useMemo(() => tableData, [tableData]);
  const { path } = useRouteMatch();
  const history = useHistory();

  const columns = useMemo(
    () => [
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
              onClick={() => history.push(`${path}/${value.value}`)}
            >
              {value.value}
            </button>
          );
        },
      },

      {
        Header: 'Price',
        accessor: 'price',
        sticky: 'top',
        Cell: ({ value }: any) => {
          return <p className={`p-2 text-black text-center w-full ${option === 'price' && 'bg-gray-100'}`}>{Number(value).toFixed(1)}</p>;
        },
      },

      {
        Header: 'Inference',
        accessor: 'build_up',
        sticky: 'top',
      },
      {
        Header: 'Basis',
        accessor: 'basis',
        sticky: 'top',
        Cell: ({ value }: any) => {
          return <p className={`p-2 text-black text-center w-full ${option === 'basis' && 'bg-gray-100'}`}>{Number(value).toFixed(1)}</p>;
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
          return <p className={`p-2  text-black text-center w-full ${option === 'volume' && 'bg-gray-100'}`}>{Number(value).toFixed(1)}</p>;
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
          return <div className={`text-black text-center w-full p-2 ${option === 'ttv' && 'bg-gray-100'}`}>{Number(value).toFixed(1)}</div>;
        },
      },

      {
        Header: 'OI',
        accessor: 'oi',
        sticky: 'top',
        Cell: ({ value }: any) => {
          return <p className={`p-2 text-black text-center w-full ${option === 'oi' && 'bg-gray-100'}`}>{Number(value).toFixed(1)}</p>;
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
    [history, option, path],
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
                    <th className="p-2 bg-gray-100 text-gray-800 border-gray-300 border-0" {...column.getHeaderProps()}>
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
                  <tr className="hover:shadow-lg hover:bg-white hover:border-l-8 hover:border-green-600 " {...row.getRowProps()}>
                    {row.cells.map(
                      (cell: {
                        getCellProps: () => JSX.IntrinsicAttributes;
                        render: (arg0: string) => React.ReactChild | React.ReactFragment | null | undefined;
                      }) => {
                        return (
                          <td className=" text-black text-center p-0 border-0 border-b-2 " {...cell.getCellProps()}>
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

export default FutureTable;
