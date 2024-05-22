import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef(null);

  const initializeMap = () => {
    if (mapRef.current) {
      const map = L.map(mapRef.current).setView(
        [props.center.lat, props.center.lon],
        props.zoom
      );
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const marker = L.marker([props.center.lat, props.center.lon]).addTo(map);
      const circle = L.circle([props.center.lat, props.center.lon], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 500,
      }).addTo(map);

      const polygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047],
      ]).addTo(map);
    }
  };

  useEffect(() => {
    initializeMap();
  }, [props.center, props.zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
