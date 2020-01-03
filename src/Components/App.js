import React from 'react';
import { gql} from "apollo-boost";
import styled, {ThemeProvider} from "styled-components";
import {HashRouter as Router} from "react-router-dom";
import GlobalStyles from '../Style/GlobalStyles';
import Theme from '../Style/Theme';
import { useQuery } from 'react-apollo-hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";
import Routes from './Routes';
import Header from './Header';

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 30px auto 0;
  max-width: ${props => props.theme.maxWidth};
  padding-bottom: 44px;
  width: 100%;
`;

export default () => {
  const { data : {isLoggedIn} } = useQuery(QUERY);
  

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
            {isLoggedIn && <Header />}
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn} />
              <Footer />
            </Wrapper>
          </>
        </Router>
          <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  )
}
