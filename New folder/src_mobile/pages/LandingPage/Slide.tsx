import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';

export default function Login() {
  const auth = useAppSelector((state) => state.user.isAuth);

  return (
    <div>
      <Section>
        <NavContainer>
          <img src="/assets/logo_with_text.png" alt="logo" />
          {auth ? <Link to="/future">Open App</Link> : <Link to="/login">LOGIN</Link>}
        </NavContainer>
        <SlideContainer>
          <Text>
            <h1>
              Your Favorite Stock
              <br />
              We’ll Show To You
            </h1>
            <h3>Contrary to popular belief, Lorem Ipsum.</h3>
            {auth ? <Link to="/future">Open App</Link> : <Link to="/signup">SIGN UP</Link>}
          </Text>
          <Image>
            <img src="/assets/bg.svg" alt="home" height="100%" width="100%"></img>
          </Image>
        </SlideContainer>
      </Section>
      <Line>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </Line>
    </div>
  );
}

const NavContainer = styled.div`
  padding: 1.5em 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  position: absolute;
  width: 100%;
  z-index: 2;
  img {
    width: 14rem;
  }
  a {
    background: ${(p) => p.theme.palette.white};
    border: 1px solid ${(p) => p.theme.palette.primary};
    box-sizing: border-box;
    border-radius: 8px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 2rem;
    text-align: center;
    color: ${(p) => p.theme.palette.primary};
    padding: 0.6em;
    padding-left: 1.5em;
    padding-right: 1.5em;
    @media only screen and (max-width: 700px) {
      display: none;
    }
  }
`;

const Section = styled.section`
  overflow: hidden;
  position: relative;
`;

const SlideContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 1024px) {
    text-align: center;
  }
`;

const Text = styled.div`
  padding: 5em;
  white-space: nowrap;
  flex-grow: 1;
  @media only screen and (max-width: 700px) {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 3;
  }
  h1 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 4rem;
    line-height: 136.5%;
  }
  h3 {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 2rem;
    line-height: 136.5%;
    padding-bottom: 2em;
  }
  a {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 2rem;
    align-items: center;
    text-align: center;
    background: ${(p) => p.theme.palette.white};
    border: 1px solid ${(p) => p.theme.palette.primary};
    color: ${(p) => p.theme.palette.primary};
    box-sizing: border-box;
    border-radius: 50px;
    padding: 0.6em;
    padding-left: 2em;
    padding-right: 2em;
  }
`;

const Image = styled.div`
  max-width: 700px;
  @media only screen and (max-width: 700px) {
    position: absolute;
    top: 0;
    right: 0;
    width: 90%;
    z-index: 1;
    opacity: 0.2;
  }
`;

const Line = styled.div`
  .line1 {
    border-radius: 50%;
    height: 3vh;
    background-color: ${(p) => p.theme.palette.primary};
    border-radius: 0px 16px 16px 0px;
    width: 10%;
    margin: 10px 0;
    justify-content: flex-end;

    @media screen and (max-width: 700px) {
      width: 20%;
    }
  }
  .line2 {
    border-radius: 50%;
    height: 3vh;
    background-color: ${(p) => p.theme.palette.primary};
    border-radius: 0px 16px 16px 0px;
    width: 15%;
    margin: 10px 0;
    justify-content: flex-end;

    @media screen and (max-width: 700px) {
      width: 30%;
    }
  }

  .line3 {
    border-radius: 50%;
    height: 3vh;
    background-color: ${(p) => p.theme.palette.primary};
    border-radius: 0px 16px 16px 0px;
    width: 6%;
    margin: 10px 0;
    justify-content: flex-end;

    @media screen and (max-width: 700px) {
      width: 12%;
    }
  }
`;
