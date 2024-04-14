/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/Context.jsx";
import Timer from "../components/Timer.jsx";

function AuctionDetails({ auctionsList, filteredAuction }) {
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
  const [bidHistory, setBidHistory] = useState([]);

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

  const fetchBidHistory = async () => {
    try {
      const response = await fetch(`/api/auctions/${auctionId}/bidHistory`);
      const data = await response.json();
      console.log("Bid history data:", data);
      console.log("auctionId: ", auctionId)
      setBidHistory(data);
    } catch (error) {
      console.error("Error fetching bid history:", error);
    }
  };

  useEffect(() => {
    fetchBidHistory();
  }, [auctionId]);

  useEffect(() => {
    localStorage.setItem(`bidHistory_${auctionId}`, JSON.stringify(bidHistory));
  }, [auctionId, bidHistory]);

  useEffect(() => {
    localStorage.setItem(
      `currentPrice_${auctionId}`,
      JSON.stringify(currentPrice)
    );
  }, [auctionId, currentPrice]);

  const handleBidSubmit = async () => {
    if (bidAmount <= 0) {
      alert("You need to enter a bid amount above zero");
      return;
    }
    if (auction.sellerId === user.userID) {
      alert("You cannot bid on your own items")
      return;
    }


    const newBidPrice = currentPrice + bidAmount;

    const newBid = {
      bidderID: user.userID,
      itemID: auction.id,
      bidPrice: newBidPrice,
      bidTime: new Date().toISOString(),
      sellerID: auction.sellerId,
      bidderName: user.username
    };

    try {
      const response = await fetch(`/api/bids`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBid)
      });

      if (!response.ok) {
        throw new Error("Failed to submit bid");
      }

      setBidAmount(0);

      setCurrentPrice(newBidPrice);
      fetchBidHistory();
    } catch (error) {
      console.error("Error submitting bid:", error.message);
      alert("Failed to submit bid. Please try again later.");
    }
  };





  return (
    <div className="container mt-4">
      <div className="row text-light">
        <div className="col-12 col-lg-6 mb-3">
          <div className="border border-dark p-3" id="item-details">
            <img
              src={auction.itemDetails.image}
              className="img-fluid mb-3 mb-lg-0 me-lg-3"
              alt="Auktionsobjekt"
            />
            <div id="info">
              <p className="mb-2 ">
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
                <strong>Starttid:</strong> {auction.startDate}
              </p>
              <p className="mb-2">
                <strong>Sluttid:</strong> {auction.endDate}
              </p>
              <div className="bg-light text-danger m-0 p-2">
                <Timer auction={auction} />
              </div>
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
            {new Date(auction.startDate) < new Date() ? (
              <>
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

                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-light">
                  The auction for this item has not started yet. Please follow
                  the start date.
                </h2>
              </>
            )}

            <div className="mt-4 w-100 ">
              <h4 className="text-light">Bid history</h4>
              <table className="table w-100 table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Bid price</th>
                    <th scope="col">Username</th>
                    <th scope="col">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {bidHistory.map((bid, index) => (
                    <tr key={index}>
                      <td>{bid.bidPrice}</td>
                      <td>{bid.bidderName}</td>
                      <td>{bid.bidTime}</td>
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
