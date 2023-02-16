import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { Layout, Navigator } from 'components';
import MyAccount from './MyAccount';
import EditProfilePage from './EditProfile';
import Subscription from './Subscription';
import Contact from './Contact';
import Documents from './Document';
import Notification from './Notification';
import Billing from './Billing';

export default function Profile() {
  const { path } = useRouteMatch();

  return (
    <Layout>
      <Navigator
        title="Profile"
        items={[
          { title: 'My Account', path: `${path}/dashboard` },
          { title: 'Subscriptions', path: `${path}/subscription` },
          { title: 'Billing', path: `${path}/billing` },
          { title: 'Notifications', path: `${path}/notification` },
          { title: 'Documents', path: `${path}/documents` },
          { title: 'Contact Us', path: `${path}/contact` },
        ]}
      />
      <Switch>
        <Route path={`${path}/dashboard`} exact component={MyAccount} />
        <Route path={`${path}/subscription`} exact component={Subscription} />
        <Route path={`${path}/contact`} exact component={Contact} />
        <Route path={`${path}/documents`} exact component={Documents} />
        <Route path={`${path}/notification`} exact component={Notification} />
        <Route path={`${path}/billing`} exact component={Billing} />
        <Route path={`${path}/editprofile`} exact component={EditProfilePage} />
        <Route path="*">
          <Redirect to={`${path}/dashboard`} />
        </Route>
      </Switch>
    </Layout>
  );
}
