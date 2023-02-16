import React, { FunctionComponent } from "react";
import styled from 'styled-components'

import NavigationBar from "./NavigationBar/index";
import Header from "./Header";

interface LayoutType {
  children: JSX.Element | JSX.Element[];
}

const Layout: FunctionComponent<LayoutType> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full h-screen max-h-screen no-scrollbar">
      <Header />
      <Container className="flex flex-1  overflow-auto no-scrollbar">
        <div className="w-1/4">
          <NavigationBar />
        </div>
        <div className="flex flex-col w-3/4 w-full max-h-screen overflow-auto no-scrollbar">
          <ContentPage>{children}</ContentPage>
        </div>
      </Container>
    </div>
  );
};

export default Layout;

const ContentPage = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full"> {children}</div>;
};

const Container = styled('div')`
height: calc(100vh - 5rem)
`
