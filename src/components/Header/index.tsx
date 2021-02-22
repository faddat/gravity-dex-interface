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
display:flex;
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
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    padding-bottom: 4px;
    border-bottom: 3px solid ${({ theme }) => theme.navActiveBorderColor};
    color: ${({ theme }) => theme.text1};
  }

  :hover {
    color: ${({ theme }) => lighten(0.3, theme.text1)};
  }
`



function Header() {
    return (
        <HeaderFrame>
            <div>
                <Logo src={logo} />
            </div>

            <div>
                <Navigation>
                    <StyledNavLink to={"/swap"}>Swap</StyledNavLink>
                    <StyledNavLink to={"/pools"}>Pools</StyledNavLink>
                    <StyledNavLink to={"/deposit"}>Deposit</StyledNavLink>
                    <StyledNavLink to={"/Withdraw"}>Withdraw</StyledNavLink>
                </Navigation>
            </div>
        </HeaderFrame>
    );
}

export default Header