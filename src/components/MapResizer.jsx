import React, { useEffect } from "react";
import { useMap } from "react-leaflet";


function MapResizer({ sidebarOpen }) {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300); // wait for sidebar transition
  }, [sidebarOpen, map]);

  return null;
}
export default MapResizer;