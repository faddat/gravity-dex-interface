import * as React from 'react';
import styled from "styled-components";
import { lighten } from 'polished'

import { NavLink } from 'react-router-dom'
import logo from "../../assets/logo/logo.png"
import Spinner from '@bit/joshk.react-spinners-css.circle';
import GearButton from "../../components/Buttons/Gear"
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

const LogoImg = styled.img`
width: 70px;
height: 35px;
${({ theme }) => theme.mediaWidth.upToExtraSmall`
  width: 50px;
  height: 30px;
  `};
vertical-align: middle;

transition: transform 0.3s ease;

&:hover {
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

const WalletWidget = styled.div`
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
margin-left: 12px;
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

const NavigationFrame = styled.div`
display: flex;
align-items: center;
`

function AppHeader() {
  const [isConnectWalletModalOpen, { toggle: connectWalletModalToggle }] = useToggle();
  const [isPending, setIsPending] = React.useState(false)
  const [walletAddress, setWalletAddress] = React.useState('')
  const [TotalValue, setTotalValue] = React.useState(0)

  React.useEffect(() => {
    window.onload = () => {
      connectWallet(false)
      //test
      setTotalValue(96133.71)
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
        connectWalletModalToggle()
      }
      console.log(bech32Address)
    }
  };

  function logoFrame(src) {
    return (
      <div>
        <LogoImg src={src} />
      </div>
    )
  }

  function navigationLinks() {
    return (
      <Navigation>
        <StyledNavLink to={"/swap"}>Swap</StyledNavLink>
        <StyledNavLink to={"/pools"}>Pools</StyledNavLink>
        <StyledNavLink to={"/deposit"}>Deposit</StyledNavLink>
        <StyledNavLink to={"/Withdraw"}>Withdraw</StyledNavLink>
      </Navigation>
    )
  }

  function walletWidget(wa, ip) {

    function showStatusDetail() {
      setIsPending(!isPending)
    }

    return (
      wa === '' ? <ConnectWallet onClick={() => { connectWalletModalToggle() }}>CONNECT WALLET</ConnectWallet>
        :
        <WalletWidget>
          {/* determine pending status with local tx data */}
          {ip ? <div onClick={() => { showStatusDetail() }} style={{ height: "25px" }}><Spinner size="30" color="radial-gradient(50% 50% at 50% 50%, rgb(251 220 0) 0%, rgb(108, 151, 222) 100%)" style={{ width: "26px", height: "26px", margin: "0 8px 0 0", animation: "style_lds-circle__1jlxF 12.4s cubic-bezier(0, 0.2, 0.8, 1) infinite" }} /></div>
            : <div onClick={() => { showStatusDetail() }} style={{ background: "radial-gradient(50% 50% at 50% 50%, rgb(0 251 135) 0%, rgb(108, 151, 222) 100%)", width: "26px", height: "26px", borderRadius: "50%", marginRight: "8px" }}></div>}
          <div>${TotalValue}</div>

          <ConnectedWallet>
            <div>{wa.substr(0, 10)}...{wa.substr(-5)}</div>
          </ConnectedWallet>
        </WalletWidget>

    )
  }

  return (
    <HeaderFrame>
      {logoFrame(logo)}

      <NavigationFrame>
        {navigationLinks()}
        {walletWidget(walletAddress, isPending)}
        <GearButton onClick={() => { alert('test') }} />
      </NavigationFrame>

      <BasicModal elementId="modal" isOpen={isConnectWalletModalOpen} toggle={connectWalletModalToggle}>
        <ConnectWalletModal close={connectWalletModalToggle} connect={connectWallet} />
      </BasicModal>

    </HeaderFrame>
  );
}

export default AppHeader