import { useEffect, useRef } from "react";
import { createMap } from "maplibre-gl-js-amplify";
import "maplibre-gl/dist/maplibre-gl.css";
import config from "./aws-exports";
import Amplify from "aws-amplify";
import "./App.css";

Amplify.configure(config);

function App() {
  const mapRef = useRef(null);

  useEffect(() => {
    let map;
    async function initializeMap() {
      if (mapRef.current != null) {
        map = await createMap({
          container: mapRef.current,
          center: [-122.431297, 37.773972],
          zoom: 11,
        });
      }
    }
    initializeMap();

    return function cleanup() {
      if (map != null) map.remove();
    };
  }, [mapRef]);

  return <div ref={mapRef} id="map" />;
}

export default App;
