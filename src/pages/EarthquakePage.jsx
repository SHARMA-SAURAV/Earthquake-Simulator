import React, { useState } from "react";
import EarthquakeSimulation from "../components/EarthquakeSimulation";
import MapViewer from "../components/MapViewer";
import { Button, Form } from "react-bootstrap";
import "../styles/EarthquakePage.css";

const EarthquakePage = () => {
  const [simulateEarthquake, setSimulateEarthquake] = useState(false);
  const [magnitude, setMagnitude] = useState(5);
  const [inputMode, setInputMode] = useState("coordinates");
  const [location, setLocation] = useState({ lat: null, lng: null, name: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [routeDetails, setRouteDetails] = useState(null);

  const geocodeLocation = async (placeName) => {
    setLoading(true);
    const apiKey = "e22205f37ea44f4fb9a3931c3a6d47f5";
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          placeName
        )}&key=${apiKey}`
      );
      if (!response.ok) throw new Error("Failed to fetch geolocation data.");

      const data = await response.json();
      if (data.results?.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setLocation({ lat, lng, name: placeName });
        setError("");
      } else {
        throw new Error("Location not found.");
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSimulate = () => {
    if (inputMode === "coordinates" && (!location.lat || !location.lng)) {
      setError("Please provide valid latitude and longitude.");
    } else if (inputMode === "place" && !location.name) {
      setError("Please provide a valid place name.");
    } else {
      setError("");
      setSimulateEarthquake(false);
      setTimeout(() => setSimulateEarthquake(true), 0);
    }
  };

  return (
    <div className="earthquake-layout">
      {/* LEFT SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header">
          {/* <h5>⚙️ Controls</h5> */}
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "⏪" : "⏩"}
          </Button>
        </div>

        {sidebarOpen && (
          <div className="sidebar-body">
            <EarthquakeSimulation
              simulateEarthquake={simulateEarthquake}
              setSimulateEarthquake={setSimulateEarthquake}
              magnitude={magnitude}
              setMagnitude={setMagnitude}
            />

            {inputMode === "coordinates" ? (
              <>
                <Form.Group className="mt-3">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Latitude"
                    onChange={(e) =>
                      setLocation({
                        ...location,
                        lat: parseFloat(e.target.value),
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Longitude"
                    onChange={(e) =>
                      setLocation({
                        ...location,
                        lng: parseFloat(e.target.value),
                      })
                    }
                  />
                </Form.Group>
              </>
            ) : (
              <>
                <Form.Group className="mt-3">
                  <Form.Label>Place Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Place Name"
                    onChange={(e) =>
                      setLocation({ ...location, name: e.target.value })
                    }
                  />
                </Form.Group>
                <Button
                  variant="secondary"
                  className="mt-2"
                  onClick={() => geocodeLocation(location.name)}
                  disabled={loading}
                >
                  {loading ? "Fetching Place..." : "Geocode"}
                </Button>
              </>
            )}

            <div className="d-flex gap-2 mt-3">
              <Button
                variant="info"
                onClick={() =>
                  setInputMode(
                    inputMode === "coordinates" ? "place" : "coordinates"
                  )
                }
              >
                {inputMode === "coordinates"
                  ? "Switch to Place Name"
                  : "Switch to Coordinates"}
              </Button>
              <Button
                variant="success"
                onClick={handleSimulate}
                disabled={loading}
              >
                {loading ? "Simulating..." : "Simulate Earthquake"}
              </Button>
            </div>

            {error && <p className="text-danger mt-2">{error}</p>}
          </div>
        )}
      </div>

      {/* CENTER MAP */}
      <div className="map-container">
        <MapViewer
          simulateEarthquake={simulateEarthquake}
          magnitude={magnitude}
          location={location}
          setLoading={setLoading}
          setRouteDetails={setRouteDetails}
        />
      </div>
    </div>
  );
};

export default EarthquakePage;
