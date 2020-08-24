import axios from 'axios'
import i18n from '../../lang/index.js'
import {
	MessageBox,
	Message
} from 'element-ui'
import store from '../../store/index.js'

const request = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	// headers: {
	// 	'content-type': 'application/x-www-form-urlencoded'
	// },
	timeout: 30000,
});

//请求拦截器
request.interceptors.request.use(req => {
		if (req.url.startsWith('/private')) {
			if (store.getters.sessionId == null) {
				console.log('User not logged in!');
				MessageBox.confirm(i18n.t('LoginTimeoutLoginAgain'), i18n.t('LoginTimeout'), {
					confirmButtonText: i18n.t('Confirm'),
					type: 'warning'
				}).then(() => {
					store.dispatch('app/logout');
					location.href = '#/login';
				});
				return Promise.reject(i18n.t('LoginTimeoutLoginAgain'))
			} else {
				req.headers['x-session']=store.getters.sessionId;
				return req;
			}
		} else {
			return req;
		}
	},
	error => {
		console.log(error)
		return Promise.reject(error)
	});

//响应拦截器
request.interceptors.response.use(res => {
		if (res.data.code==401) {
			MessageBox.confirm(i18n.t('LoginTimeoutLoginAgain'), i18n.t('LoginTimeout'), {
					confirmButtonText: i18n.t('Confirm'),
					type: 'warning'
				}).then(() => {
				store.dispatch('app/logout');
				location.href = '#/login';
			});
			return Promise.reject(i18n.t('LoginTimeoutLoginAgain'));
		} else {
			return res;
		}
	},
	error => {
		console.log(error)
		return Promise.reject(error);
	});

export default request
