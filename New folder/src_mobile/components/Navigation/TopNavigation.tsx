import React from 'react';
import { SearchField, SelectWithTitle } from '..';
import { selectItemProps } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateActiveFuture, updateActiveOption } from '../../redux/slices/expiryDates';
import { updateScreenerSelection } from '../../redux/slices/requestType';
import { ISearchFieldProps } from '../SearchField';

interface ITopNavigationProps {
  searchProps?: ISearchFieldProps;
  isScreenerDropDown?: boolean;
}

const TopNavigation = ({ searchProps, isScreenerDropDown }: ITopNavigationProps) => {
  const requestType = useAppSelector((state) => state.requestType.value);
  const screener = useAppSelector((state) => state.requestType.screenerSelection);
  const screenerList = useAppSelector((state) => state.requestType?.screenerList);

  const expiryDates = useAppSelector((state) => (requestType === 'OPTION' ? state.expiryDates.option : state.expiryDates.future));
  const selectedExpiry = useAppSelector((state) =>
    requestType === 'OPTION' ? state.expiryDates.activeOption : state.expiryDates.activeFuture,
  );
  const dispatch = useAppDispatch();

  return (
    <div className="p-2 px-4 flex justify-between items-center">
      <div className="flex flex-1 gap-4">
        <div className="w-3/12">
          <SearchField {...searchProps} />
        </div>

        <div>
          <SelectWithTitle
            title="Expire Date"
            options={expiryDates.map((date) => ({
              value: date,
              label: date,
            }))}
            value={selectedExpiry}
            onChange={(val) => {
              if (val) {
                if (requestType === 'OPTION') dispatch(updateActiveOption(val));
                else dispatch(updateActiveFuture(val));
              }
            }}
          />
        </div>

        {isScreenerDropDown && (
          <div className="w-5/12">
            <SelectWithTitle
              title="Filters"
              options={screenerList}
              value={screener}
              onChange={(val) => {
                if (val) dispatch(updateScreenerSelection(val as selectItemProps));
              }}
            />
          </div>
        )}
      </div>

      <div>
        <div className="hidden sm:block transition-all duration-300">
          <div className="flex justify-center">
            <div className="relative group h-0">
              <div className="flex flex-row cursor-pointer truncate rounded">
                <div className="flex items-center gap-2 w-full text-sm p-2">
                  <img src="/assets/svg/user-icon.svg" alt="user icon" />
                  <span>Jack sparrow</span>
                  <span className="icon-arrow rotate-90"></span>
                </div>
              </div>

              <div className="absolute w-full hidden group-hover:block rounded-b border-t-0 z-[100] border">
                <div className="shadow-xl w-44 bg-white">
                  <a className="text-sm p-4 hover:bg-slate-100 cursor-pointer border-b block" href="/en">
                    Profile
                  </a>

                  <a className="text-sm p-4 hover:bg-slate-100 cursor-pointer border-b block" href="/de">
                    Contact
                  </a>

                  <a className="text-sm p-4 hover:bg-slate-100 cursor-pointer border-b block" href="/de">
                    Settings
                  </a>

                  <a className="text-sm p-4 hover:bg-slate-100 cursor-pointer border-b block" href="/de">
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="h-16"></div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
