const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AMBContract Testing", function () {
  it("Should return the contract address", async function () {
    const ambContract = await ethers.getContractFactory("AMBContract");
    const deployedAmbContract = await ambContract.deploy("AMBASS", "AMB");
    await deployedAmbContract.deployed();

    expect(await deployedAmbContract.getAmbContractAddress()).to.equal(
      deployedAmbContract.address
    );
  });

  it("Should return subtokens", async function () {
    const ambContract = await ethers.getContractFactory("AMBContract");
    const deployedAmbContract = await ambContract.deploy("AMBASS", "AMB");
    await deployedAmbContract.deployed();

    await deployedAmbContract.createSubToken(
      "TOP GUN",
      "TPG",
      1000,
      deployedAmbContract.address
    );

    await deployedAmbContract.createSubToken(
      "NOPE",
      "NPE",
      1000,
      deployedAmbContract.address
    );

    await deployedAmbContract.createSubToken(
      "MISSION IMP 6",
      "MI6",
      1000,
      deployedAmbContract.address
    );

    const subTokenArray = await deployedAmbContract.getSubTokens();

    console.log(subTokenArray);
    expect(subTokenArray.length == 3);
  });
});
