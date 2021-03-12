import * as React from 'react'
import styled from "styled-components"
import { Route, Switch } from 'react-router-dom'
import { ToastContainer, Flip } from "react-toastify";

import AppHeader from "../components/Header"
import Swap from "../pages/Swap"
import Pools from "../pages/Pools"
import Deposit from "../pages/Deposit"
import Withdraw from "../pages/Withdraw"

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
  return (
    <AppWrapper>
      <AppHeader />

      <Switch>
        <Route exact strict path={["/", "/swap"]} component={Swap} />
        <Route exact strict path="/pools" component={Pools} />
        <Route exact strict path="/deposit" component={Deposit} />
        <Route exact strict path="/withdraw" component={Withdraw} />
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
