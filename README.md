# web3-training
This project is to keep track of my journey of learning web3. includes:
* smart contract with Solitidy
* deploy smart contract to local net(hardhat/ganache)
* deploy smart contract to test net(Rinkeby)

### environment
* nodejs 16.11.0
* yarn 3
* [hardhat](https://github.com/NomicFoundation/hardhat)
* Rinkeby network
* [Alchemy](https://www.alchemy.com/)
* [ganache](https://trufflesuite.com/ganache/)

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
