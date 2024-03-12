/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from "react";


import { Paper, Typography, Link } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

function HomePage() {
  const [comingAuctions, setComingAuctions] = useState(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch("http://localhost:3000/auctions");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const data2 = data.filter((auction)=> new Date(auction.startDate) > new Date() )
        setComingAuctions(data2);
      } catch (error) {
        console.error("Fetching auctions failed:", error);
      }
    };

    fetchAuctions();
  }, []);

  if (comingAuctions === null) {
    return <div>Loading...</div>;
  }

  
  return (
    <h1>Auction of exclusive TV games</h1>
  );
}
export default HomePage;
