import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import styled from 'styled-components';
import { customAxiosError } from 'interfaces';
import { ButtonLoader, SimpleNavbar } from 'components';
import { Theme } from 'constants/theme';
import { BREAKPOINTS } from 'constants/breakpoints';
import { useAppDispatch } from '../redux/hooks';
import { updateLogin } from '../redux/slices/user';

const Login = () => {
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const dispatch = useAppDispatch();
  const history = useHistory();

  const onSubmit = async (postData: any) => {
    if (!postData.email || !postData.password || loading) return;

    setLoading(true);
    try {
      const { data } = await axios.post('/v1/api/user/login', postData);
      console.log(data);
      setSuccess('Logged in successfully');

      dispatch(
        updateLogin({
          isAuth: true,
          token: data.data,
        }),
      );

      setLoading(false);

      setTimeout(() => {
        history.push('/future');
      }, 1500);
    } catch (error) {
      setLoading(false);
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

  return (
    <Section>
      <SimpleNavbar />
      <LoginContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Welcome back !</h1>
          <h2>Please enter your details.</h2>
          <label>E-Mail</label> <input type="mail" placeholder="Enter your mail ID" {...register('email')} />
          <br />
          <label>Password</label> <input type="Password" placeholder="Enter password" {...register('password')} />
          <br />
          <div>
            <Link to="#">Forgot password</Link>
          </div>
          <button type="submit">Submit {loading && <ButtonLoader color={Theme.palette.black} size={15} />}</button>
          <br />
          <h4>
            Don’t have an account? <br />
            <Link to="/signup">
              <span>sign up for free</span>
            </Link>
          </h4>
          <div>
            <p>{success}</p>
          </div>
        </form>
      </LoginContainer>
      <TextContainer>
        <Text>
          <h1>““Trade options using pro tools, or with expert advice. Trade with real money, or learn and practice with virtual money””</h1>
          <h2>TealVue</h2>
        </Text>
      </TextContainer>
    </Section>
  );
};

export default Login;

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;

  @media screen and (max-width: ${BREAKPOINTS.md}) {
    grid-template-columns: 1fr;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${BREAKPOINTS.md}) {
    background-image: url(/assets/login.jpg);
    background-repeat: no-repeat;
    form {
      background-color: ${(p) => p.theme.palette.white};
    }
  }

  form {
    padding: 2em;
    border-radius: ${(p) => p.theme.style.borderRadius};
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
    font-size: 1.5rem;
    border: 1px solid rgba(0, 0, 0, 0.76);
    border-radius: 0.5em;
    margin: 0.5em 0;
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

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(/assets/login.jpg);
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
  background: linear-gradient(118.9deg, rgba(255, 255, 255, 0.2714) 31.5%, rgba(209, 216, 225, 0.0552) 130.73%);
  box-shadow: 0px 4px 51px rgba(0, 0, 0, 0.46), inset 0px 0px 24px rgba(255, 255, 255, 0.32);
  backdrop-filter: blur(16px);
  border-radius: 10px;

  h1 {
    width: 90%;
    font-style: normal;
    font-weight: bold;
    font-size: 1.5rem;
    color: ${(p) => p.theme.palette.white};
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  h2 {
    padding-top: 2em;
    font-size: 2rem;
    color: ${(p) => p.theme.palette.white};
    @media screen and (max-width: 1024px) {
      display: flex;
    }
  }
`;
