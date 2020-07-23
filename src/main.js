import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import soundlib from "./soundlib";

Vue.config.productionTip = false

document.addEventListener('deviceready', () => {
	console.log('Device ready event fired!');

	/*global Media:writable */

	new Vue({
		router,
		methods: {
			play: function (track) {
				const result = soundlib.sounds.filter(function (elem) {
					if (elem.name == track) return elem;
				});

				let audio = new Media(result[0].src, onSuccess, onError);

				function onSuccess() {
					console.log("Success");
				}
				
				function onError(error) {
					console.log("Error:" + error.code);
				}
				
				audio.play();
			}
		},
		render: h => h(App)
	}).$mount('#app')

});