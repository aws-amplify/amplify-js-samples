<template>
  <div id="app">
    <amplify-authenticator>
      <div v-if="authState === 'signedin' && user">
        <div>Hello, {{user.attributes.email}}</div>
        <amplify-sign-out @click="signOut()"></amplify-sign-out>
      </div>
      <S3browser/>
    </amplify-authenticator>
  </div>
</template>

<script>
import S3browser from './components/s3browser.vue'
import { onAuthUIStateChange } from '@aws-amplify/ui-components'
import { Auth } from 'aws-amplify';
export default {
  name: 'App',
  components: {
    S3browser
  },
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    })
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined
    }
  },
  beforeDestroy() {
    this.unsubscribeAuth();
  },
  methods:{
    async signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
  }
}
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
