import { Layout } from 'components';
import { StrategyDashBoard } from 'pages';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { updateRequestType } from '../../redux/slices/requestType';
import TopNavigation from '../../components/Navigation/TopNavigation';

export default function Strategy() {
  const dispatch = useAppDispatch();

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
      <TopNavigation />

      <StrategyDashBoard />
    </Layout>
  );
}
