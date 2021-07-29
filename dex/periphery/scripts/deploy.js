const {ethers} = require("hardhat");
const UNISWAPV2_FACTORY_ADDRESS = '0x3E9401B46844DA8BBde22aaD5215a5Da7880367E';
const WETH_ADDRESS = '0x43CB23817EFD6227Ff8f0A2d3C2CFbAeA22283D8';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying UniswapV2Router02 contract with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const UniswapV2Router02 = await ethers.getContractFactory("UniswapV2Router02");
  const router = await UniswapV2Router02.deploy(UNISWAPV2_FACTORY_ADDRESS, WETH_ADDRESS); // constructor

  await router.deployed();

  console.log("Uniswap V2 Router02 contract deployed to:", router.address);
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
 * Uniswap V2 Router02 contract deployed to: 0x9E0980a929e27a0e9aFd5238473841B2b861Adb5
 * 
 * 
 * ****/