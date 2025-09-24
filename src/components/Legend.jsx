import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
function Legend() {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize(); // ✅ fix tiles only after mount

    const legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend");
      div.style.background = "white";
      div.style.padding = "10px";
      div.style.borderRadius = "8px";
      div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
      div.style.fontSize = "14px";

      div.innerHTML = "<h6 style='margin:0 0 5px;'>Flood Depth (mm)</h6>";
      ["purple", "blue", "teal", "lightgreen", "yellow"].forEach((c, i) => {
        div.innerHTML += `
          <div style="margin-bottom:4px;">
            <span style="display:inline-block;width:18px;height:18px;background:${c};margin-right:5px;border:1px solid #ccc;"></span>
            ${["<20", "20-40", "40-60", "60-80", "80-100"][i]}
          </div>`;
      });
      return div;
    };

    legend.addTo(map);
    return () => map.removeControl(legend);
  }, [map]);

  return null;
}
export default Legend;