


// import React, { useEffect, useRef, useState } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-routing-machine';

// // Fix for Leaflet's default marker icons
// import markerIconPng from 'leaflet/dist/images/marker-icon.png';
// import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// const MapViewer = ({ simulateEarthquake, magnitude, location }) => {
//   const mapRef = useRef(null);
//   const [routeControl, setRouteControl] = useState(null);

//   useEffect(() => {
//     if (!mapRef.current) {
//       // Initialize the map only once
//       mapRef.current = L.map('map').setView([28.7041, 77.1025], 5);

//       // Define base layers
//       const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; OpenStreetMap contributors',
//       });

//       const satelliteLayer = L.tileLayer(
//         'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
//         {
//           attribution: '&copy; Google Satellite',
//           subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
//         }
//       );

//       const terrainLayer = L.tileLayer(
//         'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
//         {
//           attribution: '&copy; Google Terrain',
//           subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
//         }
//       );

//       // Create base layers object
//       const baseLayers = {
//         'Street View': streetLayer,
//         'Satellite View': satelliteLayer,
//         'Terrain View': terrainLayer,
//       };

//       // Add default base layer
//       streetLayer.addTo(mapRef.current);

//       // Add layer control to switch between tile layers
//       L.control.layers(baseLayers).addTo(mapRef.current);
//     }
//   }, []);

//   const calculateExitPoint = (center, radiusMultiplier) => {
//     const offsetFactor = 0.67;
//     const exitLat = center.lat + (radiusMultiplier * 3 * offsetFactor * 0.00001);
//     const exitLng = center.lng + (radiusMultiplier * 3 * offsetFactor * 0.00001);
//     return { lat: exitLat, lng: exitLng };
//   };

//   const drawPathAndMarkers = (center, exitPoint) => {
//     const map = mapRef.current;

//     L.marker([center.lat, center.lng])
//       .addTo(map)
//       .bindPopup(`Earthquake Center<br>Lat: ${center.lat}<br>Lng: ${center.lng}`)
//       .openPopup();

//     L.marker([exitPoint.lat, exitPoint.lng])
//       .addTo(map)
//       .bindPopup(`Exit Point<br>Lat: ${exitPoint.lat}<br>Lng: ${exitPoint.lng}`)
//       .openPopup();

//     if (routeControl) {
//       map.removeControl(routeControl);
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
//       map.eachLayer((layer) => {
//         if (layer instanceof L.Circle) {
//           map.removeLayer(layer);
//         }
//       });

//       const center = { lat: location.lat, lng: location.lng };
//       const radiusMultiplier = 1000 * magnitude;
//       const colors = ['red', 'orange', 'yellow'];

//       colors.forEach((color, index) => {
//         L.circle(center, {
//           color,
//           radius: radiusMultiplier * (index + 1),
//         }).addTo(map);
//       });

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
// // import './LeafletRoutingOverrides.css';
// import './styles.css';

// // Fix for Leaflet's default marker icons
// import markerIconPng from 'leaflet/dist/images/marker-icon.png';
// import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// const MapViewer = ({ simulateEarthquake, magnitude, location }) => {
//   const mapRef = useRef(null);
//   const [routeControl, setRouteControl] = useState(null);
//   const [routeDetails, setRouteDetails] = useState(null);
//   const quakeMarkerRef = useRef(null);
//   const exitMarkerRef = useRef(null);


//   useEffect(() => {
//     if (!mapRef.current) {
//       // Initialize the map only once
//       mapRef.current = L.map('map').setView([28.7041, 77.1025], 5);

//       // Define base layers
//       const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; OpenStreetMap contributors',
//       });

//       const satelliteLayer = L.tileLayer(
//         'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
//         {
//           attribution: '&copy; Google Satellite',
//           subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
//         }
//       );

//       const terrainLayer = L.tileLayer(
//         'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
//         {
//           attribution: '&copy; Google Terrain',
//           subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
//         }
//       );

//       // Create base layers object
//       const baseLayers = {
//         'Street View': streetLayer,
//         'Satellite View': satelliteLayer,
//         'Terrain View': terrainLayer,
//       };

//       // Add default base layer
//       streetLayer.addTo(mapRef.current);

//       // Add layer control to switch between tile layers
//       L.control.layers(baseLayers).addTo(mapRef.current);
//     }
//   }, []);

