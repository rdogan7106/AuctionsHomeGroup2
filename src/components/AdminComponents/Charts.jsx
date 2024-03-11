/* eslint-disable no-unused-vars */
import { useAuth } from "../../context/Context.jsx";
import ChartBox from "./ChartBox.jsx";
import StatisticsChart from "./StatisticsCharts.jsx";
import React, { useEffect, useState } from "react";


function Charts() {
  const { auctionsList, userList } = useAuth();
  const [totalOffers, setTotalOffers] = useState(0);
  const [finishedAuctions, setFinishedAuctions] = useState(0);
  const [inProgressAuctions, setInProgressAuctions] = useState(0);
  const [users, setUsers] = useState(0)

  useEffect(() => {
    let newOffers = auctionsList.reduce(
      (total, auction) => total + auction.bids.length,
      0
    );
    let newFinished = auctionsList.filter(
      (auction) => auction.status == "finished"
    );
    let userListUsers = userList.filter(user=> user.type=="user")
    setUsers(userListUsers)
    setTotalOffers(newOffers);
    setFinishedAuctions(newFinished.length);
    setInProgressAuctions(auctionsList.length - newFinished.length);
    
  }, [auctionsList, userList]);

  return (
    <div className="container ">
    
      <div className="row">
        <ChartBox totalOffers= {totalOffers} users = {users} finishedAuctions = {finishedAuctions}  inProgressAuctions = {inProgressAuctions}/>
        <StatisticsChart />
      </div>
    </div>
  );
}
export default Charts;
