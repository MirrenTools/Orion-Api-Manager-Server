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
				MessageBox.confirm(i18n.t('ResultStatus401'), i18n.t('LoginTimeout'), {
					confirmButtonText: i18n.t('Confirm'),
					type: 'warning'
				}).then(() => {
					store.dispatch('app/logout');
					location.href = '#/login';
				});
				return Promise.reject(i18n.t('ResultStatus401'))
			} else {
				req.headers['x-session'] = store.getters.sessionId;
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
		var code = res.data.code;
		if (code == 200) {
			return res;
		}else if (code==202) {
			Message.success(i18n.t('ResultStatus202'));
			return res;
		} else if (code == 401) {
			MessageBox.confirm(i18n.t('ResultStatus401'), i18n.t('LoginTimeout'), {
				confirmButtonText: i18n.t('Confirm'),
				type: 'warning'
			}).then(() => {
				store.dispatch('app/logout');
				location.href = '#/login';
			});
			return Promise.reject(i18n.t('ResultStatus401'));
		} else if (code == 403) {
			MessageBox.confirm(i18n.t('ResultStatus403'), i18n.t('LoginTimeout'), {
				confirmButtonText: i18n.t('Confirm'),
				type: 'warning'
			}).then(() => {
				store.dispatch('app/logout');
				location.href = '#/login';
			});
			return Promise.reject(i18n.t('ResultStatus403'));
		} else if (code==412) {
			Message.warning(i18n.t('ResultStatus412'));
			return res;
		} else if (code==555) {
			Message.error(i18n.t('ResultStatus555'));
			return res;
		}else if (code==1001) {
			Message.error(i18n.t('ResultStatus1001'));
			return res;
		} else if (code==1002) {
			Message.error(i18n.t('ResultStatus1002'));
			return res;
		} else if (code==1003) {
			Message.error(i18n.t('ResultStatus1003'));
			return res;
		} else if (code==1010) {
			Message.error(i18n.t('ResultStatus1010'));
			return res;
		} else if (code==1011) {
			Message.error(i18n.t('ResultStatus1011'));
			return res;
		} else if (code==1100) {
			Message.error(i18n.t('ResultStatus1100'));
			return res;
		}else if (code==1101) {
			Message.error(i18n.t('ResultStatus1101'));
			return res;
		} else {
			Message.error(i18n.t('ResultStatus0'));
			return res;
		}
	},
	error => {
		console.log(error)
		return Promise.reject(error);
	});

export default request