//   const calculateExitPoint = (center, radiusMultiplier) => {
//     const offsetFactor = 0.67;
//     const exitLat = center.lat + (radiusMultiplier * 3 * offsetFactor * 0.00001);
//     const exitLng = center.lng + (radiusMultiplier * 3 * offsetFactor * 0.00001);
//     return { lat: exitLat, lng: exitLng };
//   };





//   // const drawPathAndMarkers = (center, exitPoint) => {
//   //   const map = mapRef.current;

//   //   L.marker([center.lat, center.lng])
//   //     .addTo(map)
//   //     .bindPopup(`Earthquake Center<br>Lat: ${center.lat}<br>Lng: ${center.lng}`)
//   //     .openPopup();

//   //   L.marker([exitPoint.lat, exitPoint.lng])
//   //     .addTo(map)
//   //     .bindPopup(`Exit Point<br>Lat: ${exitPoint.lat}<br>Lng: ${exitPoint.lng}`)
//   //     .openPopup();

//   //   if (routeControl) {
//   //     map.removeControl(routeControl);
//   //   }

//   //   const newRouteControl = L.Routing.control({
//   //     waypoints: [L.latLng(center.lat, center.lng), L.latLng(exitPoint.lat, exitPoint.lng)],
//   //     routeWhileDragging: true,

//   //   }).addTo(map);

//   //   setRouteControl(newRouteControl);
//   // };


//   const drawPathAndMarkers = (center, exitPoint) => {
//     const map = mapRef.current;

//     // Remove previous markers if they exist
//     if (quakeMarkerRef.current) {
//       map.removeLayer(quakeMarkerRef.current);
//     }
//     if (exitMarkerRef.current) {
//       map.removeLayer(exitMarkerRef.current);
//     }

//     // Add new earthquake marker
//     const quakeMarker = L.marker([center.lat, center.lng])
//       .addTo(map)
//       .bindPopup(`Earthquake Center<br>Lat: ${center.lat}<br>Lng: ${center.lng}`)
//       .openPopup();
//     quakeMarkerRef.current = quakeMarker;

//     // Add new exit marker
//     const exitMarker = L.marker([exitPoint.lat, exitPoint.lng])
//       .addTo(map)
//       .bindPopup(`Exit Point<br>Lat: ${exitPoint.lat}<br>Lng: ${exitPoint.lng}`)
//       .openPopup();
//     exitMarkerRef.current = exitMarker;

//     if (routeControl) {
//       map.removeControl(routeControl);
//     }

//     // const newRouteControl = L.Routing.control({
//     //   waypoints: [L.latLng(center.lat, center.lng), L.latLng(exitPoint.lat, exitPoint.lng)],
//     //   routeWhileDragging: true,
//     // }).addTo(map);





//     const newRouteControl = L.Routing.control({
//       waypoints: [L.latLng(center.lat, center.lng), L.latLng(exitPoint.lat, exitPoint.lng)],
//       routeWhileDragging: true,
//       show: false,
//     })
//       .on('routesfound', function (e) {
//         const route = e.routes[0];

//         if (route && route.summary) {
//           setRouteDetails({
//             totalDistance: route.summary.totalDistance,
//             totalTime: route.summary.totalTime,
//             steps: route.instructions.map(inst => ({
//               text: inst.text,
//               distance: inst.distance,
//               time: inst.time,
//             })),
//           });
//         } else {
//           // Handle missing summary gracefully
//           setRouteDetails(null);
//           console.warn('Route summary is undefined');
//         }
//       })
//       .addTo(map);


//     setRouteControl(newRouteControl);
//   };






//   useEffect(() => {
//     if (simulateEarthquake && mapRef.current && location.lat && location.lng) {
//       const map = mapRef.current;
//       map.eachLayer((layer) => {
//         if (layer instanceof L.Circle) {
//           map.removeLayer(layer);
//         }
//       });

//       const center = { lat: location.lat, lng: location.lng };
//       const radiusMultiplier = 1000 * magnitude;
//       const colors = ['red', 'orange', 'yellow'];

//       colors.forEach((color, index) => {
//         L.circle(center, {
//           color,
//           radius: radiusMultiplier * (index + 1),
//         }).addTo(map);
//       });

//       const exitPoint = calculateExitPoint(center, radiusMultiplier);
//       drawPathAndMarkers(center, exitPoint);
//     }
//   }, [simulateEarthquake, location, magnitude]);

//   //   return <div id="map" style={{ height: '500px', width: '100%' }} />;
//   // };

//   // export default MapViewer;




//   return (
//     <div style={{ display: 'flex', gap: '1rem' }}>
//       <div id="map" style={{ height: '500px', width: '70%' }}></div>

