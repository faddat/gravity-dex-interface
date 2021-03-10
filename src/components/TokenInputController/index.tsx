import * as React from 'react';
import styled from "styled-components";
import BaseCard from "../../components/Cards/BaseCard"


const ControllerWrapper = styled.div`
    border-radius: 20px;
    border: 1px solid rgb(247, 248, 250);
`

const SubTitles = styled.div`
display:flex;
justify-content: space-between;
`




function TokenInputController() {
    return (
        <ControllerWrapper>
            <SubTitles></SubTitles>
            test
        </ControllerWrapper>
    )
}

export default TokenInputController