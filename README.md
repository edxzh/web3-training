# web3-training
This project is to keep track of my journey of learning web3. includes:
* Smart contract with Solitidy
* Deploy smart contract to local net with hardhat
* Deploy smart contract to test net(rinkeby, goerli)
* Lint & unit test

### environment
* nodejs 16.11.0
* yarn 3
* [hardhat](https://github.com/NomicFoundation/hardhat)
* Rinkeby/goerli network
* [Alchemy](https://www.alchemy.com/)
* [ganache](https://trufflesuite.com/ganache/)

### contracts
1. SimpleStorage.sol: a simplest smart contract that blockchain user can store and retrieve a value from blockchain.
2. FundMe.sol: user can fund ETH into, the contract owner can withdraw all the funded ETH.
3. Raffle.sol: all users can enter in Raffle, the program will randomly pick up a winner and clean prize pool.
4. Token.sol: ERC20 token.

## web
there is a simple html file in `web` folder, where you can open in `chrome` and interact with `fundMe` contract which deployed in your local hardhat network.

```
yarn install
yarn hardhat node
# start a new terminal, in the same directory
cd web
yarn http-server
```

please note that some browser may raise `cors` issue, please use chrome.

### add hardhat network in metamask
* your account icon(top right corner) => Settings => Networks => Add Network
* Network name: any name, New RPC URL: http://127.0.0.1:8545, Chain ID: 31337, Currency Symbol: ETH, Save
* Import an account from terminal that's running hardhat node, import the first `private key`, then you'll have an account in hardhat network that has 10,000 ETH for testing.

sometime you might have this problem `nonce too high.`, please reset your account in metamask(your account icon(top right corner) => Settings => Advanced => Reset Account)

### setup environment
```
yarn install
yarn dlx @yarnpkg/sdks vscode
cp .env.example .env # add your keys
```

### deploy contract to hardhat blockchain
```shell
yarn hardhat help
yarn hardhat node
yarn deploy
```

### run lint and test
```shell
yarn hardhat typechain
yarn solhint
yarn test
```

### Scripts
``` shell
yarn hardhat node
yarn hardhat run scripts/fund.ts
yarn hardhat run scripts/withdraw.ts
```
