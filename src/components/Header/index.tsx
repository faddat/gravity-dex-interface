//library
import * as React from 'react'
import styled from "styled-components"
import { lighten } from 'polished'
import { NavLink } from 'react-router-dom'

//icons
import logo from "../../assets/logo/logo.png"
import wallet from '../../assets/wallets/dollar_wallet.png'
import GearButton from "../../components/Buttons/Gear"
import { GridSpinner } from 'react-spinners-kit'

//modals
import BasicModal from "../Modals/BasicModal"
import ConnectWalletModal from "./ConnectWalletModal"
import SettingModal from "./SettingModal"
import WalletModal from "./WalletModal"

//for wallet
import { chainInfo } from "../../cosmos-amm/config"

//helpers
import { useToggle } from "ahooks";
import { useDispatch, useSelector } from "react-redux";
import { toastGenerator, mobileCheck } from "../../utils/global-functions"

// styled-components
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
width: 40px;
height: 35px;
${({ theme }) => theme.mediaWidth.upToExtraSmall`
  width: 40px;
  height: 35px;
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
padding: 10px 24px 10px;
border-radius: 12px;
background-color: ${({ theme }) => theme.blue1};

font-weight: 500;
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

.total-value {
  display:flex;
  align-items: center;
  font-weight: 500;
  letter-spacing: 0.8px;

  .wallet {
    width: 32px;
    margin-right: 10px;
    transition: transform 0.1s;
    cursor:pointer;
    &:hover {
      transform:scale(1.1);
    }
  }
}
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
  display:flex;
  align-items: center;
  justify-content:space-between;
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


//component
function AppHeader() {
  const [isConnectWalletModalOpen, { toggle: connectWalletModalToggle }] = useToggle();
  const [isSettingModalOpen, { toggle: settingModalToggle }] = useToggle();
  const [isWalletModalOpen, { toggle: walletModalToggle }] = useToggle();
  const [walletAddress, setWalletAddress] = React.useState('')
  const userBalance = useSelector((state) => state.store.userData.balance)
  const priceData = useSelector((state) => state.store.priceData)
  const walletStatus = useSelector((state) => state.store.userData.walletStatus)
  const dispatch = useDispatch()

  React.useEffect(() => {
    window.onload = () => {
      connectWallet(false)
    }
  }, [])

  async function connectWallet(isToggle = true) {

    if (!window.getOfflineSigner || !window.keplr) {
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
    await window.keplr.enable(chainInfo.chainId);
    const offlineSigner = window.getOfflineSigner(chainInfo.chainId);
    const accounts = await offlineSigner.getAccounts()
    const address = accounts[0].address

    if (address.length === 0) {
      throw new Error("there is no key");
    }

    const bech32Address = address;
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
        <StyledNavLink to={"/pool"}>Pool</StyledNavLink>
        {/* <StyledNavLink to={"/deposit"}>Deposit</StyledNavLink>
        <StyledNavLink to={"/Withdraw"}>Withdraw</StyledNavLink> */}
      </Navigation>
    )
  }

  function showStatusDetail() {
    //open modal below is test

    dispatch({ type: 'rootStore/togglePendingStatus' })
  }

  function getTotalValue(userBalance) {
    let totalValue = 0
    for (let pair in userBalance) {
      totalValue += Number(userBalance[pair]) * Number(priceData[pair])
    }
    return totalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function walletWidget() {

    return (
      walletAddress === '' ? <ConnectWallet onClick={() => { connectWalletModalToggle() }}>CONNECT WALLET</ConnectWallet>
        :
        <WalletWidget>
          {/* determine pending status with local tx data */}

          <div className="total-value">
            <img src={wallet} className="wallet" alt="wallet from www.flaticon" onClick={() => {
              walletModalToggle()
            }} />
            ${getTotalValue(userBalance)}
          </div>

          <ConnectedWallet onClick={() => { showStatusDetail() }}>
            {walletStatus !== "pending" ? <div>{walletAddress.substr(0, 10)}...{walletAddress.substr(-5)}</div> : <div style={{ margin: 0, paddingRight: "6px" }}><div style={{ margin: "0 0 0 12px" }}>Pending</div><GridSpinner size={19} /></div>}

          </ConnectedWallet>
        </WalletWidget>

    )
  }

  return (
    <HeaderFrame>
      {logoFrame(logo)}

      <NavigationFrame>
        {navigationLinks()}
        {walletWidget()}
        <GearButton onClick={() => { settingModalToggle() }} />
      </NavigationFrame>


      {/* modals */}
      <BasicModal elementId="modal" isOpen={isConnectWalletModalOpen} toggle={connectWalletModalToggle}>
        <ConnectWalletModal close={connectWalletModalToggle} connect={connectWallet} />
      </BasicModal>

      <BasicModal elementId="modal" isOpen={isSettingModalOpen} toggle={settingModalToggle}>
        <SettingModal close={settingModalToggle}></SettingModal>
      </BasicModal>

      <BasicModal elementId="modal" isOpen={isWalletModalOpen} toggle={walletModalToggle}>
        <WalletModal close={walletModalToggle} priceData={priceData} totalValue={getTotalValue(userBalance)} />
      </BasicModal>

    </HeaderFrame>
  );
}

export default AppHeader