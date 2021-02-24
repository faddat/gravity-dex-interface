import * as React from 'react';
import styled from "styled-components";

import Portal from "../Portal"


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
width: 39px;
height: 39px;
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

${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

function connectWallet() {
  alert('connect')
}

interface PortalModalFrameInterface {
  elementId: string,
  children?: React.ReactChild
}

function PortalModalFrame({ elementId, children }: PortalModalFrameInterface) {

  return (
    <Portal elementId={elementId} >
      {children}



    </Portal>
  );
}

export default PortalModalFrame