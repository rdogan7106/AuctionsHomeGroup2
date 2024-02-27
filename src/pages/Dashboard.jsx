/* eslint-disable no-unused-vars */
import { useState } from "react";
import Sidenav from "../components/Sidenav.jsx";
import { useAuth } from "../context/Context.jsx";
import Auctions from "../components/AdminComponents/Auctions.jsx";
import Users from "../components/AdminComponents/Users.jsx";
import Useritems from "../components/UsersComponents/Useritems.jsx";
import Userregisterform from "../components/AdminComponents/Userregisterform.jsx";
import Userupdateform from "../components/AdminComponents/Userupdateform.jsx";
import AddAuctionItem from "../components/UsersComponents/AddAuctionItem.jsx";
import UpdateAuctionItem from "../components/AdminComponents/UpdateAuctionItem.jsx";


function Dashboard() {
  const { user, logout } = useAuth();
  const [activeComponent, setActiveComponent] = useState(null);
  const [updateUser, setUpdateUser] = useState(null)
  const [updateAuction, setUpdateAuction] = useState(null)
  const renderContent = () => {
    switch (activeComponent) {
      case "Auctions":
        return <Auctions setActiveComponent={setActiveComponent} setUpdateAuction = {setUpdateAuction} />;
      case "Users":
        return <Users setActiveComponent={setActiveComponent} setUpdateUser={setUpdateUser} />;
      case "Useritems":
        return <Useritems />;
      case "Userregisterform":
        return <Userregisterform  setActiveComponent={setActiveComponent}/>;
      case "Userupdateform":
        return <Userupdateform  updateUser = {updateUser} setActiveComponent={setActiveComponent}/>;
        case "AddAuctionItem":
          return <AddAuctionItem   setActiveComponent={setActiveComponent}/>;
        case "UpdateAuctionItem":
          return <UpdateAuctionItem   setActiveComponent={setActiveComponent} updateAuction = {updateAuction} />;
      default:
        return <h1>Hi! Something went wrong!</h1>;
    }
  };

  return (
    <div className="d-flex">
      <Sidenav setActiveComponent={setActiveComponent} />
      <div className="d-flex p-3">{renderContent()}</div>
    </div>
  );
}
export default Dashboard;
