import React, { useMemo} from 'react'
import { useTable } from "react-table"

const Table = () => {

    const data = [
        {
                stock :"CSB BANK LIMITED"
        },
        {

        }
    ]
    const columns = useMemo(
        () => [
            {
            Header: 'Stock',
            accessor: 'stock',
            sticky: 'top',
            Cell: ({ value }: any) => {
            return <p className={`p-2 text-black text-center w-full `}>{value}</p>;
            },
            
        },
            {
            Header: 'CMP',
            accessor: 'cmp',
            sticky: 'top',
            Cell: ({ value }: any) => {
            return <p className={`p-2 text-black text-center w-full `}>-</p>;
            }
        },
            {
            Header: 'Change',
            accessor: 'change',
            sticky: 'top',
            Cell: ({ value }: any) => {
            return <p className={`p-2 text-black text-center w-full `}>6.4</p>;
            },   
        },
        {
            Header: 'Change %',
            accessor: 'change_percent',
            sticky: 'top',
            Cell: ({ value }: any) => {
            return <p className={` text-red-400 text-center w-full px-2 rounded-md bg-red-100`}>3.14%</p>;
            }, 
        }     
        ],
        []
    );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns,data });    

  return (
     <>
      <div className="relative w-full max-h-full  no-scrollbar">
        <table {...getTableProps()} className=" top-0">
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
                    <th className="p-2 bg-gray-100 text-gray-800 border-gray-300 border-b-[2px] mx-2" {...column.getHeaderProps()}>
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
                  <tr className="hover:shadow-lg hover:bg-white   " {...row.getRowProps()}>
                    {row.cells.map(
                      (cell: {
                        getCellProps: () => JSX.IntrinsicAttributes;
                        render: (arg0: string) => React.ReactChild | React.ReactFragment | null | undefined;
                      }) => {
                        return (
                          <td className=" text-black text-center " {...cell.getCellProps()}>
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
  )
}

export default Table