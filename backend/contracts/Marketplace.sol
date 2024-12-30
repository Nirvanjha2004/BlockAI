// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

event AuctionEnded(uint tokenId, address highestBidder, uint highestBid);
event AuctionEndedWithoutBids(uint tokenId, address seller);

contract Marketplace {
    struct ListingNFT {
        address seller;
        // address tokenAddress;
        // uint256 tokenId;
        uint256 price;
        bool isActive;
    }

    mapping(uint256 => ListingNFT) public listings;

    /*
    Transfer the NFT to the Marketplace:
    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
    Uses the ERC721 standard (IERC721) to transfer ownership of the NFT from the seller (msg.sender) to the marketplace contract (address(this)).
    nftContract is the address of the NFT collection (e.g., Bored Ape Yacht Club).
    How it works:
    The seller must approve the marketplace contract to handle their NFT before calling this function.
    Once transferred, the marketplace temporarily owns the NFT until it is purchased. */

    function ListNFT(address nftcontract, uint price, uint tokenId) external {
        require(price > 0, "Price should be greater than zero");
        IERC721(nftcontract).approve(address(this), tokenId);
        IERC721(nftcontract).transferFrom(msg.sender, address(this), tokenId);
        listings[tokenId] = ListingNFT(msg.sender, price, true);
    }

    function buyNFT(uint256 tokenId, address nftcontract) external payable {
        ListingNFT memory listingVar = listings[tokenId];
        require(listingVar.isActive, "The NFT is not active for sale");
        require(listingVar.price == msg.value, "Incorrect price");

        payable(listingVar.seller).transfer(msg.value);
        IERC721(nftcontract).transferFrom(address(this), msg.sender, tokenId);
        listings[tokenId].isActive = false;
    }

    function cancelList(address nftcontract, uint tokenId) external {
        ListingNFT memory listingNFT = listings[tokenId];
        require(listingNFT.isActive, "The token is not active");
        require(
            listingNFT.seller == msg.sender,
            "You are not the owner of the token"
        );
        IERC721(nftcontract).transferFrom(address(this), msg.sender, tokenId);
        listingNFT.isActive = false;
    }

    struct Auction {
        address seller;
        address highestBidder;
        uint highestBid;
        bool isActive;
        uint endTime;
    }

    mapping(uint => Auction) public auctions;
    //start an auction
    function startAuction(
        address nftcontract,
        uint tokenId,
        uint startingBid,
        uint duration
    ) external {
        //give approval to the marketplace to hold ur token
        IERC721(nftcontract).approve(address(this), tokenId);

        auctions[tokenId] = Auction(
            msg.sender,
            address(0),
            startingBid,
            true,
            block.timestamp + duration
        );
    }

    function placeBid(uint tokenId) external payable {
        Auction memory auction = auctions[tokenId];
        require(auction.endTime > block.timestamp, "Auction has ended");
        require(
            auction.highestBid < msg.value,
            "The highestBid is higher than urs"
        );
        // IERC721(nftcontract).transferFrom(auction.highestBidder, msg.sender, tokenId); ye tab aayega jab auction end ho jayega
        if (auction.highestBid > 0) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }

        auction.highestBid = msg.value;
        auction.highestBidder = msg.sender;
    }

    function endAuction(uint tokenId, address nftContract) external {
        // Access auction from storage
        Auction storage auction = auctions[tokenId];

        // Ensure the caller is the seller
        require(
            auction.seller == msg.sender,
            "You are not authorised to end the auction"
        );

        // Ensure the auction has ended
        require(
            block.timestamp >= auction.endTime,
            "The auction is still active"
        );

        // Check if there is a valid bid
        if (auction.highestBid > 0) {
            // Transfer NFT to the highest bidder
            IERC721(nftContract).transferFrom(
                address(this),
                auction.highestBidder,
                tokenId
            );

            // Transfer funds to the seller
            payable(auction.seller).transfer(auction.highestBid);

            // Emit event for successful auction end
            emit AuctionEnded(
                tokenId,
                auction.highestBidder,
                auction.highestBid
            );
        } else {
            // No bids: Return NFT to the seller
            IERC721(nftContract).transferFrom(
                address(this),
                auction.seller,
                tokenId
            );

            // Emit event for unsold auction
            emit AuctionEndedWithoutBids(tokenId, auction.seller);
        }

        // Mark auction as inactive
        auction.isActive = false;
    }
}
