// import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
// import {
//     assertIsBroadcastTxSuccess,
//     SigningStargateClient,
//     StargateClient,
// } from "@cosmjs/stargate";

// A message type auto-generated from .proto files using ts-proto. @cosmjs/stargate ships some
// common types but don't rely on those being available. You need to set up your own code generator
// for the types you care about. How this is done should be documented, but is not yet:
// https://github.com/cosmos/cosmjs/issues/640
// import { MsgClientImpl } from "./liquidity_codecs/tx";

// export async function testSign() {


//     // set config
//     const chainId = "swap-testnet-2001";
//     await window.keplr.enable(chainId);
//     const wallet = window.getOfflineSigner(chainId);
//     const [firstAccount] = await wallet.getAccounts();

//     const rpcEndpoint = "https://dev.bharvest.io/rpc/";
//     const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, {
//         registry: new Registry({
//             typeUrl: "tendermint.liquidity.MsgSwap", value: {
//                 "swap_requester_address": "cosmos1ltz6n5d2jrvvnfjwly5w6wjwy0x38vg5x89u6u",
//                 "pool_id": "1",
//                 "swap_type": 1,
//                 "offer_coin": {
//                     "denom": "uatom",
//                     "amount": "1000000"
//                 },
//                 "demand_coin_denom": "uscrt",
//                 "order_price": "5.628541962635075890",
//                 "offer_coin_fee": {
//                     "denom": "uatom",
//                     "amount": "1500"
//                 }
//             }
//         })
//     });



//     // const memo = "Use your power wisely";
//     // const result = await client.signAndBroadcast(
//     //     firstAccount.address,
//     //     [msgAny],
//     //     fee,
//     //     memo
//     // );
//     // assertIsBroadcastTxSuccess(result);
// }

import { createRpc, QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { QueryClientImpl } from "./liquidity_codecs/query";
import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, SigningStargateClient } from "@cosmjs/stargate";
import { MsgSwapRequest } from "./liquidity_codecs/tx";

export async function testSign() {
    // Inside an async function...
    // The Tendermint client knows how to talk to the Tendermint RPC endpoint
    // const tendermintClient = await Tendermint34Client.connect("https://dev.bharvest.io/rpc/");

    // // The generic Stargate query client knows how to use the Tendermint client to submit unverified ABCI queries
    // const queryClient = new QueryClient(tendermintClient);

    // // This helper function wraps the generic Stargate query client for use by the specific generated query client
    // const rpcClient = createRpc(queryClient);

    // // Here we instantiate a specific query client which will have the custom methods defined in the .proto file
    // const queryService = new QueryClientImpl(rpcClient);

    // // Now you can use this service to submit queries
    // const queryResult = await queryService.LiquidityPools({})


    const myRegistry = new Registry([
        ...defaultRegistryTypes,
        ["/tendermint.liquidity.MsgSwap", MsgSwapRequest],
    ]);
    const chainId = "swap-testnet-2001";
    await window.keplr.enable(chainId);
    const wallet = window.getOfflineSigner(chainId);

    const [firstAccount] = await wallet.getAccounts();

    const rpcEndpoint = "https://dev.bharvest.io/rpc/";
    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, { registry: myRegistry });
    const message = {
        typeUrl: "/tendermint.liquidity.MsgSwap",
        value: {
            "swap_requester_address": "cosmos1ltz6n5d2jrvvnfjwly5w6wjwy0x38vg5x89u6u",
            "pool_id": "1",
            "swap_type": 1,
            "offer_coin": {
                "denom": "uatom",
                "amount": "20000000"
            },
            "demand_coin_denom": "uscrt",
            "order_price": "5.628541962635075890",
            "offer_coin_fee": {
                "denom": "uatom",
                "amount": "30000"
            }
        }
    };
    const fee = {
        amount: [
            {
                denom: "uatom",
                amount: "120000",
            },
        ],
        gas: "10000",
    };
    const response = await client.signAndBroadcast(firstAccount.address, [message], fee);

}