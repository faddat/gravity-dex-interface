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

   .from-to-swap {
        display:flex;
        align-items:center;
        justify-content:center;
        padding: 16px 0;
        transition: opacity 0.2s;
        cursor: pointer;

        &:hover {
            opacity: 0.6;
        }
   }
`

//reducer action types
const TYPES = {
    AMOUNT_CHANGE: 'AMOUNT_CHANGE',
    SELECT_COIN: 'SELECT_COIN'
}

//useReducer
function reducer(state, action) {
    switch (action.type) {
        case TYPES.AMOUNT_CHANGE:
            const Target = action.payload.target === 'From' ? 'from' : 'to'
            return { ...state, [`${Target}Amount`]: action.payload.amount }

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
                    dispatchTypes={{ amount: TYPES.AMOUNT_CHANGE, coin: TYPES.SELECT_COIN }}
                />

                {/* From To change Arrow */}
                <div className="from-to-swap">
                    <SmallDownArrow />
                </div>

                {/* To */}
                <TokenInputController
                    subTitles={{ left: 'To', right: `Balance: 0` }}
                    coin={state.toCoin}
                    amount={state.toAmount}
                    dispatch={dispatch}
                    dispatchTypes={{ amount: TYPES.AMOUNT_CHANGE, coin: TYPES.SELECT_COIN }}
                />
            </SwapWrapper>
        </BaseCard>
    )
}

export default Swap