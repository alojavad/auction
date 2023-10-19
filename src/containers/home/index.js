import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import AuctionContract from "../../contracts/Auction.json";

export default function Home() {
    const [contract, setContract] = useState(null);
  const [highestBid, setHighestBid] = useState(0);
  const [highestBidder, setHighestBidder] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    const init = async () => {
      // Connect to the Ethereum network
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Load the smart contract
      const networkId = await provider.getNetwork().then((network) => network.chainId);
      const contractAddress = AuctionContract.networks[networkId].address;
      const contract = new ethers.Contract(contractAddress, AuctionContract.abi, signer);

      setContract(contract);
    };

    init().catch(console.error);
  }, []);

  const getHighestBid = async () => {
    const highestBid = await contract.highestBid();
    const highestBidder = await contract.highestBidder();
    setHighestBid(ethers.utils.formatEther(highestBid));
    setHighestBidder(highestBidder);
  };

  const placeBid = async () => {
    const bidAmountInWei = ethers.utils.parseEther(bidAmount);
    const tx = await contract.placeBid({ value: bidAmountInWei });
    await tx.wait();
    setBidAmount("");
    getHighestBid();
  };
  
    return(
        <div>
      <h1>Auction</h1>
      <p>Highest Bid: {highestBid} ETH</p>
      <p>Highest Bidder: {highestBidder}</p>
      <input
        type="text"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Bid Amount (ETH)"
      />
      <button onClick={placeBid}>Place Bid</button>
    </div>
    )
}