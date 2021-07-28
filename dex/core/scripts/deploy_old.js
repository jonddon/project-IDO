const {ethers} = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Account Address = " + deployer.address);
  console.log("Account Balance = " + (await deployer.getBalance()).toString());
  // Step 1 - Get the contract's factory
  const contractFactory = await ethers.getContractFactory("UniswapV2Factory");

  // Step 2 - Deploy the contract (or send the transaction)
  const uniswapV2FactoryContract = await contractFactory.deploy(deployer.address); // trigger the constructor of the contract
  
  // Step 3 (optional) - Wait for the contract deployed (wait for the transaction to be mined on the network)
  await uniswapV2FactoryContract.deployed();
  console.log("Uniswap V2 Factory contract deployed to: " + uniswapV2FactoryContract.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

/*** COMMANDS LIST ****/
// npx hardhat accounts - List all the test accounts
// npx hardhat node - Create a hardhat local network which we can deploy contracts on
// npx hardhat run --network localhost scripts/deploy-old.js

// Private Keys - are used to sign transactions and allow contracts to spend ether on a particular address
