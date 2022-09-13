# web3-training
This project is to keep track of my journey of learning web3. includes:
* Smart contract with Solitidy
* Deploy smart contract to local net with hardhat
* Deploy smart contract to test net(rinkeby, goerli)
* Lint & unit test

another project will be created which allow user to interact with the contract through web page.
### environment
* nodejs 16.11.0
* yarn 3
* [hardhat](https://github.com/NomicFoundation/hardhat)
* Rinkeby/goerli network
* [Alchemy](https://www.alchemy.com/)
* [ganache](https://trufflesuite.com/ganache/)

### contracts
contracts/SimpleStorage.sol is a simplest smart contract that blockchain user can store and retrieve a value from blockchain.

contracts/FundMe.sol is a contract that user can fund ETH into, the contract owner can withdraw all the funded ETH. 

### setup environment
```
yarn install
yarn dlx @yarnpkg/sdks vscode
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
