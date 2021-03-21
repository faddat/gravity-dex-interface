import * as React from 'react';
import styled from "styled-components";


const PoolWrapper = styled.div`
    width: calc(100% - 100px);
    max-width: 640px;
    margin: 0 auto;
    .info {
       
        height: auto;
        
        margin-top: 60px;
        padding: 16px;

        color: #fff;

        background: radial-gradient(76.02% 75.41% at 1.84% 0%, rgb(47 152 243) 0%, rgb(0, 0, 0) 100%);
        border-radius: 16px;

        .title {
            font-weight: 600;
            margin-bottom: 16px;
        }

        .explain {
            font-size: 14px;
            font-weight: 500;
        }
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin: 24px 0;

        .title {
            font-size: 20px;
            font-weight: 500;
        }

        .buttons {
            display: flex;

            .button {
                font-weight: 500;
                text-align: center;
                outline: none;
                text-decoration: none;
                display: flex;
                -webkit-box-pack: center;
                justify-content: center;
                flex-wrap: nowrap;
                -webkit-box-align: center;
                align-items: center;
                cursor: pointer;
                position: relative;
                z-index: 1;
                border: 1px solid rgb(183 197 251);
                color: #4397ff;
                background-color: transparent;
                font-size: 16px;
                border-radius: 12px;
                padding: 6px 8px;
                width: fit-content;

                &:hover {
                    border-color: #4397ff;
                }

                &:last-child{
                    margin-left: 12px;

                    border: 1px solid #4397ff;
                    background-color:#4397ff;
                    color: #fff;

                    &:hover {
                        border-color: transparent;
                        background-color: hsl(213deg 66% 57%);
                    }
                }
            }
        }
    }

    .no-pool {
        border: 1px solid rgb(195, 197, 203);
        color: rgb(136, 141, 155);
        padding: 16px 12px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
    }

`






function Deposit() {
    return (
        <>
            <PoolWrapper>
                <div className="info">
                    <div className="title">
                        Liquidity provider rewards
                    </div>
                    <div className="explain">
                        Liquidity providers earn a 0.3% fee on all trades proportional to their share of the pool.
                        Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.
                    </div>
                </div>

                <div className="header">
                    <div className="title">
                        Your liquidity
                    </div>

                    <div className="buttons">
                        <button className="button">Create a pair</button>
                        <button className="button">Add Liquidity</button>
                    </div>
                </div>

                <div className="no-pool">No liquidity found</div>
            </PoolWrapper>
        </>
    )
}

export default Deposit