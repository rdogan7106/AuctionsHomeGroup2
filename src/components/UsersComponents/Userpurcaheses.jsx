import React from 'react';
import { useAuth } from '../../context/Context';

function Userpurchases() {
    const { user, auctionsList } = useAuth();

    // Filter auctionsList to get only auctions where the bid history's latest bidder is the logged-in user
    const filteredAuctions = auctionsList.filter(auction => {
        const bidHistory = JSON.parse(localStorage.getItem(`bidHistory_${auction.id}`)) || [];
        const latestBid = bidHistory[bidHistory.length - 1];
        const sold = auction.status === "finished"
        return latestBid && latestBid.username === user.username && sold;
    });

    return (
        <div>
            <h1>User Purchases</h1>
            <div className="d-flex flex-wrap justify-content-center p-5">
                {filteredAuctions.map(auction => (
                    <div key={auction.id} className="card m-2" style={{ width: "18rem" }}>
                        <img src={auction.itemDetails.image} className="card-img-top" alt="Auction Item" />
                        <div className="card-body">
                            <h5 className="card-title">{auction.itemDetails.title}</h5>
                            <p className="card-text">
                                {auction.itemDetails.description}
                                <br />
                                Sold for: {localStorage.getItem(`currentPrice_${auction.id}`) || auction.itemDetails.price}
                            </p>
                            {/* Add more details or actions here if needed */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Userpurchases;
