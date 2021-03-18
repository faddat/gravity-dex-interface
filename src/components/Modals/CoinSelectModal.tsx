import * as React from 'react'
import { useDispatch, useSelector } from "react-redux"

import BasicModal from "./BasicModal"
import styled from "styled-components"

const SelectCoinWrapper = styled.div`

.header{
    display:flex;
    justify-content: space-between;
    align-items: center;
    
    width: 420px;
    padding: 20px;

    .title {
        font-size: 18px;
        font-weight: bold;
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
    display: flex;

    width: calc(100% - 40px);
    margin: 0 20px;
    padding: 16px;
   
    font-size: 18px;

    outline:none;
    border: 1px solid #acacac;
    border-radius: 20px;

    &:focus {
        border-color: #4397ff;
    }
}

.coin-list-wrapper {
    height: 500px;
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
`

function CoinSelectModal({ isOpen, toggle, selectCoin }: { isOpen: boolean, toggle: any, selectCoin: any }) {
    const PoolsData = useSelector((state) => state.store.poolsData)
    const myBalance = useSelector((state) => state.store.userData.balance)
    const [searchKeyword, setSearchKeyword] = React.useState('')

    React.useEffect(() => {
        setSearchKeyword('')
    }, [isOpen])

    function generateCoinList(pairs, keyword, counterPair) {
        let listPairs = pairs

        if (keyword !== '') {
            listPairs = listPairs.filter((s => s.includes(keyword)))
        }

        return listPairs.map((pair, index) => {

            if (counterPair === pair) {
                return
            }

            return (
                <div className="row"
                    onClick={() => {
                        selectCoin.dispatch({ type: selectCoin.type, payload: { coin: pair, target: selectCoin.target } })
                        toggle()
                    }} key={index}>
                    <div className="coin-info">
                        <img className="coin-img" src={`/assets/coins/${pair}.png`} alt="coin pair" />{pair.toUpperCase()}
                    </div>
                    <div className="coin-balance">{myBalance[pair] || 0}</div>
                </div>
            )
        })
    }

    return (

        <BasicModal elementId="modal" isOpen={isOpen} toggle={toggle}>
            <SelectCoinWrapper>
                <div className="header">
                    <div className="title">Select a coin</div>
                    <div className="close" onClick={() => { toggle() }}>X</div>
                </div>

                <input className="search" value={searchKeyword} onChange={(e) => { setSearchKeyword(e.target.value) }} type="text" placeholder="Search Coin" />
                <div className="coin-list-wrapper">
                    {generateCoinList(PoolsData.pairs, searchKeyword, selectCoin.counterPair)}
                </div>

            </SelectCoinWrapper>
        </BasicModal>
    );
}

export default CoinSelectModal