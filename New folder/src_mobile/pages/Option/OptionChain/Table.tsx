import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { useSticky } from 'react-table-sticky';
import { ITtableDataOptionChain } from '../../../interfaces';
import '../../../styles/table.css';
import {percentFormatter,numberFormatter } from '../../../functions/function'

interface IOpTable {
  opScreener: boolean;
  tableData: ITtableDataOptionChain[];
  atm_stike: number;
}

const OpTable = ({ tableData, atm_stike }: IOpTable) => {
  const data = useMemo(() => tableData, [tableData]);

  const custom_columns = useMemo(
    () => [
      {
        Header: 'CALL',
        columns: [
          {
            Header: 'IV%',
            accessor: 'call_iv_change',
            Cell: (cell: any) => {
              return (
                <p className={`${cell.column.parent.Header === 'CALL' && atm_stike > +cell.row.cells[7]?.value ? 'bg-yellow-100' : ''}`}>
                  {/* {numberFormatter(cell.value)} */}
                  {percentFormatter(cell.value)}
                </p>
              );
            },
          },
          {
            Header: 'IV',
            accessor: 'call_iv',
            Cell: (cell: any) => {
              return (
                <p className={`${cell.column.parent.Header === 'CALL' && atm_stike > +cell.row.cells[7]?.value ? 'bg-yellow-100' : ''}`}>
                  {numberFormatter(cell.value)}
                </p>
              );
            },
          },
          {
            Header: '%OI',
            accessor: 'call_oi_change',
            Cell: (cell: any) => {
              return (
                <p className={`${cell.column.parent.Header === 'CALL' && atm_stike > +cell.row.cells[7]?.value ? 'bg-yellow-100' : ''}`}>
                  {percentFormatter(cell.value)}
                </p>
              );
            },
          },
          {
            Header: 'OI',
            accessor: 'call_oi',
            Cell: (cell: any) => {
              return (
                <p className={`${cell.column.parent.Header === 'CALL' && atm_stike > +cell.row.cells[7]?.value ? 'bg-yellow-100' : ''}`}>
                     {numberFormatter(cell.value)}
                </p>
              );
            },
          },
          {
            Header: '%VOL',
            accessor: 'call_volume_change',
            Cell: (cell: any) => {
              return (
                <p className={`${cell.column.parent.Header === 'CALL' && atm_stike > +cell.row.cells[7]?.value ? 'bg-yellow-100' : ''}`}>
                  {percentFormatter(cell.value)}
                </p>
              );
            },
          },
          {
            Header: 'VOL',
            accessor: 'call_volume',
            Cell: (cell: any) => {
              return (
                <p className={`${cell.column.parent.Header === 'CALL' && atm_stike > +cell.row.cells[7]?.value ? 'bg-yellow-100' : ''}`}>
                     {numberFormatter(cell.value)}
                </p>
              );
            },
          },
          {
            Header: 'PRICE',
            accessor: 'call_price',
            Cell: (cell: any) => {
              return (
                <p className={`${cell.column.parent.Header === 'CALL' && atm_stike > +cell.row.cells[7]?.value ? 'bg-yellow-100' : ''}`}>
                  {numberFormatter(cell.value)}
                </p>
              );
            },
          },
          {
            Header: 'STRIKE',
            accessor: 'strike',
          },
        ],
      },
      {
        Header: 'PUT',
        columns: [
          {
            Header: 'PRICE',
            accessor: 'put_price',
            Cell: (cell: any) => {
              return (
                <p className={`${cell.column.parent.Header === 'PUT' && atm_stike < +cell.row.cells[7]?.value ? 'bg-yellow-100' : ''}`}>
                  {numberFormatter(cell.value)}
                </p>
              );
            },
          },
          {
            Header: 'VOL',
            accessor: 'put_volume',
            Cell: (cell: any) => {
              return (
                <p className={`${cell.column.parent.Header === 'PUT' && atm_stike < +cell.row.cells[7]?.value ? 'bg-yellow-100' : ''}`}>
                     {numberFormatter(cell.value)}
                </p>
              );
            },
          },
          {
            Header: '%VOL',
            accessor: 'put_volume_change',
            Cell: (cell: any) => {
              return (
                <p className={`${cell.column.parent.Header === 'PUT' && atm_stike < +cell.row.cells[7]?.value ? 'bg-yellow-100' : ''}`}>
                 {percentFormatter(cell.value)}
                </p>
              );
            },
          },
          {
            Header: 'OI',
            accessor: 'put_oi',
            Cell: (cell: any) => {
              return (
                <p className={`${cell.column.parent.Header === 'PUT' && atm_stike < +cell.row.cells[7]?.value ? 'bg-yellow-100' : ''}`}>
                     {numberFormatter(cell.value)}
                </p>
              );
            },
          },
          {
            Header: '%OI',
            accessor: 'put_oi_change',
            Cell: (cell: any) => {
              return (
                <p className={`${cell.column.parent.Header === 'PUT' && atm_stike < +cell.row.cells[7]?.value ? 'bg-yellow-100' : ''}`}>
                  {percentFormatter(cell.value)}
                </p>
              );
            },
          },
          {
            Header: 'IV',
            accessor: 'put_iv',
            Cell: (cell: any) => {
              return (
                <p className={`${cell.column.parent.Header === 'PUT' && atm_stike < +cell.row.cells[7]?.value ? 'bg-yellow-100' : ''}`}>
                  {cell.value.toFixed(2)}
                </p>
              );
            },
          },
          {
            Header: 'IV %',
            accessor: 'put_iv_change',
            Cell: (cell: any) => {
              return (
                <p className={`${cell.column.parent.Header === 'PUT' && atm_stike < +cell.row.cells[7]?.value ? 'bg-yellow-100' : ''}`}>
                  {percentFormatter(cell.value)}
                </p>
              );
            },
          },
        ],
      },
    ],
    [atm_stike],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns: custom_columns, data }, useSticky);

  return (
    <>
      <div className="relative w-full">
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
                    <th className="p-2 bg-gray-100 text-gray-800 border-b-2 border-gray-300" {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ),
            )}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row: any) => {
              prepareRow(row);

              // console.log(row.original.strike);
              // console.log(row);

              return (
                <tr className="hover:shadow-lg hover:bg-white hover:border-l-8 hover:border-green-600 text-black" {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <td className="p-0 text-center text-black border-b-2" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OpTable;
