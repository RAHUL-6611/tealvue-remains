import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { customAxiosError } from 'interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';

interface UserDetails {
  old_password: string;
  new_password: string;
}

export const validate = (values: UserDetails) => {
  let errors: any = {};
  if (!values.new_password) {
    errors.password = 'Password is required';
  } else if (values.new_password.length < 8) {
    errors.password = 'Password must be 8 or more characters';
  }
  if (!values.old_password.trim()) {
    errors.confirm_password = 'Password is required';
  } else if (values.old_password !== values.new_password) {
    errors.confirm_password = 'password do not match';
  }
  return errors;
};

const App = () => {
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
      const { data } = await axios.post('/v1/api/user/reset', postData, config);

      console.log(data);
      setSuccess('Registration is successful');
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

  return (
    <ProfileContainer>
      <Section>
        <Icon>
          <div id="geeks">
            <span className="icon-pencil" onClick={handleChangeIndex}></span>
          </div>
        </Icon>
        <ProfileSection>
          <EditProfile>
            <Profile>
              <div className="round">
                <span className="icon-user"></span>
              </div>
            </Profile>
            <Details>
              <h3>Sham Guru</h3>
              <h5>guru@tealvue.com</h5>
              <h4>Plan 1</h4>
              <div className="buttons">
                <div className="row">
                  <Link to="/profile/editprofile">
                    <button className="facebook">
                      <span className="icon-pencil"></span>Edit Profile
                    </button>
                  </Link>
                  <button className="instagram">
                    <span className="icon-diamond"></span>
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </Details>
            <Icon>
              <h1>ON THE WEB</h1>
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
                <div className="round">
                  <span className="icon-user"></span>
                </div>
                <div className="round">
                  <span className="icon-user"></span>
                </div>
              </Socialmediaicon>
              <h2>MEMBER SINCE: JUNE 1, 2020</h2>
            </Icon>
          </EditProfile>
          <Text>
            <div>
              <About>
                <div>
                  <h1>About Me</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat ut facilisis rutrum donec tristique mauris est ac nunc.
                    Eget nec, lorem mi libero accumsan
                  </p>
                </div>
              </About>
              <PassWordContainer>
                <h1>Change Password</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Password>
                    <input type="password" id="reset-password" placeholder="Enter password..." {...register('old_password')} />
                    {errors.old_password && <p>{errors.old_password}</p>}
                  </Password>
                  <ConfirmPassword>
                    <input type="password" id="reset-confirmPw" placeholder="New password..." {...register('new_password')} />
                    {errors.new_password && <p>{errors.new_password}</p>}
                  </ConfirmPassword>
                  <Button>
                    <button>Change Password</button>
                  </Button>
                </form>
              </PassWordContainer>
              <p>{success}</p>
            </div>
          </Text>
        </ProfileSection>
      </Section>
    </ProfileContainer>
  );
};
export default App;

const ProfileContainer = styled.div`
  position: relative;
  padding: 3em;
  @media (max-width: 1024px) {
    height: 200vh;
    display: flex;
  }
`;
const Section = styled.div`
  width: 100%;
  z-index: 1;
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
  
  @media only screen and (max-width: 700px) {
    justify-content: center;
    align-items: center;
  }
`;
const ProfileSection = styled.div`
  justify-content: space-between;
  align-items: center;
  margin-left: 5em;
  display: flex;
  position: relative;
  bottom: 100px;
  z-index: 2;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-right: 5em;
  }
`;
const EditProfile = styled.div`
  position: relative;
  padding: 2em;
  line-height: 4em;
  background: ${(p) => p.theme.palette.white};
  box-shadow: 0px 4px 44px 6px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
  margin-bottom: 10em;
`;
const About = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 3em;
  P {
    padding-left: 2em;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 33px;
    display: flex;
    align-items: center;
    letter-spacing: 0.05em;
    color: #045f5f;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  div {
    font-size: 2rem;
    font-weight: 500;
  }
  .round {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 10px solid ${(p) => p.theme.palette.primary};
    width: 8em;
    height: 8em;
    border-radius: 50%;
    margin-right: 0.5em;
    color: ${(p) => p.theme.palette.white};
    span {
      font-size: 10rem;
    }
  }
  .icon-user:before {
    color: ${(p) => p.theme.palette.primary};
  }
