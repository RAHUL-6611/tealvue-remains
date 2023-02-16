import styled from 'styled-components';

export default function subscription() {
  return (
    <Container>
      <Top>
        <h4>Contact Information</h4>
        <span>Feel free to ask for more details, don't save any questions in your cloud!</span>
        <div>
          <ContactDetails>
            <span className="icon-phone"></span>
            <div>
              <h4 className="single-contact-left-label">Phone Number</h4>
              <h1>(+91) 87704-17701</h1>
            </div>
          </ContactDetails>
          <ContactDetails>
            <div>
              <span className="icon-envelope-o"></span>
            </div>
            <div className="content">
              <h4 className="single-contact-left-label">Mail Adress</h4>
              <h1>info@tealvue.com</h1>
            </div>
          </ContactDetails>
          <ContactDetails>
            <div>
              <span className="icon-map-pin"></span>
            </div>
            <div className="content">
              <h4 className="single-contact-left-label">Local Address</h4>
              <h1>
                Software Solutions Pvt Ltd. Spencer Plaza
                <br /> Mall, 715A, 7th Floor, Anna Salai, TN.600002
              </h1>
            </div>
          </ContactDetails>
          <ContactDetails>
            <div>
              <span className="icon-share-2"></span>
            </div>
            <span className="icon-facebook1"></span>
            <span className="icon-twitter"></span>
            <span className="icon-pinterest"></span>
            <span className="icon-vimeo"></span>
          </ContactDetails>
        </div>
      </Top>
      <EditProfile>
        <Contact>
          <Name>
            <label htmlFor="name" className="post-input-label-defualt">
              Name <span>*</span>
            </label>
            <div>
              <input type="text" name="name" placeholder="Name" id="name" />
            </div>
          </Name>
          <Name>
            <label htmlFor="email" className="post-input-label-defualt">
              Email <span>*</span>
            </label>
            <div>
              <input type="email" name="email" id="email" placeholder="Email" />
            </div>
          </Name>
        </Contact>
        <Name>
          <label htmlFor="name" className="post-input-label-defualt">
            Website <span>*</span>
          </label>
          <div>
            <input type="text" name="website" placeholder="Website" id="website" />
          </div>
        </Name>
        <Commend>
          <label htmlFor="comment" className="post-input-label-defualt">
            Comment <span>*</span>
          </label>
          <div>
            <textarea id="comment" name="message" placeholder="Type here..."></textarea>
          </div>
        </Commend>
        <Checkbox>
          <div>
            <input type="checkbox" />
            <span>By clicking this I have read and agree to the Terms & Conditions.</span>
          </div>
        </Checkbox>
        <button className="button">Submit</button>
      </EditProfile>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin-top: 8em;
  justify-content: center;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    display: flex;
    justify-content: center;
  }
`;

const Top = styled.div`
  padding: 0em 8em 2em 8em;
  h4 {
    padding-bottom: 0.5em;
    font-size: 2.8rem;
    font-weight: 700;
    font-family: inherit;
    color: ${(p) => p.theme.palette.black};
  }
 span {
    font-size: 1.8rem;
    color: ${(p) => p.theme.palette.grey}
    display: block;
  }
`;

const ContactDetails = styled.div`
  padding: 2.5em;
  margin-top: 1em;
  display: flex;
  border-radius: 4px;
  box-shadow: 0px 30px 70px 0px #0005271a;
  overflow: hidden;
  background: ${(p) => p.theme.palette.white};
  h4 {
    color: ${(p) => p.theme.palette.black};
    display: block;
    font-family: inherit;
    font-style: normal;
    font-weight: 600;
    font-size: 1.6rem;
  }
  h1 {
    font-weight: 300;
    color: ${(p) => p.theme.palette.black};
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
    color: ${(p) => p.theme.palette.grey}
    display: block;
  }
`;
const Contact = styled.div`
  display: flex;
  span {
    color: ${(p) => p.theme.palette.red};
  }
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    display: flex;
  }
`;
const Name = styled.div`
  padding: 1em;
  input {
    margin: 0;
    height: 50px;
    width: 100%;
    background: ${(p) => p.theme.palette.lightBlue};
    border: 0;
    color: ${(p) => p.theme.palette.grey};
    border-radius: 4px;
    font-size: 1.5rem;
    padding: 0 25px;
    font-family: inherit;
    font-style: normal;
    font-weight: 500;
  }
  span {
    color: ${(p) => p.theme.palette.red};
  }
`;
const Commend = styled.div`
  padding: 1em;
  textarea {
    margin: 0;
    background: ${(p) => p.theme.palette.lightBlue};
    height: 160px;
    border: 0;
    color: ${(p) => p.theme.palette.grey};
    display: flex;
    font-size: 1.5rem;
    font-family: inherit;
    font-style: normal;
    font-weight: 500;
    width: 100%;
    border-radius: 4px;
    padding: 20px 25px;
  }
  span {
    color: ${(p) => p.theme.palette.red};
  }
`;
const Checkbox = styled.div`
  margin-left: 1em;
  input {
    transform: translateY(1px);
    margin-right: 0.5em;
    font-family: inherit;
    font-style: normal;
    font-weight: 500;
  }
  span {
    font-size: 1.5rem;
    color: ${(p) => p.theme.palette.grey};
  }
`;

const EditProfile = styled.div`
  padding: 2em;
  label {
    display: inline-block;
    padding: 0.5em;
    font-style: normal;
    font-family: inherit;
    font-weight: 500;
    display: flex;
    color: ${(p) => p.theme.palette.black};
    font-size: 1.5rem;
    white-space: nowrap;
    display: block;
    margin-bottom: 0.5em;
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
    display: flex;
    display: inline-block;
    align-items: center;
  }
  .button {
    margin-left: 0.5em;
    margin-top: 1em;
    box-sizing: border-box;
    width: 6em;
    height: 2.5em;
    font-family: inherit;
    font-size: 2rem;
    display: inline-block;
    color: ${(p) => p.theme.palette.white};
    font-weight: 500;
    box-sizing: border-box;
    background-color: ${(p) => p.theme.palette.primary};
    border: none;
    border-radius: 45px;
    cursor: pointer;
    outline: none;
    border-radius: 4px;
  }
`;
