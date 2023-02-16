import styled from 'styled-components';

export default function Notification() {
  return (
    <Container>
      <Top>
        <h3>Last 24 hours</h3>

        <div>
          <NotificationContent>
            <div>
              <h1>
                Barclays Maintains Equal-Weight on Emerson Electric, Ra Barclays Maintains Equal-Weight on Emerson Electric, Ra Barclays
                Maintains Equal-Weight on Emerson Electric, Ra
              </h1>
              <h4>Just now</h4>
            </div>
          </NotificationContent>
          <NotificationContent>
            <div>
              <h1>
                Barclays Maintains Equal-Weight on Emerson Electric, Ra Barclays Maintains Equal-Weight on Emerson Electric, Ra Barclays
                Maintains Equal-Weight on Emerson Electric, Ra
              </h1>
              <h4>30 minutes ago</h4>
            </div>
          </NotificationContent>
          <NotificationContent>
            <div>
              <h1>
                Barclays Maintains Equal-Weight on Emerson Electric, Ra Barclays Maintains Equal-Weight on Emerson Electric, Ra Barclays
                Maintains Equal-Weight on Emerson Electric, Ra
              </h1>
              <h4>1 hour ago</h4>
            </div>
          </NotificationContent>
        </div>
      </Top>
      <Top1>
        <h3>Earlier</h3>
        <div>
          <NotificationContent>
            <div>
              <h1>
                Barclays Maintains Equal-Weight on Emerson Electric, Ra Barclays Maintains Equal-Weight on Emerson Electric, Ra Barclays
                Maintains Equal-Weight on Emerson Electric, Ra
              </h1>
              <h4>1 day ago</h4>
            </div>
          </NotificationContent>
          <NotificationContent>
            <div>
              <h1>
                Barclays Maintains Equal-Weight on Emerson Electric, Ra Barclays Maintains Equal-Weight on Emerson Electric, Ra Barclays
                Maintains Equal-Weight on Emerson Electric, Ra
              </h1>
              <h4>October 2020</h4>
            </div>
          </NotificationContent>
        </div>
      </Top1>
    </Container>
  );
}

const Container = styled.div`
  background: ${(p) => p.theme.palette.lightBlue};
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    display: flex;
  }
`;

const Top = styled.div`
  padding: 0em 5em 0em 5em;
  width: 100%;
  h3 {
    padding-top: 1em;
    padding-bottom: 1em;
    font-weight: 100;
    font-family: inherit;
    font-style: normal;
    font-size: 1.8rem;
    color: ${(p) => p.theme.palette.grey};
    display: block;
  }
`;

const NotificationContent = styled.div`
  padding: 2.5em;
  @media screen and (max-width: 700px) {
    display: flex;
  }
  margin-top: 0.3em;
  display: flex;
  box-shadow: 0px 30px 70px 0px #0005271a;
  overflow: hidden;
  background: ${(p) => p.theme.palette.white};
  h4 {
    line-height: 2em;
    font-weight: 100;
    font-family: inherit;
    font-style: normal;
    font-size: 1.4rem;
    color: ${(p) => p.theme.palette.grey};
    display: block;
  }
  h1 {
    margin-bottom: 1.5em;
    font-weight: 300;
    color: #0a1426;
    display: block;
    font-family: inherit;
    font-style: normal;
    font-size: 1.6rem;
    line-height: 1.5em;
  }
  span {
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-right: 1em;
    font-size: 16px;
    color: ${(p) => p.theme.palette.grey};
    display: block;
  }
`;

const Top1 = styled(Top)`
  padding: 0em 5em 5em 5em;
`;
