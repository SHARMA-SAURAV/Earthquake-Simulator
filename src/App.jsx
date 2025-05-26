import React, { useState } from 'react';
import EarthquakeSimulation from './components/EarthquakeSimulation';
import MapViewer from './components/MapViewer';

const App = () => {
  const [simulateEarthquake, setSimulateEarthquake] = useState(false);
  const [magnitude, setMagnitude] = useState(5);
  const [inputMode, setInputMode] = useState('coordinates'); // 'coordinates' or 'place'
  const [location, setLocation] = useState({ lat: null, lng: null, name: '' });
  const [error, setError] = useState('');

  const geocodeLocation = async (placeName) => {
    const apiKey = 'e22205f37ea44f4fb9a3931c3a6d47f5'; // Replace with OpenCage API key
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(placeName)}&key=${apiKey}`
      );
      if (!response.ok) throw new Error('Failed to fetch geolocation data.');

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setLocation({ lat, lng, name: placeName });
        setError('');
      } else {
        throw new Error('Location not found.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSimulate = () => {
    if (inputMode === 'coordinates' && (!location.lat || !location.lng)) {
      setError('Please provide valid latitude and longitude.');
    } else if (inputMode === 'place' && !location.name) {
      setError('Please provide a valid place name.');
    } else {
      setError('');
      setSimulateEarthquake(true);
    }
  };

  const toggleInputMode = () => {
    setInputMode((prev) => (prev === 'coordinates' ? 'place' : 'coordinates'));
    setLocation({ lat: null, lng: null, name: '' });
    setError('');
  };

  return (
    <div>
      <div className="section info-section">
        {/* <h1>Welcome to Earthquake Simulation</h1>
        <p>
          Simulate earthquake scenarios by providing specific location details or choosing a place
          by name. Analyze the affected zones and prepare evacuation routes.
        </p> */}
      </div>

      {/* Second Section */}
      <div className="content-section">
        <div className="content-container">
          {/* Left Column: Earthquake Simulation */}
          <div className="left-column">
            <EarthquakeSimulation
              simulateEarthquake={simulateEarthquake}
              setSimulateEarthquake={setSimulateEarthquake}
              magnitude={magnitude}
              setMagnitude={setMagnitude}
            />
          </div>

          {/* Right Column: Location Inputs */}
          <div className="right-column">
            {inputMode === 'coordinates' ? (
              <div>
                <label>Latitude:</label>
                <input
                  type="number"
                  placeholder="Enter Latitude"
                  onChange={(e) => setLocation({ ...location, lat: parseFloat(e.target.value) })}
                />
                <label>Longitude:</label>
                <input
                  type="number"
                  placeholder="Enter Longitude"
                  onChange={(e) => setLocation({ ...location, lng: parseFloat(e.target.value) })}
                />
              </div>
            ) : (
              <div>
                <label>Place Name:</label>
                <input
                  type="text"
                  placeholder="Enter Place Name"
                  onChange={(e) => setLocation({ ...location, name: e.target.value })}
                />
                <button onClick={() => geocodeLocation(location.name)}>Geocode</button>
              </div>
            )}
            <button onClick={toggleInputMode}>
              {inputMode === 'coordinates' ? 'Switch to Place Name' : 'Switch to Coordinates'}
            </button>
            <button onClick={handleSimulate}>Simulate Earthquake</button>
            {error && <p className="error">{error}</p>}
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <MapViewer
            simulateEarthquake={simulateEarthquake}
            magnitude={magnitude}
            location={location}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
