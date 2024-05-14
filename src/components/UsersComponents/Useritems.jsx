import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/Context.jsx';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";

const UserItems = () => {
    const { user, auctionsList } = useAuth();
    const [userItems, setUserItems] = useState([]);

    useEffect(() => {
        if (user && auctionsList) {
            const filteredItems = auctionsList.filter(auction => auction.sellerId === user.userID);
            setUserItems(filteredItems);
        }
    }, [user, auctionsList]);

    return (
        <div className="container">
            <h1>My Auction Items</h1>
            {userItems.length > 0 ? (
                <div className="d-flex flex-wrap">
                    {userItems.map(item => (
                        <Card
                            key={item.id}
                            sx={{ maxWidth: 300, minWidth: 300, margin: "20px" }}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={item.itemDetails.image}
                                    alt={item.itemDetails.title || "default alt text"}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.itemDetails.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.itemDetails.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.primary">
                                        Current Price: ${item.itemDetails.price}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Typography variant="body2" color="text.secondary">
                                    Bids: {item.bids.length}
                                </Typography>
                            </CardActions>
                        </Card>
                    ))}
                </div>
            ) : (
                <p>No items to display.</p>
            )}
        </div>
    );
};

export default UserItems;
