import { Layout } from 'components';

import TopNavigation from '../../components/Navigation/TopNavigation';
import ChartHome from './Home';

export default function ChartDashboard() {
  return (
    <Layout>
      <TopNavigation />
      <ChartHome />
    </Layout>
  );
}
