/* eslint-disable */
import Long from "long";
import { Coin, DecCoin } from "./cosmos_proto/coin";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "tendermint.liquidity";

/** MsgCreatePool defines an sdk.Msg type that supports submitting create liquidity pool */
export interface MsgCreatePool {
  poolCreatorAddress: string;
  /** id of target pool type, only 1 is allowed on this version, Must match the value in the pool. */
  poolTypeId: number;
  /** reserve coin pair of the pool to deposit */
  depositCoins: Coin[];
}

/** MsgCreatePoolRequest is the request type for the Msg/MsgCreatePoolRequest RPC method. */
export interface MsgCreatePoolRequest {
  baseReq?: BaseReq;
  /** MsgCreatePool */
  msg?: MsgCreatePool;
}

/** MsgCreatePoolResponse defines the Msg/CreatePool response type. */
export interface MsgCreatePoolResponse {
  stdTx?: StdTx;
}

/**
 * `MsgDepositWithinBatch defines` an `sdk.Msg` type that supports submitting deposit request to the batch of the liquidity pool
 * Deposit submit to the batch of the Liquidity pool with the specified `pool_id`, deposit_coins for reserve
 * this requests are stacked in the batch of the liquidity pool, not immediately processed and
 * processed in the `endblock` at once with other requests.
 *
 * See: https://github.com/tendermint/liquidity/blob/develop/x/liquidity/spec/04_messages.md
 */
export interface MsgDepositWithinBatch {
  /**
   * The publisher in which to create the book.
   *
   * Format: `publishers/{publisher}`
   *
   * Example: `publishers/1257894000000000000`
   */
  depositorAddress: string;
  /** id of the target pool */
  poolId: Long;
  /** reserve coin pair of the pool to deposit */
  depositCoins: Coin[];
}

/** MsgDepositWithinBatchRequest is the request type for the Msg/DepositWithinBatch RPC method. */
export interface MsgDepositWithinBatchRequest {
  baseReq?: BaseReq;
  /** id of the target pool */
  poolId: Long;
  /** MsgDepositWithinBatch */
  msg?: MsgDepositWithinBatch;
}

/** MsgDepositWithinBatchResponse defines the Msg/DepositWithinBatch response type. */
export interface MsgDepositWithinBatchResponse {
  stdTx?: StdTx;
}

/**
 * `MsgWithdrawWithinBatch` defines an `sdk.Msg` type that supports submitting withdraw request to the batch of the liquidity pool
 * Withdraw submit to the batch from the Liquidity pool with the specified `pool_id`, `pool_coin` of the pool
 * this requests are stacked in the batch of the liquidity pool, not immediately processed and
 * processed in the `endblock` at once with other requests.
 *
 * See: https://github.com/tendermint/liquidity/blob/develop/x/liquidity/spec/04_messages.md
 */
export interface MsgWithdrawWithinBatch {
  withdrawerAddress: string;
  /** id of the target pool */
  poolId: Long;
  poolCoin?: Coin;
}

/** MsgWithdrawWithinBatchRequest is the request type for the Query/WithdrawWithinBatch RPC method. */
export interface MsgWithdrawWithinBatchRequest {
  baseReq?: BaseReq;
  /** id of the target pool */
  poolId: Long;
  /** MsgWithdrawWithinBatch */
  msg?: MsgWithdrawWithinBatch;
}

/** MsgWithdrawWithinBatchResponse defines the Msg/WithdrawWithinBatch response type. */
export interface MsgWithdrawWithinBatchResponse {
  stdTx?: StdTx;
}

/**
 * `MsgSwapWithinBatch` defines an sdk.Msg type that supports submitting swap offer request to the batch of the liquidity pool
 * Swap offer submit to the batch to the Liquidity pool with the specified the `pool_id`, `swap_type_id`,
 * `demand_coin_denom` with the coin and the price you're offering and current `params.swap_fee_rate`
 * this requests are stacked in the batch of the liquidity pool, not immediately processed and
 * processed in the `endblock` at once with other requests
 * You should request the same each field as the pool
 * Currently, only the default `swap_type_id`1 is available on this version
 * The detailed swap algorithm can be found here.
 *
 * See: https://github.com/tendermint/liquidity/tree/develop/doc
 * https://github.com/tendermint/liquidity/blob/develop/x/liquidity/spec/04_messages.md
 */
export interface MsgSwapWithinBatch {
  /** address of swap requester */
  swapRequesterAddress: string;
  /** id of the target pool */
  poolId: Long;
  /** id of swap type, only 1 is allowed on this version, Must match the value in the pool. */
  swapTypeId: number;
  /** offer sdk.coin for the swap request, Must match the denom in the pool. */
  offerCoin?: Coin;
  /** denom of demand coin to be exchanged on the swap request, Must match the denom in the pool. */
  demandCoinDenom: string;
  /** offer coin fee for pay fees in half offer coin */
  offerCoinFee?: Coin;
  /** limit order price for the order, the price is the exchange ratio of X/Y where X is the amount of the first coin and Y is the amount of the second coin when their denoms are sorted alphabetically */
  orderPrice: Uint8Array;
}

/** MsgSwapWithinBatchRequest is the request type for the Query/Swap RPC method. */
export interface MsgSwapWithinBatchRequest {
  baseReq?: BaseReq;
  /** id of the target pool */
  poolId: Long;
  /** MsgSwapWithinBatch */
  msg?: MsgSwapWithinBatch;
}

/** MsgSwapWithinBatchResponse defines the Msg/Swap response type. */
export interface MsgSwapWithinBatchResponse {
  stdTx?: StdTx;
}

/** Base Request struct for Post Tx, standard of tendermint/cosmos-sdk */
export interface BaseReq {
  /** Sender address or Keybase name to generate a transaction */
  from: string;
  /** Memo to send along with transaction */
  memo: string;
  /** Name or address of private key with which to sign */
  chainId: string;
  /** The account number of the signing account (offline mode only) */
  accountNumber: Long;
  /** The sequence number of the signing account (offline mode only) */
  sequence: Long;
  /** Set a block timeout height to prevent the tx from being committed past a certain height */
  timeoutHeight: Long;
  /** Fees to pay along with transaction */
  fees: Coin[];
  /** Gas prices in decimal format to determine the transaction fee */
  gasPrices: DecCoin[];
  /** Gas amount to determine the transaction fee */
  gas: Long;
  /** adjustment factor to be multiplied against the estimate returned by the tx simulation; if the gas limit is set manually this flag is ignored */
  gasAdjustment: string;
  /** Estimate gas for a transaction (cannot be used in conjunction with generate_only) */
  simulate: boolean;
}

