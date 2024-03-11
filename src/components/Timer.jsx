import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

function Timer({ auction }) { // Props olarak auction objesini al

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endDate = new Date(auction.endDate);
      const startDate = new Date(auction.startDate);
      let timeLeft = {};

      if (endDate - now > 0 && startDate - now < 0) {
        const difference = endDate - now;
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else if (startDate - now >= 0) {
        const difference = startDate - now;
        timeLeft = {
          days: -Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: -Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: -Math.floor((difference / 1000 / 60) % 60),
          seconds: -Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    // Zamanı her saniye yeniden hesapla
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Component unmount olduğunda timer'ı temizle
    return () => clearInterval(timer);
  }, [auction]);

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      style={{ paddingLeft: "16px", paddingBottom: "8px" }}
    >
      {timeLeft.days >= 0
        ? `Time left: ${Math.abs(timeLeft.days)} days ${Math.abs(timeLeft.hours)} hours ${Math.abs(timeLeft.minutes)} minutes ${Math.abs(timeLeft.seconds)} seconds`
        : `Will start in: ${Math.abs(timeLeft.days)} days ${Math.abs(timeLeft.hours)} hours ${Math.abs(timeLeft.minutes)} minutes ${Math.abs(timeLeft.seconds)} seconds`}
    </Typography>
  );
}

export default Timer;
