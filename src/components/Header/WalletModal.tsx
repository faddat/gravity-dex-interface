import * as React from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux"

const Wrapper = styled.div`

width: 420px;
height:calc(100vh - 200px);

border-top-left-radius: 12px;

.title {
    display: flex;
    justify-content: space-between;
    color: black;
    text-align:left;
    font-weight: 500;
    line-height: 1;
    font-size: 18px;

    background-color: #fff;
    padding: 20px 20px 10px;
    border-radius: 12px;

    .close {
        font-size: 20px;
        cursor: pointer;

        &:hover {
            opacity: 0.5;
        }
    }

}

.coin-list-wrapper {
    height: calc(100vh - 330px);
    overflow: auto;

    padding-left: 20px;

    margin: 16px 0;

    .row {
        display: flex;
        width: 100%;
        height: 55px;
        align-items: center;
        justify-content: space-between;

        cursor: pointer;
        
        .coin-info {
            display: flex;
            align-items: center;

            font-weight: 500;

            .coin-img {
                width: 28px;
                height: 28px;
                margin-right: 12px;
                border: 1px solid rgb(197, 197, 197);
                border-radius: 50%;
            }
        }

        .coin-balance {
            padding-right: 20px;
        }

        &:hover {
            background-color: rgba(229, 229, 231, 0.356);
        }
    }
}

.total-value {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
}

`

function ConnectWalletModal({ close, priceData, totalValue }: { close: any, priceData: {}, totalValue: any }) {
    const myBalance = useSelector((state) => state.store.userData.balance)
    const dispatch = useDispatch()

    function generateCoinList(balance, priceData) {
        let result = []

        for (let pair in balance) {
            const pairValue = (balance[pair] * priceData[pair]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            result.push(
                <div className="row"
                    onClick={() => {

                    }} key={pair}>
                    <div className="coin-info">
                        <img className="coin-img" src={`/assets/coins/${pair}.png`} alt="coin pair" />{pair.toUpperCase()}
                    </div>
                    <div className="coin-balance">{balance[pair] || 0} <span style={{ color: '#8a8a8a' }}>(${pairValue})</span></div>
                </div>
            )
        }
        return result
    }



    return (

        <Wrapper >
            <div className="title">
                <div>My Wallet</div> <div className="close" onClick={() => { close() }}>X</div>
            </div>

            <div className="coin-list-wrapper">
                {generateCoinList(myBalance, priceData)}
            </div>

            <div className="total-value">Total Value : ${totalValue}</div>
        </Wrapper >


    );
}

export default ConnectWalletModal