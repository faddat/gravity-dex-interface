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


const DepositWrapper = styled.div`
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

    .info-box {
        box-sizing: border-box;
        margin: 20px 0;
        min-width: 0px;
        padding: 1.25rem;
        background-color:rgb(234 243 253);
        color: rgb(0 124 255);
        border-radius: 12px;
        width: fit-content;
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

function getButtonNameByStatus(status, xCoin, yCoin) {
    if (xCoin === '' || yCoin === '') {
        return 'Select a coin'
    } else if (status === 'over') {
        return 'Insufficient balance'
    } else if (status === 'empty') {
        return 'Enter an amount'
    } else {
        return 'SWAP'
    }
}

function getButtonCssClassNameByStatus(status, xCoin, yCoin) {
    if (xCoin === '' || yCoin === '' || status === 'over' || status === 'empty') {
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
    const history = useHistory();
    //reducer for useReducer
    function reducer(state, action) {
        let target = null
        let counterTarget = null

        if (action.payload?.target) {
            target = action.payload.target === "X" ? "x" : "y"
            counterTarget = target === 'x' ? 'y' : 'x'
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
                return { ...state, [`${target}Coin`]: action.payload.coin }
            case TYPES.CHANGE_FROM_TO_COIN:
                // yCoin 수량 계산 및 액션버튼 검증로직
                return { ...state, xCoin: state.yCoin, yCoin: state.xCoin, fromAmount: state.toAmount, toAmount: state.fromAmount }
            default:
                console.log("DEFAULT: SWAP REDUCER")
                return state;
        }
    }

    const [state, dispatch] = React.useReducer(reducer, {
        xCoin: 'atom',
        yCoin: '',
        xAmount: '',
        yAmount: '',
        status: 'empty' // connectWallet, notSelected, empty, over, normal
    })

    function swap() {
        alert('swap')
    }

    return (
        <Wrapper>
            <BaseCard>
                <DepositWrapper>
                    {/* Header */}
                    <div className="header">
                        <div className="back" onClick={() => { history.push('/pool') }}>←</div>
                        <div className="title"> Add Liquidity</div>
                        <div style={{ width: "23px" }}></div>
                    </div>

                    {/* Info */}
                    <div className="info-box">
                        <span style={{ fontWeight: "bold" }}>Tip:</span> When you add liquidity, you will receive pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.
                    </div>

                    {/* From */}
                    <TokenInputController
                        header={{ title: 'X', balance: getMyCoinBalance(state.xCoin, myBalance) }}
                        coin={state.xCoin}
                        amount={state.xAmount}
                        counterPair={state.yCoin}
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
                        header={{ title: 'Y', balance: getMyCoinBalance(state.yCoin, myBalance) }}
                        coin={state.yCoin}
                        amount={state.yAmount}
                        counterPair={state.xCoin}
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
                    <ActionButton onClick={swap} status={getButtonCssClassNameByStatus(state.status, state.xCoin, state.yCoin)} css={{ marginTop: "16px" }}>
                        {getButtonNameByStatus(state.status, state.xCoin, state.yCoin)}
                    </ActionButton>
                </DepositWrapper>
            </BaseCard>
        </Wrapper>
    )
}

export default SwapCard