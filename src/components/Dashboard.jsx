import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";
import axios from "axios";
import "../App.css";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const chartData = (type) => {
    switch (type) {
      case "Intensity":
        return [
          ["Year", "Intensity"],
          ...data.map((item) => [item.start_year, item.intensity]),
        ];
      case "Region":
        const regionData = data.reduce((acc, item) => {
          const region = item.region;
          if (region) {
            acc[region] = acc[region] ? acc[region] + 1 : 1;
          }
          return acc;
        }, {});
        return [["Region", "Count"], ...Object.entries(regionData)];
      case "Likelihood":
        return [
          ["Likelihood", "Count"],
          ...data.map((item) => [item.likelihood, 1]),
        ];
      case "YearlyDistribution":
        return [["Year", "Count"], ...data.map((item) => [item.start_year, 1])];
      case "Country":
        const countryData = data.reduce((acc, item) => {
          const country = item.country;
          if (country) {
            acc[country] = acc[country] ? acc[country] + 1 : 1;
          }
          return acc;
        }, {});
        return [["Country", "Count"], ...Object.entries(countryData)];
      case "Topic":
        return [["Topic", "Count"], ...data.map((item) => [item.topic, 1])];
      case "Relevance":
        return [
          ["Relevance", "Count"],
          ...data.map((item) => [item.relevance, 1]),
        ];
      default:
        return [];
    }
  };

  const chartOptions = (title) => ({
    hAxis: { title: "Year", format: "####" },
    vAxis: { title: title },
    legend: "none",
    responsive: true,
    width: "100%",
    height: "400px",
  });

  return (
    <div>
      <h1>Data Visualization Dashboard</h1>
      <div className="grid-container">
        <Link to="/intensity-chart" className="grid-item text-decoration-none">
          <h4 style={{ color: "black" }}>Intensity Chart</h4>
          <Chart
            chartType="ColumnChart"
            data={chartData("Intensity")}
            options={chartOptions("Intensity")}
            width="100%"
            height="400px"
          />
        </Link>
        <Link to="/region-chart" className="grid-item text-decoration-none">
          <h4 style={{ color: "black" }}>Region Chart</h4>
          <Chart
            chartType="ColumnChart"
            data={chartData("Region")}
            options={chartOptions("Region")}
            width="100%"
            height="400px"
          />
        </Link>
        <Link to="/likelihood-chart" className="grid-item text-decoration-none">
          <h4 style={{ color: "black" }}>Likelihood Chart</h4>
          <Chart
            chartType="ColumnChart"
            data={chartData("Likelihood")}
            options={chartOptions("Likelihood")}
            width="100%"
            height="400px"
          />
        </Link>
        <Link
          to="/yearly-distribution-chart"
          className="grid-item text-decoration-none"
        >
          <h4 style={{ color: "black" }}>Distribution chart</h4>
          <Chart
            chartType="LineChart"
            data={chartData("YearlyDistribution")}
            options={chartOptions("Yearly Distribution")}
            width="100%"
            height="400px"
          />
        </Link>
        <Link to="/country-chart" className="grid-item text-decoration-none">
          <h4 style={{ color: "black" }}>Country Chart</h4>
          <Chart
            chartType="GeoChart"
            data={chartData("Country")}
            options={chartOptions("Country")}
            mapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
            width="100%"
            height="400px"
          />
        </Link>
        <Link to="/topic-chart" className="grid-item text-decoration-none">
          <h4 style={{ color: "black" }}>Topic Chart</h4>
          <Chart
            chartType="PieChart"
            data={chartData("Topic")}
            options={chartOptions("Topic")}
            width="100%"
            height="400px"
          />
        </Link>
        <Link to="/relevance-chart" className="grid-item text-decoration-none">
          <h4 style={{ color: "black" }}>Relevance Chart</h4>
          <Chart
            chartType="ColumnChart"
            data={chartData("Relevance")}
            options={chartOptions("Relevance")}
            width="100%"
            height="400px"
          />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
