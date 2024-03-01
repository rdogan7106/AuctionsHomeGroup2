/* eslint-disable no-unused-vars */
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useAuth } from "../context/Context.jsx";
import { Link } from "react-router-dom";

function CurrentAuctions() {
  const { auctionsList } = useAuth();
  return (
    <div className="container">
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
                  image={
                    filteredAuction.itemDetails.image ||
                    "/static/images/cards/contemplative-reptile.jpg"
                  }
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
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ paddingLeft: "16px", paddingBottom: "8px" }}
              >
                Time Left:{" "}
               
              </Typography>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default CurrentAuctions;
