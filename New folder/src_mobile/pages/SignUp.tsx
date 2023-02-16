// imports
import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { customAxiosError } from 'interfaces';
import { ButtonLoader, SimpleNavbar } from 'components';
import { BREAKPOINTS } from 'constants/breakpoints';
import { Theme } from 'constants/theme';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    phone: Yup.string()
      // .required('Phone number is required')
      .min(10, 'Phone number must be 10 characters')
      .max(10, 'Phone number must not exceed 10 characters'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Password is required')
      .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/),
    // .matches(/^[aA-zZ\s]+$/),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirm_password: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const history = useHistory();

  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async (postData: any) => {
    console.log('click');
    if (!postData.email || !postData.password || loading) return;

    setLoading(true);

    try {
      const { data } = await axios.post('/v1/api/user/signup', postData);
      console.log(data);
      setSuccess('Registration is successful');
      localStorage.setItem('user', JSON.stringify(data));
      setLoading(false);

      setTimeout(() => {
        history.push('/login');
      }, 1500);
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

  return (
    <EditProfile>
      <SimpleNavbar />
      <ImageContainer>
        <Text>
          <h1>TealVue is the options analytics platform</h1>
          <h2>
            TealVue App is an options analytics app comprising of several tools that help to find, analyse and track options trading
            opportunities. Contact us.
          </h2>
        </Text>
      </ImageContainer>
      <LoginContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign up</h1>
          <h2>Start your free trail now.</h2>
          <label>Name</label>
          <input
            type="text"
            placeholder="username"
            {...register('username')}
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.username?.message}</div>
          <br />
          <label>Email</label>
          <input type="email" placeholder="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.email?.message}</div>
          <br />
          <label>Phone number</label>
          <input
            type="number"
            placeholder="phone_number"
            {...register('phone_number')}
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.phone?.message}</div>
          <br />
          <label>password</label>
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
          <br />
          <label>Confirm password</label>
          <input
            type="password"
            placeholder="confirm_password"
            {...register('confirm_password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
          <br />
          <h4>Must be at least 8 characters</h4>
          <div>
            <p className="text-success fw-bold">{success}</p>
          </div>

          <button type="submit">Submit {loading && <ButtonLoader color={Theme.palette.black} size={15} />}</button>
          <br />
        </form>
      </LoginContainer>
    </EditProfile>
  );
};
export default SignUp;

const EditProfile = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;

  @media screen and (max-width: ${BREAKPOINTS.md}) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(/assets/signup.jpg);
  background-repeat: no-repeat;

  @media screen and (max-width: ${BREAKPOINTS.md}) {
    display: none;
  }
`;

const Text = styled.div`
  padding: 5em;
  width: 80%;
  font-family: inherit;
  letter-spacing: 0.05em;
  h1 {
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 4rem;
    line-height: 64px;
    display: flex;
    align-items: center;
    text-transform: capitalize;
    color: ${(p) => p.theme.palette.white};
  }
  h2 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 2rem;
    line-height: 31px;
    display: flex;
    align-items: center;
    text-transform: capitalize;
    color: ${(p) => p.theme.palette.white};
  }
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${BREAKPOINTS.md}) {
    background-image: url(/assets/signup.jpg);
    background-repeat: no-repeat;
    form {
      background-color: ${(p) => p.theme.palette.white};
      margin-top: 8em;
    }
  }

  form {
    padding: 2em;
    border-radius: ${(p) => p.theme.style.borderRadius};
    margin-top: 5em;
  }

  label {
    font-weight: 500;
    font-size: 1.5rem;
    align-items: center;
    color: ${(p) => p.theme.palette.black};
  }

  input {
    display: block;
    width: 100%;
    padding: 1em 0.5em;
    padding-right: 10em;
    font-size: 1.5rem;
    border: 1px solid rgba(0, 0, 0, 0.76);
    border-radius: 0.5em;
    margin: 0.5em 0;
    @media screen and (max-width: ${BREAKPOINTS.md}) {
      padding: 0.5em 0.3em;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    padding: 1em;
    margin: 0.5em 0;
    background: ${(p) => p.theme.palette.primary};
    width: 100%;
    border: none;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;
    color: ${(p) => p.theme.palette.black};
    cursor: pointer;
  }

  h1 {
    font-weight: 600;
    font-size: 4rem;
    display: flex;
    align-items: center;
    color: ${(p) => p.theme.palette.black};
  }

  h2 {
    margin-bottom: 2em;
    font-weight: 400;
    font-size: 2rem;
    color: ${(p) => p.theme.palette.black};
  }

  h4 {
    font-size: 1.5rem;
    gap: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${(p) => p.theme.palette.lightBlack};
    span {
      color: ${(p) => p.theme.palette.black};
    }
  }
`;
