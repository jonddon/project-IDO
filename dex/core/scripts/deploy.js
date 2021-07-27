const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying UniswapV2Factory contract with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());
  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory") // Get the UniswapV2Factory contract from our contracts folder
  const factory = await UniswapV2Factory.deploy(deployer.address); // send the transaction for the contract to be deployed

  await factory.deployed(); // wait for that transaction to be mined/completed
  console.log("UniswapV2Factory contract is deployed to: " + factory.address) // address of the deployed contract
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });