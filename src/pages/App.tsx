import * as React from 'react'
import styled from "styled-components"
import { Route, Switch } from 'react-router-dom'

import Header from "../components/Header"
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
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
`




function App() {
  return (
    <AppWrapper>
      <Header />

      <Switch>
        <Route exact strict path="/swap" component={Swap} />
        <Route exact strict path="/pools" component={Pools} />
        <Route exact strict path="/deposit" component={Deposit} />
        <Route exact strict path="/withdraw" component={Withdraw} />
      </Switch>
    </AppWrapper>
  );
}

export default App;
