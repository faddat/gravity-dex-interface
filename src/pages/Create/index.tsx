import * as React from 'react'
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'

import ChangeArrow from "../../assets/svgs/ChangeArrow"

import BaseCard from "../../components/Cards/BaseCard"
import TokenInputController from "../../components/TokenInputController/index"
import ActionButton from "../../components/Buttons/ActionButton"

//Styled-components
const Wrapper = styled.div`
    position: absolute;
    top:0;
    left: 0;

    width: 100%;
    height: 100%;
    background-color:#fff;

    min-height: 100vh;
    background-position: 0px -30vh;
    background-repeat: no-repeat;
    background-image: radial-gradient(50% 50% at 50% 50%,rgb(3 34 255 / 20%) 0%,rgb(19 74 195 / 0) 100%);
`


const SwapWrapper = styled.div`
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;

       .back {
           font-size: 24px;
           cursor: pointer;

           &:hover {
                opacity: 0.6;
            }
        }

       .title {
           font-size: 20px;
           font-weight: 500;
       }
    }

   .divider {
        display:flex;
        align-items:center;
        justify-content:center;
        padding: 16px 0;
        transition: opacity 0.2s;

        .plus {
            font-size: 24px;
        }
   }

   .swap-detail {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 6px 12px;

        font-size: 14px;
        font-weight: 500;
        color: rgb(86, 90, 105);

        .left {
            
        }

        .right {

        }
   }
`

//reducer action types
const TYPES = {
    AMOUNT_CHANGE: 'AMOUNT_CHANGE',
    SELECT_COIN: 'SELECT_COIN',
    SET_MAX_AMOUNT: 'SET_MAX_AMOUNT',
    CHANGE_FROM_TO_COIN: 'CHANGE_FROM_TO_COIN'
}

//helpers
function getMyCoinBalance(coin, myBalance) {
    if (myBalance[coin.toLowerCase()] !== undefined) {
        return Number(myBalance[coin.toLowerCase()])
    } else {
        return 0
    }
}

function getButtonNameByStatus(status, fromCoin, toCoin) {
    if (fromCoin === '' || toCoin === '') {
        return 'Select a token'
    } else if (status === 'over') {
        return 'Insufficient balance'
    } else if (status === 'empty') {
        return 'Enter an amount'
    } else {
        return 'SWAP'
    }
}

function getButtonCssClassNameByStatus(status, fromCoin, toCoin) {
    if (fromCoin === '' || toCoin === '' || status === 'over' || status === 'empty') {
        return 'disabled'
    } else {
        return 'normal'
    }
}


function SwapCard() {
    React.useEffect(() => {
        //미로그인시 connectWallet 스테이터스 아니면 empty로
    }, [])
    const myBalance = useSelector((state) => state.store.userData.balance)
    const slippage = useSelector((state) => state.store.userData.slippage)
    const poolData = useSelector((state) => state.store.poolsData.pools)

    const history = useHistory();
    //reducer for useReducer
    function reducer(state, action) {
        let target = null
        let counterTarget = null

        if (action.payload?.target) {
            target = action.payload.target === "From" ? "from" : "to"
            counterTarget = target === 'from' ? 'to' : 'from'
        }

        switch (action.type) {
            case TYPES.AMOUNT_CHANGE:
                let isOver = false
                let isEmpty = false
                let isCounterPairEmpty = false

                if (action.payload.amount > myBalance[state[`${target}Coin`]] || state[`${counterTarget}Amount`] > myBalance[state[`${counterTarget}Coin`]]) {
                    isOver = true
                }

                if (action.payload.amount == 0) {
                    isEmpty = true
                }

                if (state[`${counterTarget}Amount`] === '' || state[`${counterTarget}Amount`] == 0) {
                    isCounterPairEmpty = true
                }

                return { ...state, [`${target}Amount`]: action.payload.amount, status: isOver ? 'over' : (isEmpty || isCounterPairEmpty) ? 'empty' : 'normal' }
            case TYPES.SET_MAX_AMOUNT:
                return { ...state, [`${target}Amount`]: action.payload.amount, status: 'normal' }
            case TYPES.SELECT_COIN:
                let coinA = state[`${counterTarget}Coin`]
                let coinB = action.payload.coin
                const sortedCoins = [coinA, coinB].sort()
                const slectedPairsPoolData = poolData[`${sortedCoins[0]}/${sortedCoins[1]}`]

                if (!slectedPairsPoolData) {
                    history.push(`/deposit?X=${coinA}&Y=${coinB}`)
                }

                return { ...state, [`${target}Coin`]: action.payload.coin }
            case TYPES.CHANGE_FROM_TO_COIN:
                // toCoin 수량 계산 및 액션버튼 검증로직
                return { ...state, fromCoin: state.toCoin, toCoin: state.fromCoin, fromAmount: state.toAmount, toAmount: state.fromAmount }
            default:
                console.log("DEFAULT: SWAP REDUCER")
                return state;
        }
    }

    const [state, dispatch] = React.useReducer(reducer, {
        fromCoin: 'atom',
        toCoin: '',
        fromAmount: '',
        toAmount: '',
        status: 'empty' // connectWallet, notSelected, empty, over, normal
    })

    function swap() {
        alert('swap')
    }

    return (
        <Wrapper>
            <BaseCard>
                <SwapWrapper>
                    {/* Header */}
                    <div className="header">
                        <div className="back" onClick={() => { history.push('/pool') }}>←</div>
                        <div className="title"> Create a Pair</div>
                        <div style={{ width: "23px" }}></div>
                    </div>

                    {/* From */}
                    <TokenInputController
                        header={{ title: 'From', balance: getMyCoinBalance(state.fromCoin, myBalance) }}
                        coin={state.fromCoin}
                        amount={state.fromAmount}
                        counterPair={state.toCoin}
                        dispatch={dispatch}
                        dispatchTypes={{ amount: TYPES.AMOUNT_CHANGE, coin: TYPES.SELECT_COIN, max: TYPES.SET_MAX_AMOUNT }}
                    />

                    {/* plus icon */}
                    <div className="divider">
                        <div className="plus">
                            +
                        </div>
                    </div>

                    {/* To */}
                    <TokenInputController
                        header={{ title: 'To (estimated)', balance: getMyCoinBalance(state.toCoin, myBalance) }}
                        coin={state.toCoin}
                        amount={state.toAmount}
                        counterPair={state.fromCoin}
                        dispatch={dispatch}
                        dispatchTypes={{ amount: TYPES.AMOUNT_CHANGE, coin: TYPES.SELECT_COIN, max: TYPES.SET_MAX_AMOUNT }}
                    />

                    {/* Swap detail */}
                    <div className="swap-detail">
                        <div className="left">Price</div>
                        <div className="right">1</div>
                    </div>

                    <div className="swap-detail">
                        <div className="left">Slippage Tolerance</div>
                        <div className="right">{slippage}%</div>
                    </div>


                    {/* Swap Button */}
                    <ActionButton onClick={swap} status={getButtonCssClassNameByStatus(state.status, state.fromCoin, state.toCoin)} css={{ marginTop: "16px" }}>
                        {getButtonNameByStatus(state.status, state.fromCoin, state.toCoin)}
                    </ActionButton>
                </SwapWrapper>
            </BaseCard>
        </Wrapper>
    )
}

export default SwapCard