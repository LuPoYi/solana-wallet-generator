# solana-wallet-generator

```zsh
yarn
yarn start
```

Custom prefix & suffix solana address generator

- support custom prefix and suffix
- support increase account_index with the same derive path

```js
+---------------------------------+
|                                 |
|     Solana Wallet Generator     |
|                                 |
+---------------------------------+

[?] prefix: 87
--------------->
Address: 877hEADJqyEN4oyEpGC3dZRSRgJX6tZsgBevxaQ3dJ3z
PrivateKey: hMslP35RtkzNcsNkaK0NLO++bx5TPssomSCh0wWGn+ppktydjYU8w3TJhgnTDLTlVOPyU1hhV9GpHuPx6k+f8Q==
Mnemonic(24): because address what beyond mistake plate flavor bench mobile second nasty sort tide ankle quick beauty margin replace mango apart feel robust letter candy
Path: m/44'/501'/0'/0'
--------------->

```

```js
+---------------------------------+
|                                 |
|     Solana Wallet Generator     |
|                                 |
+---------------------------------+

[?] prefix: A
[?] suffix: z
[Y/N]: case sensitive?(N): Y
[Y/N]: use same mnemonic?(N):
prefix: A, suffix: z, isCaseSensitive: true, isUseSameMnemonic: false
*
--------------->
Address: A78mDEVt1fyPvLmLCaZLYFitcV2hB2eLyjASafKSXp9z
Private Key: 9qMjuT51Rl8jUvDLUWB3H/z+H96UYUw6uUa5OBiibduHS3GqOSlJlAVvbrrCd8WHb2RPYlhF0wDKDd6bN3VLJQ==
Mnemonic(24): fish erode fox wine nephew index opera kidney mandate cereal donate first couple owner fancy bubble index diamond sausage stairs nerve science rude melody
Path: m/44'/501'/0'/0'
--------------->
```
