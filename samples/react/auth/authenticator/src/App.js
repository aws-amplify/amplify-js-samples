import React from 'react';
import './App.css';
import logo from './logo.svg';
import Amplify from 'aws-amplify';
import {
	AmplifyAuthenticator,
	AmplifyContainer,
	AmplifySignOut,
} from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => {
	const [authState, setAuthState] = React.useState();
	const [user, setUser] = React.useState();

	React.useEffect(() => {
		return onAuthUIStateChange((nextAuthState, authData) => {
			setAuthState(nextAuthState);
			setUser(authData);
		});
	}, []);

	return authState === AuthState.SignedIn && user ? (
		<div className="App">
			<header className="App-header">
				<div>Hello, {user.username}</div>
				<img src={logo} className="App-logo" alt="logo" />
				<AmplifySignOut />
			</header>
		</div>
	) : (
		<AmplifyContainer>
			<AmplifyAuthenticator />
		</AmplifyContainer>
	);
};

export default App;
