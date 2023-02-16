import axios, { AxiosError } from 'axios';
import { Provider } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '../src/assets/icons/style.css';

import store from './redux/store';
import UserRouters from './routers';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'https://tealvue.in' : '/';

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
    <Provider store={store}>
      <UserRouters />
      <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={true} closeOnClick draggable={false} />
    </Provider>
  );
}

export default App;
