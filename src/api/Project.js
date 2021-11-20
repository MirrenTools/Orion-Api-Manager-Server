import request from './utils/Request'

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
	request.post('/private/server/project/', data).then(res).catch(err);
}

/**
 * 导入项目保存
 * @param {Object} data 项目的信息,project:项目的json字符串
 * @param {Object} resLL
 * @param {Object} err
 */
export function saveProjectFronJsonAPI(data, res, err) {
	request.post('/private/server/project/fromJson', data).then(res).catch(err);
}

/**
 * 复制项目
 * @param {Object} pid 项目的id
 * @param {Object} resLL
 * @param {Object} err
 */
export function copyProjectAPI(pid, res, err) {
	request.post('/private/server/project/copy/' + pid).then(res).catch(err);
}

/**
 * 修改项目
 * @param {Object} data 项目的信息
 * @param {Object} resLL
 * @param {Object} err
 */
export function updateProjectAPI(data, res, err) {
	request.put('/private/server/project/', data).then(res).catch(err);
}
/**
 * 项目排序上移
 * @param {Object} pid 项目的id
 * @param {Object} resLL
 * @param {Object} err
 */
export function projectMoveUpAPI(pid, res, err) {
	request.put('/private/server/project/moveUp/' + pid).then(res).catch(err);
}
/**
 * 项目排序下移
 * @param {Object} pid 项目的id
 * @param {Object} res
 * @param {Object} err
 */
export function projectMoveDownAPI(pid, res, err) {
	request.put('/private/server/project/moveDown/' + pid).then(res).catch(err);
}
/**
 * 删除项目
 * @param {Object} pid 项目的id
 * @param {Object} res
 * @param {Object} err
 */
export function deleteProjectAPI(pid, res, err) {
	request.delete('/private/server/project/' + pid).then(res).catch(err);
}

/**
 * 获取指定项目的分享记录
 * @param {String} pid 项目的id
 * @param {Object} resLL
 * @param {Object} err
 */
export function findProjectShareAPI(pid, res, err) {
	request.get('/private/projectShare/' + pid).then(res).catch(err);
}

/**
 * 保存项目分享
 * @param {Object} data 项目分享的信息
 * @param {Object} resLL
 * @param {Object} err
 */
export function saveProjectShareAPI(data, res, err) {
	request.post('/private/server/projectShare', data).then(res).catch(err);
}

/**
 * 修改项目分享
 * @param {Object} data 项目分享的信息
 * @param {Object} resLL
 * @param {Object} err
 */
export function updateProjectShareAPI(data, res, err) {
	request.put('/private/server/projectShare', data).then(res).catch(err);
}

/**
 * 删除项目分享
 * @param {Object} sid 分享的id
 * @param {Object} res
 * @param {Object} err
 */
export function deleteProjectShareAPI(sid, res, err) {
	request.delete('/private/server/projectShare/' + sid).then(res).catch(err);
}

/**
 * 获取分组列表
 * @param {Object} pid 项目的id
 * @param {Object} res
 * @param {Object} err
 */
export function findGroupsByProjectId(pid, res, err) {
	request.get('/private/server/project/apiGroup/' + pid).then(res).catch(err);
}
/**
 * 新建分组
 * @param {Object} data 分组信息
 * @param {Object} res
 * @param {Object} err
 */
export function saveApiGroup(data, res, err) {
	request.post('/private/server/apiGroup', data).then(res).catch(err);
}
/**
 * 修改分组
 * @param {Object} data 分组信息
 * @param {Object} res
 * @param {Object} err
 */
export function putApiGroup(data, res, err) {
	request.put('/private/server/apiGroup', data).then(res).catch(err);
}
/**
 * 接口分组排序上移
 * @param {Object} gid 分组的id
 * @param {Object} res
 * @param {Object} err
 */
export function apiGroupMoveUpAPI(gid, res, err) {
	request.put('/private/server/apiGroup/moveUp/' + gid).then(res).catch(err);
}
/**
 * 接口分组排序下移
 * @param {Object} gid 分组的id
 * @param {Object} res
 * @param {Object} err
 */
