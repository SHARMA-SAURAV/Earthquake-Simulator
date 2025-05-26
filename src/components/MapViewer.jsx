// // import React, { useEffect, useRef, useState } from 'react';
// // import L from 'leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import 'leaflet-routing-machine';

// // const MapViewer = ({ simulateEarthquake, magnitude, location }) => {
// //   const mapRef = useRef(null); // Use a ref to store the map instance

// //   useEffect(() => {
// //     if (!mapRef.current) {
// //       // Initialize the map only once
// //       mapRef.current = L.map('map').setView([28.7041, 77.1025], 5);
// //       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //         attribution: '&copy; OpenStreetMap contributors',
// //       }).addTo(mapRef.current);
// //     }

// //     // Cleanup to remove the map instance when the component unmounts
// //     return () => {
// //       if (mapRef.current) {
// //         mapRef.current.remove();
// //         mapRef.current = null;
// //       }
// //     };
// //   }, []);

// //   useEffect(() => {
// //     if (simulateEarthquake && mapRef.current && location.lat && location.lng) {
// //       const map = mapRef.current;

// //       // Clear all non-tile layers
// //       map.eachLayer((layer) => {
// //         if (layer.options && layer.options.pane !== 'tilePane') map.removeLayer(layer);
// //       });

// //       // Draw earthquake zones
// //       const center = L.latLng(location.lat, location.lng);
// //       const radiusMultiplier = 1000 * magnitude;
// //       const colors = ['red', 'orange', 'yellow'];

// //       colors.forEach((color, index) => {
// //         L.circle(center, {
// //           color,
// //           radius: radiusMultiplier * (index + 1),
// //         }).addTo(map);
// //       });

// //       // Calculate and add an exit point
// //       const exitPoint = L.latLng(location.lat + 0.1, location.lng + 0.1);
// //       L.marker(exitPoint).addTo(map).bindPopup('Exit Point').openPopup();

// //       // Add a route from the earthquake center to the exit point
// //       L.Routing.control({
// //         waypoints: [center, exitPoint],
// //         routeWhileDragging: true,
// //       }).addTo(map);
// //     }
// //   }, [simulateEarthquake, location, magnitude]);

// //   return <div id="map" style={{ height: '500px', width: '100%' }} />;
// // };

// // export default MapViewer;


























// import React, { useEffect, useRef, useState } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-routing-machine';

// // Fix for Leaflet's default marker icons
// import markerIconPng from 'leaflet/dist/images/marker-icon.png';
// import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// // L.Icon.Default.mergeOptions({
// //   iconUrl: markerIconPng,
// //   shadowUrl: markerShadowPng,
// // });

// const MapViewer = ({ simulateEarthquake, magnitude, location }) => {
//   const mapRef = useRef(null);
//   const [routeControl, setRouteControl] = useState(null);

//   useEffect(() => {
//     if (!mapRef.current) {
//       // Initialize the map only once
//       mapRef.current = L.map('map').setView([28.7041, 77.1025], 5);
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; OpenStreetMap contributors',
//       }).addTo(mapRef.current);
//     }
//   }, []);

//   const calculateExitPoint = (center, radiusMultiplier) => {
//     // Calculate exit point outside the 3rd circle
//     const offsetFactor = 0.67; // Exit point is 20% outside the 3rd circle
//     const exitLat = center.lat + (radiusMultiplier * 3 * offsetFactor * 0.00001); // Adjust for lat
//     const exitLng = center.lng + (radiusMultiplier * 3 * offsetFactor * 0.00001); // Adjust for lng
//     return { lat: exitLat, lng: exitLng };
//   };
//   //       // Calculate and add an exit point
// //       const exitPoint = L.latLng(location.lat + 0.1, location.lng + 0.1);
// //       L.marker(exitPoint).addTo(map).bindPopup('Exit Point').openPopup();


//   const drawPathAndMarkers = (center, exitPoint) => {
//     const map = mapRef.current;

//     // Add a marker for the earthquake center
//     L.marker([center.lat, center.lng])
//       .addTo(map)
//       .bindPopup(`Earthquake Center<br>Lat: ${center.lat}<br>Lng: ${center.lng}`)
//       .openPopup();

