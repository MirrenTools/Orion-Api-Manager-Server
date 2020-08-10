import request from './utils/request'
import qs from "qs"



/**
 * 登录
 * @param {Object} data:id,pwd
 * @param {Function} res
 * @param {Function} err
 * @description  进行登录
 */
export function apiLogin(data, res, err) {
	request.post('/login', qs.stringify(data)).then(res).catch(err);
}
/**
 * 退出登录
 * @param {Object} data:SessionId
 * @param {Object} res
 * @param {Object} err
 */
export function apiLogout(data, res, err) {
	request.post('/logout', qs.stringify(data)).then(res).catch(err);
}
