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

// TODO: use same path and increase account_index to find specified prefix and suffix

const generateWallet = async () => {
  const path = "m/44'/501'/0'/0'"
  const mnemonic = bip39.generateMnemonic(256)
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

const findSpecificWallet = async (prefix) => {
  let count = 0
  while (true) {
    count++
    const { address, privateKey, mnemonic, path } = await generateWallet()
    if (address.slice(0, prefix.length) === prefix) {
      console.log('Address:', address)
      console.log('PrivateKey:', privateKey)
      console.log('Mnemonic(24):', mnemonic)
      console.log('Path:', path)
      console.log('--------------->')

      break
    } else {
      // if (count % 100 !== 0) process.stdout.write('*')
    }
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
console.log('--------------->')
findSpecificWallet(prefix)