`;

const Details = styled.div`
  align-items: center;
  text-align: center;
  justify-content: center;
  h3 {
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 3rem;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;
    color: ${(p) => p.theme.palette.primary};
  }
  h5 {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 1.5rem;
    color: ${(p) => p.theme.palette.primary};
  }
  h4 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 2rem;
    color: ${(p) => p.theme.palette.grey};
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .buttons .row {
  }
  .buttons .row button {
    margin: 1em;
    width: 13em;
    line-height: 2.5em;
    font-style: normal;
    font-weight: 600;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    border: none;
    box-shadow: 0px 4px 15px rgba(34, 34, 47, 0.15);
    border-radius: 39.5px;
    cursor: pointer;
    color: ${(p) => p.theme.palette.white};
  }
  .row button.facebook,
  .row button.facebook {
    background: linear-gradient(263.86deg, #008080 -33.29%, #045f5f 20.16%, #008080 91.49%);
    box-shadow: 0px 4px 15px rgba(34, 34, 47, 0.15);
    border-radius: 39.5px;
    span {
      padding: 0.5em;
    }
  }
  .row button.instagram,
  .row button.instagram {
    background: #ffffff;
    box-shadow: 0px 4px 15px rgba(34, 34, 47, 0.15);
    border-radius: 39.5px;
    color: ${(p) => p.theme.palette.primary};
    span {
      padding: 0.5em;
    }
  }
`;

const Icon = styled.div`
  align-items: center;
  h1 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 33px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.105em;
    color: rgba(31, 30, 50, 0.44);
  }
  h2 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 1rem;
    line-height: 27px;
    display: flex;
    margin-top: 1em;
    align-items: center;
    text-align: center;
    letter-spacing: 0.105em;
    justify-content: space-around;
    color: rgba(31, 30, 50, 0.44);
  }
`;

const Socialmediaicon = styled.div`
align-items: center;
display:flex;
div {
    font-size: 2rem;
    font-weight: 500;
  }
  .round {
    background-color: ${(p) => p.theme.palette.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    margin-right: 0.5em;
    color: ${(p) => p.theme.palette.white};
    span {
      font-size: 2rem;
    }
    
`;

const Text = styled.div`
  padding-left: 10em;
  padding-right: 10em;
  display: flex;
  h1 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 2em;
    line-height: 37px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;
    color: #046363;
  }
  p {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 1.5em;
    line-height: 2em;
    display: flex;
    align-items: center;
    letter-spacing: 0.04em;
    color: #045f5f;
  }
  h3 {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    display: flex;
    font-size: 2rem;
    line-height: 136.5%;
  }
`;
const PassWordContainer = styled.div`
  padding-top: 3em;
  align-items: center;
  text-align: center;
  justify-content: center;
  background: linear-gradient(256.83deg, #0a6262 16.14%, #008080 92.44%);
  border-radius: 24px;
  h1 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 400;
    font-size: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    letter-spacing: 0.04em;
    color: ${(p) => p.theme.palette.white};
  }
`;

const Password = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 1em;
  flex-direction: row;
input {
padding: 0.6em;
padding-left: 5em;
padding-right: 5em;
line-height:2em;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.03em;
background: ${(p) => p.theme.palette.white};
box-shadow: 0px 4px 15px rgba(34, 34, 47, 0.15);
border-radius: 39.5px;
border: none;
 ::placeholder{
    color: #698585;;
  font-size: 1.4rem;
  }
  
  @media screen and (max-width: 1024px) {
    padding-left: 3em;
    padding-right: 3em;
  }
`;

const ConfirmPassword = styled.div`
display:flex;
flex-direction: row;
align-items: center;
text-align: center;
justify-content: center;
padding:1em;
input{
padding: 0.6em;
padding-left: 5em;
padding-right: 5em;
line-height:2em;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.03em;
background: ${(p) => p.theme.palette.white};
box-shadow: 0px 4px 15px rgba(34, 34, 47, 0.15);
border-radius: 39.5px;
border: none;
 ::placeholder{
    color: #698585;
  font-size: 1.4rem;
}
@media screen and (max-width: 1024px) {
  padding-left: 3em;
  padding-right: 3em;
}
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 2em;
  button {
    width: 10em;
    line-height: 2.5em;
    font-style: normal;
    font-weight: 600;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    border: none;
    background: ${(p) => p.theme.palette.white};
    box-shadow: 0px 4px 15px rgba(34, 34, 47, 0.15);
    border-radius: 39.5px;
    cursor: pointer;
    color: ${(p) => p.theme.palette.primary};
  }
`;
