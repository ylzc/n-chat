import { Form } from "ant-design-vue";
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import { validateOrReject } from 'class-validator';
import isObject from 'lodash/isObject'
import { classToPlain } from 'class-transformer'

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://127.0.0.1:3000';

axios.interceptors.request.use(
	async (v) => {
		if (isObject(v.data)) {
			await validateOrReject(v.data);
			v.data = classToPlain(v.data);
		}
		if (isObject(v.params)) {
			await validateOrReject(v.params);
			v.params = classToPlain(v.params);
		}
		return v;
	},
	(error) => {
		return Promise.reject(error);
	}
);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