export function apiGroupMoveDownAPI(gid, res, err) {
	request.put('/private/server/apiGroup/moveDown/' + gid).then(res).catch(err);
}

/**
 * 删除分组
 * @param {Object} gid 分组的id
 * @param {Object} res
 * @param {Object} err
 */
export function daleteApiGroup(gid, res, err) {
	request.delete('/private/server/apiGroup/' + gid).then(res).catch(err);
}
/**
 * 获取分组的所有接口数据
 * @param {Object} gid 分组的id
 * @param {Object} res
 * @param {Object} err
 */
export function findApisAPI(gid, res, err) {
	request.get('/private/server/apis/' + gid).then(res).catch(err);
}

/**
 * 获取指定API
 * @param {Object} aid API的id
 * @param {Object} res
 * @param {Object} err
 */
export function getApiAPI(aid, res, err) {
	request.get('/private/server/api/' + aid).then(res).catch(err);
}

/**
 * 新建API
 * @param {Object} data api的数据
 * @param {Object} res
 * @param {Object} err
 */
export function saveApiAPI(data, res, err) {
	request.post('/private/server/api', data).then(res).catch(err);
}

/**
 * 复制API
 * @param {Object} aid API的id
 * @param {Object} res
 * @param {Object} err
 */
export function copyApiAPI(aid, res, err) {
	request.post('/private/server/api/' + aid).then(res).catch(err);
}


/**
 * 修改API
 * @param {Object} data api的数据
 * @param {Object} res
 * @param {Object} err
 */
export function updateApiAPI(data, res, err) {
	request.put('/private/server/api', data).then(res).catch(err);
}

/**
 * API排序排序上移
 * @param {Object} aid API的id
 * @param {Object} res
 * @param {Object} err
 */
export function apiMoveUpAPI(aid, res, err) {
	request.put('/private/server/api/moveUp/' + aid).then(res).catch(err);
}
/**
 * API排序排序下移
 * @param {Object} aid API的id
 * @param {Object} res
 * @param {Object} err
 */
export function apiMoveDownAPI(aid, res, err) {
	request.put('/private/server/api/moveDown/' + aid).then(res).catch(err);
}

/**
 * 获取所有隐藏(回收)的接口数据
 * @param {Object} res
 * @param {Object} err
 */
export function findHideApisAPI(res, err) {
	request.get('/private/server/hide/apis').then(res).catch(err);
}
/**
 * 隐性(回收)指定API
 * @param {Object} aid API的id
 * @param {Object} res
 * @param {Object} err
 */
export function hideApiAPI(aid, res, err) {
	request.put('/private/server/api/hide/' + aid).then(res).catch(err);
}

/**
 * 显示(还原)指定API
 * @param {Object} aid API的id
 * @param {Object} res
 * @param {Object} err
 */
export function showApiAPI(aid, res, err) {
	request.put('/private/server/api/show/' + aid).then(res).catch(err);
}
/**
 * 删除API
 * @param {Object} aid API的id
 * @param {Object} res
 * @param {Object} err
 */
export function deleteApiAPI(aid, res, err) {
	request.delete('/private/server/api/' + aid).then(res).catch(err);
}

/**
 * 获取API模板的列表,返回模板的id与名称
 * @param {Object} res
 * @param {Object} err
 */
export function findApiTemplateListAPI(res, err) {
	request.get('/private/server/api/template').then(res).catch(err);
}

/**
 * 获取API模板详情
 * @param {Object} tid 模板的id
 * @param {Object} res
 * @param {Object} err
 */
export function getApiTemplateAPI(tid, res, err) {
	request.get('/private/server/api/template/' + tid).then(res).catch(err);
}
/**
 * 新增API模板
 * @param {Object} data 模板的数据
 * @param {Object} res
 * @param {Object} err
 */
export function postApiTemplateAPI(data, res, err) {
	request.post('/private/server/api/template', data).then(res).catch(err);
}

/**
 * 删除API指定模板
 * @param {Object} tid 模板的id
 * @param {Object} res
 * @param {Object} err
 */
export function deleteApiTemplateAPI(tid, res, err) {
	request.delete('/private/server/api/template/' + tid).then(res).catch(err);
}
