import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/Context.jsx'; 

const UserItems = () => {
    const { user, auctionsList } = useAuth(); 
    const [userItems, setUserItems] = useState([]);

    useEffect(() => {
        if (user && auctionsList) {
            const filteredItems = auctionsList.filter(auction => auction.sellerId === user.id);
            setUserItems(filteredItems);
        }
    }, [user, auctionsList]); 

    return (
        <div>
            <h1>My Auction Items</h1>
            {userItems.length > 0 ? (
                <ul>
                    {userItems.map(item => (
                        <li key={item.id}>
                            <h3>{item.itemDetails.title}</h3>
                            <p>{item.itemDetails.description}</p>
                            {/* Du kan lägga till mer detaljer här om det behövs */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items to display.</p> 
            )}
        </div>
    );
};

export default UserItems;
