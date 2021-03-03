import * as React from 'react';
import styled from "styled-components";
import { lighten } from 'polished'

import { NavLink } from 'react-router-dom'
import logo from "../../assets/logo/logo.png"
import BasicModal from "../Modals/BasicModal"
import ConnectWalletModal from "./ConnectWalletModal"

import { chainInfo } from "../../cosmos-amm/config"
import { GaiaApi } from "@chainapsis/cosmosjs/gaia/api"

import { useToggle } from "ahooks";
import { toastGenerator, mobileCheck } from "../../utils/global-functions"

const HeaderFrame = styled.div`
display:flex;
justify-content: space-between;
align-items: center;
width: 100%;
padding: 1rem;

${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 14px !important;
  `};
 
`

const Logo = styled.img`
width: 70px;
height: 35px;
${({ theme }) => theme.mediaWidth.upToExtraSmall`
  width: 50px;
  height: 30px;
  `};
vertical-align: middle;

 transition: transform 0.3s ease;

  :hover {
    transform: scale(1.15);
  }
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
  font-size: inherit;
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
border-radius: 12px;
background-color: ${({ theme }) => theme.blue1};

font-weight: 600;
font-size: 16px;
border: none;
color: ${({ theme }) => theme.white};

margin-left: 16px;

cursor: pointer;
outline: none;

${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const TotalValueWidget = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
margin-left: 12px;
background-color: #114ab3b3;
padding: 1px 1px 1px 12px;
border-radius: 12px;
color: #fff;
`

const ConnectedWallet = styled.button`
padding: 0.5rem;
margin-left: 8px;
border-radius: 12px;
background-color: #4397ff;
font-size: 16px;
font-weight: 500;
border: none;
cursor: pointer;
color:#fff;
outline:none;
text-align: center;
letter-spacing: 1px;
border: 2px solid transparent;
div {
  margin: 0 8px;
}

&:hover {
  border: 2px solid #fff;
}
`

function AppHeader() {
  const [isOpen, { toggle }] = useToggle();
  const [walletAddress, setWalletAddress] = React.useState('')

  React.useEffect(() => {
    window.onload = () => {
      connectWallet(false)
    }
  }, [])

  async function connectWallet(isToggle = true) {

    if (!window.cosmosJSWalletProvider) {
      if (mobileCheck()) {
        toastGenerator("info", "🙏  functions are available on the desktop");
      } else {
        toastGenerator("info", "🙏  Please install the Keplr extension");
      }
      return;
    }

    if (!window.keplr?.experimentalSuggestChain) {
      toastGenerator("info", "🙏 Please use the latest version of Keplr extension");
      return;
    }

    try {
      await window.keplr.experimentalSuggestChain(chainInfo);
    } catch {
      alert('suggest chain rejected!')
      return
    }

    const cosmosJS = new GaiaApi({
      chainId: chainInfo.chainId,
      rpc: chainInfo.rpc,
      rest: chainInfo.rest,
      walletProvider: window.cosmosJSWalletProvider
    });

    try {
      await cosmosJS.enable();
    } catch {
      console.log('enable rejected')
    }

    const keys = await cosmosJS.getKeys();

    if (keys.length === 0) {
      throw new Error("there is no key");
    }

    const bech32Address = keys[0].bech32Address;
    if (bech32Address) {
      setWalletAddress(bech32Address)
      if (isToggle) {
        toggle()
      }
      console.log(bech32Address)
    }
  };

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
        {walletAddress === '' ? <ConnectWallet onClick={() => { toggle() }}>CONNECT WALLET</ConnectWallet>
          :
          <TotalValueWidget>
            <div>$96133.71</div>
            <ConnectedWallet>
              <div>{walletAddress.substr(0, 10)}...{walletAddress.substr(-5)}</div>
            </ConnectedWallet>
          </TotalValueWidget>
        }
      </div>
      <BasicModal elementId="modal" isOpen={isOpen} toggle={toggle}>
        <ConnectWalletModal close={toggle} connect={connectWallet} />
      </BasicModal>

    </HeaderFrame>
  );
}

export default AppHeader