import Vue from 'vue'
import Router from "vue-router";
import Home from './views/Home.vue'
import Dicer from './views/Dicer.vue'
import HelloWorld from './components/HelloWorld.vue'

Vue.use(Router);

export default new Router({
	routes: [
		{ 
			path: "/",
			name: "home",
			component: Home 
		},
		{ 
			path: "/dicer",
			name: "dicer",
			component: Dicer 
		},
		{ 
			path: "/hello",
			name: "Hello World",
			component: HelloWorld
		}
	]
})