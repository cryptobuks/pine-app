import { combineReducers } from 'redux';
import addressesReducer from './addresses';
import transactionsReducer from './transactions';
import utxosReducer from './utxos';
import balanceReducer from './balance';
import confirmedBalanceReducer from './confirmedBalance';
import spendableBalanceReducer from './spendableBalance';
import syncingReducer from './syncing';

const walletReducer = combineReducers({
  addresses: addressesReducer,
  transactions: transactionsReducer,
  utxos: utxosReducer,
  balance: balanceReducer,
  confirmedBalance: confirmedBalanceReducer,
  spendableBalance: spendableBalanceReducer,
  syncing: syncingReducer
});

export default walletReducer;
