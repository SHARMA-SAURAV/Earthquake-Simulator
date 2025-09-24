import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // install with: npm install node-fetch

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Store only the latest flood data
let currentFloodData = null;

// POST: Save flood data
app.post("/api/flood-data", (req, res) => {
  const { lat, lng, rainfall, name } = req.body;
  if (lat == null || lng == null || rainfall == null) {
    return res
      .status(400)
      .json({ error: "Latitude, Longitude, Place Name, and Rainfall are required." });
  }

  currentFloodData = { lat, lng, name, rainfall };

  return res.json({
    message: "Flood data received successfully.",
    data: currentFloodData,
  });
});

// GET: Fetch current flood data
app.get("/api/flood-data", (req, res) => {
  if (!currentFloodData) {
    return res.status(404).json({ error: "No flood data available." });
  }
  return res.json({
    message: "Flood data retrieved successfully.",
    data: currentFloodData,
  });
});

// ✅ NEW: Proxy OSRM route request
app.get("/api/route", async (req, res) => {
  const { startLat, startLng, endLat, endLng } = req.query;

  if (!startLat || !startLng || !endLat || !endLng) {
    return res.status(400).json({ error: "Missing coordinates" });
  }

  const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;

  try {
    const response = await fetch(osrmUrl);
    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error("Error fetching route:", err);
    return res.status(500).json({ error: "Error fetching route" });
  }
});

// ✅ Accept /api/route/driving/:coords
// ✅ Accept profile (driving/walking/cycling) and coords
app.get("/api/route/:profile/:coords", async (req, res) => {
  try {
    const { profile, coords } = req.params; // coords like "lat1,lng1;lat2,lng2"
    const query = req.url.split("?")[1] || "";

    if (!["driving", "walking", "cycling"].includes(profile)) {
      return res.status(400).json({ error: "Unsupported profile" });
    }

    // Convert coords from lat,lng to lng,lat
    const fixedCoords = coords
      .split(";")
      .map((pair) => {
        const [lat, lng] = pair.split(",");
        return `${lng},${lat}`;
      })
      .join(";");

    // Sanitize query: remove empty hints
    const sanitizedQuery = query.replace(/hints=[^&]*(&|$)/, "");

    const osrmUrl = `https://router.project-osrm.org/route/v1/${profile}/${fixedCoords}${sanitizedQuery ? `?${sanitizedQuery}` : ""}`;

    const response = await fetch(osrmUrl);
    const data = await response.json();

    return res.json(data);
  } catch (err) {
    console.error("OSRM Proxy Error:", err);
    return res.status(500).json({ error: "Failed to fetch route" });
  }
});



const port = 4000;
app.listen(port, () =>
  console.log(`✅ Server listening on http://localhost:${port}`)
);