//       <div
//         style={{
//           width: '30%',
//           maxHeight: '500px',
//           overflowY: 'auto',
//           padding: '0.5rem',
//           border: '1px solid #ddd',
//           borderRadius: '8px',
//           background: '#fafafa',
//         }}
//       >
//         {routeDetails ? (
//           <>
//             <h4>Directions</h4>
//             <p>
//               <strong>Total Distance:</strong> {(routeDetails.totalDistance / 1000).toFixed(2)} km
//               <br />
//               <strong>Total Time:</strong> {(routeDetails.totalTime / 60).toFixed(1)} min
//             </p>
//             <ol>
//               {routeDetails.steps.map((step, i) => (
//                 <li key={i}>
//                   {step.text} ({(step.distance / 1000).toFixed(2)} km, {(step.time / 60).toFixed(1)} min)
//                 </li>
//               ))}
//             </ol>
//           </>
//         ) : (
//           <p>Run a simulation to see directions here.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MapViewer;











// import React, { useEffect, useRef, useState } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine";
// import "./styles.css"; // your custom CSS to hide default directions panel




// const MapViewer = ({ simulateEarthquake, magnitude, location }) => {
//   const mapRef = useRef(null);
//   const quakeMarkerRef = useRef(null);
//   const exitMarkerRef = useRef(null);
//   const [routeControl, setRouteControl] = useState(null);
//   const [routeDetails, setRouteDetails] = useState(null);
//   const bestExitMarkerRef = useRef(null);
//   const simulationLayerRef = useRef(null); // LayerGroup for all markers, circles, routes
//   // const [routeDetails, setRouteDetails] = useState(null);
//   const EARTH_RADIUS_METERS = 6371000;
//   const rad = (deg) => (deg * Math.PI) / 180;
//   const deg = (rad) => (rad * 180) / Math.PI;
//   // Initialize map once
//   useEffect(() => {
//     if (!mapRef.current) {
//       mapRef.current = L.map("map", {
//         center: [28.7041, 77.1025],
//         zoom: 5,
//         scrollWheelZoom: true,
//       });

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "&copy; OpenStreetMap contributors",
//       }).addTo(mapRef.current);

//       simulationLayerRef.current = L.layerGroup().addTo(mapRef.current);
//     }
//   }, []);

//   const fetchRouteSummary = async (start, end) => {
//     if (!start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
//       console.error("Invalid route points:", start, end);
//       return null;
//     }

//     return new Promise((resolve) => {
//       const router = L.Routing.osrmv1({
//         serviceUrl: "https://router.project-osrm.org/route/v1",
//       });

//       router.route(
//         [
//           { latLng: L.latLng(start.lat, start.lng) },
//           { latLng: L.latLng(end.lat, end.lng) },
//         ],
//         (err, routes) => {
//           if (err || !routes || !routes[0]) {
//             resolve(null);
//           } else {
//             const route = routes[0];
//             resolve({
//               totalDistance: route.summary.totalDistance,
//               totalTime: route.summary.totalTime,
//             });
//           }
//         }
//       );
//     });
//   };




//   // Generate exit points only in 4 cardinal directions (N, E, S, W)
//   const generateCardinalExitPoints = (center, radiusMeters) => {
//     const latRad = rad(center.lat);
//     const lngRad = rad(center.lng);
//     const angularDistance = radiusMeters / EARTH_RADIUS_METERS;

//     const bearings = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]; // N, E, S, W
//     const candidates = [];

//     bearings.forEach((bearing) => {
//       const newLatRad = Math.asin(
//         Math.sin(latRad) * Math.cos(angularDistance) +
//         Math.cos(latRad) * Math.sin(angularDistance) * Math.cos(bearing)
//       );

//       const newLngRad =
//         lngRad +
//         Math.atan2(
//           Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(latRad),
//           Math.cos(angularDistance) - Math.sin(latRad) * Math.sin(newLatRad)
//         );

//       candidates.push({
//         lat: deg(newLatRad),
//         lng: deg(newLngRad),
//         direction:
//           bearing === 0
//             ? "North"
//             : bearing === Math.PI / 2
//               ? "East"
//               : bearing === Math.PI
//                 ? "South"
//                 : "West",
//       });
//     });

//     return candidates;
//   };

//   // Find best exit point by shortest travel distance
//   const findFastestExitPoint = async (center, outerRadiusMeters) => {
//     const candidates = generateCardinalExitPoints(center, outerRadiusMeters);

