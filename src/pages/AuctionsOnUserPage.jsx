/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth } from "../context/Context.jsx";
import { Link } from 'react-router-dom';


function AuctionsOnUserPage() {
  const { auctionsList, user } = useAuth();
  const newAuctionsList = auctionsList.filter(
    (auction) => auction.sellerId != user.id
  );
  return (
    <div className="d-flex flex-wrap justify-content-center p-5">
      {newAuctionsList?.map((auction) => (
        <div key={auction.id} className="card m-2" style={{ width: "18rem" }}>
          <img
            src={auction.itemDetails.image}
            className="card-img-top"
            alt="Auction Item"
          />
          <div className="card-body">
            <h5 className="card-title">{auction.itemDetails.title}</h5>
            <p className="card-text">
              {auction.itemDetails.description}
              <br />
              Current Price: {localStorage.getItem(`currentPrice_${auction.id}`) || auction.itemDetails.price}
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
