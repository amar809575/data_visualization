import React, { useEffect, useState, useMemo } from 'react';
import { Chart } from 'react-google-charts';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const RegionChart = () => {
  const [year, setYear] = useState('');
  const [region, setRegion] = useState('');
  const [sector, setSector] = useState('');
  const [topic, setTopic] = useState('');
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

  const uniqueValues = (key) => [...new Set(data.map(item => item[key]).filter(Boolean))];

  const handleFilterChange = useMemo(() => {
    let filtered = Array.isArray(data) ? data : [];

    if (year) {
      filtered = filtered.filter(item =>
        parseInt(item.start_year) === parseInt(year) || parseInt(item.end_year) === parseInt(year)
      );
    }
    if (region) {
      filtered = filtered.filter(item => item.region === region);
    }
    if (sector) {
      filtered = filtered.filter(item => item.sector === sector);
    }
    if (topic) {
      filtered = filtered.filter(item => item.topic === topic);
    }

    return filtered;
  }, [year, region, sector, topic, data]);

  const [filteredData, setFilteredData] = useState(handleFilterChange);

  useEffect(() => {
    setFilteredData(handleFilterChange);
  }, [handleFilterChange]);

  const chartData = [
    ['Region', 'Intensity'],
    ...filteredData
      .filter(item => item.region)
      .reduce((acc, item) => {
        const regionIndex = acc.findIndex(([region]) => region === item.region);
        if (regionIndex !== -1) {
          acc[regionIndex][1] += item.intensity;
        } else {
          acc.push([item.region, item.intensity]);
        }
        return acc;
      }, [])
  ];

  const options = {
    title: 'Intensity by Region',
    pieHole: 0,
    responsive: true,
    width: '100%',
    height: '400px',
    legend: { position: 'right', alignment: 'center' }
  };

  return (
    <div>
      <div className="filters mb-4">
        <div className="row">
          <div className="col-md-3">
            <label htmlFor="yearSelect">Year</label>
            <select id="yearSelect" className="form-control" value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Select Year</option>
              {uniqueValues('start_year').concat(uniqueValues('end_year')).sort().map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="regionSelect">Region</label>
            <select id="regionSelect" className="form-control" value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="">Select Region</option>
              {uniqueValues('region').map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="sectorSelect">Sector</label>
            <select id="sectorSelect" className="form-control" value={sector} onChange={(e) => setSector(e.target.value)}>
              <option value="">Select Sector</option>
              {uniqueValues('sector').map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
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
          chartType="PieChart"
          data={chartData}
          options={options}
          width="100%"
          height="400px"
        />
      </div>
    </div>
  );
};

export default RegionChart;
