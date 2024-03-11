/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Appbar from "./Appbar.jsx";
import HomePage from "../pages/Home.jsx";
import Loginpage from "../pages/Loginpage.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import AuctionsOnUserPage from "../pages/AuctionsOnUserPage.jsx";
import AuctionDetails from "../pages/AuctionDetails.jsx";
import CurrentAuctions from "../pages/CurrentAuctions.jsx";
import { useAuth } from "../context/Context.jsx";
import Userregisterform from './UsersComponents/UserRegistrationUsers.jsx';
import UserItems from "./UsersComponents/Useritems.jsx"; 
import '../a.styles/all_other_pages.css'
import '../a.styles/loginpage_style.css'
import '../a.styles/UserRegistrationstyle.css'

function Router() {
  const [user, setUser] = useState(null);
  const { auctionsList } = useAuth();
  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <>
      <Appbar user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/auctions" element={<AuctionsOnUserPage />}></Route>
        <Route path="/current-auctions" element={<CurrentAuctions />}></Route>
        <Route exact 
          path="/auctions/:auctionId"
          element={<AuctionDetails auctionsList={auctionsList} />}
        />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/login" element={<Loginpage login={login} />} />
        <Route path="/Userregisterform" element={<Userregisterform />}></Route>
      </Routes>
    </>
  );
}

export default Router;
