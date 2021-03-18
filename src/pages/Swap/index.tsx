import * as React from 'react'
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux";

import ChangeArrow from "../../assets/svgs/ChangeArrow"

import BaseCard from "../../components/Cards/BaseCard"
import TokenInputController from "../../components/TokenInputController/index"
import ActionButton from "../../components/Buttons/ActionButton"

//Styled-components
const SwapWrapper = styled.div`
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;

        .title {
            padding-left: 4px;
            font-weight: 500;
        }
    }

   .divider {
        display:flex;
        align-items:center;
        justify-content:center;
        padding: 16px 0;
        transition: opacity 0.2s;

        .arrow {
            cursor: pointer;

            svg {
                stroke: #4397ff;
            }

            &:hover {
                opacity: 0.6;
            }
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

//reducer for useReducer
function reducer(state, action) {
    let Target = null

    if (action.payload?.target) {
        Target = action.payload.target === "From" ? "from" : "to"
    }

    switch (action.type) {
        case TYPES.AMOUNT_CHANGE:
            return { ...state, [`${Target}Amount`]: action.payload.amount }
        case TYPES.SET_MAX_AMOUNT:
            return { ...state, [`${Target}Amount`]: action.payload.amount }
        case TYPES.SELECT_COIN:
            return { ...state, [`${Target}Coin`]: action.payload.coin }
        case TYPES.CHANGE_FROM_TO_COIN:
            // toCoin 수량 계산 및 액션버튼 검증로직
            return { ...state, fromCoin: state.toCoin, toCoin: state.fromCoin, fromAmount: state.toAmount, toAmount: state.fromAmount }
        default:
            console.log("DEFAULT: SWAP REDUCER")
            return state;
    }
}

//helpers
function getMyCoinBalance(coin, myBalance) {
    if (myBalance[coin.toLowerCase()] !== undefined) {
        return Number(myBalance[coin.toLowerCase()])
    } else {
        return 0
    }
}


function SwapCard() {
    const [state, dispatch] = React.useReducer(reducer, {
        fromCoin: 'atom',
        toCoin: '',
        fromAmount: '',
        toAmount: '',
    })

    const myBalance = useSelector((state) => state.store.userData.balance)

    function swap() {
        alert('swap')
    }

    return (
        <>
            <BaseCard>
                <SwapWrapper>
                    {/* Header */}
                    <div className="header">
                        <div className="title">
                            Swap
                    </div>
                        <div />
                    </div>

                    {/* From */}
                    <TokenInputController
                        header={{ title: 'From', balance: getMyCoinBalance(state.fromCoin, myBalance) }}
                        coin={state.fromCoin}
                        amount={state.fromAmount}
                        dispatch={dispatch}
                        dispatchTypes={{ amount: TYPES.AMOUNT_CHANGE, coin: TYPES.SELECT_COIN, max: TYPES.SET_MAX_AMOUNT }}
                    />

                    {/* From <> To change arrow */}
                    <div className="divider">
                        <div className="arrow" onClick={() => {
                            dispatch({ type: TYPES.CHANGE_FROM_TO_COIN })
                        }}>
                            <ChangeArrow />
                        </div>
                    </div>

                    {/* To */}
                    <TokenInputController
                        header={{ title: 'To (estimated)', balance: getMyCoinBalance(state.toCoin, myBalance) }}
                        coin={state.toCoin}
                        amount={state.toAmount}
                        dispatch={dispatch}
                        dispatchTypes={{ amount: TYPES.AMOUNT_CHANGE, coin: TYPES.SELECT_COIN, max: TYPES.SET_MAX_AMOUNT }}
                    />

                    {/* Swap Button */}
                    <ActionButton onClick={swap} status={'connect-wallet'} css={{ marginTop: "16px" }}>
                        Swap
                </ActionButton>
                </SwapWrapper>
            </BaseCard>

        </>
    )
}

export default SwapCard