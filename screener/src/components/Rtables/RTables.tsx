import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import {tableDataProps} from "../../interfaces"


const TablesComp = ({tableData,columnFormat}:tableDataProps) => {

    const data = useMemo(() => tableData, [tableData]);

      const columns = useMemo(
    () => columnFormat,
    [columnFormat],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <>
      <div className="relative w-full max-h-full ">
        <table {...getTableProps()} className="overflow-x-scroll top-0">
          <thead className="px-6">
            {headerGroups.map(
              (headerGroup: {
                getHeaderGroupProps: () => JSX.IntrinsicAttributes &
                  React.ClassAttributes<HTMLTableRowElement> &
                  React.HTMLAttributes<HTMLTableRowElement>;
                headers: any[];
              }) => (
                <tr className="sticky" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th className="p-2 bg-gray-100 text-gray-800 border-0 border-gray-100 px-4" {...column.getHeaderProps()}>
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
                  <tr className="hover:shadow-lg hover:bg-white hover:border-l-8 hover:border-blue-600 py-4 hover:pl-4" {...row.getRowProps()}>
                    {row.cells.map(
                      (cell: {
                        getCellProps: () => JSX.IntrinsicAttributes;
                        render: (arg0: string) => React.ReactChild | React.ReactFragment | null | undefined;
                      }) => {
                        return (
                          <td className=" text-black p-0 border-0 border-b-2 py-2" {...cell.getCellProps()}>
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
}

export default TablesComp