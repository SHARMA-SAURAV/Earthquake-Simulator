import React from 'react';

const EarthquakeSimulation = ({
  simulateEarthquake,
  setSimulateEarthquake,
  magnitude,
  setMagnitude,
}) => {
  return (
    <div className="earthquake-container">
      <h2>Earthquake Simulation</h2>
      <label>
        <input
          type="checkbox"
          checked={simulateEarthquake}
          onChange={(e) => setSimulateEarthquake(e.target.checked)}
        />
        Enable Earthquake
      </label>
      <div className="form-group">
        <label htmlFor="magnitude">Magnitude (1-10)</label>
        <input
          type="range"
          id="magnitude"
          min="1"
          max="10"
          step="1"
          value={magnitude}
          onChange={(e) => setMagnitude(Number(e.target.value))}
          disabled={!simulateEarthquake}
        />
        <span>{magnitude}</span>
      </div>
    </div>
  );
};

export default EarthquakeSimulation;
