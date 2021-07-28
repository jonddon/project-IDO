const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying UniswapV2Factory contract with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());
  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory") // Get the UniswapV2Factory contract from our contracts folder
  const factory = await UniswapV2Factory.deploy(deployer.address); // send the transaction for the contract to be deployed

  await factory.deployed(); // wait for that transaction to be mined/completed
  console.log("UniswapV2Factory contract is deployed to: " + factory.address) // address of the deployed contract

  // Deploy pair tokens (for mainnet, these will be ETH/USDT)
  const wrappedEther = await ethers.getContractFactory("WETH");
  const weth = await wrappedEther.deploy();
  await weth.deployed();
  console.log("Wrapped Ether (WETH) contract is deployed to: " + weth.address)

  const tetherToken = await ethers.getContractFactory("TetherToken")
  const usdt = await tetherToken.deploy(1e9, "Tether USD", "USDT", 18);
  await usdt.deployed();
  console.log("Tether USD (USDT) contract is deployed to: " + usdt.address)

  // Create pair/liquidity pool (mainnet addresses below)
  // const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  // const USDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
  const txResult = await factory.createPair(weth.address, usdt.address);
  console.log("WETH/USDT pair creation transaction hash: " + txResult.hash);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

/**** 
 * ROPSTEN DEPLOYMENT OUTPUT
 * _________________________________________
 * UniswapV2Factory contract is deployed to: 0x3E9401B46844DA8BBde22aaD5215a5Da7880367E
 * Wrapped Ether (WETH) contract is deployed to: 0x43CB23817EFD6227Ff8f0A2d3C2CFbAeA22283D8
 * Tether USD (USDT) contract is deployed to: 0x13A26ecE28cca3A9dc761552D2C27baF26769D36
 * WETH/USDT pair creation transaction hash: 0xf314654a508746d1ef1b58c6b8cc4d907f1386115e9d7e6193058586a3d56157
 * 
 * 
 * ****/