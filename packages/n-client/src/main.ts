import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import { validateOrReject } from 'class-validator';
import isObject from 'lodash/isObject'
import { classToPlain } from 'class-transformer'

Vue.config.productionTip = false;

axios.defaults.baseURL = '/api';

axios.interceptors.request.use(
	async (v) => {
		if (isObject(v.data)) {
			const e = await validateOrReject(v.data);
			v.data = classToPlain(v.data);
		}
		if (isObject(v.params)) {
			await validateOrReject(v.params);
			v.params = classToPlain(v.params);
		}
		v.headers.access_token = localStorage.access_token;
		return v;
	},
	(error) => {
		return Promise.reject(error);
	}
);

router.beforeEach(async (to, from, next) => {
	try {
		if (to.meta.auth !== false) {
			const {data} = await axios.post('/check-token');
			store.commit('setId', data.id);
		}
		next()
	} catch (e) {
		await router.replace('/login')
	}
});

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
