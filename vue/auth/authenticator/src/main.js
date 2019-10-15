import Vue from 'vue'
import App from './App.vue'

import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig);

Vue.use(AmplifyPlugin, AmplifyModules)

Vue.config.productionTip = false

Vue.config.devtools = true

new Vue({
  render: h => h(App),
}).$mount('#app')
