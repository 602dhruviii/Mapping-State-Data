# Mapping State Data

This project showcases a WebGIS dashboard that visually represents data on the number of colleges in each state of India. The dashboard uses a dynamic color-coding scheme based on the number of colleges, leveraging Geoserver for spatial data, Leaflet for interactive map rendering, and a custom RESTful API for additional attribute data. The color scheme aligns with the theme color #319795.

## Features

- Designed to be responsive, ensuring optimal functionality and appearance on various devices, including desktops, tablets, and mobile phones.

- Allows users to upload a shapefile of India State Boundaries to Geoserver. Displays detailed information about a state when clicked on the map.

- Uses a dynamic color-coding scheme to visually differentiate states based on the number of colleges.

- The sidebar transforms into a bottom navbar on smaller screens for better usability on mobile devices.

- Integrates Geoserver for serving spatial data. Utilizes Leaflet for rendering an interactive map where users can explore and interact with the data.

## Setup

1. **Clone the Repository:** Begin by cloning the repository to your local machine.
```bash
git clone https://github.com/602dhruviii/Mapping-State-Data.git
```

2. **Install Dependencies:** Navigate to the project directory and install the necessary dependencies.

3. **Configure PostgreSQL:** Ensure you have PostgreSQL installed on your system.

4. **Start the Server:** Launch the server to run the application.

```bash 
node server.js 
npm start
```

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Geoserver
- Reactjs
- React-Leaflet
- Chakra UI 

## Screenshots
### Demo Video
![Demo](./video.gif)

