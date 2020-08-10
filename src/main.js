import Vue from 'vue'
import App from './App'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import i18n from './lang'
import store from './store'
import router from './router.js'

Vue.config.productionTip = false;


//定义一个时间过滤器
Vue.filter("FormatDate", function(value, fmt) {
	if(fmt==null){
		fmt='yyyy-MM-dd hh:mm:ss';
	}
	var getDate = new Date(value);
	var o = {
		'M+': getDate.getMonth() + 1,
		'd+': getDate.getDate(),
		'h+': getDate.getHours(),
		'm+': getDate.getMinutes(),
		's+': getDate.getSeconds(),
		'q+': Math.floor((getDate.getMonth() + 3) / 3),
		'S': getDate.getMilliseconds()
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
		}
	}
	return fmt;
});

Vue.use(ElementUI, {
	i18n: (key, value) => i18n.t(key, value)
})
new Vue({
	el: '#app',
	router,
	store,
	i18n,
	render: h => h(App)
})
