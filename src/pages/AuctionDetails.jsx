/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams } from 'react-router-dom';

function AuctionDetails({ auctionsList }) {
  let { auctionId } = useParams();
  let auction = auctionsList.find(auction => auction.id.toString() === auctionId);
  return (
    <div className='d-flex p-5'>
      <div className='w-50' id='item-details'>
        <img src={auction.itemDetails.image} className='img-fluid' alt="" style={{ maxWidth: '50%', height: '50%' }} />

        <div id='info' className='text-left'>
          <p className='mb-2'><strong>ID:</strong> {auction.id}</p>
          <p className='mb-2'><strong>Säljarens ID:</strong> {auction.sellerId}</p>
          <p className='mb-2'><strong>Titel:</strong> {auction.itemDetails.title}</p>
          <p className='mb-2'><strong>Beskrivning:</strong> {auction.itemDetails.description}</p>
          <p className='mb-2'><strong>Starttid:</strong> {auction.startTime}</p>
          <p className='mb-2'><strong>Sluttid:</strong> {auction.endTime}</p>
        </div>
      </div>
      <div id='offer'></div>

    </div>
  );
}
export default AuctionDetails