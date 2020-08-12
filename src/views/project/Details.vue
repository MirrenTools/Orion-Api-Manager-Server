<template>
	<div>
		<div style="width: 98%; max-width: 1240px;padding: 10px 0;margin: auto;display: flex;align-items: center;">
			<div>
				<b>{{ mode === 'edit' ? '修改项目信息' : '项目信息' }}</b>
			</div>
			<div style="margin-left: auto;">
				<div v-show="mode === 'view'">
					<el-button size="mini" type="primary" @click="copySubmit()">复制副本</el-button>
					<el-button size="mini" type="primary" @click="mode = 'edit'">修改</el-button>
					<el-button size="mini" type="danger" @click="deleteSubmit()">删除</el-button>
				</div>
				<div v-show="mode === 'edit'">
					<el-button size="mini" @click="mode = 'view'">取消</el-button>
				</div>
			</div>
		</div>
		<div style="width: 98%; max-width: 1240px;margin: auto">
			<!-- 显示的属性 -->
			<table v-show="mode === 'view'" style="width: 100%;" cellspacing="10">
				<tr>
					<td width="120px" class="project-item">项目名称</td>
					<td>
						{{ project.name }}
						<span style="font-size: 0.9em;">{{ project.versions }}</span>
					</td>
				</tr>
				<tr v-show="project.lastTime">
					<td class="project-item">最后更新时间</td>
					<td>{{ formatDate(project.lastTime) }}</td>
				</tr>
				<tr v-show="project.description">
					<td width="120px" class="project-item">项目描述</td>
					<td v-html="project.description"></td>
				</tr>
				<tr>
					<td class="project-item" valign="top">服务地址集</td>
					<td>
						<div v-for="(item,idx) in project.servers" :key="idx">
							<div>{{item.url}}</div>
							<div v-show="item.description" style="color: #888;">{{item.description}}</div>
						</div>
					</td>
				</tr>
				<tr v-show="project.contactName">
					<td class="project-item">联系人</td>
					<td>{{ project.contactName }}</td>
				</tr>
				<tr v-show="project.contactInfo">
					<td class="project-item">联系信息</td>
					<td>{{ project.contactInfo }}</td>
				</tr>
				<tr v-show="project.exDdescription && project.exDurl">
					<td class="project-item">附加文档</td>
					<td>
						<span v-show="project.exDdescription">{{ project.exDdescription }}</span>
						<a v-show="project.exDurl" :href="project.exDurl" target="_blank" class="alink">查看详情</a>
					</td>
				</tr>
				<tr>
					<td class="project-item">操作</td>
					<td>
						<a :href="'/project/downJson/' + project.key" class="alink" style="margin-left: 0;">下载.json文件</a>
						<a :href="'/Client-UI/index.html?file=/project/getJson/' + project.key + '&id=' + project.key" target="_blank"
						 class="alink">在Client-UI中查看</a>
					</td>
				</tr>
			</table>

			<!-- 修改的属性 -->
			<el-form v-show="mode === 'edit'" ref="projectEditForm" :rules="editRules" :model="projectEdit" label-width="120px">
				<el-form-item label="项目名称" prop="name">
					<el-input v-model="projectEdit.name" placeholder="请输入项目名称"></el-input>
				</el-form-item>
				<el-form-item label="项目版本" prop="versions">
					<el-input v-model="projectEdit.versions" placeholder="请输入项目版本号"></el-input>
				</el-form-item>
				<el-form-item label="项目排序" prop="sorts">
					<el-input v-model.number="projectEdit.sorts" placeholder="请输入项目排序"></el-input>
				</el-form-item>
				<el-form-item label="项目描述" prop="description">
					<el-input v-model="projectEdit.description" type="textarea" placeholder="请输入项目描述"></el-input>
				</el-form-item>
				<el-form-item label="服务地址集" prop="servers">
					<template>
						<div style="border: 1px solid #DCDFE6;padding: 5px;margin-bottom: 5px;" v-for="(server,idx) in projectEdit.servers"
						 :key="idx">
							<el-input v-model="server.url" placeholder="请输入主机地址,必填,示例 http://127.0.0.1:8080/v1"></el-input>
							<el-input v-model="server.description" placeholder="请输入主机说明,选填,示例 本地开发服务器" class="novalidate"></el-input>
							<div style="text-align: right;padding-top: 3px;">
								<el-button size="mini" @click="removeServer(idx)">移除</el-button>
							</div>
						</div>
						<div style="text-align: right;">
							<el-button size="medium" @click="addServer()">添加更多</el-button>
						</div>
					</template>
				</el-form-item>
				<el-form-item label="联系人" prop="contactName">
					<el-input v-model="projectEdit.contactName" placeholder="请输入联系人"></el-input>
				</el-form-item>
				<el-form-item label="联系信息" prop="contactInfo">
					<el-input v-model="projectEdit.contactInfo" placeholder="请输入联系信息"></el-input>
				</el-form-item>
				<el-form-item label="附加文档描述" prop="exDdescription">
					<el-input v-model="projectEdit.exDdescription" placeholder="请输入附加文档描述"></el-input>
				</el-form-item>
				<el-form-item label="附加文档URL" prop="exDurl">
					<el-input v-model="projectEdit.exDurl" placeholder="请输入附加文档URL"></el-input>
				</el-form-item>
				<el-form-item>
					<div style="text-align: center;">
						<el-button type="primary" @click="updateSubmit()">提交修改</el-button>
					</div>
				</el-form-item>
			</el-form>
		</div>
		<!-- 新增或修改分组的弹窗 -->
		<el-dialog :title="groupDialogMode == 'view' ? '修改分组信息' : '新增分组信息'" :visible.sync="dialogCreateGroupVisible">
			<el-form :model="groupData" :rules="groupDataRules" label-width="100px" ref="groupEditForm">
				<el-form-item label="分组名称" prop="name">
					<el-input v-model="groupData.name" placeholder="请输入分组的名称(必填)"></el-input>
				</el-form-item>
				<el-form-item label="分组简介" prop="summary">
					<el-input v-model="groupData.summary" placeholder="请输入分组的简介(必填)"></el-input>
				</el-form-item>
				<el-form-item label="分组排序" prop="sorts">
					<el-input v-model="groupData.sorts" type="number" placeholder="请输入项目排序(选填)"></el-input>
				</el-form-item>
				<el-form-item label="分组描述" prop="description">
					<el-input type="textarea" v-model="groupData.description" placeholder="请输入分组的详细描述(选填)"></el-input>
				</el-form-item>
				<el-form-item label="附加文档URL" prop="externalUrl">
					<el-input v-model="groupData.externalUrl" placeholder="请输入附加文档URL(选填)"></el-input>
				</el-form-item>
				<el-form-item label="附加文档描述" prop="externalDesc">
					<el-input type="textarea" v-model="groupData.externalDesc" placeholder="请输入附加文档详细描述(选填)"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogCreateGroupVisible = false">取 消</el-button>
				<el-button type="primary" @click="groupCreateSubmit" v-show="groupDialogMode == 'edit'">确定新增</el-button>
				<el-button type="primary" @click="groupUpdateSubmit" v-show="groupDialogMode == 'view'">确定修改</el-button>
			</div>
		</el-dialog>

		<!-- 分组列表 -->
		<div v-show="mode === 'view'" style="width: 98%; max-width: 1240px;margin: auto;">
			<div style="padding: 10px 0;display: flex;align-items: center;">
				<div><b>分组列表</b></div>
				<div style="margin-left: auto;">
					<div v-show="mode === 'view'">
						<el-button size="mini" type="primary" @click="
								dialogCreateGroupVisible = true;
								groupDialogMode = 'edit';
								groupData = {};
							">
							新增分组
						</el-button>
					</div>
				</div>
			</div>
			<div>
				<el-collapse v-loading="groupsLoading">
					<el-collapse-item v-for="g in groups" :key="g.groupId">
						<!-- 分组名称与简介 -->
						<template slot="title">
							<div style="vertical-align: middle;">
								<span style="font-size: 20px;">
									<b>{{ g.name }}</b>
								</span>
								<span style="margin-left: 5px;">{{ g.summary }}</span>
							</div>
						</template>
						<!-- 分组的操作 -->
						<div style="padding-bottom: 10px;">
							<div style="display: flex;">
								<el-button size="mini" @click="groupMoveUp(g.groupId)">上移</el-button>
								<el-button size="mini" @click="groupMoveDown(g.groupId)">下移</el-button>
								<el-button size="mini" type="primary" @click="showGroupUpdateDialog(g)">修改分组</el-button>
								<el-button size="mini" type="danger" @click="groupDeleteSubmit(g.groupId)">删除分组</el-button>
								<el-button size="mini" type="primary" style="margin-left: auto;" @click="$router.push({path:`/index/post/project/api/${project.key}/${g.groupId}`})">新增接口</el-button>
							</div>
							<!-- 分组的描述 -->
							<p v-html="g.description"></p>
							<!-- 拓展文档 -->
							<div v-if="g.externalDocs != null">
								<div v-if="JSON.parse(g.externalDocs).description != null" v-html="JSON.parse(g.externalDocs).description"></div>
								<a v-if="JSON.parse(g.externalDocs).url != null" :href="JSON.parse(g.externalDocs).url" target="_blank" class="alink"
								 style="margin-left: 0;">
									{{ JSON.parse(g.externalDocs).url }}
								</a>
							</div>
						</div>
						<!-- 接口列表 -->
						<div v-for="api in g.apis" :key="api.apiId" style="margin-bottom: 10px;">
							<div :class="['api', api.method]">
								<!-- API的方法与路径与简介 -->
								<div :class="['api-header',((api.deprecated==true||api.deprecated=='true')?'text-through':'')]">
									<div class="api-method">{{ api.method }}</div>
									<div class="api-path-summary"><span v-if="(api.deprecated==true||api.deprecated=='true')"><b>(已过期) </b></span>{{ api.path }}</div>
									<div class="api-path-summary">{{ api.title }}</div>
								</div>
								<div style="padding:5px 10px;text-align: right;">
									<el-button size="mini" type="danger" @click="apiDeleteSubmit(api.apiId)">删除</el-button>
									<a :href="'#/index/put/project/api/'+project.key+'/'+api.groupId+'/'+api.apiId" style="margin:0 10px;">
										<el-button size="mini" type="primary">修改</el-button>
									</a>
									<el-button size="mini" @click="apiMoveUp(api.apiId)">上移</el-button>
									<el-button size="mini" @click="apiMoveDown(api.apiId)">下移</el-button>
									<a :href="'#/index/get/project/api/'+project.key+'/'+api.groupId+'/'+api.apiId" target="_blank" style="margin-left: 10px;">
										<el-button size="mini" type="primary">查看详情</el-button>
									</a>
								</div>
							</div>
						</div>
					</el-collapse-item>
				</el-collapse>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getProjectAPI,
		saveProjectAPI,
		copyProjectAPI,
		updateProjectAPI,
		deleteProjectAPI,
		findGroupsByProjectId,
		saveApiGroup,
		putApiGroup,
		daleteApiGroup,
		apiGroupMoveUpAPI,
		apiGroupMoveDownAPI,
		deleteAPI,
		apiMoveUpAPI,
		apiMoveDownAPI
	} from '@/api/Project';
	import {
		datetimeFormat
	} from '@/utils/DataFormat';
	/**查看模式*/
	const MODE_VIEW = 'view';
	/**编辑模式*/
	const MODE_EDIT = 'edit';
	export default {
		data() {
			return {
				/**查看项目的属性*/
				project: {},
				/**编辑的项目属性*/
				projectEdit: {
					schemes: []
				},
				/**项目信息表达校验*/
				editRules: {
					name: [{
						required: true,
						message: '请输入项目名称',
						trigger: 'blur'
					}],
					versions: [{
						required: true,
						message: '请输入项目版本号',
						trigger: 'blur'
					}],
					host: [{
						required: true,
						message: '请输入主机地址',
						trigger: 'blur'
					}],
					schemes: [{
						required: true,
						message: '请至少选择一个服务',
						trigger: 'blur'
					}]
				},
				/**当前的模式*/
				mode: MODE_VIEW,
				/**是否显示新建分组的窗口*/
				dialogCreateGroupVisible: false,
				/**分组的窗口类型,edit为新增,view为修改*/
				groupDialogMode: MODE_EDIT,
				/**分组的数据,用于新增与修改*/
				groupData: {
					name: '',
					summary: '',
					sorts: 0,
					description: '',
					externalUrl: null,
					externalDesc: null
				},
				groupDataRules: {
					name: [{
						required: true,
						message: '请输入分组的名称',
						trigger: 'blur'
					}],
					summary: [{
						required: true,
						message: '请输入分组的简介',
						trigger: 'blur'
					}]
				},
				/**分组与接口合集*/
				groups: [],
				/**分组列表加载中*/
				groupsLoading: true
			};
		},
		created() {
			var pid = this.$route.params.pid;
			if (pid == null) {
				this.$message.warning('加载项目信息失败!项目的id不能为空!');
				return;
			}
			this.loadProject(pid);
		},
		methods: {
			/**
			 * 加载项目信息
			 * @param {Object} id
			 */
			loadProject(id) {
				getProjectAPI(
					id,
					resp => {
						var data = resp.data;
						console.log('获取项目...');
						console.log(data);
						if (data.code == 200) {
							if (data.data == null) {
								this.$message.error('获取项目信息失败:请检查项目id是否正确!');
								return;
							}
							this.project = data.data;
							this.loadProjectGroups(id);
							this.project.servers = JSON.parse(this.project.servers);
							if (this.project.externalDocs != null) {
								this.project.externalDocs = JSON.parse(this.project.externalDocs);
								if (this.project.externalDocs.description != null) {
									this.project.exDdescription = this.project.externalDocs.description;
								}
								if (this.project.externalDocs.url != null) {
									this.project.exDurl = this.project.externalDocs.url;
								}
							}
							this.projectEdit = JSON.parse(JSON.stringify(this.project));
						} else {
							this.$message.error('获取项目信息失败:' + data.msg);
						}
					},
					err => {
						this.$message.error('获取项目信息失败,更多信息请查看浏览器控制台!');
						console.log(err);
					}
				);
			},
			/**
			 * 添加服务地址
			 */
			addServer() {
				this.projectEdit.servers.push({
					url: '',
					description: ''
				});
			},
			/**
			 * 删除服务地址
			 */
			removeServer(idx) {
				var servers = this.projectEdit.servers;
				if (servers[idx].url == '' && servers[idx].description == '') {
					servers.splice(idx, 1);
				} else {
					this.$confirm('确定移除数据吗?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						})
						.then(() => {
							servers.splice(idx, 1);
						})
						.catch(() => {});
				}
			},
			/**
			 * 提交修改项目信息
			 */
			updateSubmit() {
				this.$refs.projectEditForm.validate(valid => {
					if (valid) {
						var reqData = {};
						reqData.key = this.projectEdit.key;
						reqData.name = this.projectEdit.name;
						reqData.versions = this.projectEdit.versions;
						if (this.projectEdit.description != null) {
							reqData.description = this.projectEdit.description;
						}
						if (!isNaN(this.projectEdit.sorts)) {
							reqData.sorts = parseInt(this.projectEdit.sorts);
						}
						var servers = [];
						for (var i = 0; i < this.projectEdit.servers.length; i++) {
							var server = this.projectEdit.servers[i];
							if (server.url != '') {
								if (server.url.endsWith('/')) {
									server.url = server.url.substring(0, server.url.length - 1);
								}
								servers.push(server);
							}
						}
						reqData.servers = JSON.stringify(servers);
						var exd = null;
						if (this.projectEdit.exDdescription != null && this.projectEdit.exDdescription != '') {
							exd = {
								description: this.projectEdit.exDdescription
							};
						}
						if (this.projectEdit.exDurl != null && this.projectEdit.exDurl != '') {
							if (exd == null) {
								exd = {};
							}
							exd.url = this.projectEdit.exDurl;
						}
						if (exd != null) {
							reqData.externalDocs = JSON.stringify(exd);
						}
						if (this.projectEdit.contactName != null && this.projectEdit.contactName != '') {
							reqData.contactName = this.projectEdit.contactName;
						}
						if (this.projectEdit.contactInfo != null && this.projectEdit.contactInfo != '') {
							reqData.contactInfo = this.projectEdit.contactInfo;
						}
						console.log('执行修改项目...');
						console.log(reqData);
						updateProjectAPI(
							reqData,
							res => {
								console.log(data);
								var data = res.data;
								if (data.code == 200) {
									this.$message.success('修改成功!');
									this.loadProject(reqData.key);
									this.mode = MODE_VIEW;
								} else {
									this.$message.error('修改失败:' + data.msg);
								}
							},
							err => {
								this.$message.error('修改失败,更多信息请查看控制台!');
								console.log(err);
							}
						);
					} else {
						this.$message.error('修改失败,请按提示完善项目信息!');
						return false;
					}
				});
			},
			copySubmit() {
				this.$confirm('确定复制该项目吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(() => {
						copyProjectAPI(
							this.project.key,
							res => {
								console.log(data);
								var data = res.data;
								if (data.code == 200) {
									this.$message.success('复制成功!');
									this.$router.push('/index');
								} else {
									this.$message.error('复制失败:' + data.msg);
								}
							},
							er => {
								this.$message.error('复制失败,更多信息请查看控制台!');
								console.log(err);
							}
						);
					})
					.catch(() => {});
			},
			/**
			 * 删除项目
			 */
			deleteSubmit() {
				this.$confirm('确定删除该项目吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(() => {
						deleteProjectAPI(
							this.project.key,
							res => {
								console.log(data);
								var data = res.data;
								if (data.code == 200) {
									this.$message.success('删除成功!');
									this.$router.push('/index');
								} else {
									this.$message.error('删除失败:' + data.msg);
								}
							},
							er => {
								this.$message.error('删除失败,更多信息请查看控制台!');
								console.log(err);
							}
						);
					})
					.catch(() => {});
			},
			/**
			 * 加载项目分组
			 * @param {Object} pid
			 */
			loadProjectGroups(pid) {
				if (pid == null || pid == '') {
					return;
				}
				this.groupsLoading = true;
				findGroupsByProjectId(
					pid,
					resp => {
						var data = resp.data;
						console.log('获取项目分组...');
						console.log(data);
						if (data.code == 200) {
							this.groups = data.data;
							this.groupsLoading = false;
						} else {
							this.$message.error('获取项目分组信息失败:' + data.msg);
						}
					},
					err => {
						this.$message.error('获取项目分组信息失败,更多信息请查看浏览器控制台!');
						console.log(err);
					}
				);
			},
			/**
			 * 提交新增
			 */
			groupCreateSubmit() {
				this.$refs.groupEditForm.validate(valid => {
					if (valid) {
						var reqData = {};
						var pid = this.project.key;
						reqData.projectId = pid;
						reqData.sorts = this.groupData.sorts;
						reqData.name = this.groupData.name;
						reqData.summary = this.groupData.summary;
						reqData.description = this.groupData.description;
						if ((this.groupData.externalUrl != null && this.groupData.externalUrl != '') || (this.groupData.externalDesc !=
								null && this.groupData.externalDesc != '')) {
							var ext = {};
							if (this.groupData.externalUrl != null && this.groupData.externalUrl != '') {
								ext.url = this.groupData.externalUrl;
							}
							if (this.groupData.externalDesc != null && this.groupData.externalDesc != '') {
								ext.description = this.groupData.externalDesc;
							}
							reqData.externalDocs = JSON.stringify(ext);
						}
						saveApiGroup(
							reqData,
							resp => {
								var data = resp.data;
								console.log('新增分组...');
								console.log(data);
								if (data.code == 200) {
									this.loadProjectGroups(pid);
									this.groupData = {};
								} else {
									this.$message.error('新增分组失败:' + data.msg);
								}
								this.dialogCreateGroupVisible = false;
							},
							err => {
								this.$message.error('新增分组失败,更多信息请查看浏览器控制台!');
								console.log(err);
								this.dialogCreateGroupVisible = false;
							}
						);
					}
				});
			},
			showGroupUpdateDialog(group) {
				this.dialogCreateGroupVisible = true;
				this.groupDialogMode = 'view';
				var data = {
					groupId: group.groupId,
					name: group.name,
					summary: group.summary,
					sorts: group.sorts,
					description: group.description
				};
				if (group.externalDocs != null && group.externalDocs != '') {
					var ext = JSON.parse(group.externalDocs);
					data.externalUrl = ext.url;
					data.externalDesc = ext.description;
				}
				this.groupData = data;
			},
			/**
			 * 提交修改
			 */
			groupUpdateSubmit() {
				this.$refs.groupEditForm.validate(valid => {
					if (valid) {
						var reqData = {};
						var pid = this.project.key;
						reqData.projectId = pid;
						reqData.groupId = this.groupData.groupId;
						reqData.name = this.groupData.name;
						reqData.summary = this.groupData.summary;
						reqData.sorts = this.groupData.sorts;
						reqData.description = this.groupData.description;
						if ((this.groupData.externalUrl != null && this.groupData.externalUrl != '') || (this.groupData.externalDesc !=
								null && this.groupData.externalDesc != '')) {
							var ext = {};
							if (this.groupData.externalUrl != null && this.groupData.externalUrl != '') {
								ext.url = this.groupData.externalUrl;
							}
							if (this.groupData.externalDesc != null && this.groupData.externalDesc != '') {
								ext.description = this.groupData.externalDesc;
							}
							reqData.externalDocs = JSON.stringify(ext);
						}
						putApiGroup(
							reqData,
							resp => {
								var data = resp.data;
								console.log('新增分组...');
								console.log(data);
								if (data.code == 200) {
									this.loadProjectGroups(pid);
								} else {
									this.$message.error('新增分组失败:' + data.msg);
								}
								this.dialogCreateGroupVisible = false;
							},
							err => {
								this.$message.error('新增分组失败,更多信息请查看浏览器控制台!');
								console.log(err);
								this.dialogCreateGroupVisible = false;
							}
						);
					}
				});
			},
			/**
			 * 提交删除分组
			 * @param {Object} gid
			 */
			groupDeleteSubmit(gid) {
				this.$confirm('确定删除分组吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(() => {
						daleteApiGroup(
							gid,
							res => {
								console.log('删除分组...');
								console.log(data);
								var data = res.data;
								if (data.code == 200) {
									this.$message.success('删除成功!');
									this.loadProjectGroups(this.project.key);
								} else {
									this.$message.error('删除失败:' + data.msg);
								}
							},
							err => {
								this.$message.error('删除失败,更多信息请查看控制台!');
								console.log(err);
							}
						);
					})
					.catch(() => {});
			},
			/**
			 * 分组向上移动
			 * @param {Object} gid
			 */
			groupMoveUp(gid) {
				apiGroupMoveUpAPI(
					gid,
					res => {
						var data = res.data;
						if (data.code == 200) {
							this.$message.success('移动成功!');
							this.loadProjectGroups(this.project.key);
						} else {
							this.$message.error('分组排序上移失败:' + data.msg);
						}
					},
					err => {
						this.$message.error('分组排序上移失败,更多信息请查看浏览器控制台!');
						console.log(err);
					}
				);
			},
			/**
			 * 分组向下移动
			 * @param {Object} gid
			 */
			groupMoveDown(gid) {
				apiGroupMoveDownAPI(
					gid,
					res => {
						var data = res.data;
						if (data.code == 200) {
							this.$message.success('移动成功!');
							this.loadProjectGroups(this.project.key);
						} else {
							this.$message.error('分组排序上移失败:' + data.msg);
						}
					},
					err => {
						this.$message.error('分组排序上移失败,更多信息请查看浏览器控制台!');
						console.log(err);
					}
				);
			},
			/**
			 * 提交删除API
			 * @param {Object} aid
			 */
			apiDeleteSubmit(aid) {
				this.$confirm('确定删除API吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(() => {
						deleteAPI(
							aid,
							res => {
								var data = res.data;
								console.log('删除API...');
								console.log(data);
								if (data.code == 200) {
									this.$message.success('删除成功!');
									this.loadProjectGroups(this.project.key);
								} else {
									this.$message.error('删除失败:' + data.msg);
								}
							},
							err => {
								this.$message.error('删除失败,更多信息请查看控制台!');
								console.log(err);
							}
						);
					})
					.catch(() => {});
			},
			/**
			 * API向上移动
			 * @param {Object} aid
			 */
			apiMoveUp(aid) {
				apiMoveUpAPI(
					aid,
					res => {
						var data = res.data;
						console.log('API排序上移动...');
						console.log(data);
						if (data.code == 200) {
							this.$message.success('移动成功!');
							this.loadProjectGroups(this.project.key);
						} else {
							this.$message.error('API排序上移失败:' + data.msg);
						}
					},
					err => {
						this.$message.error('API排序上移失败,更多信息请查看浏览器控制台!');
						console.log(err);
					}
				);
			},
			/**
			 * API向下移动
			 * @param {Object} aid
			 */
			apiMoveDown(aid) {
				apiMoveDownAPI(
					aid,
					res => {
						var data = res.data;
						console.log('API排序下移动...');
						console.log(data);
						if (data.code == 200) {
							this.$message.success('移动成功!');
							this.loadProjectGroups(this.project.key);
						} else {
							this.$message.error('API排序上移失败:' + data.msg);
						}
					},
					err => {
						this.$message.error('API排序上移失败,更多信息请查看浏览器控制台!');
						console.log(err);
					}
				);
			},
			/**
			 * 格式化时间
			 * @param {Object} time
			 */
			formatDate(time) {
				return datetimeFormat(time);
			}

		}
	};
</script>

<style lang="scss" scoped>
	@import '@/styles/api-method-style.scss';

	.alink {
		background-color: transparent;
		color: #409eff;
		text-decoration: none;
		outline: none;
		display: inline-block;
		margin: 3px 5px;
	}

	.alink:active,
	.alink:hover {
		outline-width: 0;
		opacity: 0.8;
	}

	.project-item {
		text-align: right;
		padding-right: 5px;
	}

	.desc-constraint span {
		display: inline-block;
		padding-right: 10px;
	}
</style>
