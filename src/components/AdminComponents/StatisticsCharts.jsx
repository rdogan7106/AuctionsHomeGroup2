/* eslint-disable no-unused-vars */
import { useAuth } from "../../context/Context.jsx";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function StatisticsChart() {
  const { auctionsList, userList } = useAuth();
  const data = {
    labels: [
      "Number of auctions that received bids",
      "Number of auctions that received no bids",
    ],
    datasets: [
      {
        label: "# Number",
        data: [
          auctionsList.filter((auction) => auction.bids.length == 0).length,
          auctionsList.filter((auction) => auction.bids.length != 0).length,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User Reports",
      },
    },
  };
  const bidderIds = new Set(
    auctionsList.flatMap((auction) => auction.bids.map((bid) => bid.bidderId))
  );

  const biddersCount = bidderIds.size;
  const totalUsersCount = userList.length;
  const nonBiddersCount = totalUsersCount - biddersCount;

  const data2 = {
    labels: ["Users Making Offers", "Users Not Making Offers"],
    datasets: [
      {
        label: "User Count",
        data: [biddersCount, nonBiddersCount], 
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(53, 162, 235, 0.5)"],
      },
    ],
  };

  return (
    <div className="container mt-5">
    
      <div className="row">
        <div className="col-md-4 d-flex justify-content-around">
          <Pie data={data} />
        </div>
        <div className="col-md-6 d-flex justify-content-around">
          <Bar options={options} data={data2} />
        </div>
      </div>
    </div>
  );
}
export default StatisticsChart;
