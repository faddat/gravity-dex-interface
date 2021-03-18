import * as React from 'react'
import { useDispatch, useSelector } from "react-redux"

import BasicModal from "./BasicModal"
import styled from "styled-components"

const SelectCoinWrapper = styled.div`
padding: 20px;
.header{
    display:flex;
    justify-content: space-between;
    align-items: center;
    
    width: 380px;
    margin-bottom: 20px;

    .title {
        font-size: 16px;
        font-weight: 500;
    }

    .close {
        font-size: 20px;
        cursor: pointer;
        &:hover {
            font-weight: bold;
        }
    }
}

.search {
    width: 100%;
    /* height: 20px; */
    font-size: 18px;
    display: flex;
    padding: 16px;
    outline:none;
    border: 1px solid #acacac;
    border-radius: 20px;

    &:focus {
        border-color: #4397ff;
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

                <input className="search" type="text" placeholder="Search Coin" />
            </SelectCoinWrapper>
        </BasicModal>
    );
}

export default CoinSelectModal