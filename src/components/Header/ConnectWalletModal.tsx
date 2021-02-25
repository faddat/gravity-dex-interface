import * as React from 'react';
import styled from "styled-components";

const Title = styled.div`
width: 100%;
color: #fff;
background-color: #4397ff;
`

const ModalWrapper = styled.div`
position: absolute;
top: 50%;
left: 50%;

transform: translate(-50%, -50%);

background-color: #fff;
width: 100px;
height: 100px;

${({ theme }) => theme.modalBorderRadius}
`

function ConnectWalletModal() {

    return (
        <Title>Connect to a wallet</Title>
    );
}

export default ConnectWalletModal