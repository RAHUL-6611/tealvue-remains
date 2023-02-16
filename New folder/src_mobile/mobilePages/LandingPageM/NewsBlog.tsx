import styled from 'styled-components';

const NewsBlog = () => {
  return (
    <div>
      <ServicesContainer id="Services">
        <h1>
          <span>News </span> & Blogs
        </h1>

        <ServicesWrapper>
          <ServicesCard>
            <img src="/assets/blog1.jpg" alt="home" height="80%" width="100%"></img>
            <h2>What Superstars bought in Q2FY22</h2>
            <h3>Nov. 5, 2021, 4:30 p.m.</h3>
            <h3>The Baseline</h3>
            <p>It was popularized in the 1960s with the release of Letraset sheets containing Lorem</p>
            <a href="Home">Read More</a>
          </ServicesCard>
          <ServicesCard>
            <img src="/assets/blog1.jpg" alt="home" height="80%" width="100%"></img>
            <h2>What Superstars bought in Q2FY22</h2>
            <h3>Nov. 5, 2021, 4:30 p.m.</h3>
            <h3>The Baseline</h3>
            <p>It was popularized in the 1960s with the release of Letraset sheets containing Lorem</p>
            <a href="Home">Read More</a>
          </ServicesCard>
          <ServicesCard>
            <img src="/assets/blog1.jpg" alt="home" height="80%" width="100%"></img>
            <h2>What Superstars bought in Q2FY22</h2>
            <h3>Nov. 5, 2021, 4:30 p.m.</h3>
            <h3>The Baseline</h3>
            <p>It was popularized in the 1960s with the release of Letraset sheets containing Lorem</p>
            <a href="Home">Read More</a>
          </ServicesCard>
        </ServicesWrapper>
      </ServicesContainer>
      <Line>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </Line>
    </div>
  );
};

export default NewsBlog;

const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-family: Poppins;
    font-size: 5rem;
    font-style: normal;
    font-weight: 37.5rem;
    line-height: 4em;
    letter-spacing: 0em;
    text-align: center;

    span {
      color: ${(p) => p.theme.palette.primary};
      text-decoration: underline;
    }

    @media screen and (max-width: 340px) {
      grid-template-columns: 1fr;
      font-size: 4rem;
    }
  }
`;

const ServicesWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 3.75em;
  padding: 2em;

  @media screen and (max-width: 868px) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

const ServicesCard = styled.div`
  background: ${(p) => p.theme.palette.white};
  flex-direction: flex-start;

  left: 104px;
  top: 2049px;
  border-radius: 16px;
  box-shadow: 0px 0px 17px -3px rgba(0, 0, 0, 0.25);

  h2 {
    padding: 10px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 37.5em;
    font-size: 2em;
    line-height: 2em;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${(p) => p.theme.palette.black};
  }

  h3 {
    padding-left: 10px;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 1.5em;
    line-height: 1.5em;
    align-items: center;
    color: ${(p) => p.theme.palette.ashGrey};
  }

  p {
    padding: 10px;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 1.5em;
    line-height: 1.5em;
    width: 80%;
    display: flex;
    align-items: center;
    color: ${(p) => p.theme.palette.ashGrey};
  }

  a {
    padding: 10px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 37.5em;
    font-size: 1.5em;
    line-height: 2em;
    display: flex;
    align-items: center;
    color: ${(p) => p.theme.palette.black};
  }

  img {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
