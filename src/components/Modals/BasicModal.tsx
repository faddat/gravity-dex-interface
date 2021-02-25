import * as React from 'react';
import styled from "styled-components";

import Portal from "../Portal"

interface PortalModalFrameInterface {
  elementId: string,
  children?: React.ReactChild
  isOpen: boolean
}

function PortalModalFrame({ elementId, children, isOpen }: PortalModalFrameInterface): any {

  return (
    isOpen ? <Portal elementId={elementId} >{children}</Portal> : ''
  );
}

export default PortalModalFrame