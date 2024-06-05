// src/MapComponent.js

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from 'axios';
import { Box, Flex, Button, Heading, Text, Stack } from "@chakra-ui/react";
import "../Styles/MapComponent.css";

const MapComponent = () => {
  const [geoData, setGeoData] = useState(null);
  const [stateData, setStateData] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetch(
      "http://localhost:8080/geoserver/myworkspace/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=myworkspace%3Ashape&maxFeatures=50&outputFormat=application%2Fjson"
    )
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error("Error fetching GeoJSON:", error));
  }, []);

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        setSelectedFeature(feature);
        setIsSidebarOpen(true);
        const elements = document.getElementsByClassName("side");
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.display = "block";
        }
      },
    });
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    const elements = document.getElementsByClassName("side");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
    const mapcont = document.getElementsByTagName("MapContainer");
    mapcont.width = "100%";
  };
  const fetchStateData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/state-data");
      console.log("State Data:", response.data);
      setStateData(response.data);
    } catch (error) {
      console.error("Error fetching state data:", error);
    }
  };

  fetchStateData();

  const comb = (geoData, stateData) => {
    if (!geoData || !stateData) return null;

    const stateDataMap = stateData.reduce((acc, curr) => {
      acc[curr.state_name] = curr.num_colleges;
      return acc;
    }, {});

    geoData.features = geoData.features.map((feature) => {
      const stateName = feature.properties.name;
      if (stateDataMap[stateName]) {
        feature.properties.num_colleges = stateDataMap[stateName];
      }
      return feature;
    });

    console.log("Merged Data:", geoData);
    return geoData;
  };

  const mergedData = comb(geoData, stateData);

  const getColor = (num_colleges) => {
    return num_colleges > 20
      ? "#004d40"  // Dark Teal
      : num_colleges > 15
      ? "#00796b"  // Medium Dark Teal
      : num_colleges > 10
      ? "#00897b"  // Medium Teal
      : num_colleges > 8
      ? "#26a69a"  // Light Medium Teal
      : num_colleges > 5
      ? "#4db6ac"  // Light Teal
      : num_colleges > 3
      ? "#80cbc4"  // Very Light Teal
      : "#b2dfdb"; // Lightest Teal
  };
  

  const style = (feature) => {
    return {
      fillColor: getColor(feature.properties.num_colleges),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };



  return (
    <Flex height="90vh" position="relative" overflow={"hidden"}>
      <Box flex="1">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: "100%", width: "96%", margin: "3%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />
          {mergedData && (
            <GeoJSON
              data={mergedData}
              style={style}
              onEachFeature={onEachFeature}
            />
          )}
        </MapContainer>
      </Box>
      <Box
        width={{ base: "80%", md: "300px" }}
        bg="gray.100"
        p={4}
        top={0}
        right={isSidebarOpen ? 0 : "-100%"}
        height="100%"
        overflowY="auto"
        transition="right 0.3s ease-in-out"
        boxShadow="lg"
        className="side"
      >
        <Button colorScheme="red" onClick={closeSidebar} mb={4} mt={12}>
          ×
        </Button>
        <Heading as="h2" size="md" mb={4}>
          Feature Attributes
        </Heading>
        {selectedFeature ? (
          <Stack spacing={4}>
            {Object.entries(selectedFeature.properties).map(
              ([key, value], index) => (
                <Box
                  key={index}
                  p={4}
                  bg="white"
                  borderRadius="md"
                  boxShadow="sm"
                >
                  <Text fontWeight="bold">{key}</Text>
                  <Text>{value}</Text>
                </Box>
              )
            )}
          </Stack>
        ) : (
          <Text>Click on a feature to see its attributes.</Text>
        )}
      </Box>
    </Flex>
  );
};

export default MapComponent;
