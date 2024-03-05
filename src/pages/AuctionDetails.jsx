/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function AuctionDetails({ auctionsList }) {
  let { auctionId } = useParams();
  let auction = auctionsList.find(auction => auction.id.toString() === auctionId);

  const [lan, setLan] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [deliveryInfoHtml, setDeliveryInfoHtml] = useState('');
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);

  const counties = [
    'Blekinge län', 'Dalarnas län', 'Gotlands län', 'Gävleborgs län',
    'Hallands län', 'Jämtlands län', 'Jönköpings län', 'Kalmar län',
    'Kronobergs län', 'Norrbottens län', 'Skåne län', 'Stockholms län',
    'Södermanlands län', 'Uppsala län', 'Värmlands län', 'Västerbottens län',
    'Västernorrlands län', 'Västmanlands län', 'Västra Götalands län',
    'Örebro län', 'Östergötlands län'
  ];

  const fetchDeliveryPrice = (selectedLan, enteredPostalCode) => {
    setShowDeliveryOptions(true);
    return "600 SEK";
  };

  const getDeliveryOptionsForLan = (lan) => {
    const lanName = lan || 'ditt valda län';
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

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-12 col-lg-6 mb-3'>
          <div className='border border-dark p-3' id='item-details'>
            <img src={auction.itemDetails.image} className='img-fluid mb-3 mb-lg-0 me-lg-3' alt="Auktionsobjekt" />
            <div id='info'>
              <p className='mb-2'><strong>ID:</strong> {auction.id}</p>
              <p className='mb-2'><strong>Säljarens ID:</strong> {auction.sellerId}</p>
              <p className='mb-2'><strong>Titel:</strong> {auction.itemDetails.title}</p>
              <p className='mb-2'><strong>Beskrivning:</strong> {auction.itemDetails.description}</p>
              <p className='mb-2'><strong>Starttid:</strong> {auction.startTime}</p>
              <p className='mb-2'><strong>Sluttid:</strong> {auction.endTime}</p>
            </div>
          </div>
        </div>
        <div className='col-12 col-lg-6'>
          <div id='delivery-component'>
            <h4>Leverans</h4>
            <form onSubmit={handleSubmit}>
              <div className='input-group mb-3'>
                <select className='form-select' value={lan} onChange={handleLanChange}>
                  <option value=''>Välj ett län</option>
                  {counties.map((county) => (
                    <option key={county} value={county}>
                      {county}
                    </option>
                  ))}
                </select>
                <input type='text' className='form-control' placeholder='Postnummer' value={postalCode} onChange={handlePostalCodeChange} />
                <button className='btn btn-dark' type='submit'>Sök pris</button>
              </div>
            </form>
            {showDeliveryOptions && (
              <div className='alert alert-success' dangerouslySetInnerHTML={{ __html: deliveryInfoHtml }}></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionDetails;










