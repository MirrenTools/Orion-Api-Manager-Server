import request from './utils/request'
import qs from "qs"



/**
 * @param {Object} data
 * @param {Function} res
 * @param {Function} err
 * @description  进行登录
 */
export function apiLogin(data, res, err) {
	request.post('/login', qs.stringify(data)).then(res).catch(err);
}
