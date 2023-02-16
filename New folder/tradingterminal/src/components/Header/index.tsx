import styled from "styled-components";
import { useNavigate, useLocation , Navigate} from 'react-router-dom'

const Header = () => {
  const RouteLink = [{label: "Dashboard", link: "/Dashboard"}, {label: "Derivative", link: "/Derivative"}, { label: "Orders", link: "/Orders"}, { label: "Holding", link: "/Holding" }, { label: "Positions", link: "/Positions" }, { label: "Funds", link: "/Funds" }, { label: "Funds", link: "/Activity" }]
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Container className="border-primary w-full">
      <div className="bg-secondary flex justify-between px-4 py-3">
        <div className="flex items-center">
          <div className="flex mr-8">
            <Icon className="mr-4" src={"assets/svg/save_icon.svg"} />
            <Icon src={"assets/svg/edit_icon.svg"} alt="img" />
          </div>
          <div className="flex">
            <div className="flex mr-6">
              <p className="text-sm font-normal mr-2">
                Sensex <span className="font-black">121212</span>
              </p>
              <p className="flex text-sm font-bold text-primary">
                <img className="mr-1" src={"assets/svg/up_icon.svg"} />
                215.48 (-0.20%)
              </p>
            </div>
            <div className="flex mr-6">
              <p className="text-sm font-normal mr-2">
                Sensex <span className="font-black">121212</span>
              </p>
              <p className="flex text-sm font-bold text-primary">
                <img className="mr-1" src={"assets/svg/up_icon.svg"} />
                215.48 (-0.20%)
              </p>
            </div>
            <div className="flex mr-6">
              <p className="text-sm font-normal mr-2">
                Sensex <span className="font-black">121212</span>
              </p>
              <p className="flex text-sm font-bold text-primary">
                <img className="mr-1" src={"assets/svg/up_icon.svg"} />
                215.48 (-0.20%)
              </p>
            </div>
            <div className="flex mr-6">
              <p className="text-sm font-normal mr-2">
                Sensex <span className="font-black">121212</span>
              </p>
              <p className="flex text-sm font-bold text-primary">
                <img className="mr-1" src={"assets/svg/up_icon.svg"} />
                215.48 (-0.20%)
              </p>
            </div>
            <div className="flex mr-6">
              <p className="text-sm font-normal mr-2">
                Sensex <span className="font-black">121212</span>
              </p>
              <p className="flex text-sm font-bold text-primary">
                <img className="mr-1" src={"assets/svg/up_icon.svg"} />
                215.48 (-0.20%)
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          <Icon className="mr-4" src={"assets/svg/dark_light_icon.svg"} alt="img" />
          <Icon className="mr-4" src={"assets/svg/menu_icon.svg"} alt="img" />
          <Icon className="mr-4" src={"assets/svg/help_icon.svg"} alt="img" />
          <Icon src={"assets/svg/setting_icon.svg"} alt="img" />
        </div>
      </div>
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <div className="flex items-center mr-9">
            <Logo className="mr-3" src="assets/svg/logo.svg"/>
            <h1 className="font-bold text-2xl">TealMax2</h1>
          </div>
          <div className="flex justify-between">
            {RouteLink.map(({link, label}, i) => (
                <NavButton key={i} onClick={() => {navigate(link)}} className={`text-sm ${ location.pathname === link ? 'border-l-2 border-primary text-primary' : ''} pl-2 font-medium mr-10`}>
                  {label}
                </NavButton>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-3 text-sm">Last Login  10/05/2022 12:21:08 PM</div>
          <DollerButton className="rounded-full flex items-center px-4 py-2 border-2 mr-4">
            <img className="mr-2" src="assets/svg/doller_icon.svg"/>
            <span className="text-primary text-sm">Add funds</span>
          </DollerButton>
          <div className="flex">
            <div className="avatar placeholder mr-2">
                <div className="bg-secondary text-neutral-content rounded-full w-12">
                  <span className="text-3xl"></span>
                </div>
            </div> 
            <img className="ml-1" src={"assets/svg/up_icon.svg"} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Header;

const Container = styled("div")`
  border-top-width: 4px;
  border-bottom-width: 5px;
`;

const Icon = styled("img")`
  width: 18px;
  height: 18px;
`;

const Logo = styled('img')``

const NavButton = styled('button')`
// color: #464255;
`;

const DollerButton = styled('button')`
border: 1px solid ${(p) => p.theme.palette.primary};
position: relative;
`