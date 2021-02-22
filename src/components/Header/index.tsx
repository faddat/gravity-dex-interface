import * as React from 'react';
import styled from "styled-components";
import { lighten } from 'polished'

import { NavLink } from 'react-router-dom'
import logo from "../../assets/logo/logo.png"

const HeaderFrame = styled.div`
display:flex;
justify-content: space-between;
align-items: center;
width: 100%;
padding: 1rem;
`

const Logo = styled.img`
width: 30px;
height: 30px;
`

const Navigation = styled.nav`
width: fit-content;
display:inline-flex;
`

const activeClassName = "ACTIVE"

const StyledNavLink = styled(NavLink).attrs({
    activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  font-size: 1rem;
  width: fit-content;
  margin: 0 16px;
  font-weight: 500;
padding: 4px 0;
  &.${activeClassName} {
    
    border-bottom: 3px solid ${({ theme }) => theme.navActiveBorderColor};
    color: ${({ theme }) => theme.text1};
  }

  :hover {
    color: ${({ theme }) => lighten(0.3, theme.text1)};
  }
`

const ConnectWallet = styled.button`
width: fit-content;
padding: 12px 24px 8px;
border-radius: 24px;
background-color: ${({ theme }) => theme.blue1};

font-weight: 600;
font-size: 16px;
border: none;
color: ${({ theme }) => theme.white};

margin-left: 16px;

cursor: pointer;
outline: none;
`

function connectWallet() {
    alert('connect')
}

function Header() {
    return (
        <HeaderFrame>
            <div>
                <Logo src={logo} />
            </div>

            <div style={{ display: 'flex', alignItems: "center" }}>
                <Navigation>
                    <StyledNavLink to={"/swap"}>Swap</StyledNavLink>
                    <StyledNavLink to={"/pools"}>Pools</StyledNavLink>
                    <StyledNavLink to={"/deposit"}>Deposit</StyledNavLink>
                    <StyledNavLink to={"/Withdraw"}>Withdraw</StyledNavLink>
                </Navigation>
                <ConnectWallet onClick={connectWallet}>CONNECT WALLET</ConnectWallet>
            </div>

        </HeaderFrame>
    );
}

export default Header