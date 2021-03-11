import * as React from 'react';
import styled from "styled-components";

import SmallDownArrow from "../../assets/svgs/smallDownArrow"

import BaseCard from "../../components/Cards/BaseCard"
import TokenInputController from "../../components/TokenInputController/index"

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
    SET_AMOUNT_MAX: 'SET_AMOUNT_MAX',
    CHANGE_FROM_TO_COIN: 'CHANGE_FROM_TO_COIN'
}

//reducer for useReducer
function reducer(state, action) {
    let Target = null

    if (action.payload?.target) {
        Target = action.payload.target === 'From' ? 'from' : 'to'
    }

    switch (action.type) {
        case TYPES.AMOUNT_CHANGE:
            return { ...state, [`${Target}Amount`]: action.payload.amount }
        case TYPES.SET_AMOUNT_MAX:
            alert('MAX')
            return state;
        case TYPES.SELECT_COIN:
            return state;
        case TYPES.CHANGE_FROM_TO_COIN:
            alert('CHANGE')
            return state
        default:
            return state;
    }
}


function Swap() {
    const [state, dispatch] = React.useReducer(reducer, {
        fromCoin: 'ATOM',
        toCoin: 'IRIS',
        fromAmount: '',
        toAmount: '',
    })

    return (
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
                    subTitles={{ left: 'From', right: '0' }}
                    coin={state.fromCoin}
                    amount={state.fromAmount}
                    dispatch={dispatch}
                    dispatchTypes={{ amount: TYPES.AMOUNT_CHANGE, coin: TYPES.SELECT_COIN, max: TYPES.SET_AMOUNT_MAX }}
                />

                {/* From <> To change arrow */}
                <div className="divider">
                    <div className="arrow" onClick={() => {
                        dispatch({ type: TYPES.CHANGE_FROM_TO_COIN })
                    }}>
                        <SmallDownArrow />
                    </div>
                </div>

                {/* To */}
                <TokenInputController
                    subTitles={{ left: 'To', right: '0' }}
                    coin={state.toCoin}
                    amount={state.toAmount}
                    dispatch={dispatch}
                    dispatchTypes={{ amount: TYPES.AMOUNT_CHANGE, coin: TYPES.SELECT_COIN, max: TYPES.SET_AMOUNT_MAX }}
                />
            </SwapWrapper>
        </BaseCard>
    )
}

export default Swap