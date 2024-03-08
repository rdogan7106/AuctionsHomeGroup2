/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useAuth } from "../context/Context";

function Sidenav({ setActiveComponent }) {
  const { user, logout } = useAuth();
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary"
      style={{ width: "20%", height: "100vh" }}
    >
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <span className="fs-4">
          Welcome {user.username} / {user.type}
        </span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {user.type == "admin" ? (
          <>
            <li>
              <button
                className="btn  w-100"
                onClick={() => setActiveComponent("Auctions")}
              >
                Auctions
              </button>
            </li>
            <li>
              <button
                className="btn  w-100"
                onClick={() => setActiveComponent("Users")}              >
                Users
              </button>
            </li>
            <li>
              <button
                className="btn  w-100"
                onClick={() => setActiveComponent("Charts")}              >
                General View
              </button>
            </li>
          </>
        ) : (
          <>
           <li className="nav-item">
              <button
                className="btn w-100"
                onClick={() => setActiveComponent("Userpurchases")}
              >
                My Purchases
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn w-100"
                onClick={() => setActiveComponent("Useritems")}
              >
                User Items
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn w-100"
                onClick={() => setActiveComponent("AddAuctionItem")}
              >
                Add Auction Items
              </button>
            </li>
          </>
        )}
      </ul>
      <hr />
      <div>
        <Link className="nav-link" to="/login" onClick={logout}>
          {user.username} - {user.type} / Logout
        </Link>
      </div>
    </div>
  );
}

export default Sidenav;
