import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/Context';

function Userpurchases() {
    const { user, auctionsList } = useAuth();
    const [bidHistory, setBidHistory] = useState([]);

    useEffect(() => {
        const fetchBidHistory = async () => {
            try {
                const promises = auctionsList.map(async (auction) => {
                    const response = await fetch(`/api/auctions/${auction.id}/bidHistory`);
                    const data = await response.json();
                    return { auctionId: auction.id, bidHistory: data };
                });
                const bidHistories = await Promise.all(promises);
                const mergedBidHistory = bidHistories.reduce((acc, { auctionId, bidHistory }) => {
                    acc[auctionId] = bidHistory;
                    return acc;
                }, {});
                setBidHistory(mergedBidHistory);
            } catch (error) {
                console.error("Error fetching bid history:", error);
            }
        };

        fetchBidHistory();
    }, [auctionsList]);

    const expiredAuctions = auctionsList.filter(auction => {
        const now = new Date();
        const hasBidByCurrentUser = bidHistory[auction.id]?.some(bid => bid.bidderID === user.userID);
        const sold = auction.status === "finished" || (new Date(auction.endDate) < now && hasBidByCurrentUser);
        return sold;
    });

    return (
        <div>
            <h1>User Purchases</h1>
            <div className="d-flex flex-wrap justify-content-center p-5">
                {expiredAuctions.map(auction => (
                    <div key={auction.id} className="card m-2" style={{ width: "18rem" }}>
                        <img src={auction.itemDetails.image} className="card-img-top" alt="Auction Item" />
                        <div className="card-body">
                            <h5 className="card-title">{auction.itemDetails.title}</h5>
                            <p className="card-text">
                                {auction.itemDetails.description}
                                <br />
                                Sold for: {localStorage.getItem(`currentPrice_${auction.id}`) || auction.itemDetails.price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Userpurchases;
