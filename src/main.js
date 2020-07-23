import Vue from 'vue'
import App from './App.vue'
import router from "./router";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

function play(sound) {
  console.log("entering sound function");
  let audio = new Media(sound, onSuccess, onError);

  function onSuccess() {
      console.log("Success");
  }

  function onError(error) {
      console.log("Error:" + error.code);
  }

  audio.play();
}

console.log(play);