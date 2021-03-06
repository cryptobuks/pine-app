import bitcoin from 'bitcoinjs-lib';
import bip32 from 'bip32';
import bip39 from 'bip39';

const getBitcoinNetwork = (network) => {
  return network === 'testnet' ? bitcoin.networks.testnet : bitcoin.networks.mainnet;
};

/**
 * Gets an extended public key for the specified mnemonic, network, and account.
 *
 * @param {string} mnemonic - A private key as a mnemonic to use for key derivation.
 * @param {string} network - 'mainnet' or 'testnet'.
 * @param {number} accountIndex - Index of account to get the extended public key for. Starts at 0.
 *
 * @returns {string} An extended public key for the specified account.
 */
const getAccountPublicKeyFromMnemonic = (mnemonic, network, accountIndex) => {
  const seed = bip39.mnemonicToSeed(mnemonic);
  const bitcoinNetwork = getBitcoinNetwork(network);
  const masterNode = bip32.fromSeed(seed, bitcoinNetwork);
  const purpose = 49; // BIP49
  const coinType = network === 'testnet' ? 1 : 0; // Default to mainnet.
  const path = `m/${purpose}'/${coinType}'/${accountIndex}'`;
  const xpub = masterNode.derivePath(path).neutered().toBase58();

  return xpub;
};

export default getAccountPublicKeyFromMnemonic;
