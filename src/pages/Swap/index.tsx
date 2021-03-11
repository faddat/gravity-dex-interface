import * as React from 'react';
import styled from "styled-components";
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
                />

                {/* From To change Arrow */}
                <div className="from-to-swap">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="#565A69" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                </div>

                {/* To */}
                <TokenInputController
                    subTitles={{ left: 'To', right: `Balance: 0` }}
                    coin={state.toCoin}
                    amount={state.toAmount}
                    dispatch={dispatch}
                />
            </SwapWrapper>
        </BaseCard>
    )
}

export default Swap