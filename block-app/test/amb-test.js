const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AMBContract Testing", function () {
  it("Should return the contract address", async function () {
    const ambContract = await ethers.getContractFactory("AMBContract");
    const deployedAmbContract = await ambContract.deploy();
    await deployedAmbContract.deployed();

    expect(await deployedAmbContract.getAmbContractAddress()).to.equal(
      deployedAmbContract.address
    );

    //const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    //await setGreetingTx.wait();

    //expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
