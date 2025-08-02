import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Clear input after navigating
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          MyShop
        </a>
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/product" className="nav-link">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/order" className="nav-link">
                Order
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
