import { Button, Chip, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import AuctionContract from "./contracts/Auction.json";

const App = () => {
  const [contract, setContract] = useState(null);
  const [highestBid, setHighestBid] = useState(0);
  const [highestBidder, setHighestBidder] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    const init = async () => {
      // Connect to the Ethereum network
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);

        // Load the smart contract
        const networkId = await web3.eth.net.getId();
        const contractAddress = AuctionContract.networks[networkId].address;
        const contract = new web3.eth.Contract(AuctionContract.abi, contractAddress);

        setContract(contract);
      } else {
        console.error("Please install MetaMask");
      }
    };

    init().catch(console.error);
  }, []);

  const getHighestBid = async () => {
    const highestBid = await contract.methods.highestBid().call();
    const highestBidder = await contract.methods.highestBidder().call();
    setHighestBid(Web3.utils.fromWei(highestBid));
    setHighestBidder(highestBidder);
  };

  const placeBid = async () => {
    const bidAmountInWei = Web3.utils.toWei(bidAmount);
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const tx = await contract.methods.placeBid().send({ from: accounts[0], value: bidAmountInWei });
    setBidAmount("");
    getHighestBid();
  };

  return (
    <Grid container spacing={4} justifyContent="center" >
      <Grid container xs={12} sx={{mt: 5}} justifyContent="center">
      <Typography variant="h2">Auction</Typography>
      </Grid>
      <Grid item xs={6}>
      
      <Paper>Highest Bid: {highestBid} ETH</Paper>
      <Paper>Highest Bidder: {highestBidder}</Paper>
      <TextField
        type="text"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Bid Amount (ETH)"
      />
      <Button variant="outlined" onClick={placeBid}>Place Bid</Button>
      </Grid>
      <Grid container sx={{pt: 5, pb: 5}} xs={12} justifyContent="center">
        <Typography variant="h6">
          All right reserved. 
          <Chip label="Javad hajian" />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default App;