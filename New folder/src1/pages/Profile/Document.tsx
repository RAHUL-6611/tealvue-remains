import styled from 'styled-components';

const NewsBlog = () => {
  return (
    <div>
      <DocumentContainer>
        <DocumentSection>
          <Image>
            <img src="/assets/document/document1.svg" alt="home" height="100%" width="100%"></img>
          </Image>
          <Text>
            <h1>Download user manual</h1>
          </Text>
        </DocumentSection>
        <DocumentSection>
          <Image>
            <img src="/assets/document/document2.svg" alt="home" height="100%" width="100%"></img>
          </Image>
          <Text1>
            <h1>AvatarTechnology Services</h1>
          </Text1>
        </DocumentSection>
        <DocumentSection>
          <Image>
            <img src="/assets/document/document3.svg" alt="home" height="100%" width="100%"></img>
          </Image>
          <Text1>
            <h1>Computer Communications</h1>
          </Text1>
        </DocumentSection>
        <DocumentSection>
          <Image>
            <img src="/assets/document/document4.svg" alt="home" height="100%" width="100%"></img>
          </Image>
          <Text1>
            <h1>Billing</h1>
          </Text1>
        </DocumentSection>
        <DocumentSection>
          <Image>
            <img src="/assets/document/document5.svg" alt="home" height="100%" width="100%"></img>
          </Image>
          <Text1>
            <h1>Transport</h1>
          </Text1>
        </DocumentSection>
      </DocumentContainer>
    </div>
  );
};

export default NewsBlog;

const DocumentContainer = styled.div`
  margin: 0 auto;
  display: grid;
  padding: 5em;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 4.5rem;
  background: ${(p) => p.theme.palette.lightBlue};
  cursor: pointer;
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const DocumentSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(p) => p.theme.palette.white};
  position: relative;
  cursor: pointer;
  transform: scale(1);
  transition: all 0.3s;
  &:hover {
    transform: scale(1.03);
  }
  @media screen and (max-width: 1024px) {
    display: flex;
  }
`;

const Image = styled.div`
  position: relative;
  left: 0;
  top: 0;
  background-size: cover;
  z-index: 1;
  @media screen and (max-width: 1024px) {
    z-index: 1;
    background-size: cover;
  }
`;

const Text = styled.div`
  position: absolute;
  width: 80%;
  height: 80%;
  display: flex;
  z-index: 10;
  display: flex;
  letter-spacing: 0.05em;
  background: linear-gradient(111.06deg, rgba(172, 70, 89, 0.7) -10.5%, rgba(17, 108, 243, 0.75) 55.61%, rgba(177, 30, 180, 0.24) 106.95%);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 11px;
  border: 1px solid;
  box-shadow: 0px 4px 12px 0px #00000040;
  h1 {
    font-family: inherit;
    font-style: normal;
    font-weight: bold;
    font-size: 1.8rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${(p) => p.theme.palette.white};
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  @media screen and (max-width: 700px) {
    display: flex;
    width: 70%;
    height: 70%;
  }
`;

const Text1 = styled.div`
  position: absolute;
  width: 80%;
  height: 80%;
  display: flex;
  z-index: 10;
  display: flex;
  letter-spacing: 0.05em;
  background: linear-gradient(111.06deg, rgba(172, 70, 89, 0.7) -10.5%, rgba(17, 108, 243, 0.75) 55.61%, rgba(177, 30, 180, 0.24) 106.95%);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 11px;
  border: 1px solid;
  box-shadow: 0px 4px 12px 0px #00000040;
  background: linear-gradient(111.06deg, rgba(82, 73, 73, 0) -10.5%, rgba(63, 57, 57, 0.37) 55.61%, rgba(102, 95, 95, 0.24) 106.95%);
  border: 1px solid;
  box-shadow: 0px 4px 12px 0px #00000040;
  border-radius: 11px;
  h1 {
    font-family: inherit;
    font-style: normal;
    font-weight: bold;
    font-size: 1.8rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${(p) => p.theme.palette.white};
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  @media screen and (max-width: 700px) {
    display: flex;
    width: 70%;
    height: 70%;
  }
`;
