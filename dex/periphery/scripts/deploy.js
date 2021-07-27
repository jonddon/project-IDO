const {ethers} = require("hardhat");
require('dotenv').config();

// Forked UniswapV2Factory contract address on Ropsten
const {UNISWAPV2_FACTORY_ADDRESS} = process.env;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying UniswapV2Router02 contract with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploying WETH contract first
  const WETH = await ethers.getContractFactory("WETH");
  const weth = await WETH.deploy();
  await weth.deployed();
  console.log("WETH contract deployed to: " + weth.address); // the address of the deployed WETH contract

  const UniswapV2Router02 = await ethers.getContractFactory("UniswapV2Router02");
  const router = await UniswapV2Router02.deploy(UNISWAPV2_FACTORY_ADDRESS, weth.address); // constructor

  await router.deployed();

  console.log("Uniswap V2 Router02 contract deployed to:", router.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });