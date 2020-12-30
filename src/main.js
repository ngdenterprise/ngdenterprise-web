import { createApp } from 'vue'
import App from './App.vue'
import VueMq from 'vue3-mq'

createApp(App)
	.use(VueMq, {
		breakpoints: {
			mobile: 992,
			pc: Infinity
		},
		defaultBreakpoint: 'mobile',
	})
	.mount('#app')