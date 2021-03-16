import * as React from 'react';
import BasicModal from "./BasicModal";
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
padding: 60px 12px 40px ;
`

function CoinSelectModal({ isOpen, toggle }: { isOpen: boolean, toggle: any }) {

    return (

        <BasicModal elementId="modal" isOpen={isOpen} toggle={toggle}>
            test
        </BasicModal>
    );
}

export default CoinSelectModal