//     let bestExit = null;
//     let bestTime = Infinity;
//     let bestDistance = Infinity;

//     for (const candidate of candidates) {
//       const summary = await fetchRouteSummary(center, candidate);

//       if (summary) {
//         if (
//           summary.totalTime < bestTime ||
//           (summary.totalTime === bestTime && summary.totalDistance < bestDistance)
//         ) {
//           bestTime = summary.totalTime;
//           bestDistance = summary.totalDistance;
//           bestExit = candidate;
//         }
//       }
//     }

//     return { bestExit: bestExit || candidates[0] };
//   };

//   const drawPathAndMarkers = (center, exitPoint) => {
//     const map = mapRef.current;
//     if (quakeMarkerRef.current) map.removeLayer(quakeMarkerRef.current);
//     if (exitMarkerRef.current) map.removeLayer(exitMarkerRef.current);
//     if (simulationLayerRef.current) {
//       simulationLayerRef.current.clearLayers();
//     }

//     if (routeControl) {
//       map.removeControl(routeControl);
//       setRouteControl(null); // ❌ if called outside component body
//     }


//     quakeMarkerRef.current = L.marker([center.lat, center.lng])
//       .addTo(map)
//       .bindPopup(`Earthquake Center<br>Lat: ${center.lat}<br>Lng: ${center.lng}`)
//       .openPopup();

//     exitMarkerRef.current = L.marker([exitPoint.lat, exitPoint.lng], {
//       icon: L.icon({
//         iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png",
//         iconSize: [32, 32],
//         iconAnchor: [16, 32],
//       }),
//     })
//       .addTo(map)
//       .bindPopup(`Exit Point<br>Lat: ${exitPoint.lat}<br>Lng: ${exitPoint.lng}`)
//       .openPopup();

//     const newControl = L.Routing.control({
//       waypoints: [
//         L.latLng(center.lat, center.lng),
//         L.latLng(exitPoint.lat, exitPoint.lng),
//       ],
//       lineOptions: { styles: [{ color: "green", weight: 5 }] },
//       createMarker: () => null,
//       addWaypoints: false,
//       routeWhileDragging: false,
//       show: false,
//     }).addTo(map);

//     setRouteControl(newControl);
//   };


//   // Main effect
//   useEffect(() => {



//     if (simulateEarthquake && mapRef.current && location.lat && location.lng) {
//       const map = mapRef.current;


//       // Cleanup old layers before running new simulation
//       if (bestExitMarkerRef.current) {
//         map.removeLayer(bestExitMarkerRef.current);
//         bestExitMarkerRef.current = null;
//       }

//       if (quakeMarkerRef.current) {
//         map.removeLayer(quakeMarkerRef.current);
//         quakeMarkerRef.current = null;
//       }
//       if (exitMarkerRef.current) {
//         map.removeLayer(exitMarkerRef.current);
//         exitMarkerRef.current = null;
//       }
//       if (routeControl) {
//         map.removeControl(routeControl);
//         setRouteControl(null);
//       }


//       // Remove previous circles
//       map.eachLayer((layer) => {
//         if (layer instanceof L.Circle) {
//           map.removeLayer(layer);
//         }
//       });

//       const center = { lat: location.lat, lng: location.lng };
//       const radiusMeters = 1000 * magnitude;

//       ["red", "orange", "yellow"].forEach((color, idx) => {
//         L.circle(center, {
//           color,
//           radius: radiusMeters * (idx + 1),
//         }).addTo(map);
//       });

//       (async () => {
//         const { bestExit } = await findFastestExitPoint(center, radiusMeters * 3);

//         if (bestExit) {
//           // 🧹 remove old best exit marker
//           if (bestExitMarkerRef.current) {
//             map.removeLayer(bestExitMarkerRef.current);
//             bestExitMarkerRef.current = null;
//           }

//           // ✅ add new best exit marker
//           bestExitMarkerRef.current = L.circleMarker([bestExit.lat, bestExit.lng], {
//             radius: 8,
//             color: "green",
//             fillColor: "green",
//             fillOpacity: 0.9,
//           })
//             .addTo(map)
//             .bindPopup(
//               `Best Exit<br>Lat: ${bestExit.lat.toFixed(4)}<br>Lng: ${bestExit.lng.toFixed(4)}`
//             )
//             .openPopup();

//           // Draw path + markers
//           drawPathAndMarkers(center, bestExit);
//         }
//       })();

//     }
//   }, [simulateEarthquake, location, magnitude]);

