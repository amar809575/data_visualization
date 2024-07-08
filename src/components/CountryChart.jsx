import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CountryChart = () => {
  const [year, setYear] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [sector, setSector] = useState("");
  const [topic, setTopic] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const uniqueValues = (key) => [
    ...new Set(data.map((item) => item[key]).filter(Boolean)),
  ];

  const handleFilterChange = () => {
    let filtered = Array.isArray(data) ? data : [];

    if (year) {
      filtered = filtered.filter(
        (item) =>
          parseInt(item.start_year) === parseInt(year) ||
          parseInt(item.end_year) === parseInt(year)
      );
    }
    if (region) {
      filtered = filtered.filter((item) => item.region === region);
    }
    if (country) {
      filtered = filtered.filter((item) => item.country === country);
    }
    if (sector) {
      filtered = filtered.filter((item) => item.sector === sector);
    }
    if (topic) {
      filtered = filtered.filter((item) => item.topic === topic);
    }

    return filtered;
  };

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(handleFilterChange());
  }, [year, region, country, sector, topic, data]);

  const countryData = filteredData.reduce((acc, item) => {
    const country = item.country;
    if (country) {
      if (!acc[country]) acc[country] = { intensity: 0, count: 0 };
      acc[country].intensity += item.intensity || 0;
      acc[country].count += 1;
    }
    return acc;
  }, {});

  const chartData = [["Country", "Average Intensity"]];
  Object.keys(countryData).forEach((country) => {
    const { intensity, count } = countryData[country];
    chartData.push([country, intensity / count]);
  });

  const options = {
    title: "Average Intensity by Country",
    colorAxis: { colors: ["#e0f3db", "#43a2ca"] },
    legend: {
      textStyle: { color: "#333", fontSize: 12 },
    },
    width: "100%",
    height: "400px",
  };

  return (
    <div>
      <div className="filters mb-4">
        <div className="row">
          <div className="col-md-2">
            <label htmlFor="yearSelect">Year</label>
            <select id="yearSelect" className="form-control" value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Select Year</option>
              {uniqueValues('start_year').concat(uniqueValues('end_year')).sort().map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="regionSelect">Region</label>
            <select id="regionSelect" className="form-control" value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="">Select Region</option>
              {uniqueValues('region').map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="countrySelect">Country</label>
            <select id="countrySelect" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">Select Country</option>
              {uniqueValues('country').map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="sectorSelect">Sector</label>
            <select id="sectorSelect" className="form-control" value={sector} onChange={(e) => setSector(e.target.value)}>
              <option value="">Select Sector</option>
              {uniqueValues('sector').map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="topicSelect">Topic</label>
            <select id="topicSelect" className="form-control" value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="">Select Topic</option>
              {uniqueValues('topic').map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))}
            </select>
          </div>
        </div>
      </div>      
      <div className="chart-container">
        <Chart
          chartType="GeoChart"
          data={chartData}
          options={options}
          mapsApiKey="YOUR_GOOGLE_MAPS_API_KEY_HERE"
          width="100%"
          height="400px"
        />
      </div>
    </div>
  );
};

export default CountryChart;
