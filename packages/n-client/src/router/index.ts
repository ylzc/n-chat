import LoginPage from "@/views/Login.vue";
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/login',
		name: 'login',
		component: LoginPage,
		meta: {
			auth: false
		}
	},
	{
		path: '/create-space',
		name: 'create-space',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "create-space" */ '../views/CreateSpace.vue')
	}
];

const router = new VueRouter({
	routes
});

export default router
