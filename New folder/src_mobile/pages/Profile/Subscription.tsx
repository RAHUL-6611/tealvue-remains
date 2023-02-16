import styled from 'styled-components';

import { Theme } from 'constants/theme';

const Subscription = () => {
  return (
    <Container>
      <h1>
        <span>Flexable</span> plans
      </h1>
      <ProfileSection>
        <EditProfile>
          <Socialmediaicon>
            <div>
              <img src="/assets/plan/basicplan.svg" alt="logo" />
            </div>
            <div>
              <h1>Basic Plan</h1>
              <h1>FREE</h1>
            </div>
            <div>
              <h2>7 DAYS</h2>
            </div>
          </Socialmediaicon>
          <div className="line"></div>
          <Details>
            <li>Strategy Builder</li>
            <li>Analyse Trades</li>
            <li>Advanced Data Tools</li>
            <li>Whatsapp Alerts</li>
            <li>Real-Time Prices</li>
            <li>Basic Option Chain</li>
            <button>Order Now</button>
          </Details>
        </EditProfile>
        <EditProfiles>
          <Button>Popular</Button>
          <AdvancePlan>
            <div>
              <img src="/assets/plan/advanceplan.svg" alt="logo" />
            </div>
            <div>
              <h1>Advance Plan</h1>
              <h1>$10.00</h1>
            </div>
            <div>
              <h2>3 MONTH</h2>
            </div>
          </AdvancePlan>
          <div className="line"></div>
          <AdvanceDetail>
            <li>Strategy Builder</li>
            <li>Analyse Trades</li>
            <li>Advanced Data Tools</li>
            <li>Whatsapp Alerts</li>
            <li>Real-Time Prices</li>
            <li>Basic Option Chain</li>
            <button style={{ border: `1px solid ${Theme.palette.white}` }}>Order Now</button>
          </AdvanceDetail>
        </EditProfiles>
        <EditProfile>
          <Socialmediaicon>
            <div>
              <img src="/assets/plan/premium.svg" alt="logo" />
            </div>
            <div>
              <h1>Premium</h1>
              <h1>$20.00</h1>
            </div>
            <div>
              <h2>1 YEAR</h2>
            </div>
          </Socialmediaicon>
          <div className="line"></div>
          <Details>
            <li>Strategy Builder</li>
            <li>Analyse Trades</li>
            <li>Advanced Data Tools</li>
            <li>Whatsapp Alerts</li>
            <li>Real-Time Prices</li>
            <li>Basic Option Chain</li>
            <button>Order Now</button>
          </Details>
        </EditProfile>
      </ProfileSection>
    </Container>
  );
};
export default Subscription;

const Container = styled.div`
  margin: 1rem auto 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-weight: 600;
    font-size: 4rem;
    text-align: center;
    color: ${(p) => p.theme.palette.black};
    span {
      color: ${(p) => p.theme.palette.primary};
    }
  }
  h2 {
    font-size: 2rem;
    text-align: center;
    color: ${(p) => p.theme.palette.black};
  }
`;

const ProfileSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3em;
  margin: 2rem auto 0;
  @media screen and (max-width: 1400px) {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
`;
const EditProfile = styled.div`
  font-size: 1rem;
  background-color: ${(p) => p.theme.palette.white};
  box-shadow: 0px 4px 4rem 6px rgba(0, 0, 0, 0.25);
  border-radius: 2rem;
  padding: 2rem 0;
  transform: scale(1);
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 4rem 1rem rgba(0, 0, 0, 0.25);
  }
  .line {
    height: 0.25rem;
    margin: 1rem auto;
    background-color: ${(p) => p.theme.palette.primary};
  }
`;

const EditProfiles = styled(EditProfile)`
  background: ${(p) => p.theme.palette.primary};
  transform: scale(1);
  transition: all 0.3s;
  .line {
    background-color: ${(p) => p.theme.palette.white};
  }
  &:hover {
    transform: scale(1.02);
  }
`;

const Button = styled.div`
  width: 8rem;
  margin-right: 2rem;
  margin-left: auto;
  padding: 0.5rem;
  font-size: 1.6rem;
  background: ${(p) => p.theme.palette.white};
  box-shadow: 0px 4px 1rem rgba(0, 0, 0, 0.25);
  border-radius: 4rem;
  border: none;
`;

const Details = styled.div`
  text-align: center;
  li {
    line-height: 6rem;
    font-size: 1.5rem;
    text-align: center;
    color: ${(p) => p.theme.palette.black};
    list-style-type: none;
  }
  button {
    height: 3rem;
    margin: 0 auto;
    padding: 2rem 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(p) => p.theme.palette.primary};
    color: ${(p) => p.theme.palette.white};
    font-size: 1.5rem;
    font-weight: 700;
    border: none;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4rem;
    cursor: pointer;
  }
`;

const AdvanceDetail = styled(Details)`
  li {
    color: ${(p) => p.theme.palette.white};
  }
`;

const Socialmediaicon = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 2em;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0 2rem;
  img {
    height: 8em;
    width: 10em;
  }
  h1 {
    font-size: 1.5em;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: ${(p) => p.theme.palette.black};
  }
  h2 {
    font-family: inherit;
    font-style: normal;
    font-weight: 600;
    padding-left: 3.5em;
    font-size: 1.3em;
    line-height: 2em;
    color: ${(p) => p.theme.palette.black};
  }
`;

const AdvancePlan = styled(Socialmediaicon)`
  h1,
  h2 {
    color: ${(p) => p.theme.palette.white};
  }
`;
