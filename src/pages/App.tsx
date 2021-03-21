import * as React from 'react'
import styled from "styled-components"
import { Route, Switch, useHistory } from 'react-router-dom'
import { ToastContainer, Flip } from "react-toastify";

import AppHeader from "../components/Header"
import Swap from "../pages/Swap"
import Pool from "./Pool"
import Rank from "../pages/Rank"

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  background-color:${({ theme }) => theme.bg1};

  min-height: 100vh;
  background-position: 0px -30vh;
  background-repeat: no-repeat;
  background-image: radial-gradient(50% 50% at 50% 50%,rgb(3 34 255 / 20%) 0%,rgb(19 74 195 / 0) 100%);
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
`




function App() {
  const history = useHistory();

  React.useEffect(() => {
    if (window.location.hash === '#/') {
      history.push('/swap')
    }
  }, [])

  return (
    <AppWrapper>

      <AppHeader />

      <Switch>
        <Route exact strict path={["/", "/swap"]} component={Swap} />
        <Route exact strict path="/pool" component={Pool} />
        <Route exact strict path="/rank" component={Rank} />
      </Switch>

      <ToastContainer
        limit={1}
        transition={Flip}
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop closeOnClick
        rtl={false} pauseOnFocusLoss
        draggable pauseOnHover />

    </AppWrapper>
  );
}

export default App;
