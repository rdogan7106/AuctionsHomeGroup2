import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Useritems() {
    return <h1>User items veton</h1>

 

    function AuctionDetails({ auctionsList }) {
        let { auctionId } = useParams();
        let auction = auctionsList.find(auction => auction.id.toString() === auctionId);

}
export default Useritems