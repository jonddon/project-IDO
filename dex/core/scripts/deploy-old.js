const {ethers} = require("hardhat");

const owner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
async function main() {
  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
  const factory = await UniswapV2Factory.deploy(owner); // constructor

  await factory.deployed();

  console.log("Uniswap V2 Factory deployed to:", factory.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });