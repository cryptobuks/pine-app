import * as internalAddressActions from '../../../../../../../src/actions/bitcoin/wallet/addresses/internal';
import internalItemsReducer from '../../../../../../../src/reducers/bitcoin/wallet/addresses/internal/items';

describe('internalItemsReducer', () => {
  it('is a function', () => {
    expect(typeof internalItemsReducer).toBe('function');
  });

  describe('when action is BITCOIN_WALLET_ADDRESSES_INTERNAL_LOAD_SUCCESS', () => {
    it('returns the addresses from the action', () => {
      const oldState = { '2cfe40d0-9748-44e4-aa66-f83b61b5a83e': {} };
      const actionAddresses = { '8d63e318-85e6-4b3d-be16-9b59305674f7': {} };

      const action = {
        type: internalAddressActions.BITCOIN_WALLET_ADDRESSES_INTERNAL_LOAD_SUCCESS,
        addresses: actionAddresses
      };

      const newState = internalItemsReducer(oldState, action);

      expect(newState).toBe(actionAddresses);
    });
  });

  describe('when action is BITCOIN_WALLET_ADDRESSES_INTERNAL_ADD_SUCCESS', () => {
    it('returns the old state with the new addresses added', () => {
      const oldState = { '5083126c-d8f8-49e2-887d-81c105044a52': {} };
      const actionAddresses = { '1e2e467a-714e-47fb-ac5f-c091f3f35819': {} };

      const action = {
        type: internalAddressActions.BITCOIN_WALLET_ADDRESSES_INTERNAL_ADD_SUCCESS,
        addresses: actionAddresses
      };

      const newState = internalItemsReducer(oldState, action);

      const expectedState = {
        '5083126c-d8f8-49e2-887d-81c105044a52': {},
        '1e2e467a-714e-47fb-ac5f-c091f3f35819': {}
      };

      expect(newState).toMatchObject(expectedState);
    });
  });

  describe('when action is BITCOIN_WALLET_ADDRESSES_INTERNAL_REMOVE_ALL_SUCCESS', () => {
    it('returns an empty object', () => {
      const oldState = {
        'cf8d2082-a44a-495e-86b8-670030eacbcc': {},
        '1918bca9-8181-4a45-9641-3d412fb8767c': {}
      };

      const action = { type: internalAddressActions.BITCOIN_WALLET_ADDRESSES_INTERNAL_REMOVE_ALL_SUCCESS };
      const newState = internalItemsReducer(oldState, action);
      const expectedState = {};

      expect(newState).toMatchObject(expectedState);
    });
  });

  describe('when action is an unknown type', () => {
    it('returns the old state', () => {
      const oldState = { '403e7072-7587-482a-8fa4-70dd66eb8bad': {} };
      const action = { type: 'UNKNOWN' };
      const newState = internalItemsReducer(oldState, action);

      expect(newState).toBe(oldState);
    });
  });

  describe('when state is not defined', () => {
    it('returns an empty object', () => {
      const action = { type: 'UNKNOWN' };
      const newState = internalItemsReducer(undefined, action);

      expect(newState).toMatchObject({});
    });
  });
});
