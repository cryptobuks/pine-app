/* eslint-disable lines-around-comment */
import { REGION_CURRENCY } from './localization';

export default {
  initialized: false, // If false, show welcome screen
  defaultPineAddressHostname: 'pine.dev',
  user: {
    // The user must accept the Terms and Conditions before using the app.
    hasAcceptedTerms: false,

    // Whether or not the user has manually backed up the recovery key.
    hasCreatedBackup: false,

    /**
     * This will be set to true if the user needs to do a manual backup
     * due to iCloud not being available. It will return back to false
     * once the user performs a manual back up.
     */
    forceManualBackup: false,

    profile: {
      // Pine address that the user is signed in with.
      address: ''
    },

    lastUsedDenomination: {
      currency: null,
      unit: null
    }
  },
  api: {
    baseUrl: 'https://api.pine.dev',
    fiatRateServiceBaseUrl: 'https://api.pine.dev',
    feeEstimationServiceBaseUrl: 'https://api.pine.dev'
  },
  bitcoin: {
    network: 'testnet', // 'mainnet' or 'testnet'
    unit: 'BTC', // 'BTC', 'mBTC', or 'Satoshis'
    fee: {
      level: 'Normal', // One of: 'High', 'Normal', 'Low', 'Very Low', 'Custom'
      satoshisPerByte: 100 // Only used when level is set to 'Custom'
    }
  },
  currency: {
    primary: 'BTC',
    secondary: REGION_CURRENCY
  }
};
