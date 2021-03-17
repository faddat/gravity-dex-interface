import * as React from 'react'
import { useDispatch, useSelector } from "react-redux"

import BasicModal from "./BasicModal"
import styled from "styled-components"

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
    const PoolsData = useSelector((state) => state.store.poolsData)
    console.log(PoolsData)

    return (

        <BasicModal elementId="modal" isOpen={isOpen} toggle={toggle}>
            test
        </BasicModal>
    );
}

export default CoinSelectModal