const { ethers } = require("hardhat");

async function main() {
  const ambContract = await ethers.getContractFactory("AMBContract");
  const deployedAmbContract = await ambContract.deploy();
  await deployedAmbContract.deployed();

  console.log("AMB Contract Address: ", deployedAmbContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
