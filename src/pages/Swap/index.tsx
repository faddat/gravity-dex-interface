import * as React from 'react';
import styled from "styled-components";
import BaseCard from "../../components/Cards/BaseCard"
import GearButton from "../../components/Buttons/Gear"

const Swap = styled.div`
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






function Deposit() {
    return (
        <BaseCard>
            <Swap>
                <div className="header">
                    <div className="title">
                        Swap
                    </div>
                    <div className="setting">
                        <GearButton />
                    </div>
                </div>
            </Swap>
        </BaseCard>
    )
}

export default Deposit