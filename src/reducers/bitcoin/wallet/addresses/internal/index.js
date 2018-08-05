import * as internalAddressActions from '../../../../../actions/bitcoin/wallet/addresses/internal';
import error from './error';
import items from './items';

const internalReducer = (state = {}, action) => {
  switch (action.type) {
    case internalAddressActions.BITCOIN_WALLET_ADDRESSES_INTERNAL_ADD_SUCCESS:

    case internalAddressActions.BITCOIN_WALLET_ADDRESSES_INTERNAL_LOAD_REQUEST:
    case internalAddressActions.BITCOIN_WALLET_ADDRESSES_INTERNAL_LOAD_SUCCESS:
    case internalAddressActions.BITCOIN_WALLET_ADDRESSES_INTERNAL_LOAD_FAILURE:

    case internalAddressActions.BITCOIN_WALLET_ADDRESSES_INTERNAL_REMOVE_ALL_SUCCESS:

    case internalAddressActions.BITCOIN_WALLET_ADDRESSES_INTERNAL_SAVE_REQUEST:
    case internalAddressActions.BITCOIN_WALLET_ADDRESSES_INTERNAL_SAVE_SUCCESS:
    case internalAddressActions.BITCOIN_WALLET_ADDRESSES_INTERNAL_SAVE_FAILURE:
      return {
        ...state,
        error: error(state.error, action),
        items: items(state.items, action)
      };

    default:
      return state;
  }
};

export default internalReducer;
