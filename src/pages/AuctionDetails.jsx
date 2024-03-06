/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/Context.jsx";
import Timer from "../components/Timer.jsx"

function AuctionDetails({ auctionsList }) {
  const { user } = useAuth();
  const { auctionId } = useParams();
  const auction = auctionsList.find(
    (auction) => auction.id.toString() === auctionId
  );

  const [bidAmount, setBidAmount] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(() => {
    const storedPrice = localStorage.getItem(`currentPrice_${auctionId}`);
    return storedPrice ? JSON.parse(storedPrice) : auction.itemDetails.price;
  });
  const [bidHistory, setBidHistory] = useState(() => {
    const storedHistory = localStorage.getItem(`bidHistory_${auctionId}`);
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  const [lan, setLan] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [deliveryInfoHtml, setDeliveryInfoHtml] = useState("");
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);

  const counties = [
    "Blekinge län",
    "Dalarnas län",
    "Gotlands län",
    "Gävleborgs län",
    "Hallands län",
    "Jämtlands län",
    "Jönköpings län",
    "Kalmar län",
    "Kronobergs län",
    "Norrbottens län",
    "Skåne län",
    "Stockholms län",
    "Södermanlands län",
    "Uppsala län",
    "Värmlands län",
    "Västerbottens län",
    "Västernorrlands län",
    "Västmanlands län",
    "Västra Götalands län",
    "Örebro län",
    "Östergötlands län",
  ];

  const fetchDeliveryPrice = (selectedLan, enteredPostalCode) => {
    setShowDeliveryOptions(true);
    return "600 SEK";
  };

  const getDeliveryOptionsForLan = (lan) => {
    const lanName = lan || "ditt valda län";
    const deliveryOptionsHtml = `
      <strong>Transport inom ${lanName}</strong><br/>
      600 SEK<br/>
      Upphämtning på ett av våra egna utlämningsställen.<br/><br/>
      <strong>Paketleverans</strong><br/>
      900 SEK<br/>
      Till paketombud eller till din dörr.<br/><br/>
    `;
    return deliveryOptionsHtml;
  };

  const handleLanChange = (event) => {
    setLan(event.target.value);
  };

  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const priceHtml = fetchDeliveryPrice(lan, postalCode);
    const deliveryOptionsHtml = getDeliveryOptionsForLan(lan);
    setDeliveryInfoHtml(`${priceHtml}<br/>${deliveryOptionsHtml}`);
    setShowDeliveryOptions(true);
  };

  useEffect(() => {
    localStorage.setItem(`bidHistory_${auctionId}`, JSON.stringify(bidHistory));
  }, [auctionId, bidHistory]);

  useEffect(() => {
    localStorage.setItem(
      `currentPrice_${auctionId}`,
      JSON.stringify(currentPrice)
    );
    localStorage.setItem(`bidHistory_${auctionId}`, JSON.stringify(bidHistory));
  }, [auctionId, currentPrice, bidHistory]);

  const handleBidSubmit = () => {
    const latestBid = bidHistory[bidHistory.length - 1];

    if (auction.sellerId === user.username) {
      alert("You cannot bid on your own items");
      return;
    }
    if (currentPrice + bidAmount == currentPrice) {
      alert("You need to enter a value above zero");
      return;
    }

    const newPrice = currentPrice + bidAmount;
    setCurrentPrice(newPrice);
    const currentTime = new Date().toLocaleString();
    setBidHistory([
      ...bidHistory,
      { price: newPrice, username: user.username, time: currentTime },
    ]);
    setBidAmount(0);
  };

  const resetPrice = () => {
    setCurrentPrice(auction.itemDetails.price);
    setBidHistory([]);
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 col-lg-6 mb-3">
          <div className="border border-dark p-3" id="item-details">
            <img
              src={auction.itemDetails.image}
              className="img-fluid mb-3 mb-lg-0 me-lg-3"
              alt="Auktionsobjekt"
            />
            <div id="info">
              <p className="mb-2">
                <strong>ID:</strong> {auction.id}
              </p>
              <p className="mb-2">
                <strong>Säljarens ID:</strong> {auction.sellerId}
              </p>
              <p className="mb-2">
                <strong>Titel:</strong> {auction.itemDetails.title}
              </p>
              <p className="mb-2">
                <strong>Beskrivning:</strong> {auction.itemDetails.description}
              </p>
              <p className="mb-2">
                <strong>Starttid:</strong> {auction.startTime}
              </p>
              <p className="mb-2">
                <strong>Sluttid:</strong> {auction.endTime}
              </p>
              {Timer(auction.endTime)}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div id="delivery-component">
            <h4>Leverans</h4>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <select
                  className="form-select"
                  value={lan}
                  onChange={handleLanChange}
                >
                  <option value="">Välj ett län</option>
                  {counties.map((county) => (
                    <option key={county} value={county}>
                      {county}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Postnummer"
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                />
                <button className="btn btn-dark" type="submit">
                  Sök pris
                </button>
              </div>
            </form>
            {showDeliveryOptions && (
              <div
                className="alert alert-success"
                dangerouslySetInnerHTML={{ __html: deliveryInfoHtml }}
              ></div>
            )}
          </div>
          <div className="d-flex flex-column justify-content-start align-items-start ml-5">
            <div id="offer" className="mb-4 col-md-12">
              <h4>Bid amount</h4>
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="number"
                    className="form-control col"
                    placeholder="Enter custom bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="mt-2">
                <div
                  className="mb-2 d-flex align-items-center justify-content-center"
                  style={{ height: "100%" }}
                >
                  <button
                    type="button"
                    className="btn btn-dark btn-block d-flex align-items-center justify-content-center py-3"
                    style={{
                      width: "100%",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      lineHeight: "normal",
                    }}
                    onClick={handleBidSubmit}
                  >
                    Submit Bid
                  </button>
                </div>
                <div className="col-md-12">
                  <button
                    type="button"
                    className="btn btn-danger btn-block"
                    style={{ width: "100%" }}
                    onClick={resetPrice}
                  >
                    Reset to Original Price
                  </button>
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
                  {bidHistory
                    .slice()
                    .reverse()
                    .map((bid, index) => (
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
      </div>
    </div>
  );
}
export default AuctionDetails;
