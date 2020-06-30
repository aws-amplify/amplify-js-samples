import Vue from 'vue';
import App from './App.vue';

import '@aws-amplify/ui-vue';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

Vue.config.productionTip = false;

Vue.config.devtools = true;

new Vue({
	render: h => h(App),
}).$mount('#app');
