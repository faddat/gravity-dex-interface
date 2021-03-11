import * as React from 'react';
import styled from "styled-components";

const Action = styled.div`

    width: 100%;
    padding: 18px;
    text-align: center;
    border: none;
    border-radius: 20px;
    background-color: transparent;
    cursor:pointer;

    background-color:#4397ff;
    color:#fff;
    font-size: 20px;
    &:hover {
        opacity: 0.8;
    }
`

function ActionButton({ onClick, children, css }: { onClick: any, children: React.ReactChild, css?: object }) {
    return (
        <Action onClick={onClick} style={css}>
            {children}
        </Action>
    );
}

export default ActionButton