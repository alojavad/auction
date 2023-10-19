// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Auction is ERC721, Ownable {
    struct Bid {
        address bidder;
        uint256 amount;
    }

    mapping(uint256 => Bid) private tokenBids;
    mapping(address => uint256) private pendingReturns;

    uint256 private auctionEndTime;
    bool private ended;
    uint256 private highestBid;
    address private highestBidder;

    constructor(address initialOwner) Ownable(initialOwner) ERC721("MyNFT", "NFT") {}

    function startAuction() public onlyOwner {
        require(!ended, "Auction already ended");
        auctionEndTime = block.timestamp + 1 hours;
    }

    function placeBid(uint256 tokenId) public payable {
        require(!ended, "Auction already ended");
        require(msg.value > 0, "Bid amount must be greater than 0");

        if (block.timestamp > auctionEndTime) {
            _endAuction();
        }

        if (msg.value > highestBid) {
            if (highestBid != 0) {
                // Return the funds to the previous highest bidder
                pendingReturns[highestBidder] += highestBid;
            }
            highestBidder = msg.sender;
            highestBid = msg.value;
        } else {
            // Return the funds to the bidder
            pendingReturns[msg.sender] += msg.value;
        }

        tokenBids[tokenId] = Bid(msg.sender, msg.value);
    }

    function endAuction() public onlyOwner {
        _endAuction();
    }

    function getHighestBid() public view returns (uint256) {
        return highestBid;
    }

    function getHighestBidder() public view returns (address) {
        return highestBidder;
    }

    function claimToken(uint256 tokenId) public {
        require(ended, "Auction has not ended");
        require(msg.sender == highestBidder, "Only the highest bidder can claim the token");

        _safeMint(msg.sender, tokenId);
        tokenBids[tokenId].amount = 0; // Set the bid amount to 0 to prevent reentrancy attacks
    }

    function claimBidAmount() public {
        require(ended, "Auction has not ended");
        require(msg.sender != highestBidder, "Highest bidder cannot claim bid amount");

        uint256 amount = pendingReturns[msg.sender];
        require(amount > 0, "No pending bid amount");

        pendingReturns[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function _endAuction() private {
        require(!ended, "Auction already ended");

        ended = true;
    }
}