//   return (
//     <div style={{ display: "flex", gap: "1rem" }}>
//       <div id="map" style={{ height: "500px", width: "70%" }} />
//       <div
//         style={{
//           width: "30%",
//           maxHeight: "500px",
//           overflowY: "auto",
//           padding: "0.5rem",
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//           background: "#fafafa",
//         }}
//       >
//         {routeDetails ? (
//           <>
//             <h4>Directions</h4>
//             <p>
//               <b>Total Distance:</b>{" "}
//               {(routeDetails.totalDistance / 1000).toFixed(2)} km
//               <br />
//               <b>Total Time:</b>{" "}
//               {(routeDetails.totalTime / 60).toFixed(1)} min
//             </p>
//             <ol>
//               {routeDetails.steps.map((step, idx) => (
//                 <li key={idx}>
//                   {step.text} (
//                   {(step.distance / 1000).toFixed(2)} km,{" "}
//                   {(step.time / 60).toFixed(1)} min)
//                 </li>
//               ))}
//             </ol>
//           </>
//         ) : (
//           <p>Run a simulation to see directions here.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MapViewer;

































import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "./styles.css";

const MapViewer = ({ simulateEarthquake, magnitude, location }) => {
  const mapRef = useRef(null);

  const quakeMarkerRef = useRef(null);
  const exitMarkerRef = useRef(null);
  const routeControlRef = useRef(null);
  const circlesRef = useRef([]);
  const simIdRef = useRef(0); // ✅ track simulation ID

  const [routeDetails, setRouteDetails] = useState(null);

  const EARTH_RADIUS_METERS = 6371000;
  const rad = (deg) => (deg * Math.PI) / 180;
  const deg = (rad) => (rad * 180) / Math.PI;

  // initialize map once
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [28.7041, 77.1025],
        zoom: 5,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }
  }, []);

  // clear all previous layers
  const clearPreviousLayers = (map) => {
    if (quakeMarkerRef.current) {
      map.removeLayer(quakeMarkerRef.current);
      quakeMarkerRef.current = null;
    }
    if (exitMarkerRef.current) {
      map.removeLayer(exitMarkerRef.current);
      exitMarkerRef.current = null;
    }
    if (routeControlRef.current) {
      try {
        // ✅ clear waypoints to cancel pending request
        routeControlRef.current.getPlan().setWaypoints([]);
      } catch (e) { }
      map.removeControl(routeControlRef.current);
      routeControlRef.current = null;
    }
    circlesRef.current.forEach((c) => map.removeLayer(c));
    circlesRef.current = [];
    setRouteDetails(null);
  };

  const fetchRouteSummary = async (start, end) => {
    if (!start || !end) return null;

    return new Promise((resolve) => {
      const router = L.Routing.osrmv1({
        // serviceUrl: "https://router.project-osrm.org/route/v1",
        serviceUrl: "http://localhost:4000/api/route", // ✅ point to your proxy
        
      });

      router.route(
        [
          { latLng: L.latLng(start.lat, start.lng) },
          { latLng: L.latLng(end.lat, end.lng) },
        ],
        (err, routes) => {
          if (err || !routes?.[0]) {
            resolve(null);
          } else {
            const route = routes[0];
            resolve({
              totalDistance: route.summary.totalDistance,
              totalTime: route.summary.totalTime,
            });
          }
        }
      );
    });
  };

  const generateCardinalExitPoints = (center, radiusMeters) => {
    const latRad = rad(center.lat);
    const lngRad = rad(center.lng);
    const angularDistance = radiusMeters / EARTH_RADIUS_METERS;

    const bearings = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]; // N,E,S,W
    return bearings.map((bearing) => {
      const newLatRad = Math.asin(
        Math.sin(latRad) * Math.cos(angularDistance) +
        Math.cos(latRad) * Math.sin(angularDistance) * Math.cos(bearing)
      );

      const newLngRad =
        lngRad +
        Math.atan2(
          Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(latRad),
          Math.cos(angularDistance) - Math.sin(latRad) * Math.sin(newLatRad)
        );

      return {
        lat: deg(newLatRad),
        lng: deg(newLngRad),
      };
    });
  };

  const findFastestExitPoint = async (center, outerRadiusMeters) => {
    const candidates = generateCardinalExitPoints(center, outerRadiusMeters);

    let bestExit = null;
    let bestTime = Infinity;
    let bestDistance = Infinity;

    for (const candidate of candidates) {
      const summary = await fetchRouteSummary(center, candidate);

      if (summary) {
        if (
          summary.totalTime < bestTime ||
          (summary.totalTime === bestTime &&
            summary.totalDistance < bestDistance)
        ) {
          bestTime = summary.totalTime;
          bestDistance = summary.totalDistance;
          bestExit = candidate;
        }
      }
    }

    return bestExit || candidates[0];
  };

  const drawPathAndMarkers = (center, exitPoint, currentSimId) => {
    const map = mapRef.current;

    quakeMarkerRef.current = L.marker([center.lat, center.lng])
      .addTo(map)
      .bindPopup(
        `Earthquake Center<br>Lat: ${center.lat}<br>Lng: ${center.lng}`
      );

    exitMarkerRef.current = L.marker([exitPoint.lat, exitPoint.lng], {
      icon: L.icon({
        iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      }),
    })
      .addTo(map)
      .bindPopup(
        `Exit Point<br>Lat: ${exitPoint.lat}<br>Lng: ${exitPoint.lng}`
      );

    // routing control
    routeControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(center.lat, center.lng),
        L.latLng(exitPoint.lat, exitPoint.lng),
      ],
      lineOptions: { styles: [{ color: "green", weight: 5 }] },
      createMarker: () => null,
      addWaypoints: false,
      routeWhileDragging: false,
      show: false,
    })
      .on("routesfound", (e) => {
        const route = e.routes[0];
        if (route && route.summary) {
          // Extract step-by-step instructions safely
          let steps = [];
          if (route.instructions) {
            // some versions may have this
            steps = route.instructions.map((instr) => ({
              text: instr.text,
              distance: instr.distance,
              time: instr.time,
            }));
          } else if (route.legs && route.legs[0]?.steps) {
            // fallback for OSRM v1
            steps = route.legs[0].steps.map((step) => ({
              text: step.maneuver.instruction || step.name || "Continue",
              distance: step.distance,
              time: step.duration,
            }));
          }

          setRouteDetails({
            totalDistance: route.summary.totalDistance,
            totalTime: route.summary.totalTime,
            steps,
          });
        }
      })

      .addTo(map);

  };

  // run simulation when flag changes
  useEffect(() => {
    const runSimulation = async () => {
      if (!simulateEarthquake || !location.lat || !location.lng) return;
      const map = mapRef.current;

      const currentSimId = ++simIdRef.current; // ✅ bump ID
      clearPreviousLayers(map);

      const center = { lat: location.lat, lng: location.lng };
      const radiusMeters = 1000 * magnitude;

      // Draw zones
      ["red", "orange", "yellow"].forEach((color, idx) => {
        const circle = L.circle(center, {
          color,
          radius: radiusMeters * (idx + 1),
        }).addTo(map);
        circlesRef.current.push(circle);
      });

      // Find exit point + path
      const bestExit = await findFastestExitPoint(center, radiusMeters * 3);
      if (bestExit && simIdRef.current === currentSimId) {
        drawPathAndMarkers(center, bestExit, currentSimId);
        map.flyTo([center.lat, center.lng], 11);
      }
    };

    runSimulation();

    return () => {
      if (mapRef.current) {
        clearPreviousLayers(mapRef.current);
      }
    };
  }, [simulateEarthquake, magnitude, location]);
  return (
    <div style={{ display: "flex", flex: 1, height: "100%" }}>
      {/* MAP */}
      <div style={{ flex: 1 }}>
        <div id="map" style={{ height: "100%", width: "100%" }} />
      </div>

      {/* DIRECTIONS */}
      <div
        style={{
          width: "320px",
          height: "100%",
          overflowY: "auto",
          padding: "1rem",
          borderLeft: "1px solid #ddd",
          background: "#fafafa",
        }}
      >
        {routeDetails ? (
          <>
            <h4>Directions</h4>
            <p>
              <b>Total Distance:</b>{" "}
              {(routeDetails.totalDistance / 1000).toFixed(2)} km
              <br />
              <b>Total Time:</b>{" "}
              {(routeDetails.totalTime / 60).toFixed(1)} min
            </p>

            {routeDetails.steps?.length > 0 && (
              <>
                <h5>Steps:</h5>
                <ol>
                  {routeDetails.steps.map((step, i) => (
                    <li key={i}>
                      {step.text} ({(step.distance / 1000).toFixed(2)} km,{" "}
                      {(step.time / 60).toFixed(1)} min)
                    </li>
                  ))}
                </ol>
              </>
            )}
          </>
        ) : (
          <p>Run a simulation to see directions here.</p>
        )}
      </div>
    </div>
  );

};

export default MapViewer;
