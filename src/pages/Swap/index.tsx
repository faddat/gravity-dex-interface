import * as React from 'react'
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux";
import { getSelectedPairsPoolData, getPoolPrice, cutNumber } from "../../utils/global-functions"
import { useHistory } from 'react-router-dom'

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
    const { balance: myBalance, slippage } = useSelector((state) => state.store.userData)
    const poolData = useSelector((state) => state.store.poolsData.pools)
    // const slippage = useSelector((state) => state.store.userData.slippage)
    const storeDispatch = useDispatch()
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

                if (coinA === '' || coinB === '') {
                    return { ...state, [`${target}Coin`]: action.payload.coin }
                }

                const selectedPooldata = getSelectedPairsPoolData(state, action, counterTarget, poolData)

                if (coinA !== '' && coinB !== '') {
                    if (!selectedPooldata) {
                        history.push('/create')
                    }
                }

                return { ...state, [`${target}Coin`]: action.payload.coin, price: getPoolPrice(state, action, counterTarget, poolData) }

            case TYPES.CHANGE_FROM_TO_COIN:
                // toCoin 수량 계산 및 액션버튼 검증로직

                let price: any = '-'
                if (state.toCoin === '' || state.fromCoin === '') {
                    return { ...state, fromCoin: state.toCoin, toCoin: state.fromCoin, fromAmount: state.toAmount, toAmount: state.fromAmount }
                } else {
                    const sortedCoins = [state.toCoin, state.fromCoin].sort()
                    const selectedPairsPoolData = poolData[`${sortedCoins[0]}/${sortedCoins[1]}`]
                    price = selectedPairsPoolData[state.toCoin] / selectedPairsPoolData[state.fromCoin]
                }

                return { ...state, fromCoin: state.toCoin, toCoin: state.fromCoin, fromAmount: state.toAmount, toAmount: state.fromAmount, price: price }
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
        status: 'empty', // connectWallet, notSelected, empty, over, normal
        price: '-'
    })

    function swap() {
        alert('swap')
        storeDispatch({ type: 'rootStore/togglePendingStatus' })
        setTimeout(() => {
            storeDispatch({ type: 'rootStore/togglePendingStatus' })
        }, 3000)
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
                        counterPair={state.toCoin}
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
                        counterPair={state.fromCoin}
                        dispatch={dispatch}
                        dispatchTypes={{ amount: TYPES.AMOUNT_CHANGE, coin: TYPES.SELECT_COIN, max: TYPES.SET_MAX_AMOUNT }}
                    />

                    {/* Swap detail */}
                    <div className="swap-detail">
                        <div className="left">Price</div>
                        <div className="right">{state.price !== '-' ? (`${parseFloat(cutNumber(state.price, 6))} ${state.fromCoin.toUpperCase()} per ${state.toCoin.toUpperCase()}`) : '-'}</div>
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

        </>
    )
}

export default SwapCard