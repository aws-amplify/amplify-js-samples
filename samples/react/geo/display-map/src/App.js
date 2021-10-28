import { useEffect, useRef } from "react";
import { createMap } from "maplibre-gl-js-amplify";
import "maplibre-gl/dist/maplibre-gl.css";
import config from "./aws-exports";
import Amplify from "aws-amplify";
import "./App.css";

Amplify.configure(config);

function App() {
  const mapRef = useRef(null); // Reference to the map DOM element

  // Wrapping our code in a useEffect allows us to run initializeMap after the div has been rendered into the DOM
  useEffect(() => {
    let map;
    async function initializeMap() {
      // We only want to initialize the underlying maplibre map after the div has been rendered
      if (mapRef.current != null) {
        map = await createMap({
          container: mapRef.current,
          center: [-122.431297, 37.773972],
          zoom: 11,
        });
      }
    }
    initializeMap();

    // Cleans up and maplibre DOM elements and other resources - https://maplibre.org/maplibre-gl-js-docs/api/map/#map#remove
    return function cleanup() {
      if (map != null) map.remove();
    };
  }, []);

  return <div ref={mapRef} id="map" />;
}

export default App;
