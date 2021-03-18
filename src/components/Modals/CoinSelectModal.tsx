import * as React from 'react'
import { useDispatch, useSelector } from "react-redux"

import BasicModal from "./BasicModal"
import styled from "styled-components"

const SelectCoinWrapper = styled.div`
padding: 20px;
.header{
    display:flex;
    justify-content: space-between;
    width: 380px;
    .title {
        font-size: 16px;
        font-weight: 500;
    }
    .close {

    }
}
`

function CoinSelectModal({ isOpen, toggle }: { isOpen: boolean, toggle: any }) {
    const PoolsData = useSelector((state) => state.store.poolsData)
    console.log(PoolsData)

    return (

        <BasicModal elementId="modal" isOpen={isOpen} toggle={toggle}>
            <SelectCoinWrapper>
                <div className="header">
                    <div className="title">Select a coin</div>
                    <div className="close">X</div>
                </div>
            </SelectCoinWrapper>
        </BasicModal>
    );
}

export default CoinSelectModal