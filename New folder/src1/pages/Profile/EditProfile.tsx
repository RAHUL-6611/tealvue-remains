import axios from 'axios';
import { customAxiosError } from 'interfaces';
import React, { useState, useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

interface UserDetails {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number: string;
  location: string;
  aboutme: String;
}

export const validate = (values: UserDetails) => {
  let errors: any = {};
  if (!values.username.trim()) {
    errors.username = 'Username is required';
  }
  if (!values.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be 8 or more characters';
  }
  if (!values.confirm_password.trim()) {
    errors.confirm_password = 'Password is required';
  } else if (values.confirm_password !== values.password) {
    errors.confirm_password = 'password do not match';
  }
  return errors;
};

const App = () => {
  const [imgPreview, setImgPreview] = useState(null);
  const [error, setError] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const colors = useMemo(() => ['#C4C4C4', '#e5Af55', '#1122ee', '#45bbaf', '#f0f1fa'], []);
  const [success, setSuccess] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetails>();

  let jwt;
  const token = localStorage.getItem('user');
  if (token) {
    const decodedToken = JSON.parse(token);
    jwt = decodedToken.data;
  }
  const config = {
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  };
  const onSubmit: SubmitHandler<UserDetails> = async (postData) => {
    console.log(postData);

    try {
      const tokenn = localStorage.getItem('token');
      console.log(tokenn);
      const { data } = await axios.post('/user/edit', postData, config);
      console.log(data);
      setSuccess('Profile updated');
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

  useEffect(() => {
    document.getElementById('geeks')!.style.backgroundColor = colors[colorIndex];
  }, [colors, colorIndex]);

  function handleChangeIndex() {
    const next = colorIndex + 1 === colors.length ? 0 : colorIndex + 1;
    setColorIndex(next);
  }

  const handleImageChange = (e: any) => {
    setError(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result as any);
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
    }
  };

  return (
    <ProfileContainer>
      <Icon>
        <div id="geeks">
          <span className="icon-pencil" onClick={handleChangeIndex}></span>
        </div>
      </Icon>

      <Profile>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Container>
              {' '}
              <label>User name </label> <input type="text" placeholder="Enter User Name......" {...register('username')} />
              {errors.username && <p>{errors.username}</p>}
              <br />
              <label>E-Mail</label> <input type="mail" placeholder="Enter Mail......" {...register('email')} />
              {errors.email && <p>{errors.email}</p>}
              <br />
              <label>Phone Number</label> <input type="phonenumber" placeholder="Enter Phone Number......" {...register('phone_number')} />
              {errors.phone_number && <p>{errors.phone_number}</p>}
              <br />
              <label>Location</label> <input type="location" placeholder="Enter Location......" {...register('location')} />
              {errors.location && <p>{errors.location}</p>}
              <br />
              <label>About:</label> <input type="about" placeholder="Enter About......" {...register('aboutme')} />
              {errors.aboutme && <p>{errors.aboutme}</p>}
              <br />
              <br />
            </Container>
          </div>
          <div>
            <Me>
              <ProfileImage>
                {error && <p className="errorMsg">File not supported</p>}
                <div
                  className="imgPreview"
                  style={{
                    background: imgPreview
                      ? `url("${imgPreview}") no-repeat center/cover`
                      : 'url(/assets/profile.svg)no-repeat center/cover',
                  }}
                >
                  {!imgPreview && (
                    <>
                      <label htmlFor="fileUpload" className="customFileUpload">
                        <span className="icon-pencil"></span>
                      </label>
                      <input type="file" id="fileUpload" onChange={handleImageChange} />
                    </>
                  )}
                </div>
                <Socialmediaicon>
                  <div className="round">
                    <span className="icon-whatsapp"></span>
                  </div>
                  <div className="round">
                    <span className="icon-instagram"></span>
                  </div>
                  <div className="round">
                    <span className="icon-facebook"></span>
                  </div>
                  <div className="round">
                    <span className="icon-apple1"></span>
                  </div>
                </Socialmediaicon>
              </ProfileImage>
            </Me>
          </div>
          <button type="submit" value="Update" onSubmit={handleSubmit(onSubmit)}>
            Submit
          </button>
        </form>
        <p>{success}</p>
      </Profile>
    </ProfileContainer>
  );
};

export default App;

const ProfileImage = styled.div`
  box-sizing: border-box;
  font-family: sans-serif;
  .container {
    @media only screen and (max-width: 700px) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .errorMsg {
    color: red;
    font-size: 24px;
    margin: 3px 0;
  }
  .imgPreview {
    width: 25em;
    height: 25em;
    display: flex;
    flex-direction: column;
    color: ${(p) => p.theme.palette.white};
    @media only screen and (max-width: 700px) {
      width: 16em;
      height: 16em;
    }
  }
  .imgPreview input[type='file'] {
    display: none;
  }
  .imgPreview .customFileUpload {
    color: ${(p) => p.theme.palette.primary};
    font-size: 22px;
    font-weight: 500;
    cursor: pointer;
  }
  button {
    border: none;
    outline: none;
    width: 100%;
    margin: 10px 0 0 0;
    padding: 14px 10px;
    background-color: ${(p) => p.theme.palette.primary};
    font-size: 17px;
    font-weight: 600;
    cursor: pointer;
  }
  span {
    padding: 0.3em;
    background: ${(p) => p.theme.palette.primary};
    border-radius: 4px;
    font-size: 0.8em;
    color: ${(p) => p.theme.palette.white};
    float: right;
    margin: 0 auto;
    margin-right: 0.5em;
    margin-top: 0.3em;
    @media only screen and (max-width: 700px) {
      padding: 0.2em;
      font-size: 0.5em;
    }
  }
`;

const ProfileContainer = styled.div`
  position: relative;
  padding: 2em;
`;

const Me = styled.div`
  justify-content: center;
  align-items: center;
`;
const Icon = styled.div`
  #geeks {
    width: 100%;
    height: 40vh;
    background-color: coral;
    color: white;
    span {
      padding: 0.5em;
      background: ${(p) => p.theme.palette.primary};
      border-radius: 4px;
      font-size: 1.5em;
      color: ${(p) => p.theme.palette.white};
      float: right;
      margin: 0 auto;
      margin-right: 0.5em;
      margin-top: 0.3em;
      @media only screen and (max-width: 700px) {
        padding: 0.3em;
        font-size: 1em;
      }
    }
  }
`;
const Profile = styled.div`
  height: 80vh;
  padding-top: 6em;
  margin-left: 5em;
  @media only screen and (max-width: 500px) {
    margin: 0 auto;
  }

  button {
    margin-top: 12em;
    border: none;
    padding: 0.5em;
    width: 9em;
    background: ${(p) => p.theme.palette.primary};
    color: ${(p) => p.theme.palette.white};
    box-sizing: border-box;
    border-radius: 32px;
    cursor: pointer;
  }
`;

const Container = styled.div`
  height: 80vh;
  width: 50%;
  float: left;
  label {
    width: 25%;
    font-size: 1.8em;
    color: ${(p) => p.theme.palette.grey};
    display: flex;
    display: inline-block;
    font-family: inherit;
    font-style: normal;
    font-weight: 600;
    color: ${(p) => p.theme.palette.primary};
    @media only screen and (max-width: 700px) {
      font-size: 1.4em;
    }
  }
  input {
    width: 20em;
    margin: 8px 0;
    padding-left: 1.5em;
    padding-right: 1.5em;
    background: ${(p) => p.theme.palette.white};
    border: 2px solid ${(p) => p.theme.palette.primary};
    box-sizing: border-box;
    border-radius: 3em;
    font-family: inherit;
    font-style: normal;
    font-weight: 600;
    font-size: 1.8em;
    line-height: 43px;
    letter-spacing: 0.105em;
    @media only screen and (max-width: 700px) {
      font-size: 1.2em;
      height: 4em;
      width: 15em;
    }
  }
  input[type='about'] {
    padding: 1.8em;
    padding-bottom: 6em;
    border-radius: 32px;
    background: ${(p) => p.theme.palette.white};
    border: 2px solid ${(p) => p.theme.palette.primary};
    box-sizing: border-box;
    font-family: inherit;
    font-style: normal;
    font-weight: 600;
    font-size: 1.8em;
    line-height: 43px;
    letter-spacing: 0.105em;
    @media only screen and (max-width: 700px) {
      font-size: 1.2em;
    }
  }
`;
const Socialmediaicon = styled.div`
float: left;
display:flex;
margin-top:1em;
div{
    font-size: 2rem;
    font-weight: 500;
  }
  .round {
    color: ${(p) => p.theme.palette.white};
    span {
      font-size: 2rem;
    }
    
`;
