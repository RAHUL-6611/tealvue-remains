import { ThemeProvider } from 'styled-components';
import axios, { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Provider } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import 'styles/icons/style.css';
import './styles/global.css';

import { Theme } from 'constants/theme';
import GlobalStyle from 'styles/global';
import Router from './routers';
import { PersistGate } from 'redux-persist/integration/react';
import makeStore from 'redux/store';

axios.defaults.baseURL =
  process.env.REACT_APP_MODE === 'local'
    ? 'http://localhost:4000/'
    : process.env.REACT_APP_MODE === 'development'
    ? 'http://tealvue.in'
    : 'http://tealvue.in';

const errorComposer = (error: AxiosError) => {
  return () => {
    toast.dismiss();
    const statusCode = error.response ? error.response.status : null;

    if (statusCode === 400 || statusCode === 404) {
      toast.error(error?.response?.data?.message ?? 'Something went wrong ! Please try again later 😪');
    } else if (statusCode === 401) {
      toast.error('Please login to access this resource');
    } else {
      toast.error('Something went wrong ! Please try again later');
    }
  };
};

axios.interceptors.response.use(undefined, function (error) {
  error.handleGlobally = errorComposer(error);
  return Promise.reject(error);
});

function App() {
  return (
    <Provider store={makeStore.reduxStore}>
      <PersistGate loading={null} persistor={makeStore.persistor}>
        <ThemeProvider theme={Theme}>
          <GlobalStyle />
          <Router />
          <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={true} closeOnClick draggable={false} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
