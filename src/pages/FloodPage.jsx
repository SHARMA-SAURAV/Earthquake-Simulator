// import React, { useState, useEffect } from "react";
// import { Form, Button, Alert, Spinner } from "react-bootstrap";
// import MyMap from "../components/MyMap";
// import "../styles/FloodPage.css";
// // import MapResizer from "../components/MapResizer";

// const FloodPage = () => {
//   const [location, setLocation] = useState({ lat: null, lng: null, name: "" });
//   const [rainfall, setRainfall] = useState("");
//   const [error, setError] = useState("");
//   const [validated, setValidated] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [showFloodOverlay, setShowFloodOverlay] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const [safePoints, setSafePoints] = useState([]);
//   const [selectedSafePoint, setSelectedSafePoint] = useState(null);
//   const [route, setRoute] = useState(null);

//   // ✅ Generate safe exit points dynamically outside flood simulation
//   const generateSafePoints = (lat, lng) => {
//     const offset = 0.1; // move safe points further out (~10km away)
//     return [
//       { name: "North Exit", lat: lat + offset, lng: lng },
//       { name: "South Exit", lat: lat - offset, lng: lng },
//       { name: "East Exit", lat: lat, lng: lng + offset },
//       { name: "West Exit", lat: lat, lng: lng - offset },
//     ];
//   };


//   function generateExitPointsFromBounds(bounds) {
//   const [[south, west], [north, east]] = bounds;
//   return [
//     { name: "North Exit", lat: north + 0, lng: (west + east) / 2 },
//     { name: "South Exit", lat: south - 0, lng: (west + east) / 2 },
//     { name: "East Exit", lat: (north + south) / 2, lng: east + 0 },
//     { name: "West Exit", lat: (north + south) / 2, lng: west - 0 },
//   ];
// }



//   const getRoute = async (start, end) => {
//   try {
//     const url = `http://localhost:4000/api/route?startLat=${start.lat}&startLng=${start.lng}&endLat=${end.lat}&endLng=${end.lng}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     if (data.routes && data.routes.length > 0) {
//       setRoute(data.routes[0].geometry);
//     } else {
//       setError("❌ Could not find route to exit point.");
//     }
//   } catch (err) {
//     console.error("Routing error:", err);
//     setError("⚠️ Error fetching route.");
//   }
// };


//   const geocodeLocation = async (placeName) => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//           placeName
//         )}`
//       );
//       const data = await response.json();
//       if (data.length > 0) {
//         const { lat, lon, display_name } = data[0];
//         setLocation({
//           lat: parseFloat(lat),
//           lng: parseFloat(lon),
//           name: display_name,
//         });

//         const bounds = [
//   [parseFloat(lat) - 0.1, parseFloat(lon) - 0.1],
//   [parseFloat(lat) + 0.1, parseFloat(lon) + 0.1],
// ];
// setSafePoints(generateExitPointsFromBounds(bounds));

//         // setSafePoints(generateSafePoints(parseFloat(lat), parseFloat(lon)));
//         setError("");
//       } else {
//         setError("❌ Location not found. Please try again.");
//       }
//     } catch (err) {
//       console.error("Error fetching location:", err);
//       setError("⚠️ Error while fetching location data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     if (!location.name.trim()) {
//       setError("Please enter a place name.");
//       return;
//     }
//     await geocodeLocation(location.name);
//   };

//   const submitFloodData = async () => {
//     if (!location.lat || !location.lng) {
//       setError("Please geocode a place first.");
//       return;
//     }
//     if (!rainfall) {
//       setError("Please enter rainfall amount.");
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:4000/api/flood-data", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           lat: location.lat,
//           lng: location.lng,
//           rainfall,
//           name: location.name,
//         }),
//       });
//       const result = await response.json();
//       if (response.ok) {
//         setSuccessMsg("✅ " + result.message);
//         setError("");
//         setShowFloodOverlay(true);
//       } else {
//         setError(result.error || "❌ Failed to submit flood data.");
//       }
//     } catch (err) {
//       console.error("Error submitting data:", err);
//       setError("⚠️ Error connecting to the server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Recalculate route when exit point selected
//   useEffect(() => {
//     if (selectedSafePoint && location.lat && location.lng) {
//       getRoute(location, selectedSafePoint);
//     }
//   }, [selectedSafePoint, location]);

//   return (
//     <div className="flood-page">
//       {/* Sidebar */}
//       <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
//         <button
//           className="toggle-btn"
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//         >
//           {sidebarOpen ? "☰" : "☰"}
//         </button>