/** Fee struct of cosmos-sdk */
export interface Fee {
  gas: Long;
  /** amount is the amount of coins to be paid as a fee */
  amount: Coin[];
}

/** PubKey struct of tendermint/cosmos-sdk */
export interface PubKey {
  /** type of pubkey algorithm */
  type: string;
  /** value of pubkey */
  value: string;
}

/** signature struct of tendermint/cosmos-sdk */
export interface Signature {
  /** signature base64 */
  signature: string;
  /** PubKey */
  pubKey?: PubKey;
  /** The account number of the signing account (offline mode only) */
  accountNumber: Long;
  /** The sequence number of the signing account (offline mode only) */
  sequence: Long;
}

/** Base response struct of result of the requested Tx, standard of tendermint/cosmos-sdk */
export interface StdTx {
  /** Msgs */
  msg: string[];
  /** Fee */
  fee?: Fee;
  /** Memo of the transaction */
  memo: string;
  /** Signature */
  signature?: Signature;
}

const baseMsgCreatePool: object = { poolCreatorAddress: "", poolTypeId: 0 };

export const MsgCreatePool = {
  encode(
    message: MsgCreatePool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.poolCreatorAddress !== "") {
      writer.uint32(10).string(message.poolCreatorAddress);
    }
    if (message.poolTypeId !== 0) {
      writer.uint32(16).uint32(message.poolTypeId);
    }
    for (const v of message.depositCoins) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePool {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreatePool } as MsgCreatePool;
    message.depositCoins = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolCreatorAddress = reader.string();
          break;
        case 2:
          message.poolTypeId = reader.uint32();
          break;
        case 4:
          message.depositCoins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePool {
    const message = { ...baseMsgCreatePool } as MsgCreatePool;
    message.depositCoins = [];
    if (
      object.poolCreatorAddress !== undefined &&
      object.poolCreatorAddress !== null
    ) {
      message.poolCreatorAddress = String(object.poolCreatorAddress);
    } else {
      message.poolCreatorAddress = "";
    }
    if (object.poolTypeId !== undefined && object.poolTypeId !== null) {
      message.poolTypeId = Number(object.poolTypeId);
    } else {
      message.poolTypeId = 0;
    }
    if (object.depositCoins !== undefined && object.depositCoins !== null) {
      for (const e of object.depositCoins) {
        message.depositCoins.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MsgCreatePool): unknown {
    const obj: any = {};
    message.poolCreatorAddress !== undefined &&
      (obj.poolCreatorAddress = message.poolCreatorAddress);
    message.poolTypeId !== undefined && (obj.poolTypeId = message.poolTypeId);
    if (message.depositCoins) {
      obj.depositCoins = message.depositCoins.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.depositCoins = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreatePool>): MsgCreatePool {
    const message = { ...baseMsgCreatePool } as MsgCreatePool;
    message.depositCoins = [];
    if (
      object.poolCreatorAddress !== undefined &&
      object.poolCreatorAddress !== null
    ) {
      message.poolCreatorAddress = object.poolCreatorAddress;
    } else {
      message.poolCreatorAddress = "";
    }
    if (object.poolTypeId !== undefined && object.poolTypeId !== null) {
      message.poolTypeId = object.poolTypeId;
    } else {
      message.poolTypeId = 0;
    }
    if (object.depositCoins !== undefined && object.depositCoins !== null) {
      for (const e of object.depositCoins) {
        message.depositCoins.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

const baseMsgCreatePoolRequest: object = {};

export const MsgCreatePoolRequest = {
  encode(
    message: MsgCreatePoolRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.baseReq !== undefined) {
      BaseReq.encode(message.baseReq, writer.uint32(10).fork()).ldelim();
    }
    if (message.msg !== undefined) {
      MsgCreatePool.encode(message.msg, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreatePoolRequest {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreatePoolRequest } as MsgCreatePoolRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseReq = BaseReq.decode(reader, reader.uint32());
          break;
        case 2:
          message.msg = MsgCreatePool.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePoolRequest {
    const message = { ...baseMsgCreatePoolRequest } as MsgCreatePoolRequest;
    if (object.baseReq !== undefined && object.baseReq !== null) {
      message.baseReq = BaseReq.fromJSON(object.baseReq);
    } else {
      message.baseReq = undefined;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = MsgCreatePool.fromJSON(object.msg);
    } else {
      message.msg = undefined;
    }
    return message;
  },

  toJSON(message: MsgCreatePoolRequest): unknown {
    const obj: any = {};
    message.baseReq !== undefined &&
      (obj.baseReq = message.baseReq
        ? BaseReq.toJSON(message.baseReq)
        : undefined);
    message.msg !== undefined &&
      (obj.msg = message.msg ? MsgCreatePool.toJSON(message.msg) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreatePoolRequest>): MsgCreatePoolRequest {
    const message = { ...baseMsgCreatePoolRequest } as MsgCreatePoolRequest;
    if (object.baseReq !== undefined && object.baseReq !== null) {
      message.baseReq = BaseReq.fromPartial(object.baseReq);
    } else {
      message.baseReq = undefined;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = MsgCreatePool.fromPartial(object.msg);
    } else {
      message.msg = undefined;
    }
    return message;
  },
};

const baseMsgCreatePoolResponse: object = {};

export const MsgCreatePoolResponse = {
  encode(
    message: MsgCreatePoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.stdTx !== undefined) {
      StdTx.encode(message.stdTx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreatePoolResponse {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreatePoolResponse } as MsgCreatePoolResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stdTx = StdTx.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePoolResponse {
    const message = { ...baseMsgCreatePoolResponse } as MsgCreatePoolResponse;
    if (object.stdTx !== undefined && object.stdTx !== null) {
      message.stdTx = StdTx.fromJSON(object.stdTx);
    } else {
      message.stdTx = undefined;
    }
    return message;
  },

  toJSON(message: MsgCreatePoolResponse): unknown {
    const obj: any = {};
    message.stdTx !== undefined &&
      (obj.stdTx = message.stdTx ? StdTx.toJSON(message.stdTx) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreatePoolResponse>
  ): MsgCreatePoolResponse {
    const message = { ...baseMsgCreatePoolResponse } as MsgCreatePoolResponse;
    if (object.stdTx !== undefined && object.stdTx !== null) {
      message.stdTx = StdTx.fromPartial(object.stdTx);
    } else {
      message.stdTx = undefined;
    }
    return message;
  },
};

const baseMsgDepositWithinBatch: object = {
  depositorAddress: "",
  poolId: Long.UZERO,
};

export const MsgDepositWithinBatch = {
  encode(
    message: MsgDepositWithinBatch,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.depositorAddress !== "") {
      writer.uint32(10).string(message.depositorAddress);
    }
    if (!message.poolId.isZero()) {
      writer.uint32(16).uint64(message.poolId);
    }
    for (const v of message.depositCoins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDepositWithinBatch {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDepositWithinBatch } as MsgDepositWithinBatch;
    message.depositCoins = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.depositorAddress = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64() as Long;
          break;
        case 3:
          message.depositCoins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDepositWithinBatch {
    const message = { ...baseMsgDepositWithinBatch } as MsgDepositWithinBatch;
    message.depositCoins = [];
    if (
      object.depositorAddress !== undefined &&
      object.depositorAddress !== null
    ) {
      message.depositorAddress = String(object.depositorAddress);
    } else {
      message.depositorAddress = "";
    }
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Long.fromString(object.poolId);
    } else {
      message.poolId = Long.UZERO;
    }
    if (object.depositCoins !== undefined && object.depositCoins !== null) {
      for (const e of object.depositCoins) {
        message.depositCoins.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MsgDepositWithinBatch): unknown {
    const obj: any = {};
    message.depositorAddress !== undefined &&
      (obj.depositorAddress = message.depositorAddress);
    message.poolId !== undefined &&
      (obj.poolId = (message.poolId || Long.UZERO).toString());
    if (message.depositCoins) {
      obj.depositCoins = message.depositCoins.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.depositCoins = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgDepositWithinBatch>
  ): MsgDepositWithinBatch {
    const message = { ...baseMsgDepositWithinBatch } as MsgDepositWithinBatch;
    message.depositCoins = [];
    if (
      object.depositorAddress !== undefined &&
      object.depositorAddress !== null
    ) {
      message.depositorAddress = object.depositorAddress;
    } else {
      message.depositorAddress = "";
    }
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId as Long;
    } else {
      message.poolId = Long.UZERO;
    }
    if (object.depositCoins !== undefined && object.depositCoins !== null) {
      for (const e of object.depositCoins) {
        message.depositCoins.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

const baseMsgDepositWithinBatchRequest: object = { poolId: Long.UZERO };

export const MsgDepositWithinBatchRequest = {
  encode(
    message: MsgDepositWithinBatchRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.baseReq !== undefined) {
      BaseReq.encode(message.baseReq, writer.uint32(10).fork()).ldelim();
    }
    if (!message.poolId.isZero()) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.msg !== undefined) {
      MsgDepositWithinBatch.encode(
        message.msg,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDepositWithinBatchRequest {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDepositWithinBatchRequest,
    } as MsgDepositWithinBatchRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseReq = BaseReq.decode(reader, reader.uint32());
          break;
        case 2:
          message.poolId = reader.uint64() as Long;
          break;
        case 3:
          message.msg = MsgDepositWithinBatch.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDepositWithinBatchRequest {
    const message = {
      ...baseMsgDepositWithinBatchRequest,
    } as MsgDepositWithinBatchRequest;
    if (object.baseReq !== undefined && object.baseReq !== null) {
      message.baseReq = BaseReq.fromJSON(object.baseReq);
    } else {
      message.baseReq = undefined;
    }
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Long.fromString(object.poolId);
    } else {
      message.poolId = Long.UZERO;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = MsgDepositWithinBatch.fromJSON(object.msg);
    } else {
      message.msg = undefined;
    }
    return message;
  },

  toJSON(message: MsgDepositWithinBatchRequest): unknown {
    const obj: any = {};
    message.baseReq !== undefined &&
      (obj.baseReq = message.baseReq
        ? BaseReq.toJSON(message.baseReq)
        : undefined);
    message.poolId !== undefined &&
      (obj.poolId = (message.poolId || Long.UZERO).toString());
    message.msg !== undefined &&
      (obj.msg = message.msg
        ? MsgDepositWithinBatch.toJSON(message.msg)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgDepositWithinBatchRequest>
  ): MsgDepositWithinBatchRequest {
    const message = {
      ...baseMsgDepositWithinBatchRequest,
    } as MsgDepositWithinBatchRequest;
    if (object.baseReq !== undefined && object.baseReq !== null) {
      message.baseReq = BaseReq.fromPartial(object.baseReq);
    } else {
      message.baseReq = undefined;
    }
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId as Long;
    } else {
      message.poolId = Long.UZERO;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = MsgDepositWithinBatch.fromPartial(object.msg);
    } else {
      message.msg = undefined;
    }
    return message;
  },
};

const baseMsgDepositWithinBatchResponse: object = {};

export const MsgDepositWithinBatchResponse = {
  encode(
    message: MsgDepositWithinBatchResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.stdTx !== undefined) {
      StdTx.encode(message.stdTx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDepositWithinBatchResponse {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDepositWithinBatchResponse,
    } as MsgDepositWithinBatchResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stdTx = StdTx.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDepositWithinBatchResponse {
    const message = {
      ...baseMsgDepositWithinBatchResponse,
    } as MsgDepositWithinBatchResponse;
    if (object.stdTx !== undefined && object.stdTx !== null) {
      message.stdTx = StdTx.fromJSON(object.stdTx);
    } else {
      message.stdTx = undefined;
    }
    return message;
  },

  toJSON(message: MsgDepositWithinBatchResponse): unknown {
    const obj: any = {};
    message.stdTx !== undefined &&
      (obj.stdTx = message.stdTx ? StdTx.toJSON(message.stdTx) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgDepositWithinBatchResponse>
  ): MsgDepositWithinBatchResponse {
    const message = {
      ...baseMsgDepositWithinBatchResponse,
    } as MsgDepositWithinBatchResponse;
    if (object.stdTx !== undefined && object.stdTx !== null) {
      message.stdTx = StdTx.fromPartial(object.stdTx);
    } else {
      message.stdTx = undefined;
    }
    return message;
  },
};

const baseMsgWithdrawWithinBatch: object = {
  withdrawerAddress: "",
  poolId: Long.UZERO,
};

export const MsgWithdrawWithinBatch = {
  encode(
    message: MsgWithdrawWithinBatch,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.withdrawerAddress !== "") {
      writer.uint32(10).string(message.withdrawerAddress);
    }
    if (!message.poolId.isZero()) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.poolCoin !== undefined) {
      Coin.encode(message.poolCoin, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgWithdrawWithinBatch {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgWithdrawWithinBatch } as MsgWithdrawWithinBatch;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.withdrawerAddress = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64() as Long;
          break;
        case 3:
          message.poolCoin = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgWithdrawWithinBatch {
    const message = { ...baseMsgWithdrawWithinBatch } as MsgWithdrawWithinBatch;
    if (
      object.withdrawerAddress !== undefined &&
      object.withdrawerAddress !== null
    ) {
      message.withdrawerAddress = String(object.withdrawerAddress);
    } else {
      message.withdrawerAddress = "";
    }
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Long.fromString(object.poolId);
    } else {
      message.poolId = Long.UZERO;
    }
    if (object.poolCoin !== undefined && object.poolCoin !== null) {
      message.poolCoin = Coin.fromJSON(object.poolCoin);
    } else {
      message.poolCoin = undefined;
    }
    return message;
  },

  toJSON(message: MsgWithdrawWithinBatch): unknown {
    const obj: any = {};
    message.withdrawerAddress !== undefined &&
      (obj.withdrawerAddress = message.withdrawerAddress);
    message.poolId !== undefined &&
      (obj.poolId = (message.poolId || Long.UZERO).toString());
    message.poolCoin !== undefined &&
      (obj.poolCoin = message.poolCoin
        ? Coin.toJSON(message.poolCoin)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgWithdrawWithinBatch>
  ): MsgWithdrawWithinBatch {
    const message = { ...baseMsgWithdrawWithinBatch } as MsgWithdrawWithinBatch;
    if (
      object.withdrawerAddress !== undefined &&
      object.withdrawerAddress !== null
    ) {
      message.withdrawerAddress = object.withdrawerAddress;
    } else {
      message.withdrawerAddress = "";
    }
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId as Long;
    } else {
      message.poolId = Long.UZERO;
    }
    if (object.poolCoin !== undefined && object.poolCoin !== null) {
      message.poolCoin = Coin.fromPartial(object.poolCoin);
    } else {
      message.poolCoin = undefined;
    }
    return message;
  },
};

const baseMsgWithdrawWithinBatchRequest: object = { poolId: Long.UZERO };

export const MsgWithdrawWithinBatchRequest = {
  encode(
    message: MsgWithdrawWithinBatchRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.baseReq !== undefined) {
      BaseReq.encode(message.baseReq, writer.uint32(10).fork()).ldelim();
    }
    if (!message.poolId.isZero()) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.msg !== undefined) {
      MsgWithdrawWithinBatch.encode(
        message.msg,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgWithdrawWithinBatchRequest {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgWithdrawWithinBatchRequest,
    } as MsgWithdrawWithinBatchRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseReq = BaseReq.decode(reader, reader.uint32());
          break;
        case 2:
          message.poolId = reader.uint64() as Long;
          break;
        case 3:
          message.msg = MsgWithdrawWithinBatch.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgWithdrawWithinBatchRequest {
    const message = {
      ...baseMsgWithdrawWithinBatchRequest,
    } as MsgWithdrawWithinBatchRequest;
    if (object.baseReq !== undefined && object.baseReq !== null) {
      message.baseReq = BaseReq.fromJSON(object.baseReq);
    } else {
      message.baseReq = undefined;
    }
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Long.fromString(object.poolId);
    } else {
      message.poolId = Long.UZERO;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = MsgWithdrawWithinBatch.fromJSON(object.msg);
    } else {
      message.msg = undefined;
    }
    return message;
  },

  toJSON(message: MsgWithdrawWithinBatchRequest): unknown {
    const obj: any = {};
    message.baseReq !== undefined &&
      (obj.baseReq = message.baseReq
        ? BaseReq.toJSON(message.baseReq)
        : undefined);
    message.poolId !== undefined &&
      (obj.poolId = (message.poolId || Long.UZERO).toString());
    message.msg !== undefined &&
      (obj.msg = message.msg
        ? MsgWithdrawWithinBatch.toJSON(message.msg)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgWithdrawWithinBatchRequest>
  ): MsgWithdrawWithinBatchRequest {
    const message = {
      ...baseMsgWithdrawWithinBatchRequest,
    } as MsgWithdrawWithinBatchRequest;
    if (object.baseReq !== undefined && object.baseReq !== null) {
      message.baseReq = BaseReq.fromPartial(object.baseReq);
    } else {
      message.baseReq = undefined;
    }
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId as Long;
    } else {
      message.poolId = Long.UZERO;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = MsgWithdrawWithinBatch.fromPartial(object.msg);
    } else {
      message.msg = undefined;
    }
    return message;
  },
};

const baseMsgWithdrawWithinBatchResponse: object = {};

export const MsgWithdrawWithinBatchResponse = {
  encode(
    message: MsgWithdrawWithinBatchResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.stdTx !== undefined) {
      StdTx.encode(message.stdTx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgWithdrawWithinBatchResponse {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgWithdrawWithinBatchResponse,
    } as MsgWithdrawWithinBatchResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stdTx = StdTx.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgWithdrawWithinBatchResponse {
    const message = {
      ...baseMsgWithdrawWithinBatchResponse,
    } as MsgWithdrawWithinBatchResponse;
    if (object.stdTx !== undefined && object.stdTx !== null) {
      message.stdTx = StdTx.fromJSON(object.stdTx);
    } else {
      message.stdTx = undefined;
    }
    return message;
  },

  toJSON(message: MsgWithdrawWithinBatchResponse): unknown {
    const obj: any = {};
    message.stdTx !== undefined &&
      (obj.stdTx = message.stdTx ? StdTx.toJSON(message.stdTx) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgWithdrawWithinBatchResponse>
  ): MsgWithdrawWithinBatchResponse {
    const message = {
      ...baseMsgWithdrawWithinBatchResponse,
    } as MsgWithdrawWithinBatchResponse;
    if (object.stdTx !== undefined && object.stdTx !== null) {
      message.stdTx = StdTx.fromPartial(object.stdTx);
    } else {
      message.stdTx = undefined;
    }
    return message;
  },
};

const baseMsgSwapWithinBatch: object = {
  swapRequesterAddress: "",
  poolId: Long.UZERO,
  swapTypeId: 0,
  demandCoinDenom: "",
};

export const MsgSwapWithinBatch = {
  encode(
    message: MsgSwapWithinBatch,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.swapRequesterAddress !== "") {
      writer.uint32(10).string(message.swapRequesterAddress);
    }
    if (!message.poolId.isZero()) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.swapTypeId !== 0) {
      writer.uint32(24).uint32(message.swapTypeId);
    }
    if (message.offerCoin !== undefined) {
      Coin.encode(message.offerCoin, writer.uint32(34).fork()).ldelim();
    }
    if (message.demandCoinDenom !== "") {
      writer.uint32(42).string(message.demandCoinDenom);
    }
    if (message.offerCoinFee !== undefined) {
      Coin.encode(message.offerCoinFee, writer.uint32(50).fork()).ldelim();
    }
    if (message.orderPrice.length !== 0) {
      writer.uint32(58).bytes(message.orderPrice);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSwapWithinBatch {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSwapWithinBatch } as MsgSwapWithinBatch;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.swapRequesterAddress = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64() as Long;
          break;
        case 3:
          message.swapTypeId = reader.uint32();
          break;
        case 4:
          message.offerCoin = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.demandCoinDenom = reader.string();
          break;
        case 6:
          message.offerCoinFee = Coin.decode(reader, reader.uint32());
          break;
        case 7:
          message.orderPrice = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSwapWithinBatch {
    const message = { ...baseMsgSwapWithinBatch } as MsgSwapWithinBatch;
    if (
      object.swapRequesterAddress !== undefined &&
      object.swapRequesterAddress !== null
    ) {
      message.swapRequesterAddress = String(object.swapRequesterAddress);
    } else {
      message.swapRequesterAddress = "";
    }
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Long.fromString(object.poolId);
    } else {
      message.poolId = Long.UZERO;
    }
    if (object.swapTypeId !== undefined && object.swapTypeId !== null) {
      message.swapTypeId = Number(object.swapTypeId);
    } else {
      message.swapTypeId = 0;
    }
    if (object.offerCoin !== undefined && object.offerCoin !== null) {
      message.offerCoin = Coin.fromJSON(object.offerCoin);
    } else {
      message.offerCoin = undefined;
    }
    if (
      object.demandCoinDenom !== undefined &&
      object.demandCoinDenom !== null
    ) {
      message.demandCoinDenom = String(object.demandCoinDenom);
    } else {
      message.demandCoinDenom = "";
    }
    if (object.offerCoinFee !== undefined && object.offerCoinFee !== null) {
      message.offerCoinFee = Coin.fromJSON(object.offerCoinFee);
    } else {
      message.offerCoinFee = undefined;
    }
    if (object.orderPrice !== undefined && object.orderPrice !== null) {
      message.orderPrice = bytesFromBase64(object.orderPrice);
    }
    return message;
  },

  toJSON(message: MsgSwapWithinBatch): unknown {
    const obj: any = {};
    message.swapRequesterAddress !== undefined &&
      (obj.swapRequesterAddress = message.swapRequesterAddress);
    message.poolId !== undefined &&
      (obj.poolId = (message.poolId || Long.UZERO).toString());
    message.swapTypeId !== undefined && (obj.swapTypeId = message.swapTypeId);
    message.offerCoin !== undefined &&
      (obj.offerCoin = message.offerCoin
        ? Coin.toJSON(message.offerCoin)
        : undefined);
    message.demandCoinDenom !== undefined &&
      (obj.demandCoinDenom = message.demandCoinDenom);
    message.offerCoinFee !== undefined &&
      (obj.offerCoinFee = message.offerCoinFee
        ? Coin.toJSON(message.offerCoinFee)
        : undefined);
    message.orderPrice !== undefined &&
      (obj.orderPrice = base64FromBytes(
        message.orderPrice !== undefined ? message.orderPrice : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSwapWithinBatch>): MsgSwapWithinBatch {
    const message = { ...baseMsgSwapWithinBatch } as MsgSwapWithinBatch;
    if (
      object.swapRequesterAddress !== undefined &&
      object.swapRequesterAddress !== null
    ) {
      message.swapRequesterAddress = object.swapRequesterAddress;
    } else {
      message.swapRequesterAddress = "";
    }
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId as Long;
    } else {
      message.poolId = Long.UZERO;
    }
    if (object.swapTypeId !== undefined && object.swapTypeId !== null) {
      message.swapTypeId = object.swapTypeId;
    } else {
      message.swapTypeId = 0;
    }
    if (object.offerCoin !== undefined && object.offerCoin !== null) {
      message.offerCoin = Coin.fromPartial(object.offerCoin);
    } else {
      message.offerCoin = undefined;
    }
    if (
      object.demandCoinDenom !== undefined &&
      object.demandCoinDenom !== null
    ) {
      message.demandCoinDenom = object.demandCoinDenom;
    } else {
      message.demandCoinDenom = "";
    }
    if (object.offerCoinFee !== undefined && object.offerCoinFee !== null) {
      message.offerCoinFee = Coin.fromPartial(object.offerCoinFee);
    } else {
      message.offerCoinFee = undefined;
    }
    if (object.orderPrice !== undefined && object.orderPrice !== null) {
      message.orderPrice = object.orderPrice;
    } else {
      message.orderPrice = new Uint8Array();
    }
    return message;
  },
};

const baseMsgSwapWithinBatchRequest: object = { poolId: Long.UZERO };

export const MsgSwapWithinBatchRequest = {
  encode(
    message: MsgSwapWithinBatchRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.baseReq !== undefined) {
      BaseReq.encode(message.baseReq, writer.uint32(10).fork()).ldelim();
    }
    if (!message.poolId.isZero()) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.msg !== undefined) {
      MsgSwapWithinBatch.encode(message.msg, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSwapWithinBatchRequest {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgSwapWithinBatchRequest,
    } as MsgSwapWithinBatchRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseReq = BaseReq.decode(reader, reader.uint32());
          break;
        case 2:
          message.poolId = reader.uint64() as Long;
          break;
        case 3:
          message.msg = MsgSwapWithinBatch.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSwapWithinBatchRequest {
    const message = {
      ...baseMsgSwapWithinBatchRequest,
    } as MsgSwapWithinBatchRequest;
    if (object.baseReq !== undefined && object.baseReq !== null) {
      message.baseReq = BaseReq.fromJSON(object.baseReq);
    } else {
      message.baseReq = undefined;
    }
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Long.fromString(object.poolId);
    } else {
      message.poolId = Long.UZERO;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = MsgSwapWithinBatch.fromJSON(object.msg);
    } else {
      message.msg = undefined;
    }
    return message;
  },

  toJSON(message: MsgSwapWithinBatchRequest): unknown {
    const obj: any = {};
    message.baseReq !== undefined &&
      (obj.baseReq = message.baseReq
        ? BaseReq.toJSON(message.baseReq)
        : undefined);
    message.poolId !== undefined &&
      (obj.poolId = (message.poolId || Long.UZERO).toString());
    message.msg !== undefined &&
      (obj.msg = message.msg
        ? MsgSwapWithinBatch.toJSON(message.msg)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgSwapWithinBatchRequest>
  ): MsgSwapWithinBatchRequest {
    const message = {
      ...baseMsgSwapWithinBatchRequest,
    } as MsgSwapWithinBatchRequest;
    if (object.baseReq !== undefined && object.baseReq !== null) {
      message.baseReq = BaseReq.fromPartial(object.baseReq);
    } else {
      message.baseReq = undefined;
    }
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId as Long;
    } else {
      message.poolId = Long.UZERO;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = MsgSwapWithinBatch.fromPartial(object.msg);
    } else {
      message.msg = undefined;
    }
    return message;
  },
};

const baseMsgSwapWithinBatchResponse: object = {};

export const MsgSwapWithinBatchResponse = {
  encode(
    message: MsgSwapWithinBatchResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.stdTx !== undefined) {
      StdTx.encode(message.stdTx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSwapWithinBatchResponse {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgSwapWithinBatchResponse,
    } as MsgSwapWithinBatchResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stdTx = StdTx.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSwapWithinBatchResponse {
    const message = {
      ...baseMsgSwapWithinBatchResponse,
    } as MsgSwapWithinBatchResponse;
    if (object.stdTx !== undefined && object.stdTx !== null) {
      message.stdTx = StdTx.fromJSON(object.stdTx);
    } else {
      message.stdTx = undefined;
    }
    return message;
  },

  toJSON(message: MsgSwapWithinBatchResponse): unknown {
    const obj: any = {};
    message.stdTx !== undefined &&
      (obj.stdTx = message.stdTx ? StdTx.toJSON(message.stdTx) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgSwapWithinBatchResponse>
  ): MsgSwapWithinBatchResponse {
    const message = {
      ...baseMsgSwapWithinBatchResponse,
    } as MsgSwapWithinBatchResponse;
    if (object.stdTx !== undefined && object.stdTx !== null) {
      message.stdTx = StdTx.fromPartial(object.stdTx);
    } else {
      message.stdTx = undefined;
    }
    return message;
  },
};

const baseBaseReq: object = {
  from: "",
  memo: "",
  chainId: "",
  accountNumber: Long.UZERO,
  sequence: Long.UZERO,
  timeoutHeight: Long.UZERO,
  gas: Long.UZERO,
  gasAdjustment: "",
  simulate: false,
};

export const BaseReq = {
  encode(
    message: BaseReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.memo !== "") {
      writer.uint32(18).string(message.memo);
    }
    if (message.chainId !== "") {
      writer.uint32(26).string(message.chainId);
    }
    if (!message.accountNumber.isZero()) {
      writer.uint32(32).uint64(message.accountNumber);
    }
    if (!message.sequence.isZero()) {
      writer.uint32(40).uint64(message.sequence);
    }
    if (!message.timeoutHeight.isZero()) {
      writer.uint32(48).uint64(message.timeoutHeight);
    }
    for (const v of message.fees) {
      Coin.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.gasPrices) {
      DecCoin.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (!message.gas.isZero()) {
      writer.uint32(72).uint64(message.gas);
    }
    if (message.gasAdjustment !== "") {
      writer.uint32(82).string(message.gasAdjustment);
    }
    if (message.simulate === true) {
      writer.uint32(88).bool(message.simulate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseReq {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBaseReq } as BaseReq;
    message.fees = [];
    message.gasPrices = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.memo = reader.string();
          break;
        case 3:
          message.chainId = reader.string();
          break;
        case 4:
          message.accountNumber = reader.uint64() as Long;
          break;
        case 5:
          message.sequence = reader.uint64() as Long;
          break;
        case 6:
          message.timeoutHeight = reader.uint64() as Long;
          break;
        case 7:
          message.fees.push(Coin.decode(reader, reader.uint32()));
          break;
        case 8:
          message.gasPrices.push(DecCoin.decode(reader, reader.uint32()));
          break;
        case 9:
          message.gas = reader.uint64() as Long;
          break;
        case 10:
          message.gasAdjustment = reader.string();
          break;
        case 11:
          message.simulate = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BaseReq {
    const message = { ...baseBaseReq } as BaseReq;
    message.fees = [];
    message.gasPrices = [];
    if (object.from !== undefined && object.from !== null) {
      message.from = String(object.from);
    } else {
      message.from = "";
    }
    if (object.memo !== undefined && object.memo !== null) {
      message.memo = String(object.memo);
    } else {
      message.memo = "";
    }
    if (object.chainId !== undefined && object.chainId !== null) {
      message.chainId = String(object.chainId);
    } else {
      message.chainId = "";
    }
    if (object.accountNumber !== undefined && object.accountNumber !== null) {
      message.accountNumber = Long.fromString(object.accountNumber);
    } else {
      message.accountNumber = Long.UZERO;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = Long.fromString(object.sequence);
    } else {
      message.sequence = Long.UZERO;
    }
    if (object.timeoutHeight !== undefined && object.timeoutHeight !== null) {
      message.timeoutHeight = Long.fromString(object.timeoutHeight);
    } else {
      message.timeoutHeight = Long.UZERO;
    }
    if (object.fees !== undefined && object.fees !== null) {
      for (const e of object.fees) {
        message.fees.push(Coin.fromJSON(e));
      }
    }
    if (object.gasPrices !== undefined && object.gasPrices !== null) {
      for (const e of object.gasPrices) {
        message.gasPrices.push(DecCoin.fromJSON(e));
      }
    }
    if (object.gas !== undefined && object.gas !== null) {
      message.gas = Long.fromString(object.gas);
    } else {
      message.gas = Long.UZERO;
    }
    if (object.gasAdjustment !== undefined && object.gasAdjustment !== null) {
      message.gasAdjustment = String(object.gasAdjustment);
    } else {
      message.gasAdjustment = "";
    }
    if (object.simulate !== undefined && object.simulate !== null) {
      message.simulate = Boolean(object.simulate);
    } else {
      message.simulate = false;
    }
    return message;
  },

  toJSON(message: BaseReq): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.memo !== undefined && (obj.memo = message.memo);
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.accountNumber !== undefined &&
      (obj.accountNumber = (message.accountNumber || Long.UZERO).toString());
    message.sequence !== undefined &&
      (obj.sequence = (message.sequence || Long.UZERO).toString());
    message.timeoutHeight !== undefined &&
      (obj.timeoutHeight = (message.timeoutHeight || Long.UZERO).toString());
    if (message.fees) {
      obj.fees = message.fees.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.fees = [];
    }
    if (message.gasPrices) {
      obj.gasPrices = message.gasPrices.map((e) =>
        e ? DecCoin.toJSON(e) : undefined
      );
    } else {
      obj.gasPrices = [];
    }
    message.gas !== undefined &&
      (obj.gas = (message.gas || Long.UZERO).toString());
    message.gasAdjustment !== undefined &&
      (obj.gasAdjustment = message.gasAdjustment);
    message.simulate !== undefined && (obj.simulate = message.simulate);
    return obj;
  },

  fromPartial(object: DeepPartial<BaseReq>): BaseReq {
    const message = { ...baseBaseReq } as BaseReq;
    message.fees = [];
    message.gasPrices = [];
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    } else {
      message.from = "";
    }
    if (object.memo !== undefined && object.memo !== null) {
      message.memo = object.memo;
    } else {
      message.memo = "";
    }
    if (object.chainId !== undefined && object.chainId !== null) {
      message.chainId = object.chainId;
    } else {
      message.chainId = "";
    }
    if (object.accountNumber !== undefined && object.accountNumber !== null) {
      message.accountNumber = object.accountNumber as Long;
    } else {
      message.accountNumber = Long.UZERO;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = object.sequence as Long;
    } else {
      message.sequence = Long.UZERO;
    }
    if (object.timeoutHeight !== undefined && object.timeoutHeight !== null) {
      message.timeoutHeight = object.timeoutHeight as Long;
    } else {
      message.timeoutHeight = Long.UZERO;
    }
    if (object.fees !== undefined && object.fees !== null) {
      for (const e of object.fees) {
        message.fees.push(Coin.fromPartial(e));
      }
    }
    if (object.gasPrices !== undefined && object.gasPrices !== null) {
      for (const e of object.gasPrices) {
        message.gasPrices.push(DecCoin.fromPartial(e));
      }
    }
    if (object.gas !== undefined && object.gas !== null) {
      message.gas = object.gas as Long;
    } else {
      message.gas = Long.UZERO;
    }
    if (object.gasAdjustment !== undefined && object.gasAdjustment !== null) {
      message.gasAdjustment = object.gasAdjustment;
    } else {
      message.gasAdjustment = "";
    }
    if (object.simulate !== undefined && object.simulate !== null) {
      message.simulate = object.simulate;
    } else {
      message.simulate = false;
    }
    return message;
  },
};

const baseFee: object = { gas: Long.UZERO };

export const Fee = {
  encode(message: Fee, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.gas.isZero()) {
      writer.uint32(8).uint64(message.gas);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Fee {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFee } as Fee;
    message.amount = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gas = reader.uint64() as Long;
          break;
        case 2:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Fee {
    const message = { ...baseFee } as Fee;
    message.amount = [];
    if (object.gas !== undefined && object.gas !== null) {
      message.gas = Long.fromString(object.gas);
    } else {
      message.gas = Long.UZERO;
    }
    if (object.amount !== undefined && object.amount !== null) {
      for (const e of object.amount) {
        message.amount.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: Fee): unknown {
    const obj: any = {};
    message.gas !== undefined &&
      (obj.gas = (message.gas || Long.UZERO).toString());
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Fee>): Fee {
    const message = { ...baseFee } as Fee;
    message.amount = [];
    if (object.gas !== undefined && object.gas !== null) {
      message.gas = object.gas as Long;
    } else {
      message.gas = Long.UZERO;
    }
    if (object.amount !== undefined && object.amount !== null) {
      for (const e of object.amount) {
        message.amount.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

const basePubKey: object = { type: "", value: "" };

export const PubKey = {
  encode(
    message: PubKey,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PubKey {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePubKey } as PubKey;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PubKey {
    const message = { ...basePubKey } as PubKey;
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },

  toJSON(message: PubKey): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(object: DeepPartial<PubKey>): PubKey {
    const message = { ...basePubKey } as PubKey;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  },
};

const baseSignature: object = {
  signature: "",
  accountNumber: Long.UZERO,
  sequence: Long.UZERO,
};

export const Signature = {
  encode(
    message: Signature,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.signature !== "") {
      writer.uint32(10).string(message.signature);
    }
    if (message.pubKey !== undefined) {
      PubKey.encode(message.pubKey, writer.uint32(18).fork()).ldelim();
    }
    if (!message.accountNumber.isZero()) {
      writer.uint32(24).uint64(message.accountNumber);
    }
    if (!message.sequence.isZero()) {
      writer.uint32(32).uint64(message.sequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Signature {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSignature } as Signature;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signature = reader.string();
          break;
        case 2:
          message.pubKey = PubKey.decode(reader, reader.uint32());
          break;
        case 3:
          message.accountNumber = reader.uint64() as Long;
          break;
        case 4:
          message.sequence = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Signature {
    const message = { ...baseSignature } as Signature;
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = String(object.signature);
    } else {
      message.signature = "";
    }
    if (object.pubKey !== undefined && object.pubKey !== null) {
      message.pubKey = PubKey.fromJSON(object.pubKey);
    } else {
      message.pubKey = undefined;
    }
    if (object.accountNumber !== undefined && object.accountNumber !== null) {
      message.accountNumber = Long.fromString(object.accountNumber);
    } else {
      message.accountNumber = Long.UZERO;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = Long.fromString(object.sequence);
    } else {
      message.sequence = Long.UZERO;
    }
    return message;
  },

  toJSON(message: Signature): unknown {
    const obj: any = {};
    message.signature !== undefined && (obj.signature = message.signature);
    message.pubKey !== undefined &&
      (obj.pubKey = message.pubKey ? PubKey.toJSON(message.pubKey) : undefined);
    message.accountNumber !== undefined &&
      (obj.accountNumber = (message.accountNumber || Long.UZERO).toString());
    message.sequence !== undefined &&
      (obj.sequence = (message.sequence || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<Signature>): Signature {
    const message = { ...baseSignature } as Signature;
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    } else {
      message.signature = "";
    }
    if (object.pubKey !== undefined && object.pubKey !== null) {
      message.pubKey = PubKey.fromPartial(object.pubKey);
    } else {
      message.pubKey = undefined;
    }
    if (object.accountNumber !== undefined && object.accountNumber !== null) {
      message.accountNumber = object.accountNumber as Long;
    } else {
      message.accountNumber = Long.UZERO;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = object.sequence as Long;
    } else {
      message.sequence = Long.UZERO;
    }
    return message;
  },
};

const baseStdTx: object = { msg: "", memo: "" };

export const StdTx = {
  encode(message: StdTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.msg) {
      writer.uint32(10).string(v!);
    }
    if (message.fee !== undefined) {
      Fee.encode(message.fee, writer.uint32(18).fork()).ldelim();
    }
    if (message.memo !== "") {
      writer.uint32(26).string(message.memo);
    }
    if (message.signature !== undefined) {
      Signature.encode(message.signature, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StdTx {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStdTx } as StdTx;
    message.msg = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.msg.push(reader.string());
          break;
        case 2:
          message.fee = Fee.decode(reader, reader.uint32());
          break;
        case 3:
          message.memo = reader.string();
          break;
        case 4:
          message.signature = Signature.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StdTx {
    const message = { ...baseStdTx } as StdTx;
    message.msg = [];
    if (object.msg !== undefined && object.msg !== null) {
      for (const e of object.msg) {
        message.msg.push(String(e));
      }
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Fee.fromJSON(object.fee);
    } else {
      message.fee = undefined;
    }
    if (object.memo !== undefined && object.memo !== null) {
      message.memo = String(object.memo);
    } else {
      message.memo = "";
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = Signature.fromJSON(object.signature);
    } else {
      message.signature = undefined;
    }
    return message;
  },

  toJSON(message: StdTx): unknown {
    const obj: any = {};
    if (message.msg) {
      obj.msg = message.msg.map((e) => e);
    } else {
      obj.msg = [];
    }
    message.fee !== undefined &&
      (obj.fee = message.fee ? Fee.toJSON(message.fee) : undefined);
    message.memo !== undefined && (obj.memo = message.memo);
    message.signature !== undefined &&
      (obj.signature = message.signature
        ? Signature.toJSON(message.signature)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<StdTx>): StdTx {
    const message = { ...baseStdTx } as StdTx;
    message.msg = [];
    if (object.msg !== undefined && object.msg !== null) {
      for (const e of object.msg) {
        message.msg.push(e);
      }
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Fee.fromPartial(object.fee);
    } else {
      message.fee = undefined;
    }
    if (object.memo !== undefined && object.memo !== null) {
      message.memo = object.memo;
    } else {
      message.memo = "";
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = Signature.fromPartial(object.signature);
    } else {
      message.signature = undefined;
    }
    return message;
  },
};

/** Msg defines the liquidity Msg service. */
export interface Msg {
  /** Submit create liquidity pool message. */
  CreatePool(request: MsgCreatePool): Promise<MsgCreatePoolResponse>;
  /** Submit deposit to the liquidity pool batch. */
  DepositWithinBatch(
    request: MsgDepositWithinBatch
  ): Promise<MsgDepositWithinBatchResponse>;
  /** Submit withdraw from to the liquidity pool batch. */
  WithdrawWithinBatch(
    request: MsgWithdrawWithinBatch
  ): Promise<MsgWithdrawWithinBatchResponse>;
  /** Submit swap to the liquidity pool batch. */
  Swap(request: MsgSwapWithinBatch): Promise<MsgSwapWithinBatchResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  CreatePool(request: MsgCreatePool): Promise<MsgCreatePoolResponse> {
    const data = MsgCreatePool.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.liquidity.Msg",
      "CreatePool",
      data
    );
    return promise.then((data) =>
      MsgCreatePoolResponse.decode(new _m0.Reader(data))
    );
  }

  DepositWithinBatch(
    request: MsgDepositWithinBatch
  ): Promise<MsgDepositWithinBatchResponse> {
    const data = MsgDepositWithinBatch.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.liquidity.Msg",
      "DepositWithinBatch",
      data
    );
    return promise.then((data) =>
      MsgDepositWithinBatchResponse.decode(new _m0.Reader(data))
    );
  }

  WithdrawWithinBatch(
    request: MsgWithdrawWithinBatch
  ): Promise<MsgWithdrawWithinBatchResponse> {
    const data = MsgWithdrawWithinBatch.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.liquidity.Msg",
      "WithdrawWithinBatch",
      data
    );
    return promise.then((data) =>
      MsgWithdrawWithinBatchResponse.decode(new _m0.Reader(data))
    );
  }

  Swap(request: MsgSwapWithinBatch): Promise<MsgSwapWithinBatchResponse> {
    const data = MsgSwapWithinBatch.encode(request).finish();
    const promise = this.rpc.request("tendermint.liquidity.Msg", "Swap", data);
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

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(""));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | undefined
  | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
