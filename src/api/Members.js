import request from './utils/Request'


/**
 * 修改登录密码
 * @param {Object} data: {id(String):登录的id,pwd(String):登录的密码}
 * @param {Object} res
 * @param {Object} err
 */
export function putPasswordAPI(data, res, err) {
	request.put('/private/profile/password',data).then(res).catch(err);
}


/**
 * 获取所有标签
 * @param {Object} res
 * @param {Object} err
 */
export function findTagsAPI(res, err) {
	request.get('/private/server/find/tags').then(res).catch(err);
}
/**
 * 获取指定标签
 * @param {Object} tid 标签的id
 * @param {Object} res
 * @param {Object} err
 */
export function getTagAPI(tid, res, err) {
	request.get('/private/server/tag/' + tid).then(res).catch(err);
}
/**
 * 新增标签
 * @param {Object} data {tname(String):标签的名称,sorts(int):标签的排序}
 * @param {Object} res
 * @param {Object} err
 */
export function postTagAPI(data, res, err) {
	request.post('/private/server/tag', data).then(res).catch(err);
}
/**
 * 修改标签
 * @param {Object} data {tid(String):标签的id,tname(String):标签的名称,sorts(int):标签的排序}
 * @param {Object} res
 * @param {Object} err
 */
export function putTagAPI(data, res, err) {
	request.put('/private/server/tag', data).then(res).catch(err);
}
/**
 * 删除标签
 * @param {Object} tid 标签的id
 * @param {Object} res
 * @param {Object} err
 */
export function deleteTagAPI(tid, res, err) {
	request.delete('/private/server/tag/' + tid).then(res).catch(err);
}
/**
 * 获取用户列表
 * @param {Object} data {keywords(String):用户关键字,tid(String):指定标签,page(int):第几页,size(int):每页显示多少行数据 }
 * @param {Object} res
 * @param {Object} err
 */
export function findUsersAPI(data, res, err) {
	request.get('/private/server/find/users', {
		params: data
	}).then(res).catch(err);
}
/**
 * 获取所有管理员用户,返回管理员的id与名称
 * @param {Object} res
 * @param {Object} err
 */
export function findServerUsersAPI(res, err) {
	request.get('/private/server/find/server/users').then(res).catch(err);
}
/**
 * 获取指定用户
 * @param {Object} uid 用户的id
 * @param {Object} res
 * @param {Object} err
 */
export function getUserAPI(uid, res, err) {
	request.get('/private/server/user/' + uid).then(res).catch(err);
}
/**
 * 新增用户
 * @param {Object} data {role(String):用户的角色,pwd(String):用户的密码,tags(ArrayString):用户的标签,nickname(String):用户的名称,contact(String):联系信息,summary(String):简介}
 * @param {Object} res
 * @param {Object} err
 */
export function postUserAPI(data, res, err) {
	request.post('/private/server/user', data).then(res).catch(err);
}
/**
 * 修改用户
 * @param {Object} data {uid(String):用户的id,role(String):用户的角色,pwd(String):用户的密码,tags(ArrayString):用户的标签,nickname(String):用户的名称,contact(String):联系信息,summary(String):简介}
 * @param {Object} res
 * @param {Object} err
 */
export function putUserAPI(data, res, err) {
	request.put('/private/server/user', data).then(res).catch(err);
}

/**
 * 删除用户
 * @param {Object} uid 用户的id
 * @param {Object} res
 * @param {Object} err
 */
export function deleteUserAPI(uid, res, err) {
	request.delete('/private/server/user/' + uid).then(res).catch(err);
}