//     // Add a marker for the exit point
//     L.marker([exitPoint.lat, exitPoint.lng])
//       .addTo(map)
//       .bindPopup(`Exit Point<br>Lat: ${exitPoint.lat}<br>Lng: ${exitPoint.lng}`)
//       .openPopup();

//     // Add or update the route
//     if (routeControl) {
//       map.removeControl(routeControl); // Remove the existing route
//     }

//     const newRouteControl = L.Routing.control({
//       waypoints: [L.latLng(center.lat, center.lng), L.latLng(exitPoint.lat, exitPoint.lng)],
//       routeWhileDragging: true,
//     }).addTo(map);

//     setRouteControl(newRouteControl);
//   };

//   useEffect(() => {
//     if (simulateEarthquake && mapRef.current && location.lat && location.lng) {
//       const map = mapRef.current;

//       // Clear previous layers (except tile layers)
//       map.eachLayer((layer) => {
//         if (layer.options && layer.options.pane !== 'tilePane') map.removeLayer(layer);
//       });

//       // Define earthquake center
//       const center = { lat: location.lat, lng: location.lng };

//       // Draw earthquake zones
//       const radiusMultiplier = 1000 * magnitude;
//       const colors = ['red', 'orange', 'yellow'];

//       colors.forEach((color, index) => {
//         L.circle(center, {
//           color,
//           radius: radiusMultiplier * (index + 1),
//         }).addTo(map);
//       });

//       // Calculate the exit point and draw path
//       const exitPoint = calculateExitPoint(center, radiusMultiplier);
//       drawPathAndMarkers(center, exitPoint);
//     }
//   }, [simulateEarthquake, location, magnitude]);

//   return <div id="map" style={{ height: '500px', width: '100%' }} />;
// };

// export default MapViewer;




















// import React, { useEffect, useRef, useState } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-routing-machine';

// // Fix for Leaflet's default marker icons
// import markerIconPng from 'leaflet/dist/images/marker-icon.png';
// import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// // L.Icon.Default.mergeOptions({
// //   iconUrl: markerIconPng,
// //   shadowUrl: markerShadowPng,
// // });

// const MapViewer = ({ simulateEarthquake, magnitude, location }) => {
//   const mapRef = useRef(null);
//   const [routeControl, setRouteControl] = useState(null);

//   useEffect(() => {
//     if (!mapRef.current) {
//       // Initialize the map only once
//       mapRef.current = L.map('map').setView([28.7041, 77.1025], 5);
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; OpenStreetMap contributors',
//       }).addTo(mapRef.current);
//     }
//   }, []);

//   const calculateExitPoint = (center, radiusMultiplier) => {
//     // Calculate exit point outside the 3rd circle
//     const offsetFactor = 0.67; // Exit point is 20% outside the 3rd circle
//     const exitLat = center.lat + (radiusMultiplier * 3 * offsetFactor * 0.00001); // Adjust for lat
//     const exitLng = center.lng + (radiusMultiplier * 3 * offsetFactor * 0.00001); // Adjust for lng
//     return { lat: exitLat, lng: exitLng };
//   };
//   //       // Calculate and add an exit point
// //       const exitPoint = L.latLng(location.lat + 0.1, location.lng + 0.1);
// //       L.marker(exitPoint).addTo(map).bindPopup('Exit Point').openPopup();


//   const drawPathAndMarkers = (center, exitPoint) => {
//     const map = mapRef.current;

//     // Add a marker for the earthquake center
//     L.marker([center.lat, center.lng])
//       .addTo(map)
//       .bindPopup(`Earthquake Center<br>Lat: ${center.lat}<br>Lng: ${center.lng}`)
//       .openPopup();

//     // Add a marker for the exit point
//     L.marker([exitPoint.lat, exitPoint.lng])
//       .addTo(map)
//       .bindPopup(`Exit Point<br>Lat: ${exitPoint.lat}<br>Lng: ${exitPoint.lng}`)
//       .openPopup();

//     // Add or update the route
//     if (routeControl) {
//       map.removeControl(routeControl); // Remove the existing route
//     }

//     const newRouteControl = L.Routing.control({
//       waypoints: [L.latLng(center.lat, center.lng), L.latLng(exitPoint.lat, exitPoint.lng)],
//       routeWhileDragging: true,
//     }).addTo(map);

