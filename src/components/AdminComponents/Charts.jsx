/* eslint-disable no-unused-vars */
import { useAuth } from "../../context/Context.jsx";
import ChartBox from "./ChartBox.jsx";


function Charts() {
  const { auctionsList, userList } = useAuth();

  return (
    <div className="container ">
      <div className="row">
    <ChartBox/>
      </div>
    </div>
  );
}
export default Charts;
