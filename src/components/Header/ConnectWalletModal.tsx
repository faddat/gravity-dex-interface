import * as React from 'react';
import styled from "styled-components";

const Title = styled.div`
width: 300px;

color: black;
text-align:center;
font-weight: bold;
line-height: 1.8;
font-size: 18px;

background-color: #fff;

border-top-left-radius: 6px;
border-top-right-radius: 6px;
overflow:hidden;
padding: 12px;
`

const WalletListWrapper = styled.div`
    width: 300px;
    overflow:hidden;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
.connect-wallet-button {
    
}
`

function ConnectWalletModal() {

    return (
        <>
            <Title>Connect your wallet <br /> to proceed</Title>
            <WalletListWrapper>
                <button className="connect-wallet-button">Connect Keplr</button>
            </WalletListWrapper>
        </>
    );
}

export default ConnectWalletModal