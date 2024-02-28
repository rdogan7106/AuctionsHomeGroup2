/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams } from 'react-router-dom';

function AuctionDetails({ auctionsList }){
    let { auctionId } = useParams();
    let auction = auctionsList.find(auction => auction.id.toString() === auctionId);
    return (
      <div className='d-flex p-5'>
        <div className='w-50' id='item-details'>
            <div className='d-flex justify-content-center' >
            <img src={auction.itemDetails.image} className='w-50' alt=""  /></div>
            <div id='info'>
                <p>{auction.id}</p>
                <p>{auction.sellerId}</p>
                <p>{auction.itemDetails.title}</p>
                <p>{auction.itemDetails.description}</p>
                <p>{auction.startTime}</p>
                <p>{auction.endTime}</p>

            </div>
        </div>
        <div id='offer'></div>

      </div>
    );
}
export default AuctionDetails