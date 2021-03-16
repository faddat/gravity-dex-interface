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
    font-weight: 500;

    &.disabled {
        background-color: rgb(237, 238, 242);
        color: rgb(136, 141, 155);
        pointer-events: none;
        cursor: auto;
    }

    &:hover {
        background-color:rgb(60, 132, 219);
    }
`

function ActionButton({ onClick, children, status = 'normal', css }: { onClick: any, children: React.ReactChild, status?: string, css?: object }) {
    return (
        <Action onClick={onClick} style={css} className={`${status}`}>
            {children}
        </Action>
    );
}

export default ActionButton