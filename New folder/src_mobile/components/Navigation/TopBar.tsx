import React, { useRef, useState, useEffect } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';
import { SelectWithTitle, Button } from 'components';
import { activeItemProps, ITtableDataOptionChain, selectItemProps } from 'interfaces';
import { Top } from 'styles/common';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateActiveOption } from 'redux/slices/expiryDates';
import { CSVLink } from 'react-csv';
import ActiveTypesNew from 'components/ActiveTypesNew';
import { useHistory } from 'react-router-dom';

interface TopBarProps {
  tableData?: ITtableDataOptionChain;
  activeValues?: activeItemProps[];
}

const TopBar = ({ tableData, activeValues }: TopBarProps) => {
  // const [expiryOptions, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);
  const expiryDates = useAppSelector((state) => state.expiryDates.option);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const buttonRef = useRef<HTMLButtonElement>(null);

  // useEffect(() => {
  //   if (expiryDates.length) {
  //     setExpiryOptions(
  //       expiryDates.map((data) => ({
  //         value: data,
  //         label: data,
  //       })),
  //     );
  //   }
  // }, [expiryDates]);

  return (
    <div className="flex gap-2">
      <Top style={{ justifyContent: 'space-between' }}>
        <div className="bread">
          <div className="title">
            <h1>{history?.location.pathname.split('/')[1].toUpperCase()}</h1>
          </div>
          <div className="address flex gap-2 items-center">
            <span className="icon-home"></span>
            <span>•</span>
            <span>{`${history?.location.pathname.split('/')[1]} ${history.location.pathname.split('/')[2]}`}</span>
          </div>
        </div>

        <div className="flex gap-2 ">
          <ActiveTypesNew values={activeValues} />

          <SelectWithTitle
            title="Expire Date"
            options={expiryDates.map((date) => ({
              value: date,
              label: date,
            }))}
            value={expiryOption}
            onChange={(val) => {
              if (val) dispatch(updateActiveOption(val));
            }}
          />

          {tableData && (
            <Button ref={buttonRef}>
              <CSVLink data={tableData}>
                <div className="flex gap-2 ">
                  <span className="icon-cloud-download text-t1Primary"></span>
                  <span className="text-sm text-white">Save to CSV</span>
                  <span className="icon-arrow rotate-90 text-white"></span>
                </div>
              </CSVLink>
            </Button>
          )}
        </div>
      </Top>
    </div>
  );
};

export default TopBar;
