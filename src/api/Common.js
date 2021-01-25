import request from './utils/Request'

/**
 * 获取控制台配置信息
 * @param {Object} res
 * @param {Object} err
 */
export function getConsoleConfigAPI(res, err) {
	request.get('/config/console').then(res).catch(err);
}
