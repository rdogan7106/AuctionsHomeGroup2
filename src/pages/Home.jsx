import React, { useState, } from "react";
import { Typography, Container, Grid, Card, CardActionArea, CardMedia, CardContent, Box } from '@mui/material';

function HomePage() {
  const [comingAuctions, setComingAuctions] = useState([
    {
      id: 1,
      itemDetails: {
        title: "Vintage Super Mario Bros.",
        image: "https://www.kappahl.com/globalassets/media-e-commerce/1-startsidor/18-header/barn/licenser/super-mario-mobil.jpg?preset=EditorialBlock",
        startPrice: "10 USD"
      }
    },
    {
      id: 2,
      itemDetails: {
        title: "Need for Speed 2",
        image: "https://i.ytimg.com/vi/vHNdRC0ehmQ/maxresdefault.jpg",
        startPrice: "10 USD"
      }
    },
    {
      id: 3,
      itemDetails: {
        title: "FIFA Football 2004",
        image: "https://upload.wikimedia.org/wikipedia/en/e/e3/FIFA_Football_2004_cover.jpg",
        startPrice: "10 USD"
      }
    },
    {
      id: 4,
      itemDetails: {
        title: "Tekken 6",
        image: "https://upload.wikimedia.org/wikipedia/en/2/21/Tekken_6_Box_Art.jpg",
        startPrice: "10 USD"
      }
    },
    {
      id: 5,
      itemDetails: {
        title: "Call of Duty: World at War",
        image: "https://upload.wikimedia.org/wikipedia/en/6/69/WAW_Cover_Art.jpg",
        startPrice: "10 USD"
      }
    },
    {
      id: 6,
      itemDetails: {
        title: "Pro evolution soccer",
        image: "https://www.retrospelbutiken.se/store/bild.php?produkt=22891&size=600",
        startPrice: "10 USD"
      }
    },
  ]);

  
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Auction of exclusive video games
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Upcoming video games
      </Typography>
      <Grid container spacing={4}>
        {comingAuctions.map((auction, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={auction.itemDetails.image}
                  alt={auction.itemDetails.title}
                  style={{ objectFit: 'contain', width: '100%', height: '140px' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {auction.itemDetails.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Starting Price: {auction.itemDetails.startPrice}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={8} py={4} bgcolor="text.secondary" color="background.paper" textAlign="center">
        <Typography variant="body1">GameBidz Auction House</Typography>
        <Typography variant="body2">123 Gaming Street, Gamerville, GX 12345</Typography>
        <Typography variant="body2">Contact Us: (123) 456-7890 | info@gamebidz.com</Typography>
        <Typography variant="body2">&copy; {new Date().getFullYear()} GameBidz Auctions. All rights reserved.</Typography>
      </Box>
    </Container>
  );
}

export default HomePage;
