import { useEffect } from 'react';
import { createMap, AmplifyGeofenceControl } from 'maplibre-gl-js-amplify';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import 'maplibre-gl/dist/maplibre-gl.css';
import config from './aws-exports';
import Amplify from 'aws-amplify';
import './App.css';
import '@aws-amplify/ui/dist/style.css';

Amplify.configure(config);

function App() {
	useEffect(() => {
		async function initializeMap() {
			const map = await createMap({
				container: 'map',
				center: [-122.431297, 37.773972],
				zoom: 11,
			});

			const control = new AmplifyGeofenceControl();
			map.addControl(control);

			map.on('idle', function() {
				if (window.Cypress) {
					window.map = map; // Add map to window so that our tests have access to the maplibre map
					window.appReady = true; // Signal to cypress test runner to start
				}
			});
		}
		initializeMap();
	}, []);

	return <div id="map" />;
}

export default withAuthenticator(App);
