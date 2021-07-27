const hre = require("hardhat");

const FACTORY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
async function main() {
  // Deploy WETH contract first
  const WETH = await hre.ethers.getContractFactory("WETH");
  const weth = await WETH.deploy();
  await weth.deployed();
  console.log("WETH contract deployed to: " + weth.address); // the address of the deployed WETH contract

  const UniswapV2Router02 = await hre.ethers.getContractFactory("UniswapV2Router02");
  const router = await UniswapV2Router02.deploy(FACTORY_ADDRESS, weth.address); // constructor

  await router.deployed();

  console.log("Uniswap V2 Router02 contract deployed to:", router.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
