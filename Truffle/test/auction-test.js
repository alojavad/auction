const { ethers } = require("ethers");

const Auction = artifacts.require("Auction");
const Token = artifacts.require("Token");

describe("Auction", () => {
  let auction;
  let token;
  let admin;
  let bidder1;
  let bidder2;
  let bidder3;

  beforeEach(async () => {
    [admin, bidder1, bidder2, bidder3] = await Promise.all([
      ethers.Wallet.createRandom(),
      ethers.Wallet.createRandom(),
      ethers.Wallet.createRandom(),
      ethers.Wallet.createRandom(),
    ]);

    // Create a provider connected to a local Ethereum network
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    const TokenFactory = new ethers.ContractFactory(Token.abi, Token.bytecode, admin);
    token = await TokenFactory.deploy();

    const AuctionFactory = new ethers.ContractFactory(Auction.abi, Auction.bytecode, admin);
    auction = await AuctionFactory.deploy(token.address);
  });



  it("should allow only the admin to start and end the auction", async () => {
    await expect(auction.connect(bidder1).startAuction(3600)).to.be.revertedWith("Only admin can perform this action");
    await auction.connect(admin).startAuction(3600);

    await expect(auction.connect(bidder1).endAuction()).to.be.revertedWith("Only admin can perform this action");
    await auction.connect(admin).endAuction();
  });
});