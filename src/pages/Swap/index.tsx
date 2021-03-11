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

   .from-to-change {
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
    SET_AMOUNT_MAX: 'SET_AMOUNT_MAX'
}

//useReducer
function reducer(state, action) {
    switch (action.type) {
        case TYPES.AMOUNT_CHANGE:
            const Target = action.payload.target === 'From' ? 'from' : 'to'
            return { ...state, [`${Target}Amount`]: action.payload.amount }
        case TYPES.SET_AMOUNT_MAX:
            alert('MAX')
            return state - 1;
        case TYPES.SELECT_COIN:
            return state - 1;
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
                    subTitles={{ left: 'From', right: `Balance: 0` }}
                    coin={state.fromCoin}
                    amount={state.fromAmount}
                    dispatch={dispatch}
                    dispatchTypes={{ amount: TYPES.AMOUNT_CHANGE, coin: TYPES.SELECT_COIN, max: TYPES.SET_AMOUNT_MAX }}
                />

                {/* From <> To change arrow */}
                <div className="from-to-change">
                    <div className="arrow" onClick={() => {
                        alert('from<>to change')
                    }}>
                        <SmallDownArrow />
                    </div>
                </div>

                {/* To */}
                <TokenInputController
                    subTitles={{ left: 'To', right: `Balance: 0` }}
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