import {sendReqPromise, arrayToHex, ifUndefX} from '../utils';

function JsonRpc(apiUrl, options) {
  function genReqProm(path) {
    return function (params) {
      return sendReqPromise(apiUrl + path, params, options);
    }
  }
  return {
    get_abi: function (accountName) {
      return genReqProm('/v1/chain/get_abi')({
        account_name: accountName
      });
    },
    get_account: function (accountName) {
      return genReqProm('/v1/chain/get_account')({
        account_name: accountName
      });
    },
    get_block_header_state: function (blockNumOrId) {
      return genReqProm('/v1/chain/get_block_header_state')({
        block_num_or_id: blockNumOrId
      });
    },
    get_block: function (blockNumOrId) {
      return genReqProm('/v1/chain/get_block')({
        block_num_or_id: blockNumOrId
      });
    },
    get_code: function (accountName) {
      return genReqProm('/v1/chain/get_code')({
        account_name: accountName
      });
    },
    get_currency_balance: function (code, account, symbol) {
      return genReqProm('/v1/chain/get_currency_balance')({
        code: code,
        account: account,
        symbol: ifUndefX(symbol, null)
      });
    },
    get_currency_stats: function (code, symbol) {
      return genReqProm('/v1/chain/get_currency_stats')({
        code: code,
        symbol: symbol
      });
    },
    get_info: genReqProm('/v1/chain/get_info'),
    get_producer_schedule: genReqProm('/v1/chain/get_producer_schedule'),
    get_producers: function (json, lowerBound, limit) {
      return genReqProm('/v1/chain/get_producers')({
        json: ifUndefX(json, true),
        lowerBound: ifUndefX(lowerBound, ''),
        limit: ifUndefX(limit, 50),
      });
    },
    get_raw_code_and_abi: function (accountName) {
      return genReqProm('/v1/chain/get_raw_code_and_abi')({
        account_name: accountName
      });
    },
    get_table_rows: function (params) {
      return genReqProm('/v1/chain/get_table_rows')(Object.assign({}, {
        json: true,
        table_key: '',
        lower_bound: '',
        upper_bound: '',
        index_position: 1,
        key_type: '',
        limit: 10,
        reverse: false,
        show_payer: false
      }, params));
    },
    get_table_by_scope: function (params) {
      return genReqProm('/v1/chain/get_table_rows')(Object.assign({}, {
        lower_bound: '',
        upper_bound: '',
        limit: 10
      }, params));
    },
    push_transaction: function (params) {
      return genReqProm('/v1/chain/push_transaction')({
        signatures: params.signatures,
        compression: 0,
        packed_context_free_data: '',
        packed_trx: arrayToHex(params.serializedTransaction)
      });

    },
    db_size_get: genReqProm('/v1/db_size/get'),
    history_get_actions: function (accountName, pos, offset) {
      return genReqProm('/v1/history/get_actions')({
        account_name: accountName,
        pos: ifUndefX(pos, null),
        offset: ifUndefX(offset, null),
      });
    },
    history_get_transaction: function (id, blockNumHint) {
      return genReqProm('/v1/history/get_transaction')({
        id: id,
        block_num_hint: ifUndefX(blockNumHint, null),
      });
    },
    history_get_key_accounts: function (publicKey) {
      return genReqProm('/v1/history/get_transaction')({
        public_key: publicKey
      });
    },
    history_get_controlled_accounts: function (controllingAccount) {
      return genReqProm('/v1/history/get_controlled_accounts')({
        controlling_account: controllingAccount
      });
    },

  }
}

export default JsonRpc;