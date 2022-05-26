const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AMBContract Testing", function () {
  it("[test] Should return the contract address", async function () {
    const ambContract = await ethers.getContractFactory("AMBContract");
    const deployedAmbContract = await ambContract.deploy("AMBASS", "AMB");
    await deployedAmbContract.deployed();

    expect(await deployedAmbContract.getAmbContractAddress()).to.equal(
      deployedAmbContract.address
    );
  });

  it("[test]Should return subtokens", async function () {
    const ambContract = await ethers.getContractFactory("AMBContract");
    const deployedAmbContract = await ambContract.deploy("AMBASS", "AMB");
    await deployedAmbContract.deployed();

    await deployedAmbContract.createSubToken(
      "Movie Campaign",
      "TOP GUN",
      "TPG",
      1000,
      100,
      Date(),
      Date(),
      20,
      deployedAmbContract.address
    );

    // await deployedAmbContract.createSubToken(
    //   "Movie Campaign",
    //   "NOPE",
    //   "NPE",
    //   1000,
    //   deployedAmbContract.address
    // );

    // await deployedAmbContract.createSubToken(
    //   "MISSION IMP 6",
    //   "MI6",
    //   1000,
    //   deployedAmbContract.address
    // );

    const subTokenArray = await deployedAmbContract.getSubTokens();
    console.log("[test] subtoken array", subTokenArray);

    const subTokenDetail = await deployedAmbContract.getSubTokenDetail("TPG");
    //console.log("[test]: SubToken Detail: ", subTokenDetail);
    expect(subTokenArray.length == 1);
  });
});
