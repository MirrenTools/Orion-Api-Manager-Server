import request from './utils/request'
import qs from "qs"



/**
 * 获取项目列表
 * @param {Object} res
 * @param {Object} err
 */
export function findProjectListAPI(res, err) {
	request.get('/private/project').then(res).catch(err);
}

/**
 * 获取指定项目详情
 * @param {String} pid 项目的id
 * @param {Object} resLL
 * @param {Object} err
 */
export function getProjectAPI(pid, res, err) {
	request.get('/private/project/' + pid).then(res).catch(err);
}
/**
 * 保存项目
 * @param {Object} data 项目的信息
 * @param {Object} resLL
 * @param {Object} err
 */
export function saveProjectAPI(data, res, err) {
	request.post('/private/project/', qs.stringify(data)).then(res).catch(err);
}

/**
 * 导入项目保存
 * @param {Object} data 项目的信息,project:项目的json字符串
 * @param {Object} resLL
 * @param {Object} err
 */
export function saveProjectFronJsonAPI(data, res, err) {
	request.post('/private/project/fromJson', qs.stringify(data)).then(res).catch(err);
}

/**
 * 复制项目
 * @param {Object} pid 项目的id
 * @param {Object} resLL
 * @param {Object} err
 */
export function copyProjectAPI(pid, res, err) {
	request.post('/private/project/copy/' + pid).then(res).catch(err);
}

/**
 * 修改项目
 * @param {Object} data 项目的信息
 * @param {Object} resLL
 * @param {Object} err
 */
export function updateProjectAPI(data, res, err) {
	request.put('/private/project/', qs.stringify(data)).then(res).catch(err);
}
/**
 * 项目排序上移
 * @param {Object} pid 项目的id
 * @param {Object} resLL
 * @param {Object} err
 */
export function projectMoveUpAPI(pid, res, err) {
	request.put('/private/project/moveUp/' + pid).then(res).catch(err);
}
/**
 * 项目排序下移
 * @param {Object} pid 项目的id
 * @param {Object} res
 * @param {Object} err
 */
export function projectMoveDownAPI(pid, res, err) {
	request.put('/private/project/moveDown/' + pid).then(res).catch(err);
}
/**
 * 删除项目
 * @param {Object} pid 项目的id
 * @param {Object} res
 * @param {Object} err
 */
export function deleteProjectAPI(pid, res, err) {
	request.delete('/private/project/' + pid).then(res).catch(err);
}

/**
 * 获取分组列表
 * @param {Object} pid 项目的id
 * @param {Object} res
 * @param {Object} err
 */
export function findGroupsByProjectId(pid, res, err) {
	request.get('/private/project/apiGroup/' + pid).then(res).catch(err);
}
/**
 * 新建分组
 * @param {Object} data 分组信息
 * @param {Object} res
 * @param {Object} err
 */
export function saveApiGroup(data, res, err) {
	request.post('/private/apiGroup', qs.stringify(data)).then(res).catch(err);
}
/**
 * 修改分组
 * @param {Object} data 分组信息
 * @param {Object} res
 * @param {Object} err
 */
export function putApiGroup(data, res, err) {
	request.put('/private/apiGroup', qs.stringify(data)).then(res).catch(err);
}
/**
 * 接口分组排序上移
 * @param {Object} gid 分组的id
 * @param {Object} res
 * @param {Object} err
 */
export function apiGroupMoveUpAPI(gid, res, err) {
	request.put('/private/apiGroup/moveUp/' + gid).then(res).catch(err);
}
/**
 * 接口分组排序下移
 * @param {Object} gid 分组的id
 * @param {Object} res
 * @param {Object} err
 */
export function apiGroupMoveDownAPI(gid, res, err) {
	request.put('/private/apiGroup/moveDown/' + gid).then(res).catch(err);
}

/**
 * 删除分组
 * @param {Object} gid 分组的id
 * @param {Object} res
 * @param {Object} err
 */
export function daleteApiGroup(gid, res, err) {
	request.delete('/private/apiGroup/' + gid).then(res).catch(err);
}
/**
 * 获取指定API
 * @param {Object} aid API的id
 * @param {Object} res
 * @param {Object} err
 */
export function getApiAPI(aid, res, err) {
	request.get('/private/api/' + aid).then(res).catch(err);
}

/**
 * 新建API
 * @param {Object} data api的数据
 * @param {Object} res
 * @param {Object} err
 */
export function saveApiAPI(data, res, err) {
	request.post('/private/api' , qs.stringify(data)).then(res).catch(err);
}
/**
 * 修改API
 * @param {Object} data api的数据
 * @param {Object} res
 * @param {Object} err
 */
export function updateApiAPI(data, res, err) {
	request.put('/private/api' , qs.stringify(data)).then(res).catch(err);
}

/**
 * API排序排序上移
 * @param {Object} aid API的id
 * @param {Object} res
 * @param {Object} err
 */
export function apiMoveUpAPI(aid, res, err) {
	request.put('/private/api/moveUp/' + aid).then(res).catch(err);
}
/**
 * API排序排序下移
 * @param {Object} aid API的id
 * @param {Object} res
 * @param {Object} err
 */
export function apiMoveDownAPI(aid, res, err) {
	request.put('/private/api/moveDown/' + aid).then(res).catch(err);
}
/**
 * 删除API
 * @param {Object} aid API的id
 * @param {Object} res
 * @param {Object} err
 */
export function deleteAPI(aid, res, err) {
	request.delete('/private/api/' + aid).then(res).catch(err);
}
