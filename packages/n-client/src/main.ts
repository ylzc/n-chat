import { Form } from "ant-design-vue";
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.prototype.$form = Form;

new Vue({
	router,
	store,
	render: (h: any) => h(App),
} as any).$mount('#app');
