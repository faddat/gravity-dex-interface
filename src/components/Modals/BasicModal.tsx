import * as React from 'react';
import styled from "styled-components";

import Portal from "../Portal"

interface PortalModalFrameInterface {
  elementId: string,
  children?: React.ReactChild
  isOpen: boolean
  toggle: any
}

const Overlay = styled.div`
position: fixed;

top: 0;
left: 0;
width: 100%;
height: 100%;

background-color: rgba(0, 0, 0, 0.424);
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

function PortalModalFrame({ elementId, children, isOpen, toggle }: PortalModalFrameInterface): any {

  return (
    isOpen ?
      <Portal elementId={elementId} >
        <Overlay onClick={() => { toggle() }}>
          <ModalWrapper>
            {children}
          </ModalWrapper>
        </Overlay>
      </Portal> : ''
  );
}

export default PortalModalFrame