import styled from 'styled-components';

const Services = () => {
  return (
    <div>
      <ServicesContainer id="Services">
        <h1>
          <span>Secure </span>Investment
        </h1>
        <h3>
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book, .
        </h3>
        <ServicesWrapper>
          <ServicesCard>
            <h2>Custom, high-return Strategies</h2>
            <p>
              High-return, back-tested screeners you can add to your portfolio. DVM strategies choose high scoring stocks, helping you avoid
              weak investments
            </p>
            <a href="Home">Read More</a>
          </ServicesCard>
          <ServicesCard>
            <h2>Custom, high-return Strategies</h2>
            <p>
              High-return, back-tested screeners you can add to your portfolio. DVM strategies choose high scoring stocks, helping you avoid
              weak investments
            </p>
            <a href="Home">Read More</a>
          </ServicesCard>
          <ServicesCard>
            <h2>Custom, high-return Strategies</h2>
            <p>
              High-return, back-tested screeners you can add to your portfolio. DVM strategies choose high scoring stocks, helping you avoid
              weak investments
            </p>
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

export default Services;

const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 4rem;
    line-height: 72px;
    text-align: center;

    span {
      color: ${(p) => p.theme.palette.primary};
      text-decoration: underline;
    }
  }

  h3 {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 2.5rem;
    line-height: 36px;
    text-align: center;
    padding: 10px;
  }
`;

const ServicesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 60px;
  padding: 2em;

  @media screen and (max-width: 868px) {
    grid-template-columns: 1fr;
  }
  @media screen and (max-width: 320px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ServicesCard = styled.div`
  border-radius: 10px;
  padding: 5em;
  box-shadow: ${(p) => p.theme.style.boxShadow};
  border-radius: ${(p) => p.theme.style.borderRadius};
  background-color: ${(p) => p.theme.palette.white};

  h2 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 2.375rem;
    line-height: 33px;
    text-align: center;
  }

  p {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 1.913rem;
    line-height: 31px;
    padding-top: 2em;
    padding-bottom: 2em;

    color: ${(p) => p.theme.palette.lightBlack};
  }

  a {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 2rem;
    line-height: 33px;

    color: ${(p) => p.theme.palette.primary};
  }
`;

const Line = styled.div`
  transform: rotate(180deg);

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
