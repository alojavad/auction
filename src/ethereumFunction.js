import { Contract, ethers } from "ethers";

const Auction = require("./contracts/Auction.json");

export function getProvider() {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  
  export function getSigner(provider) {
    return provider.getSigner();
  }
  
  export async function getNetwork(provider) {
    const network = await provider.getNetwork();
    return network.chainId;
  }

  export function getAuction(address, signer) {
    return new Contract(address, Auction.abi, signer);
  } 
  
  export async function getAccount() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  
    return accounts[0];
  }

  export function getBalance(amount) {
    return ethers.utils.parseEther(amount);
  }

  export function format(amount) {
    return ethers.utils.formatEther(amount);
  }