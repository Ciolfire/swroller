import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import soundlib from "./soundlib";
import Rules from "./rules";

Vue.config.productionTip = false

document.addEventListener('deviceready', () => {
	console.info('[Device ready]');
	switch (true) {
		case navigator.language.includes("fr"):
			
			break;
		case navigator.language.includes("en"):
		default:
			break;
	} 

	// /*global Media:writable */
Vue.prototype.$rules = new Rules();

for (const key in soundlib.sounds) {
	const element = soundlib.sounds[key];
	window.plugins.NativeAudio.preloadSimple(element.name, element.src, function(){
	}, function(msg){
		console.log( 'error: ' + msg );
	});
}

	new Vue({
		router,
		methods: {
			play: function (track) {
				window.plugins.NativeAudio.play(track);
			}
		},
		render: h => h(App)
	}).$mount('#app')

});