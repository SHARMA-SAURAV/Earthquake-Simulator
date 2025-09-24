

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Form } from "react-bootstrap";

// const DisasterSelector = () => {
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const value = e.target.value;
//     if (value) navigate(value);
//   };

//   return (
//     <div className="d-flex justify-content-center">
//       <Form.Select
//         aria-label="Select Natural Disaster"
//         onChange={handleChange}
//         defaultValue=""
//         className="shadow-sm rounded-3 w-50 text-center border-primary"
//       >
//         <option value="">🌍 Select Natural Disaster</option>
//         <option value="/earthquake">🌋 Earthquake</option>
//         <option value="/flood">🌊 Flood</option>
//       </Form.Select>
//     </div>
//   );
// };

// export default DisasterSelector;












import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

const DisasterSelector = () => {
  const navigate = useNavigate();
  const [selectedDisaster, setSelectedDisaster] = useState("");

  const handleSelectionChange = (e) => {
    setSelectedDisaster(e.target.value);
  };

  const handleSimulate = () => {
    if (selectedDisaster) {
      navigate(selectedDisaster);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Row className="w-100" style={{ maxWidth: "600px" }}>
        <Col md={8}>
          <Form.Select
            aria-label="Select Natural Disaster"
            onChange={handleSelectionChange}
            value={selectedDisaster}
            className="shadow-sm rounded-3 text-center border-primary"
            style={{ fontSize: "1.1rem", padding: "12px" }}
          >
            <option value="">🌍 Select Natural Disaster</option>
            <option value="/earthquake">🌋 Earthquake</option>
            <option value="/flood">🌊 Flood</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Button
            variant="primary"
            onClick={handleSimulate}
            disabled={!selectedDisaster}
            className="w-100 shadow-sm rounded-3"
            style={{ fontSize: "1.1rem", padding: "12px" }}
          >
            Start Simulation
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DisasterSelector;