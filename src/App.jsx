// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import DisasterSelector from "./components/DisasterSelector";
// import EarthquakePage from "./pages/EarthquakePage";
// import FloodPage from "./pages/FloodPage";
// import "./app.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const App = () => {
//   return (
//     <Router>
//       <div className="d-flex flex-column min-vh-100 w-100">
//         {/* Header */}
//         <header className="py-2 bg-primary text-white text-center shadow-sm">
//           <h2 className="m-0 fw-bold">🌍 Natural Disaster Simulation</h2>
//           <p className="m-0 small text-white-50">
//             Simulate and visualize disasters with interactive maps
//           </p>
//         </header>

//         {/* Dropdown always visible */}
//         <div className="py-3 bg-white border-bottom shadow-sm">
//           <div className="container-fluid px-4">
//             <DisasterSelector />
//           </div>
//         </div>

//         {/* Pages */}
//         <main className="flex-fill w-100 d-flex">
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <div className="d-flex justify-content-center align-items-center w-100">
//                   <h4 className="text-center text-muted">
//                     Please select a disaster to simulate ⬆️
//                   </h4>
//                 </div>
//               }
//             />
//             <Route path="/earthquake" element={<EarthquakePage />} />
//             <Route path="/flood" element={<FloodPage />} />
//           </Routes>
//         </main>

//         {/* Footer */}
//         <footer className="bg-dark text-white text-center py-3 mt-auto shadow-sm w-100">
//           <small>
//             © 2025 Disaster Simulation App | Built with OSM leaflet and React
//           </small>
//         </footer>
//       </div>
//     </Router>
//   );
// };

// export default App;





















import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import DisasterSelector from "./components/DisasterSelector";
import EarthquakePage from "./pages/EarthquakePage";
import FloodPage from "./pages/FloodPage";
import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      {/* Header */}
      <header className="py-3 bg-gradient text-white text-center shadow-sm" 
              style={{ 
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
              }}>
        <h2 className="m-0 fw-bold">🌍 Natural Disaster Simulation</h2>
        <p className="m-0 small opacity-75">
          Simulate and visualize disasters with interactive maps
        </p>
      </header>

      {/* Disaster Selector - Always visible */}
      <div className="py-4 bg-light border-bottom shadow-sm">
        <div className="container-fluid px-4">
          <DisasterSelector />
        </div>
      </div>

      {/* Main Content */}
      <main className={`flex-fill w-100 d-flex ${isHomePage ? 'align-items-center justify-content-center' : ''}`}>
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center p-5">
                <div className="mb-4">
                  <i className="fas fa-globe-americas" style={{ fontSize: "4rem", color: "#667eea" }}></i>
                </div>
                <h3 className="text-muted mb-3">Welcome to Disaster Simulation</h3>
                <p className="text-secondary mb-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
                  Select a natural disaster from the dropdown above to begin your interactive simulation. 
                  Visualize earthquake zones, flood patterns, and evacuation routes in real-time.
                </p>
                <div className="d-flex justify-content-center gap-4 mt-4">
                  <div className="text-center">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-2" style={{ width: "60px", height: "60px", margin: "0 auto" }}>
                      🌋
                    </div>
                    <small className="text-muted">Earthquake<br/>Simulation</small>
                  </div>
                  <div className="text-center">
                    <div className="bg-info bg-opacity-10 rounded-circle p-3 mb-2" style={{ width: "60px", height: "60px", margin: "0 auto" }}>
                      🌊
                    </div>
                    <small className="text-muted">Flood<br/>Simulation</small>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/earthquake" element={<EarthquakePage />} />
          <Route path="/flood" element={<FloodPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto shadow-sm w-100">
        <small>
          © 2025 Disaster Simulation App | Built with OSM Leaflet and React
        </small>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;