//         {sidebarOpen && (
//           <div className="sidebar-content">
//             <h2 className="text-primary">🌊 Flood Simulation</h2>
//             <p className="text-muted">
//               Enter a location and rainfall data to simulate flooding.
//             </p>

//             {/* ✅ Current Location Button */}
//             <Button
//               variant="outline-secondary"
//               className="mb-3 w-100"
//               // onClick={async () => {
//               //   if (navigator.geolocation) {
//               //     navigator.geolocation.getCurrentPosition(
//               //       (position) => {
//               //         const lat = position.coords.latitude;
//               //         const lng = position.coords.longitude;
//               //         setLocation({ lat, lng, name: "Current Location" });
//               //         setSafePoints(generateSafePoints(lat, lng));
//               //         setError("");
//               //       },
//               //       (err) => {
//               //         console.error("Geolocation error:", err);
//               //         setError("⚠️ Unable to retrieve your location.");
//               //       },
//               //       { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//               //     );
//               //   } else {
//               //     setError("⚠️ Geolocation not supported in this browser.");
//               //   }
//               // }}

// onClick={async () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;
//         setLocation({ lat, lng, name: "Current Location" });

//         // Create bounds around current location
//         const bounds = [
//           [lat - 0.1, lng - 0.1],
//           [lat + 0.1, lng + 0.1],
//         ];
//         setSafePoints(generateExitPointsFromBounds(bounds));

//         setError("");
//       },
//       (err) => {
//         console.error("Geolocation error:", err);
//         setError("⚠️ Unable to retrieve your location.");
//       },
//       { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//     );
//   } else {
//     setError("⚠️ Geolocation not supported in this browser.");
//   }
// }}



// >
//               📍 Use Current Location
//             </Button>

//             {/* Form Inputs */}
//             <Form noValidate validated={validated}>
//               <Form.Group className="mb-3">
//                 <Form.Label>📍 Place Name</Form.Label>
//                 <Form.Control
//                   required
//                   type="text"
//                   placeholder="Enter Place Name"
//                   value={location.name}
//                   onChange={(e) =>
//                     setLocation({ ...location, name: e.target.value })
//                   }
//                   isInvalid={validated && !location.name.trim()}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>🌧️ Rainfall Amount (mm)</Form.Label>
//                 <Form.Control
//                   required
//                   type="number"
//                   placeholder="Enter Rainfall"
//                   value={rainfall}
//                   onChange={(e) => setRainfall(e.target.value)}
//                   min="0"
//                   isInvalid={validated && !rainfall}
//                 />
//               </Form.Group>

//               <Button
//                 variant="primary"
//                 className="w-100 mb-2"
//                 onClick={async () => {
//                   await handleSearch();
//                   submitFloodData();
//                 }}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <Spinner animation="border" size="sm" /> Processing...
//                   </>
//                 ) : (
//                   "🌊 Geocode & Simulate Flood"
//                 )}
//               </Button>
//             </Form>

//             {error && <Alert variant="danger">{error}</Alert>}
//             {successMsg && <Alert variant="success">{successMsg}</Alert>}

//             {/* ✅ Safe Points Dropdown */}
//             {safePoints.length > 0 && (
//               <Form.Select
//                 className="mt-3"
//                 onChange={(e) =>
//                   setSelectedSafePoint(safePoints[e.target.value])
//                 }
//               >
//                 <option value="">Select Exit Point</option>
//                 {safePoints.map((p, idx) => (
//                   <option key={idx} value={idx}>
//                     {p.name} ({p.lat.toFixed(4)}, {p.lng.toFixed(4)})
//                   </option>
//                 ))}
//               </Form.Select>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Map Section */}
//       <div className="map-container">
//         {location.lat && location.lng ? (
//           <MyMap
//             location={location}
//             rainfall={rainfall}
//             showFloodOverlay={showFloodOverlay}
//             route={route}
//             safePoints={safePoints}
//             selectedSafePoint={selectedSafePoint}
//             sidebarOpen={sidebarOpen}
//           />


//         ) : (
//           <div className="placeholder">
//             <h4>🗺️ Map Preview</h4>
//             <p>Enter details in sidebar and simulate flood</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FloodPage;






























import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner, Card, Row, Col } from "react-bootstrap";
import MyMap from "../components/MyMap";
import "../styles/FloodPage.css";

