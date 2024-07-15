# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Data Visualization Dashboard

This project is a data visualization dashboard that displays various charts based on data fetched from a MongoDB database via an API. It includes charts for intensity, likelihood, yearly distribution, country distribution, and topic distribution.

## Features

- **Intensity Chart**: Visualizes intensity data over time.
- **Likelihood Chart**: Displays likelihood data categorized by different variables.
- **Yearly Distribution Chart**: Shows the distribution of intensity and likelihood over different years.
- **Country Chart**: Displays average intensity by country using a GeoChart.
- **Topic Chart**: Visualizes the distribution of topics using a PieChart.

## Technologies

- **Frontend**: React, React Google Charts, Bootstrap
- **Backend**: Node.js, Express.js, MongoDB
- **Other**: Axios for API requests, Vite for build tooling

- ## Setup

### Prerequisites

- Node.js installed
- MongoDB instance running locally or accessible via a URL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/data-visualization-dashboard.git
   cd data-visualization-dashboard

2. Install dependencies:
   ```bash
   npm install

3. Create a .env file in the root directory and add your MongoDB connection string:

   ```bash
      MONGODB_URI=your_mongodb_connection_string


## Running the Application
1. Start the backend server (make sure MongoDB is running):

    ```bash
    npm run server
    

2. In a separate terminal, start the frontend development server:

    ```bash
    npm run dev
    

3. Open your browser and navigate to http://localhost:5000 to view the application.


## Usage
- Use the dropdown filters in the dashboard to select specific criteria (year, region, country, sector, topic).
- Charts will dynamically update based on the selected filters.
- Explore different visualizations to analyze data trends and distributions.

## Contributing
- Contributions are welcome! If you have any improvements or suggestions, please submit a pull request or open an issue on GitHub.
