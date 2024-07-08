import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Sidebar = ({ handleSignOut }) => {
  const location = useLocation();
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white sidebar">
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <Link to="/" className={`nav-link text-white ${location.pathname === '/' ? 'active' : ''}`}>
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2"></use>
            </svg>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/intensity-chart" className={`nav-link text-white ${location.pathname === '/intensity-chart' ? 'active' : ''}`}>
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#bar-chart"></use>
            </svg>
            Intensity Chart
          </Link>
        </li>
        <li>
          <Link to="/region-chart" className={`nav-link text-white ${location.pathname === '/region-chart' ? 'active' : ''}`}>
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#globe"></use>
            </svg>
            Region Chart
          </Link>
        </li>
        <li>
          <Link to="/likelihood-chart" className={`nav-link text-white ${location.pathname === '/likelihood-chart' ? 'active' : ''}`}>
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#bar-chart-2"></use>
            </svg>
            Likelihood Chart
          </Link>
        </li>
        <li>
          <Link to="/yearly-distribution-chart" className={`nav-link text-white ${location.pathname === '/yearly-distribution-chart' ? 'active' : ''}`}>
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#calendar"></use>
            </svg>
            Yearly Distribution Chart
          </Link>
        </li>
        <li>
          <Link to="/country-chart" className={`nav-link text-white ${location.pathname === '/country-chart' ? 'active' : ''}`}>
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#map"></use>
            </svg>
            Country Chart
          </Link>
        </li>
        <li>
          <Link to="/topic-chart" className={`nav-link text-white ${location.pathname === '/topic-chart' ? 'active' : ''}`}>
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#tag"></use>
            </svg>
            Topic Chart
          </Link>
        </li>
        <li>
          <Link to="/relevance-chart" className={`nav-link text-white ${location.pathname === '/relevance-chart' ? 'active' : ''}`}>
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#chart"></use>
            </svg>
            Relevance Chart
          </Link>
        </li>
      </ul>
      <hr />
      <DropdownButton id="dropdown-basic-button" title={<span><img src="https://avatars.githubusercontent.com/u/81478859?s=400&u=a72bc3a2f3ec617164394e7b592da95851fd3bcc&v=4" alt="amar-singh" width="32" height="32" className="rounded-circle me-2" /> <strong>Amar Singh</strong></span>} variant="dark">
        <Dropdown.Item href="#">New project...</Dropdown.Item>
        <Dropdown.Item href="https://github.com/amar809575">Profil</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default Sidebar;