const FloodPage = () => {
  const [location, setLocation] = useState({ lat: null, lng: null, name: "" });
  const [rainfall, setRainfall] = useState("");
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showFloodOverlay, setShowFloodOverlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [simulationStarted, setSimulationStarted] = useState(false);

  const [safePoints, setSafePoints] = useState([]);
  const [selectedSafePoint, setSelectedSafePoint] = useState(null);
  const [route, setRoute] = useState(null);

  const generateExitPointsFromBounds = (bounds) => {
    const [[south, west], [north, east]] = bounds;
    const offset = 0.05; // Reduced offset for better visibility
    return [
      { name: "North Safe Zone", lat: north + offset, lng: (west + east) / 2 },
      { name: "South Safe Zone", lat: south - offset, lng: (west + east) / 2 },
      { name: "East Safe Zone", lat: (north + south) / 2, lng: east + offset },
      { name: "West Safe Zone", lat: (north + south) / 2, lng: west - offset },
    ];
  };

  const getRoute = async (start, end) => {
    try {
      setError(""); // Clear previous errors
      const url = `http://localhost:4000/api/route?startLat=${start.lat}&startLng=${start.lng}&endLat=${end.lat}&endLng=${end.lng}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.routes && data.routes.length > 0) {
        setRoute(data.routes[0].geometry);
        setSuccessMsg("Route calculated successfully!");
      } else {
        setError("Could not find route to exit point.");
      }
    } catch (err) {
      console.error("Routing error:", err);
      setError("Error fetching route. Please try again.");
    }
  };

  const geocodeLocation = async (placeName) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          placeName
        )}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newLocation = {
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          name: display_name || placeName,
        };
        setLocation(newLocation);

        const bounds = [
          [parseFloat(lat) - 0.1, parseFloat(lon) - 0.1],
          [parseFloat(lat) + 0.1, parseFloat(lon) + 0.1],
        ];
        setSafePoints(generateExitPointsFromBounds(bounds));
        setSuccessMsg("Location found successfully!");
      } else {
        setError("Location not found. Please try a different name.");
      }
    } catch (err) {
      console.error("Error fetching location:", err);
      setError("Error while fetching location data.");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const newLocation = { lat, lng, name: "Current Location" };
          setLocation(newLocation);

          const bounds = [
            [lat - 0.1, lng - 0.1],
            [lat + 0.1, lng + 0.1],
          ];
          setSafePoints(generateExitPointsFromBounds(bounds));
          setError("");
          setSuccessMsg("Current location detected!");
          setLoading(false);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Unable to retrieve your location.");
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation not supported in this browser.");
    }
  };

  const startFloodSimulation = async () => {
    if (!location.lat || !location.lng) {
      setError("Please set a location first.");
      return;
    }
    if (!rainfall || rainfall <= 0) {
      setError("Please enter a valid rainfall amount.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Simulate API call (replace with your actual endpoint)
      const response = await fetch("http://localhost:4000/api/flood-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: location.lat,
          lng: location.lng,
          rainfall,
          name: location.name,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMsg("Flood simulation started successfully!");
        setShowFloodOverlay(true);
        setSimulationStarted(true);
      } else {
        setError(result.error || "Failed to start flood simulation.");
      }
    } catch (err) {
      console.error("Error starting simulation:", err);
      // For demo purposes, still show the simulation
      setSuccessMsg("Flood simulation started (offline mode)!");
      setShowFloodOverlay(true);
      setSimulationStarted(true);
    } finally {
      setLoading(false);
    }
  };

  const resetSimulation = () => {
    setShowFloodOverlay(false);
    setSimulationStarted(false);
    setSelectedSafePoint(null);
    setRoute(null);
    setSuccessMsg("");
    setError("");
  };

  // Recalculate route when exit point selected
  useEffect(() => {
    if (selectedSafePoint && location.lat && location.lng) {
      getRoute(location, selectedSafePoint);
    }
  }, [selectedSafePoint, location]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  return (
    <div className="flood-page">
      {/* Improved Sidebar */}
      <div className={`flood-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <Button
          variant="outline-primary"
          size="sm"
          className="toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "◀" : "▶"}
        </Button>

        <div className={`sidebar-content ${sidebarOpen ? 'visible' : 'hidden'}`}>
          {sidebarOpen && (
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">🌊 Flood Simulation Control</h5>
              </Card.Header>
              <Card.Body>
                <p className="text-muted small mb-3">
                  Configure location and rainfall parameters for flood simulation
                </p>

                {/* Location Section */}
                <div className="mb-4">
                  <h6 className="text-primary mb-3">📍 Location Setup</h6>

                  <Button
                    variant="outline-info"
                    className="w-100 mb-3"
                    onClick={getCurrentLocation}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Getting Location...
                      </>
                    ) : (
                      "📍 Use Current Location"
                    )}
                  </Button>

                  <div className="text-center mb-2">
                    <small className="text-muted">OR</small>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label>Place Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter city, address, or landmark"
                      value={location.name}
                      onChange={(e) =>
                        setLocation({ ...location, name: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Button
                    variant="outline-primary"
                    className="w-100 mb-3"
                    onClick={() => geocodeLocation(location.name)}
                    disabled={loading || !location.name.trim()}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Searching...
                      </>
                    ) : (
                      "🔍 Search Location"
                    )}
                  </Button>
                </div>

                {/* Rainfall Section */}
                <div className="mb-4">
                  <h6 className="text-primary mb-3">🌧️ Rainfall Configuration</h6>
                  <Form.Group className="mb-3">
                    <Form.Label>Rainfall Amount (mm)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter rainfall in mm"
                      value={rainfall}
                      onChange={(e) => setRainfall(e.target.value)}
                      min="0"
                      max="1000"
                    />
                    <Form.Text className="text-muted">
                      Typical heavy rain: 50-100mm, Extreme: 200mm+
                    </Form.Text>
                  </Form.Group>
                </div>

                {/* Simulation Controls */}
                <div className="mb-4">
                  <h6 className="text-primary mb-3">🎮 Simulation Controls</h6>
                  <Row className="g-2">
                    <Col>
                      <Button
                        variant="success"
                        className="w-100"
                        onClick={startFloodSimulation}
                        disabled={loading || !location.lat || !rainfall}
                      >
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Starting...
                          </>
                        ) : (
                          "▶️ Start Simulation"
                        )}
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="outline-secondary"
                        className="w-100"
                        onClick={resetSimulation}
                        disabled={!simulationStarted}
                      >
                        🔄 Reset
                      </Button>
                    </Col>
                  </Row>
                </div>

                {/* Exit Points Section */}
                {safePoints.length > 0 && simulationStarted && (
                  <div className="mb-3">
                    <h6 className="text-success mb-3">🚪 Emergency Exit Points</h6>
                    <Form.Select
                      onChange={(e) => {
                        const index = parseInt(e.target.value);
                        setSelectedSafePoint(isNaN(index) ? null : safePoints[index]);
                      }}
                      value={selectedSafePoint ? safePoints.indexOf(selectedSafePoint) : ""}
                    >
                      <option value="">Select evacuation route</option>
                      {safePoints.map((point, idx) => (
                        <option key={idx} value={idx}>
                          {point.name} ({point.lat.toFixed(3)}, {point.lng.toFixed(3)})
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                )}

                {/* Status Messages */}
                {error && (
                  <Alert variant="danger" className="mb-3" dismissible onClose={() => setError("")}>
                    {error}
                  </Alert>
                )}
                {successMsg && (
                  <Alert variant="success" className="mb-3" dismissible onClose={() => setSuccessMsg("")}>
                    {successMsg}
                  </Alert>
                )}

                {/* Current Status */}
                {location.lat && location.lng && (
                  <Card className="bg-light border-0 mt-3">
                    <Card.Body className="p-3">
                      <h6 className="text-success mb-2">✅ Current Configuration</h6>
                      <small className="d-block text-muted">
                        <strong>Location:</strong> {location.name || "Custom Location"}
                      </small>
                      <small className="d-block text-muted">
                        <strong>Coordinates:</strong> {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                      </small>
                      {rainfall && (
                        <small className="d-block text-muted">
                          <strong>Rainfall:</strong> {rainfall}mm
                        </small>
                      )}
                    </Card.Body>
                  </Card>
                )}
              </Card.Body>
            </Card>
          )}
          </div>
      </div>

      {/* Map Section */}
      <div className="map-container">
        {location.lat && location.lng ? (
          <MyMap
            location={location}
            rainfall={rainfall}
            showFloodOverlay={showFloodOverlay}
            route={route}
            safePoints={safePoints}
            selectedSafePoint={selectedSafePoint}
            sidebarOpen={sidebarOpen}
          />
        ) : (
          <div className="map-placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">🗺️</div>
              <h4>Flood Simulation Map</h4>
              <p className="text-muted">
                Configure your location and rainfall parameters in the sidebar to begin the simulation
              </p>
              <div className="placeholder-steps">
                <div className="step">
                  <span className="step-number">1</span>
                  <span>Set Location</span>
                </div>
                <div className="step">
                  <span className="step-number">2</span>
                  <span>Enter Rainfall</span>
                </div>
                <div className="step">
                  <span className="step-number">3</span>
                  <span>Start Simulation</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloodPage;