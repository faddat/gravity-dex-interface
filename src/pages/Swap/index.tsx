import * as React from 'react';
import styled from "styled-components";
import BaseCard from "../../components/Cards/BaseCard"
import TokenInputController from "../../components/TokenInputController/index"

const SwapWrapper = styled.div`
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title {
            padding-left: 4px;
            font-weight: 500;
        }
    }
`






function Swap() {
    return (
        <BaseCard>
            <SwapWrapper>
                <div className="header">
                    <div className="title">
                        Swap
                    </div>
                    <div />
                </div>
                <TokenInputController />
                <TokenInputController />
            </SwapWrapper>
        </BaseCard>
    )
}

export default Swap