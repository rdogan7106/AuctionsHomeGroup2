/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useAuth } from "../context/Context.jsx";
import { Link } from "react-router-dom";
import Timer from "../components/Timer.jsx";

function CurrentAuctions() {
  const { auctionsList, setAuctionsList } = useAuth();

  const updateAuctionStatus = async () => {
    const promises = auctionsList.map(async (auction) => {
      if (new Date(auction.endDate) < new Date() && auction.status !== "finished") {
        const response = await fetch(`http://localhost:3000/auctions/${auction.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...auction, status: "finished" }),
        });
        return { ...auction, status: "finished" }
      }
      return auction;
    });

    const updatedAuctions = await Promise.all(promises);
    const filteredAuctions = updatedAuctions.filter(auction => auction.status !== "finished");
    setAuctionsList(filteredAuctions);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updateAuctionStatus();
    }, 1000);
    return () => clearTimeout(timer);

  }, [auctionsList]);

  return (
    <div className="container">
      {auctionsList.length > 0 ? (
        <div className="d-flex flex-wrap">
          {auctionsList
            .filter((auction) => auction.status != "finished")
            .map((filteredAuction) => (
              <Card
                key={filteredAuction.id}
                sx={{ maxWidth: 300, minWidth: 300, margin: "20px" }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    maxWidth="300"
                    minWidth="300"
                    image={filteredAuction.itemDetails.image}
                    alt={filteredAuction.title || "default alt text"}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {filteredAuction.itemDetails.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {filteredAuction.itemDetails.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Bid
                    </Link>
                  </Button>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ marginLeft: "auto" }}
                  >
                    Bids: {filteredAuction.bids.length || 0}
                  </Typography>
                </CardActions>
                <Timer auction={filteredAuction} />
              </Card>
            ))}
        </div>
      ) : (
        <h2>No current auction found</h2>
      )}
    </div>
  );
}

export default CurrentAuctions;
