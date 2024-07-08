import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import CountryChart from "./components/CountryChart";
import Dashboard from "./components/Dashboard";
import IntensityChart from "./components/IntensityChart";
import LikelihoodChart from "./components/LikelihoodChart";
import NavbarComponent from "./components/Navbar";
import RegionChart from "./components/RegionChart";
import RelevanceChart from "./components/RelevanceChart";
import Sidebar from "./components/Sidebar";
import TopicChart from "./components/TopicChart";
import YearlyDistributionChart from "./components/YearlyDistributionChart";
import LoginComponent from "./Login/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user-logged-in") === "true";
    setLoggedIn(userLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-logged-in");
    setLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent setLoggedIn={setLoggedIn} />} />
        <Route
          path="/*"
          element={
            loggedIn ? (
              <>
                <NavbarComponent handleSignOut={handleLogout} />
                <div className="d-flex">
                  <Sidebar handleSignOut={handleLogout} />
                  <div className="main-content py-4">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/intensity-chart" element={<IntensityChart />} />
                      <Route path="/region-chart" element={<RegionChart />} />
                      <Route path="/likelihood-chart" element={<LikelihoodChart />} />
                      <Route
                        path="/yearly-distribution-chart"
                        element={<YearlyDistributionChart />}
                      />
                      <Route path="/country-chart" element={<CountryChart />} />
                      <Route path="/topic-chart" element={<TopicChart />} />
                      <Route path="/relevance-chart" element={<RelevanceChart />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
