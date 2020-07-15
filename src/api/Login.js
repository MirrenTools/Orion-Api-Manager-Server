import request from './utils/request'
import qs from "qs"


/**
 * @param {String} index
 * @param {String} value
 * @param {Function} res
 * @param {Function} err
 * @description 检查验证码是否正确
 */
export function apiCheckVerification(index, value, res, err) {
	return request.get('/verification/check?index=' + index + '&value=' + value).then(res).catch(err);
}

/**
 * @param {Object} data
 * @param {Function} res
 * @param {Function} err
 * @description  进行登录
 */
export function apiLogin(data, res, err) {
	request.post('/login', qs.stringify(data)).then(res).catch(err);
}
