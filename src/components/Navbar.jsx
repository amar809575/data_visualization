import React from "react";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

const NavbarComponent = ({ handleSignOut }) => {
  return (
    <nav className="navbar navbar-dark" style={{ background: "#22313f" }}>
      <div className="container-fluid">
        <Link to='/' className="navbar-brand ml-4 fs-3">Data Dashboard</Link>
        <form className="d-flex input-group w-auto ml-auto mr-2">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <button className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search"></i>
          </button>
        </form>
        <button className="btn btn-dark text-white" onClick={handleSignOut}>Sign Out</button>
      </div>
    </nav>
  );
}

export default NavbarComponent;
