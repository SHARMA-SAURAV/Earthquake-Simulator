
// import React, { useEffect } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   ImageOverlay,
//   useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// function Legend() {
//   const map = useMap();

//   useEffect(() => {
//     const legend = L.control({ position: "bottomright" });

//     legend.onAdd = function () {
//       const div = L.DomUtil.create("div", "info legend");
//       const grades = [
//         { label: "< 20", color: "purple" },
//         { label: "20 - 40", color: "blue" },
//         { label: "40 - 60", color: "teal" }, // blue-greenish
//         { label: "60 - 80", color: "lightgreen" },
//         { label: "80 - 100", color: "yellow" },
//       ];

//       div.style.background = "white";
//       div.style.padding = "10px";
//       div.style.borderRadius = "8px";
//       div.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
//       div.style.fontSize = "14px";
//       div.innerHTML = "<h6 style='margin:0 0 5px 0;'>Flood Depth (mm)</h6>";

//       grades.forEach((g) => {
//         div.innerHTML += `
//           <div style="display: flex; align-items: center; margin-bottom: 4px;">
//             <span style="
//               display: inline-block;
//               width: 18px;
//               height: 18px;
//               background:${g.color};
//               margin-right: 8px;
//               border: 1px solid #555;
//             "></span> ${g.label}
//           </div>
//         `;
//       });

//       return div;
//     };

//     legend.addTo(map);
//     return () => {
//       map.removeControl(legend);
//     };
//   }, [map]);

//   return null;
// }


// function MyMap({ location, rainfall, showFloodOverlay , route, safePoints}) {
//   const position = [location.lat, location.lng];

//   const bounds = [
//     [location.lat - 0.1, location.lng - 0.1],
//     [location.lat + 0.1, location.lng + 0.1],
//   ];

//   const floodImageUrl = "/simulation.gif";

//   return (
//     <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='© OpenStreetMap contributors'
//       />
//       <Marker position={position}>
//         <Popup>
//           <strong>{location.name}</strong>
//           <br />
//           Rainfall: {rainfall} mm
//         </Popup>
//       </Marker>

//       {/* Safe Points */}
//       {safePoints &&
//         safePoints.map((p, i) => (
//           <Marker key={i} position={[p.lat, p.lng]}>
//             <Popup>{p.name}</Popup>
//           </Marker>
//         ))}

//       {/* Route Polyline */}
//       {route && (
//         <Polyline
//           positions={route.coordinates.map(([lng, lat]) => [lat, lng])}
//           color="blue"
//           weight={5}
//         />
//       )}

//       {showFloodOverlay && (
//         <ImageOverlay url={floodImageUrl} bounds={bounds} opacity={0.6} />
//       )}
//       <Legend />
//     </MapContainer>
//   );
// }


// export default MyMap;






























import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ImageOverlay,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Legend from "./Legend";
import MapResizer from "./MapResizer";




function MyMap({ location, rainfall, showFloodOverlay, route, safePoints, selectedSafePoint, sidebarOpen }) {
  const position = [location.lat, location.lng];
  const bounds = [
    [location.lat - 0.1, location.lng - 0.1],
    [location.lat + 0.1, location.lng + 0.1],
  ];

  const [gifurl, setGifurl] = React.useState(null);
  const endpoint = "http://localhost:5000/flood/generate_gif";
  // const floodImageUrl = "/simulation.gif";
   
  const fetchFloodGif = async () => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch flood GIF.");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setGifurl(url);
    } catch (err) {
      alert("Failed to fetch flood Data");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFloodGif();
  }, []);

  return (
    <MapContainer center={position} zoom={20} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© OpenStreetMap contributors'
      />
{/* <Legend /> */}
{/* <MapResizer sidebarOpen={false} /> */}
<MapResizer sidebarOpen={sidebarOpen} />


      {/* Current location marker */}
      <Marker position={position}>
        <Popup>
          <strong>{location.name}</strong>
          <br />
          Rainfall: {rainfall} mm
        </Popup>
      </Marker>

      {/* Exit Points */}
      {/* {safePoints &&
        safePoints.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lng]}>
            <Popup>{p.name}</Popup>
          </Marker>
        ))} */}


 {/* Show ONLY the selected safe point */}
{selectedSafePoint && (
  <Marker position={[selectedSafePoint.lat, selectedSafePoint.lng]}>
    <Popup>{selectedSafePoint.name}</Popup>
  </Marker>
)}



      {/* Route Polyline */}
      {route && (
        <Polyline
          positions={route.coordinates.map(([lng, lat]) => [lat, lng])}
          color="blue"
          weight={5}
        />
      )}

      {/* Flood Overlay */}
      {showFloodOverlay && (
        <ImageOverlay url={gifurl} bounds={bounds} opacity={0.6} />
      )}

      <Legend />
    </MapContainer>
  );
}


export default MyMap;
