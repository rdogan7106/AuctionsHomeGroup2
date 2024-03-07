import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
//import { useAuth } from "../context/Context.jsx";
function Timer(auction) {
  //const { auctionsList, setAuctionsList } = useAuth();

  const calculateTimeLeft = async () => {
    let difference = null;
    let timeLeft = {};

    if (
      new Date(auction.endDate) - new Date() > 0 &&
      new Date(auction.startDate) - new Date() < 0
    ) {
      difference = new Date(auction.endDate) - new Date();
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };

    } else if (new Date(auction.startDate) - new Date() >= 0) {
      difference = new Date() - new Date(auction.startDate);
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

 
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      style={{ paddingLeft: "16px", paddingBottom: "8px" }}
    >
      {timeLeft.days > 0
        ? `${timeLeft.days} days ${timeLeft.hours} hours ${timeLeft.minutes} minutes ${timeLeft.seconds} second left `
        : `Will start ${timeLeft.days} days ${timeLeft.hours} hours ${timeLeft.minutes} minutes ${timeLeft.seconds} second `}
    </Typography>
  );
}
export default Timer;
