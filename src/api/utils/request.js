import axios from 'axios'
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
				console.log('用户未登录!');
				MessageBox.confirm('登录超时,请重新登录!', '登录超时', {
					confirmButtonText: '确定',
					type: 'warning'
				}).then(() => {
					store.dispatch('app/logout');
					location.href = '#/login';
				});
				return Promise.reject('登录超时需要重新登录!')
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
			MessageBox.confirm('登录超时,请重新登录!', '登录超时', {
				confirmButtonText: '确定',
				type: 'warning'
			}).then(() => {
				store.dispatch('app/logout');
				location.href = '#/login';
			});
			return Promise.reject('登录超时需要重新登录!');
		} else {
			return res;
		}
	},
	error => {
		console.log(error)
		return Promise.reject(error);
	});

export default request
