import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { GroupBase, OptionsOrGroups } from 'react-select';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateActiveOption } from 'redux/slices/expiryDates';
import { Layout, Navigator, SearchField, SelectWithTitle } from 'components';
import { selectItemProps } from 'interfaces';
import { Top } from 'styles/common';

import OpenInterestChart from './Chart';
import OpenInterestDashboard from './Dashboard';
import OpenInterestMaxPain from './MaxPain';
import { updateRequestType } from '../../redux/slices/requestType';

export default function OpenInterest() {
  const { path } = useRouteMatch();

  const [expiryOptions, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);
  const expiryDates = useAppSelector((state) => state.expiryDates.option);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (expiryDates.length) {
      setExpiryOptions(
        expiryDates.map((data) => ({
          value: data,
          label: data,
        })),
      );
    }
  }, [expiryDates]);

  useEffect(() => {
    dispatch(
      updateRequestType({
        label: 'Option',
        value: 'OPTION',
      }),
    );
  }, [dispatch]);

  return (
    <Layout>
      <Navigator
        title="Open Interest"
        items={[
          { title: 'DashBoard', path: `${path}/dashboard` },
          { title: 'Greeks', path: `${path}/chart` },
          { title: 'Max Pain', path: `${path}/max-pain` },
        ]}
      />

      <TopContainer>
        <Top>
          <SearchField />

          <SelectWithTitle
            title="Expire Date"
            options={expiryOptions}
            value={expiryOption}
            onChange={(val) => {
              if (val) dispatch(updateActiveOption(val));
            }}
          />
        </Top>
      </TopContainer>

      <Switch>
        <Route path={`${path}/dashboard`} exact>
          <OpenInterestDashboard />
        </Route>
        <Route path={`${path}/chart`} exact>
          <OpenInterestChart />
        </Route>
        <Route path={`${path}/max-pain`} exact>
          <OpenInterestMaxPain />
        </Route>
        <Route path="*">
          <Redirect to={`${path}/dashboard`} />
        </Route>
      </Switch>
    </Layout>
  );
}

const TopContainer = styled.div`
  margin: 0 3em;
`;
