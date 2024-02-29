/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useAuth } from "../context/Context";
function Appbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Auction Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
            <li className="nav-item me-2">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {user ? (
              user.type == "user" ? (
                <>
                  <li className="nav-item me-2">
                    <Link className="nav-link" to="/auctions">
                      Auctions
                    </Link>
                  </li>
                  <li className="nav-item me-2">
                    <Link className="nav-link" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/login" onClick={logout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item me-2">
                    <Link className="nav-link" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/login" onClick={logout}>
                      Logout
                    </Link>
                  </li>
                </>
              )
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Appbar;
