const Auction = artifacts.require("Auction");

module.exports = function (deployer, network, accounts) {
  const initialOwner = accounts[0]; // or specify the desired initial owner address

  deployer.deploy(Auction, initialOwner);
};