//     setRouteControl(newRouteControl);
//   };

//   useEffect(() => {
//     if (simulateEarthquake && mapRef.current && location.lat && location.lng) {
//       const map = mapRef.current;

//       // Clear previous layers (except tile layers)
//       map.eachLayer((layer) => {
//         if (layer.options && layer.options.pane !== 'tilePane') map.removeLayer(layer);
//       });

//       // Define earthquake center
//       const center = { lat: location.lat, lng: location.lng };

//       // Draw earthquake zones
//       const radiusMultiplier = 1000 * magnitude;
//       const colors = ['red', 'orange', 'yellow'];

//       colors.forEach((color, index) => {
//         L.circle(center, {
//           color,
//           radius: radiusMultiplier * (index + 1),
//         }).addTo(map);
//       });

//       // Calculate the exit point and draw path
//       const exitPoint = calculateExitPoint(center, radiusMultiplier);
//       drawPathAndMarkers(center, exitPoint);
//     }
//   }, [simulateEarthquake, location, magnitude]);

//   return <div id="map" style={{ height: '500px', width: '100%' }} />;
// };

// export default MapViewer;


















import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

// Fix for Leaflet's default marker icons
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const MapViewer = ({ simulateEarthquake, magnitude, location }) => {
  const mapRef = useRef(null);
  const [routeControl, setRouteControl] = useState(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map only once
      mapRef.current = L.map('map').setView([28.7041, 77.1025], 5);
      
      // Define base layers
      const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      });

      const satelliteLayer = L.tileLayer(
        'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        {
          attribution: '&copy; Google Satellite',
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        }
      );

      const terrainLayer = L.tileLayer(
        'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
        {
          attribution: '&copy; Google Terrain',
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        }
      );

      // Create base layers object
      const baseLayers = {
        'Street View': streetLayer,
        'Satellite View': satelliteLayer,
        'Terrain View': terrainLayer,
      };

      // Add default base layer
      streetLayer.addTo(mapRef.current);

      // Add layer control to switch between tile layers
      L.control.layers(baseLayers).addTo(mapRef.current);
    }
  }, []);

  const calculateExitPoint = (center, radiusMultiplier) => {
    const offsetFactor = 0.67;
    const exitLat = center.lat + (radiusMultiplier * 3 * offsetFactor * 0.00001);
    const exitLng = center.lng + (radiusMultiplier * 3 * offsetFactor * 0.00001);
    return { lat: exitLat, lng: exitLng };
  };

  const drawPathAndMarkers = (center, exitPoint) => {
    const map = mapRef.current;

    L.marker([center.lat, center.lng])
      .addTo(map)
      .bindPopup(`Earthquake Center<br>Lat: ${center.lat}<br>Lng: ${center.lng}`)
      .openPopup();

    L.marker([exitPoint.lat, exitPoint.lng])
      .addTo(map)
      .bindPopup(`Exit Point<br>Lat: ${exitPoint.lat}<br>Lng: ${exitPoint.lng}`)
      .openPopup();

    if (routeControl) {
      map.removeControl(routeControl);
    }

    const newRouteControl = L.Routing.control({
      waypoints: [L.latLng(center.lat, center.lng), L.latLng(exitPoint.lat, exitPoint.lng)],
      routeWhileDragging: true,
    }).addTo(map);

    setRouteControl(newRouteControl);
  };

  useEffect(() => {
    if (simulateEarthquake && mapRef.current && location.lat && location.lng) {
      const map = mapRef.current;
      map.eachLayer((layer) => {
        if (layer instanceof L.Circle) {
          map.removeLayer(layer);
        }
      });

      const center = { lat: location.lat, lng: location.lng };
      const radiusMultiplier = 1000 * magnitude;
      const colors = ['red', 'orange', 'yellow'];

      colors.forEach((color, index) => {
        L.circle(center, {
          color,
          radius: radiusMultiplier * (index + 1),
        }).addTo(map);
      });

      const exitPoint = calculateExitPoint(center, radiusMultiplier);
      drawPathAndMarkers(center, exitPoint);
    }
  }, [simulateEarthquake, location, magnitude]);

  return <div id="map" style={{ height: '500px', width: '100%' }} />;
};

export default MapViewer;
