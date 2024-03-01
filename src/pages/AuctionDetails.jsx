import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/Context.jsx';

function AuctionDetails({ auctionsList }) {
  const { user } = useAuth();
  const { auctionId } = useParams();
  const auction = auctionsList.find(auction => auction.id.toString() === auctionId);

  const [bidAmount, setBidAmount] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(() => {
    const storedPrice = localStorage.getItem(`currentPrice_${auctionId}`);
    return storedPrice ? JSON.parse(storedPrice) : auction.itemDetails.price;
  });
  const [bidHistory, setBidHistory] = useState(() => {
    const storedHistory = localStorage.getItem(`bidHistory_${auctionId}`);
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem(`bidHistory_${auctionId}`, JSON.stringify(bidHistory));
  }, [auctionId, bidHistory]);

  useEffect(() => {
    localStorage.setItem(`currentPrice_${auctionId}`, JSON.stringify(currentPrice));
    localStorage.setItem(`bidHistory_${auctionId}`, JSON.stringify(bidHistory));
  }, [auctionId, currentPrice, bidHistory]);

  const handleBidSubmit = () => {
    const latestBid = bidHistory[bidHistory.length - 1];
    if (latestBid && latestBid.username === user.username) {
      alert("You cannot place consecutive bids.");
      return;
    }
    if (auction.sellerId === user.username) {
      alert("You cannot bid on your own items")
      return;
    }
    if (currentPrice + bidAmount == currentPrice) {
      alert("You need to enter a value above zero")
      return;
    }

    const newPrice = currentPrice + bidAmount;
    setCurrentPrice(newPrice);
    const currentTime = new Date().toLocaleString();
    setBidHistory([...bidHistory, { price: newPrice, username: user.username, time: currentTime }]);
    setBidAmount(0);
  };

  const resetPrice = () => {
    setCurrentPrice(auction.itemDetails.price);
    setBidHistory([]);
  };

  return (
    <div className='d-flex p-5'>
      <div className='w-50' id='item-details'>
        <div className='d-flex justify-content-center' >
          <img src={auction.itemDetails.image} className='w-50' alt="" />
        </div>
        <div id='info'>
          <p>{auction.id}</p>
          <p>{auction.sellerId}</p>
          <p>{auction.itemDetails.title}</p>
          <p>{auction.itemDetails.description}</p>
          <p>{auction.startTime}</p>
          <p>{auction.endTime}</p>
          <p>Initial Price: {auction.itemDetails.price}</p>
          <p>Current Price: {currentPrice}</p>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-start align-items-start ml-5">

        <div id='offer' className="mb-4 col-md-12">
          <h4>Bid amount</h4>
          <div className="row">
            <div className="col-md-12">
              <input type="number" className="form-control col" placeholder="Enter custom bid amount" value={bidAmount} onChange={(e) => setBidAmount(Number(e.target.value))} />
            </div>
          </div>
          <div className="mt-2">
            <div className="mb-2 d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
              <button type="button" className="btn btn-dark btn-block d-flex align-items-center justify-content-center py-3" style={{ width: "100%", fontSize: "1.2rem", fontWeight: "bold", lineHeight: "normal" }} onClick={handleBidSubmit}>
                Submit Bid
              </button>
            </div>
            <div className="col-md-12">
              <button type="button" className="btn btn-danger btn-block" style={{ width: "100%" }} onClick={resetPrice}>Reset to Original Price</button>
            </div>
          </div>
        </div>


        <div className="mt-4">
          <h4>Bid history</h4>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Bid price</th>
                <th scope="col">Username</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {bidHistory.slice().reverse().map((bid, index) => (
                <tr key={index}>
                  <td>{bid.price}</td>
                  <td>{bid.username}</td>
                  <td>{bid.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AuctionDetails;