import { useEffect } from 'react';
import { createMap } from 'maplibre-gl-js-amplify';
import 'maplibre-gl/dist/maplibre-gl.css';
import config from './aws-exports';
import Amplify from 'aws-amplify';
import './App.css';

Amplify.configure(config);

function App() {
	useEffect(() => {
		async function initializeMap() {
			await createMap({
				container: 'map',
				center: [-122.431297, 37.773972],
				zoom: 11,
			});
		}
		initializeMap();
	}, []);

	return <div id="map" />;
}

export default App;
