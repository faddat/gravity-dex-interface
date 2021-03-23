import * as React from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const PoolWrapper = styled.div`
    width: calc(100% - 100px);
    max-width: 640px;
    margin: 0 auto;
    padding-bottom: 60px;
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
            min-width: 125px;
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

        .search {
            display: flex;

            width: calc(100%);
            padding: 6px 16px;

            font-size: 16px;

            outline:none;
            border: 1px solid #acacac;
            border-radius: 20px;


            &:focus {
                border-color: #4397ff;
            }

            &::placeholder {
                color: #c4c4c4;
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

    .pool {
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
        justify-content: space-between;
        border-radius: 20px;
        padding: 20px;
        margin-bottom: 20px;
        background: radial-gradient(91.85% 100% at 1.84% 0%,rgb(27 24 216 / 20%) 0%,rgb(239 227 218 / 50%) 100%);
        
        
        .background {
            position:absolute;
            mix-blend-mode: overlay;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('./assets/images/noise.png')  0% 0% / cover;
            z-index: 1;
        }

        .pool-title {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .pool-name {
                display: flex;
                align-items: center;

                font-size: 20px;
                font-weight: 500;

                .wrapper {
                    height: 22px;
                    margin-right: 12px; 

                    .coin-img {
                        width: 22px;
                        height: 22px;
                        border: 1px solid #bebebe;
                        border-radius: 50%;
                    }
                }
               
            }
            
            .manage {
                z-index: 2;
                .button {
                    font-weight: 500;
                    color: #4397ff;
                    cursor: pointer;
                }
            }
        }

        .checkbox {
            display: none;
        }

        .checkbox:checked + .pool-details {
            display:flex;
        }
      
        .pool-details {
            display: none;
            width: 100%;
            flex-direction: column;

            margin-top: 20px;

            .detail {
                display:flex;
                flex-direction: row;
                width: 100%;
                justify-content: space-between;
                margin-bottom: 8px;
            }
        }
    }

    .all-pool {
       background: radial-gradient(91.85% 100% at 1.84% 0%,rgb(33 211 229 / 20%) 0%,rgb(242 237 237) 100%);
    }

    .pool-action {
        width: 100%;
        display: flex;
        justify-content: space-around;

        margin-top: 16px;

        button {
            width: calc(50% - 20px);
            font-size: 15px;
            padding: 8px;
            font-weight: 500;
            text-align: center;
            border-radius: 8px;
            outline: none;
            border: 1px solid transparent;
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
            background-color: #4397ff;
            color: white;
        }
    }
`

function Pool() {
    const poolData = useSelector((state) => state.store.poolsData)
    const [searchKeyword, setSearchKeyword] = React.useState('')
    console.log(poolData)

    function poolGenerator(data, isUser, keyword = '') {
        let result = []

        if (data) {
            for (let pool in data) {

                const coinX = pool.split('/')[0]
                const coinY = pool.split('/')[1]
                const uppercasePoolNames = pool.toUpperCase()

                if (isUser && data[pool].userPoolData.poolTokenAmount) {
                    result.push(
                        (<div className="pool" key={pool + '*'}>
                            <span className="background"></span>
                            <div className="pool-title">

                                <div className="pool-name">
                                    <div className="wrapper">
                                        <img className="coin-img" src={`/assets/coins/${coinX}.png`} alt="pairX" />
                                        <img className="coin-img" src={`/assets/coins/${coinY}.png`} alt="pairY" />
                                    </div>
                                    <div>{uppercasePoolNames}</div>
                                </div>
                                <div className="manage">
                                    <label className="button" htmlFor={pool}>Manage</label>
                                </div>
                            </div>
                            <input type="checkbox" className="checkbox" id={pool} />
                            <div className="pool-details">
                                <div className="detail">
                                    <div>Your total pool tokens:</div>
                                    <div>1</div>
                                </div>
                                <div className="detail">
                                    <div>Pooled {uppercasePoolNames.split('/')[0]}:</div>
                                    <div>2</div>
                                </div>
                                <div className="detail">
                                    <div>Pooled {uppercasePoolNames.split('/')[1]}:</div>
                                    <div>3</div>
                                </div>
                                <div className="detail">
                                    <div>Your pool share:</div>
                                    <div>4</div>
                                </div>

                                <div className="pool-action">
                                    <button>Deposit</button><button>Withdraw</button>
                                </div>
                            </div>


                        </div>)
                    )
                } else if (!isUser) {


                    result.push(
                        <div className="pool all-pool" key={pool}>
                            <span className="background"></span>
                            <div className="pool-title">
                                <div className="pool-name">
                                    <div className="wrapper">
                                        <img className="coin-img" src={`/assets/coins/${coinX}.png`} alt="pairX" />
                                        <img className="coin-img" src={`/assets/coins/${coinY}.png`} alt="pairY" />
                                    </div>
                                    <div>
                                        {uppercasePoolNames}
                                    </div>
                                </div>
                                <div className="manage">
                                    <label className="button" htmlFor={pool + '*'}>Manage</label>
                                </div>
                            </div>
                            <input type="checkbox" className="checkbox" id={pool + '*'} />
                            <div className="pool-details">
                                <div className="detail">
                                    <div>Total Pooled {uppercasePoolNames.split('/')[0]}:</div>
                                    <div>2</div>
                                </div>
                                <div className="detail">
                                    <div>Total Pooled {uppercasePoolNames.split('/')[1]}:</div>
                                    <div>3</div>
                                </div>
                                <div className="detail">
                                    <div>APY:</div>
                                    <div>4%</div>
                                </div>

                                <div className="pool-action">
                                    <button>Deposit</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        } else {
            return <div className="no-pool">No liquidity found</div>
        }

        if (!isUser && keyword !== '') {
            result = result.filter((s => s.key.includes(keyword)))
        }

        return result

        function isEmpty(param) {
            return Object.keys(param).length === 0;
        }
    }
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

                {poolGenerator(poolData.pools, true)}

                <div className="header">
                    <div className="title">
                        All liquidity
                    </div>

                    <div className="buttons">
                        <input type="text" className="search" value={searchKeyword} onChange={(e) => { setSearchKeyword(e.target.value) }} placeholder="Search Pool" />
                    </div>
                </div>

                {poolGenerator(poolData.pools, false, searchKeyword)}

            </PoolWrapper>
        </>
    )
}

export default Pool