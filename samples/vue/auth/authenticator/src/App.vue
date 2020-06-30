<template>
	<div>
		<amplify-container v-if="authState !== 'signedin'">
			<amplify-authenticator></amplify-authenticator>
		</amplify-container>
		<div id="app" v-if="authState === 'signedin' && user" class="App">
			<div class="App-header">Hello, {{ user.username }}</div>
			<HelloWorld msg="Welcome to Your Vue.js App" />
			<amplify-sign-out></amplify-sign-out>
		</div>
	</div>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue';
import { onAuthUIStateChange } from '@aws-amplify/ui-components';

export default {
	name: 'Authenticator',
	components: {
		HelloWorld,
	},
	created() {
		onAuthUIStateChange((authState, authData) => {
			this.authState = authState;
			this.user = authData;
		});
	},
	data() {
		return {
			user: undefined,
			authState: undefined,
		};
	},
	beforeDestroy() {
		return onAuthUIStateChange;
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
