// import React from 'react';
// import FloodSimualation from './FloodSimualation';

// const EarthquakeSimulation = ({
//   simulateEarthquake,
//   setSimulateEarthquake,
//   magnitude,
//   setMagnitude,
// }) => {

//   return (
//     <div className="earthquake-container">
//       <h2>Earthquake Simulation</h2>
//       <label>
//         <input
//           type="checkbox"
//           checked={simulateEarthquake}
//           onChange={(e) => setSimulateEarthquake(e.target.checked)}
//         />
//         Enable Earthquake
//       </label>
//       <div className="form-group">
//         <label htmlFor="magnitude">Magnitude (1-10)</label>
//         <input
//           type="range"
//           id="magnitude"
//           min="1"
//           max="10"
//           step="1"
//           value={magnitude}
//           onChange={(e) => setMagnitude(Number(e.target.value))}
//           disabled={!simulateEarthquake}
//         />
//         <span>{magnitude}</span>
//       </div>
//     </div>
//   );
// };

// export default EarthquakeSimulation;











import React from 'react';
import { Form, Badge, Row, Col } from 'react-bootstrap';

const EarthquakeSimulation = ({
  simulateEarthquake,
  setSimulateEarthquake,
  magnitude,
  setMagnitude,
}) => {
  
  const getMagnitudeColor = (mag) => {
    if (mag <= 3) return 'success';
    if (mag <= 5) return 'warning';
    if (mag <= 7) return 'danger';
    return 'dark';
  };

  const getMagnitudeDescription = (mag) => {
    if (mag <= 2) return 'Micro';
    if (mag <= 3) return 'Minor';
    if (mag <= 5) return 'Light';
    if (mag <= 6) return 'Moderate';
    if (mag <= 7) return 'Strong';
    if (mag <= 8) return 'Major';
    return 'Great';
  };

  return (
    <div className="earthquake-simulation-container">
      <h6 className="text-primary mb-3">Earthquake Parameters</h6>
      
      {/* Enable/Disable Toggle */}
      <Form.Check 
        type="switch"
        id="earthquake-switch"
        label="Enable Earthquake Simulation"
        checked={simulateEarthquake}
        onChange={(e) => setSimulateEarthquake(e.target.checked)}
        className="mb-4"
      />
      
      {simulateEarthquake && (
        <div className="magnitude-controls">
          <Form.Group>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Form.Label className="mb-0">
                Magnitude
              </Form.Label>
              <Badge 
                bg={getMagnitudeColor(magnitude)} 
                className="px-3 py-2"
                style={{ fontSize: '0.9rem' }}
              >
                {magnitude} - {getMagnitudeDescription(magnitude)}
              </Badge>
            </div>
            
            <Form.Range
              min="1"
              max="10"
              step="0.5"
              value={magnitude}
              onChange={(e) => setMagnitude(Number(e.target.value))}
              className="mb-3"
            />
            
            {/* Quick magnitude presets */}
            <Row className="g-2">
              <Col>
                <button
                  type="button"
                  className={`btn btn-sm w-100 ${magnitude === 3 ? 'btn-warning' : 'btn-outline-secondary'}`}
                  onClick={() => setMagnitude(3)}
                >
                  Light (3.0)
                </button>
              </Col>
              <Col>
                <button
                  type="button"
                  className={`btn btn-sm w-100 ${magnitude === 5 ? 'btn-warning' : 'btn-outline-secondary'}`}
                  onClick={() => setMagnitude(5)}
                >
                  Moderate (5.0)
                </button>
              </Col>
              <Col>
                <button
                  type="button"
                  className={`btn btn-sm w-100 ${magnitude === 7 ? 'btn-danger' : 'btn-outline-secondary'}`}
                  onClick={() => setMagnitude(7)}
                >
                  Strong (7.0)
                </button>
              </Col>
            </Row>
            
            <div className="mt-3 p-2 bg-light rounded">
              <small className="text-muted">
                <strong>Impact Radius:</strong> ~{(magnitude * 1000).toLocaleString()} meters
              </small>
            </div>
          </Form.Group>
        </div>
      )}
      
      {!simulateEarthquake && (
        <div className="text-center p-3">
          <small className="text-muted">
            Enable earthquake simulation to configure parameters
          </small>
        </div>
      )}
    </div>
  );
};

export default EarthquakeSimulation;