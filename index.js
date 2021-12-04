const { Keypair } = require('@solana/web3.js')
const bip39 = require('bip39')
const { derivePath } = require('ed25519-hd-key')
const nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util')
const readlineSync = require('readline-sync')

// In solana:
// m/44'/501'/account_index'/0'
// m/44'/501'/0'/0'
// m/44'/501'/1'/0'
// m/44'/501'/2'/0'

const generateWallet = async (mnemonic, accountIndex) => {
  const path = `m/44'/501'/${accountIndex}'/0'`
  const seed = derivePath(path, bip39.mnemonicToSeedSync(mnemonic)).key
  const secretKey = nacl.sign.keyPair.fromSeed(seed).secretKey
  const account = Keypair.fromSecretKey(secretKey)

  return {
    address: account.publicKey.toBase58(),
    privateKey: nacl.util.encodeBase64(secretKey),
    mnemonic: mnemonic,
    path: path,
  }
}

const findSpecificWallet = async (prefix, suffix, isCaseSensitive, isUseSameMnemonic) => {
  let count = 0
  let mnemonic = bip39.generateMnemonic(256)
  let accountIndex = 0

  while (true) {
    count++
    if (isUseSameMnemonic) {
      accountIndex = count
    } else {
      mnemonic = bip39.generateMnemonic(256)
    }

    const { address, privateKey, path } = await generateWallet(mnemonic, accountIndex)
    const prefixAddress = address.slice(0, prefix.length)
    const suffixAddress = address.slice(address.length - suffix.length)

    let isMatch = false
    if (isCaseSensitive) {
      isMatch = prefixAddress === prefix && suffixAddress === suffix
    } else {
      isMatch =
        prefixAddress.toUpperCase() === prefix.toUpperCase() &&
        suffixAddress.toUpperCase() === suffix.toUpperCase()
    }

    if (isMatch) {
      process.stdout.write('\n')
      console.log('--------------->')
      console.log('Address:', address)
      console.log('Private Key:', privateKey)
      console.log('Mnemonic(24):', mnemonic)
      console.log('Path:', path)
      console.log('--------------->')
      break
    }
    if (count % 100 === 0) process.stdout.write('*')
  }
}

console.log(`
+---------------------------------+
|                                 |
|     Solana Wallet Generator     |
|                                 |
+---------------------------------+
`)

const prefix = readlineSync.question('[?] prefix: ')
const suffix = readlineSync.question('[?] suffix: ')
const isCaseSensitive = readlineSync.question('[Y/N]: case sensitive?(N): ') === 'Y'
const isUseSameMnemonic = readlineSync.question('[Y/N]: use same mnemonic?(N): ') === 'Y'

console.log(
  `prefix: ${prefix}, suffix: ${suffix}, isCaseSensitive: ${isCaseSensitive}, isUseSameMnemonic: ${isUseSameMnemonic}`
)
findSpecificWallet(prefix, suffix, isCaseSensitive, isUseSameMnemonic)
