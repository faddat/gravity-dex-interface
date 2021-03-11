import * as React from 'react';
import styled from "styled-components";
import BaseCard from "../../components/Cards/BaseCard"


const Wrapper = styled.div`
    border-radius: 20px;
    border: 1px solid rgb(247, 248, 250);
    padding: 12px;
    /* border: 1px solid gray; */

    .sub-titles {
        display:flex;
        justify-content: space-between;
        font-weight: 500;
        font-size: 14px;
        color: rgb(86, 90, 105);

        margin-bottom: 12px;
    }

    .input-controllers {
        display:flex;
        justify-content: space-between;
        flex-flow: row nowrap;
        -webkit-box-align: center;
        align-items: center;

        input {
            flex: 1;
            color: rgb(0, 0, 0);
            width: 0px;
            position: relative;
            font-weight: 500;
            outline: none;
            border: none;
            flex: 1 1 auto;
            background-color: transparent;
            font-size: 24px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0px;
            appearance: textfield;
            letter-spacing: normal;
            word-spacing: normal;
            text-transform: none;
            text-indent: 0px;
            text-shadow: none;
            display: inline-block;
            text-align: start;
            writing-mode: horizontal-tb;
            text-rendering: auto;

            &::placeholder {
                color: rgb(179, 178, 178);
            }
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        /* Firefox */
        input[type=number] {
        -moz-appearance: textfield;
        }

        div {
            width:fit-content;
        }
    }
`


function TokenInputController({ subTitles, amount, coin, dispatch }:
    { subTitles: { left: string, right: any }, amount: string, coin: string, dispatch: any }) {
    console.log(amount)
    return (
        <Wrapper>
            <div className="sub-titles">
                <div className="left">{subTitles.left}</div>
                <div className="right">{subTitles.right}</div>
            </div>
            <div className="input-controllers">
                <input
                    value={amount}
                    onChange={(e) => {
                        dispatch({ type: 'AMOUNT_CHANGE', payload: { target: subTitles.left, amount: e.target.value } })
                    }}
                    placeholder="0.0"
                    type="number" />
                <div>{coin}</div>
            </div>
        </Wrapper>
    )
}

export default TokenInputController