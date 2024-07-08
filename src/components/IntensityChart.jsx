import React, { useEffect, useState, useMemo } from "react";
import { Chart } from "react-google-charts";
import axios from 'axios';

const IntensityChart = () => {
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

  const handleFilterChange = useMemo(() => {
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
  }, [year, region, country, sector, topic, data]);

  const [filteredData, setFilteredData] = useState(handleFilterChange);

  useEffect(() => {
    setFilteredData(handleFilterChange);
  }, [handleFilterChange]);

  const aggregatedData = filteredData.reduce((acc, item) => {
    const year = parseInt(item.start_year || item.end_year);
    if (!acc[year]) {
      acc[year] = { intensity: 0, count: 0 };
    }
    acc[year].intensity += item.intensity;
    acc[year].count += 1;
    return acc;
  }, {});

  const chartData = [
    ["Year", "Intensity"],
    ...Object.entries(aggregatedData).map(([year, { intensity, count }]) => [
      parseInt(year),
      intensity / count,
    ]),
  ];

  const options = {
    title: "Intensity by Year",
    hAxis: { title: "Year", format: "####" },
    vAxis: { title: "Intensity" },
    legend: "none",
    responsive: true,
    width: "100%",
    height: "400px",
  };

  return (
    <div>
      <div className="filters mb-4">
        <div className="row">
          {['year', 'region', 'country', 'sector', 'topic'].map((filter, idx) => (
            <div className="col-md-2" key={idx}>
              <label htmlFor={`${filter}Select`}>{filter.charAt(0).toUpperCase() + filter.slice(1)}</label>
              <select
                id={`${filter}Select`}
                className="form-control"
                value={eval(filter)}
                onChange={(e) => eval(`set${filter.charAt(0).toUpperCase() + filter.slice(1)}`)(e.target.value)}
              >
                <option value="">Select {filter.charAt(0).toUpperCase() + filter.slice(1)}</option>
                {uniqueValues(filter === 'year' ? 'start_year' : filter).concat(filter === 'year' ? uniqueValues('end_year') : []).sort().map((value, index) => (
                  <option key={index} value={value}>{value}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
      <div className="chart-container">
        <Chart
          chartType="ColumnChart"
          data={chartData}
          options={options}
          width="100%"
          height="400px"
        />
      </div>
    </div>
  );
};

export default IntensityChart;
