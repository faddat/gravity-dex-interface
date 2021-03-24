/* eslint-disable */
import {
  MsgCreatePoolResponse,
  MsgDepositWithinBatchResponse,
  MsgWithdrawWithinBatchResponse,
  MsgSwapWithinBatchResponse,
  MsgCreatePoolRequest,
  MsgDepositWithinBatchRequest,
  MsgWithdrawWithinBatchRequest,
  MsgSwapWithinBatchRequest,
} from "./tx";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "tendermint.liquidity";

/** Msg defines the staking Msg service. */
export interface MsgApi {
  /** Submit create liquidity pool message. */
  CreatePoolApi(request: MsgCreatePoolRequest): Promise<MsgCreatePoolResponse>;
  /** Submit deposit to the liquidity pool batch */
  DepositWithinBatchApi(
    request: MsgDepositWithinBatchRequest
  ): Promise<MsgDepositWithinBatchResponse>;
  /** Submit withdraw from to the liquidity pool batch */
  WithdrawWithinBatchApi(
    request: MsgWithdrawWithinBatchRequest
  ): Promise<MsgWithdrawWithinBatchResponse>;
  /** Submit swap to the liquidity pool batch */
  SwapApi(
    request: MsgSwapWithinBatchRequest
  ): Promise<MsgSwapWithinBatchResponse>;
}

export class MsgApiClientImpl implements MsgApi {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  CreatePoolApi(request: MsgCreatePoolRequest): Promise<MsgCreatePoolResponse> {
    const data = MsgCreatePoolRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.liquidity.MsgApi",
      "CreatePoolApi",
      data
    );
    return promise.then((data) =>
      MsgCreatePoolResponse.decode(new _m0.Reader(data))
    );
  }

  DepositWithinBatchApi(
    request: MsgDepositWithinBatchRequest
  ): Promise<MsgDepositWithinBatchResponse> {
    const data = MsgDepositWithinBatchRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.liquidity.MsgApi",
      "DepositWithinBatchApi",
      data
    );
    return promise.then((data) =>
      MsgDepositWithinBatchResponse.decode(new _m0.Reader(data))
    );
  }

  WithdrawWithinBatchApi(
    request: MsgWithdrawWithinBatchRequest
  ): Promise<MsgWithdrawWithinBatchResponse> {
    const data = MsgWithdrawWithinBatchRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.liquidity.MsgApi",
      "WithdrawWithinBatchApi",
      data
    );
    return promise.then((data) =>
      MsgWithdrawWithinBatchResponse.decode(new _m0.Reader(data))
    );
  }

  SwapApi(
    request: MsgSwapWithinBatchRequest
  ): Promise<MsgSwapWithinBatchResponse> {
    const data = MsgSwapWithinBatchRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.liquidity.MsgApi",
      "SwapApi",
      data
    );
    return promise.then((data) =>
      MsgSwapWithinBatchResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}
