import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import { MsgApiClientImpl } from "./liquidity_codecs/msg"

export async function testTxGenerator() {
    // set config
    const chainId = "swap-testnet-2001";
    await window.keplr.enable(chainId);
    const wallet = window.getOfflineSigner(chainId);
    const [firstAccount] = await wallet.getAccounts();

    const rpcEndpoint = "https://dev.bharvest.io/rpc/";
    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);

    const recipient = "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5";
    const amount = {
        denom: "uscrt",
        amount: "1000",
    };

    const result = await client.sendTokens(firstAccount.address, recipient, [amount], "Have fun with your star coins");
    console.log('loading start')

    try {
        assertIsBroadcastTxSuccess(result);
    } catch (e) {
        console.log(e)
        console.log('loading end')
        return
    }

    console.log('loading end')
    console.log('broadcast success')
}