import { createRpc, QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { QueryClientImpl } from "./liquidity_codecs/query";

export async function test2() {
    // Inside an async function...
    // The Tendermint client knows how to talk to the Tendermint RPC endpoint
    const tendermintClient = await Tendermint34Client.connect("https://dev.bharvest.io/rpc/");

    // The generic Stargate query client knows how to use the Tendermint client to submit unverified ABCI queries
    const queryClient = new QueryClient(tendermintClient);

    // This helper function wraps the generic Stargate query client for use by the specific generated query client
    const rpcClient = createRpc(queryClient);

    // Here we instantiate a specific query client which will have the custom methods defined in the .proto file
    const queryService = new QueryClientImpl(rpcClient);

    // Now you can use this service to submit queries
    const queryResult = await queryService.LiquidityPools({})

    console.log(queryResult)
}

