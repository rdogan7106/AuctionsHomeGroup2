/* eslint-disable no-unused-vars */
// AuctionsOnUserPage.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Context.jsx";
import { Link } from "react-router-dom";

function AuctionsOnUserPage() {
  const { auctionsList, user,setAuctionsList } = useAuth();
  const [bidCounts, setBidCounts] = useState({});

  
  const updateAuctionStatus = async () => {
    const promises = auctionsList.map(async (auction) => {
      if (new Date(auction.endDate) < new Date() && auction.status !== "finished") {
        const response = await fetch(`http://localhost:3000/auctions/${auction.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...auction, status: "finished" }),
        });
        return { ...auction, status: "finished" }
      }
      return auction;
    });

    const updatedAuctions = await Promise.all(promises);
    const filteredAuctions = updatedAuctions.filter(auction => auction.status !== "finished");
    setAuctionsList(filteredAuctions);
  };

  useEffect(() => {
    const counts = {};
    auctionsList.forEach((auction) => {
      const bidHistory = JSON.parse(localStorage.getItem(`bidHistory_${auction.id}`)) || [];
      counts[auction.id] = bidHistory.length;
    });
    setBidCounts(counts);
    const timer = setTimeout(() => {
      updateAuctionStatus();
    }, 1000);
    return () => clearTimeout(timer);

  }, [auctionsList]);

  const newAuctionsList = auctionsList?.filter(
    (auction) => auction.sellerId !== user.id
  );

  return (
    <div className="d-flex flex-wrap justify-content-center p-5">
    <div className="bg"></div>
      {newAuctionsList?.map((auction) => (
        <div key={auction.id} className="card m-2" style={{ width: "18rem" }}>
          <img src={auction.itemDetails.image} className="card-img-top" alt="Auction Item" />
          <div className="card-body">
            <h5 className="card-title">{auction.itemDetails.title}</h5>
            <p className="card-text">
              {auction.itemDetails.description}
              <br />
              Current Price: {localStorage.getItem(`currentPrice_${auction.id}`) || auction.itemDetails.price}
              <br />
              Number of Bids: {bidCounts[auction.id] || 0}
            </p>

            <Link to={`/auctions/${auction.id}`}>
              <button className="btn btn-danger">View Details</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AuctionsOnUserPage;
