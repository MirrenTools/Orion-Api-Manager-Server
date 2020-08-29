<template>
	<div style="width: 98%; max-width: 1240px;padding: 10px 0;margin: auto;">
		<el-container>
			<el-container>
				<el-aside width="25%" style="max-width: 450px;min-width: 220px;max-height:;">
					<div style="display: flex;align-items: center;">
						<div>
							<b>{{ $t('GroupList') }}</b>
						</div>
						<div style="margin-left: auto;">
							<div>
								<el-button
									size="mini"
									type="primary"
									@click="
										dialogCreateGroupVisible = true;
										groupDialogMode = 'edit';
										groupData = {};
									"
								>
									{{ $t('NewGroup') }}
								</el-button>
							</div>
						</div>
					</div>
					<ul class="group-items" v-loading="groupsLoading">
						<li v-if="groups == null || groups.length == 0" style="color: #777;">{{ $t('ThereIsNoGroupPleaseAdd') }}</li>
						<li v-for="(g, idx) in groups" :class="{ current: selectGroupId == g.groupId }" :key="idx" @click="loadApis(g)">
							<span class="group-item">{{ g.name }}</span>
						</li>
					</ul>
				</el-aside>
				<el-main style="padding:0 0 0 15px;">
					<div v-if="group">
						<div style="text-align: right;">
							<el-button size="mini" @click="groupMoveUp(group.groupId)">{{ $t('MoveUp') }}</el-button>
							<el-button size="mini" @click="groupMoveDown(group.groupId)">{{ $t('MoveDown') }}</el-button>
							<el-button size="mini" type="primary" @click="showGroupUpdateDialog(group)">{{ $t('ModifyGroup') }}</el-button>
							<el-button size="mini" type="danger" @click="groupDeleteSubmit(group.groupId)">{{ $t('DeleteGroup') }}</el-button>
						</div>
						<div>
							<table style="width: 100%;" cellspacing="10">
								<tr>
									<td width="100px" class="td-item">{{ $t('GroupName') }}</td>
									<td>{{ group.name }}</td>
								</tr>
								<tr>
									<td class="td-item">{{ $t('GroupSummary') }}</td>
									<td>{{ group.summary }}</td>
								</tr>
								<tr>
									<td class="td-item" valign="top">{{ $t('GroupDescription') }}</td>
									<td v-html="group.description"></td>
								</tr>
								<tr v-if="group.externalDocs != null && group.externalDocs != '{}'">
									<td class="td-item" valign="top">{{ $t('GroupDescription') }}</td>
									<td>
										<div v-if="JSON.parse(group.externalDocs).description != null" v-html="JSON.parse(group.externalDocs).description"></div>
										<a v-if="JSON.parse(group.externalDocs).url != null" :href="JSON.parse(group.externalDocs).url" target="_blank" class="alink">
											{{ JSON.parse(group.externalDocs).url }}
										</a>
									</td>
								</tr>
							</table>
						</div>
						<!-- 接口列表与新增接口 -->
						<div style="box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);height: 2px;border-bottom: 1px solid #EEE;"></div>
						<div style="padding: 10px 0;display: flex;align-items: center;">
							<div>
								<b>{{ $t('ApiList') }}</b>
							</div>
							<div style="margin-left: auto;">
								<a :href="'#/index/post/project/api/' + projectId + '/' + group.groupId" style="margin:0 10px;">
									<el-button size="mini" type="primary">{{ $t('NewApi') }}</el-button>
								</a>
							</div>
						</div>

						<!-- 接口列表 -->
						<div v-for="api in apis" :key="api.apiId" style="margin-bottom: 10px;">
							<div :class="['api', api.method]">
								<!-- API的方法与路径与简介 -->
								<div :class="['api-header', api.deprecated == true || api.deprecated == 'true' ? 'text-through' : '']" @click="api.show = !api.show">
									<div class="api-method">{{ api.method }}</div>
									<div class="api-path-summary">
										<span v-if="api.deprecated == true || api.deprecated == 'true'">
											<b>({{ $t('Deprecated') }})</b>
										</span>
										{{ api.path }}
									</div>
									<div class="api-path-summary">{{ api.title }}</div>
									<div style="margin-left: auto;">
										<i v-show="!api.show" class="el-icon-arrow-right"></i>
										<i v-show="api.show" class="el-icon-arrow-down"></i>
									</div>
								</div>
								<!-- API操作 -->
								<div style="padding:5px 10px;text-align: right;" @click="api.show = !api.show">
									<el-button size="mini" type="danger" @click="apiDeleteSubmit(api.apiId)">{{ $t('Delete') }}</el-button>
									<a :href="'#/index/put/project/api/' + projectId + '/' + api.groupId + '/' + api.apiId" style="margin:0 10px;">
										<el-button size="mini" type="primary">{{ $t('Modify') }}</el-button>
									</a>
									<el-button size="mini" @click="apiMoveUp(api.apiId)">{{ $t('MoveUp') }}</el-button>
									<el-button size="mini" @click="apiMoveDown(api.apiId)">{{ $t('MoveDown') }}</el-button>
								</div>
								<div v-show="api.show">
									<!-- API说明 -->
									<div style="padding:10px;background-color: white">
										<!-- API描述 -->
										<div v-if="api.description" v-html="api.description.replace(/\n/g, '<br>')"></div>
										<!-- API附件说明 -->
										<div v-for="(addi, idx) in api.additional" :key="idx">
											<div>
												<b>{{ addi.title }}</b>
											</div>
											<div v-if="addi.description" v-html="addi.description.replace(/\n/g, '<br>')"></div>
										</div>
										<!-- 拓展文档 -->
										<div v-if="api.externalDocs != null">
											<div v-if="api.externalDocs.description != null" v-html="api.externalDocs.description"></div>
											<a v-if="api.externalDocs.url != null" :href="api.externalDocs.url" target="_blank" class="alink" style="margin-left: 0;">{{ api.externalDocs.url }}</a>
										</div>
									</div>
									<!-- 请求参数标题 -->
									<div style="padding:10px;">
										<div style="display: flex;align-items: center;">
											<div style="min-width: 60px;">
												<b>{{ $t('Parameters') }}</b>
											</div>
											<div style="margin-left: auto;" v-if="api.consumes != null">Consumes: {{ api.consumes }}</div>
										</div>
									</div>
									<!-- 请求参数 -->
									<div style="padding:5px 10px;background-color: white">
										<el-table
											:data="api.parameters"
											style="width: 100%;"
											row-key="tableRowKeyId"
											border
											default-expand-all
											:tree-props="{ children: 'items', hasChildren: 'hasChildren' }"
											:empty-text="$t('ThereIsNoNeedToRequestParameters')"
										>
											<el-table-column prop="required" :label="$t('Required')" width="100" align="right">
												<template slot-scope="scope">
													<span>{{ scope.row.required == 'true' || scope.row.required == true ? $t('True') : $t('False') }}</span>
												</template>
											</el-table-column>
											<el-table-column prop="in" :label="$t('Position')" width="120"></el-table-column>
											<el-table-column prop="type" :label="$t('Type')" width="120"></el-table-column>
											<el-table-column prop="name" :label="$t('ParamName')" width="300"></el-table-column>
											<el-table-column prop="description" :label="$t('ParamDescription')">
												<template slot-scope="scope">
													<div v-if="scope.row.description" v-html="scope.row.description"></div>
													<div class="desc-constraint">
														<span v-if="scope.row.def">{{ $t('Default') }}: {{ scope.row.def }}</span>
														<span v-if="scope.row.minLength">{{ $t('MinLength') }}: {{ scope.row.minLength }}</span>
														<span v-if="scope.row.maxLength">{{ $t('MaxLength') }}: {{ scope.row.maxLength }}</span>
														<span v-if="scope.row.minimum">{{ $t('Minimum') }}: {{ scope.row.minimum }}</span>
														<span v-if="scope.row.maximum">{{ $t('Maximum') }}: {{ scope.row.maximum }}</span>
														<span v-if="scope.row.enums">{{ $t('Enums') }}: {{ scope.row.enums }}</span>
														<span v-if="scope.row.pattern">{{ $t('Pattern') }}: {{ scope.row.pattern }}</span>
													</div>
												</template>
											</el-table-column>
										</el-table>
										<div v-if="api.body && api.body != ''"><el-input type="textarea" :autosize="{ minRows: 1 }" v-model="api.body" style="border: 0;"></el-input></div>
									</div>
									<!-- 响应参数标题 -->
									<div style="padding:10px;">
										<div style="display: flex;align-items: center;">
											<div style="min-width: 60px;">
												<b>{{ $t('Responses') }}</b>
											</div>
											<div style="margin-left: auto;" v-if="api.produces != null">Produces: {{ api.produces }}</div>
										</div>
									</div>
									<!-- 响应参数 -->
									<div style="padding:5px 10px;background-color: white">
										<div v-for="(resp, idx) in api.responses" :key="idx">
											<p>{{ $t('Status') }}: {{ resp.status }} {{ $t('StatusMsg') }}: {{ resp.msg }}</p>
											<el-table
												:data="resp.data"
												style="width: 100%;"
												row-key="tableRowKeyId"
												border
												default-expand-all
												:tree-props="{ children: 'items', hasChildren: 'hasChildren' }"
											>
												<el-table-column prop="in" :label="$t('Position')" width="120" align="right"></el-table-column>
												<el-table-column prop="type" :label="$t('Type')" width="100" align="right"></el-table-column>
												<el-table-column prop="name" :label="$t('ParamName')" width="300"></el-table-column>
												<el-table-column prop="description" :label="$t('ParamDescription')">
													<template slot-scope="scope">
														<div v-if="scope.row.description" v-html="scope.row.description"></div>
													</template>
												</el-table-column>
											</el-table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</el-main>
			</el-container>
		</el-container>

		<!-- 新增或修改分组的弹窗 -->
		<el-dialog :title="groupDialogMode == 'view' ? $t('ModifyGroup') : $t('NewGroup')" :visible.sync="dialogCreateGroupVisible">
			<el-form :model="groupData" :rules="groupDataRules" label-width="100px" ref="groupEditForm">
				<el-form-item :label="$t('GroupName')" prop="name"><el-input v-model="groupData.name" :placeholder="$t('EnterTheGroupName')"></el-input></el-form-item>
				<el-form-item :label="$t('GroupSummary')" prop="summary"><el-input v-model="groupData.summary" :placeholder="$t('EnterGroupSummary')"></el-input></el-form-item>
				<el-form-item :label="$t('GroupRanking')" prop="sorts"><el-input v-model="groupData.sorts" type="number" :placeholder="$t('EnterGroupRanking')"></el-input></el-form-item>
				<el-form-item :label="$t('GroupDescription')" prop="description">
					<el-input type="textarea" v-model="groupData.description" :placeholder="$t('EnterGroupDescription')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('ExtDocsURL')" prop="externalUrl"><el-input v-model="groupData.externalUrl" :placeholder="$t('EnterExtDocsURL')"></el-input></el-form-item>
				<el-form-item :label="$t('ExtDocsDesc')" prop="externalDesc">
					<el-input type="textarea" v-model="groupData.externalDesc" :placeholder="$t('EnterExtDocsDesc')"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogCreateGroupVisible = false">{{ $t('Cancel') }}</el-button>
				<el-button type="primary" @click="groupCreateSubmit" v-show="groupDialogMode == 'edit'">{{ $t('Submit') }}</el-button>
				<el-button type="primary" @click="groupUpdateSubmit" v-show="groupDialogMode == 'view'">{{ $t('SubmitModify') }}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import {
	findGroupsByProjectId,
	saveApiGroup,
	putApiGroup,
	daleteApiGroup,
	apiGroupMoveUpAPI,
	apiGroupMoveDownAPI,
	findApisAPI,
	deleteAPI,
	apiMoveUpAPI,
	apiMoveDownAPI
} from '@/api/Project';
/**查看模式*/
const MODE_VIEW = 'view';
/**编辑模式*/
const MODE_EDIT = 'edit';
/**SESSION_STORAGE_LAST_SELECT_GID*/
const SESSION_STORAGE_LAST_SELECT_GID = 'LAST_SELECT_GID';
export default {
	data() {
		return {
			projectId: '',
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
			/**修改或新增分组的检查*/
			groupDataRules: {
				name: [
					{
						required: true,
						message: this.$t('EnterTheGroupName'),
						trigger: 'blur'
					}
				],
				summary: [
					{
						required: true,
						message: this.$t('EnterGroupSummary'),
						trigger: 'blur'
					}
				]
			},
			/**分组数据信息集*/
			groups: [],
			/**分组数据信息*/
			group: null,
			/**分组列表加载中*/
			groupsLoading: true,
			/**当前选中的API*/
			selectGroupId: null,
			/**当前分组的接口合集*/
			apis: []
		};
	},
	created() {
		var pid = this.$route.params.pid;
		if (pid == null || pid == '') {
			this.$message.warning(this.$t('FailedToLoadTheProjectInvalidID'));
			return;
		}
		this.projectId = pid;
		this.loadProjectGroups(pid);
	},
	methods: {
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
					console.log('get project list...');
					console.log(data);
					if (data.code == 200) {
						this.groups = data.data;
						var lastGid = sessionStorage.getItem(SESSION_STORAGE_LAST_SELECT_GID);
						var loaded = true;
						if (lastGid != null && lastGid != '') {
							for (var i = 0; i < this.groups.length; i++) {
								if (this.groups[i].groupId == lastGid) {
									this.loadApis(this.groups[i]);
									loaded = false;
									break;
								}
							}
						}
						if (loaded && this.groups.length > 0) {
							this.loadApis(this.groups[0]);
						}
						this.groupsLoading = false;
					} else {
						this.$message.error(this.$t('FailedToGetGroupInfo') + ':' + data.msg);
					}
				},
				err => {
					this.$message.error(this.$t('FailedToGetGroupInfoSeeConsole'));
					console.log(err);
				}
			);
		},
		/**
		 * 加载API集合
		 * @param {Object} group
		 */
		loadApis(group) {
			console.log(group);
			var gid = group.groupId;
			this.selectGroupId = gid;
			this.group = group;
			sessionStorage.setItem(SESSION_STORAGE_LAST_SELECT_GID, gid);
			this.findApisAndLoad(gid);
		},
		/**
		 * 获取API信息并加载
		 * @param {Object} gid
		 */
		findApisAndLoad(gid) {
			if (gid == null || gid == '') {
				return;
			}
			this.apis = [];
			findApisAPI(
				gid,
				resp => {
					var data = resp.data;
					console.log('get API list...');
					console.log(data);
					if (data.code == 200) {
						for (var a = 0; a < data.data.length; a++) {
							var api = data.data[a];
							api.show = false;
							if (api.additional != null && api.additional != '') {
								api.additional = JSON.parse(api.additional);
							}
							if (api.externalDocs != null && api.externalDocs != '') {
								api.externalDocs = JSON.parse(api.externalDocs);
							}
							if (api.parameters != null) {
								api.parameters = JSON.parse(api.parameters);
								for (var i = 0; i < api.parameters.length; i++) {
									this.recursionCreateTableRandomRowKey(api.parameters[i]);
								}
							} else {
								api.parameters = [];
							}
							if (api.responses != null) {
								var respd = JSON.parse(api.responses);
								if (respd != null && respd.length > 0 && (respd[0].status == undefined || respd[0].data == undefined)) {
									api.responses = [
										{
											status: 200,
											msg: 'ok',
											data: respd
										}
									];
								} else {
									api.responses = respd;
								}
								for (var r = 0; r < api.responses.length; r++) {
									var rdata = api.responses[r].data;
									for (var i = 0; i < rdata.length; i++) {
										this.recursionCreateTableRandomRowKey(rdata[i]);
									}
								}
							} else {
								api.responses = [];
							}
							this.apis.push(api);
						}
					} else {
						this.$message.error(this.$t('FailedToGetGroupInfo') + ':' + data.msg);
					}
					this.dialogCreateGroupVisible = false;
				},
				err => {
					this.$message.error(this.$t('FailedToGetGroupInfoSeeConsole'));
					console.log(err);
					this.dialogCreateGroupVisible = false;
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
					reqData.projectId = this.projectId;
					reqData.sorts = this.groupData.sorts;
					reqData.name = this.groupData.name;
					reqData.summary = this.groupData.summary;
					reqData.description = this.groupData.description;
					if ((this.groupData.externalUrl != null && this.groupData.externalUrl != '') || (this.groupData.externalDesc != null && this.groupData.externalDesc != '')) {
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
							console.log('new group...');
							console.log(data);
							if (data.code == 200) {
								this.loadProjectGroups(this.projectId);
								this.groupData = {};
							} else {
								this.$message.error(this.$t('FailedToAdd') + ':' + data.msg);
							}
							this.dialogCreateGroupVisible = false;
						},
						err => {
							this.$message.error(this.$t('FailedToAddSeeConsole'));
							console.log(err);
							this.dialogCreateGroupVisible = false;
						}
					);
				}
			});
		},
		/**
		 * 显示分组修改
		 * @param {Object} group
		 */
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
					reqData.projectId = this.projectId;
					reqData.groupId = this.groupData.groupId;
					reqData.name = this.groupData.name;
					reqData.summary = this.groupData.summary;
					reqData.sorts = this.groupData.sorts;
					reqData.description = this.groupData.description;
					if ((this.groupData.externalUrl != null && this.groupData.externalUrl != '') || (this.groupData.externalDesc != null && this.groupData.externalDesc != '')) {
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
							console.log('modify group ...');
							console.log(data);
							if (data.code == 200) {
								this.loadProjectGroups(this.projectId);
								this.group = reqData;
								this.$message.success(this.$t('ModifySuccess'));
							} else {
								this.$message.error(this.$t('FailedToModify') + ':' + data.msg);
							}
							this.dialogCreateGroupVisible = false;
						},
						err => {
							this.$message.error(this.$t('FailedToModifySeeConsole'));
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
			this.$confirm(this.$t('DeleteConfirm'), this.$t('Tips'), {
				confirmButtonText: this.$t('Confirm'),
				cancelButtonText: this.$t('Cancel'),
				type: 'warning'
			})
				.then(() => {
					daleteApiGroup(
						gid,
						res => {
							console.log('delete group ...');
							console.log(data);
							var data = res.data;
							if (data.code == 200) {
								this.$message.success(this.$t('DeleteSuccess'));
								location.reload();
							} else {
								this.$message.error(this.$t('FailedToDelete') + ':' + data.msg);
							}
						},
						err => {
							this.$message.error(this.$t('FailedToModifySeeConsole'));
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
					console.log('group move up...');
					console.log(data);
					if (data.code == 200) {
						this.$message.success(this.$t('MoveSuccess'));
						this.loadProjectGroups(this.projectId);
					} else {
						this.$message.error(this.$t('MoveFailed') + ':' + data.msg);
					}
				},
				err => {
					this.$message.error(this.$t('MoveFailedSeeConsole'));
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
					console.log('group move down...');
					console.log(data);
					if (data.code == 200) {
						this.$message.success(this.$t('MoveSuccess'));
						this.loadProjectGroups(this.projectId);
					} else {
						this.$message.error(this.$t('MoveFailed') + ':' + data.msg);
					}
				},
				err => {
					this.$message.error(this.$t('MoveFailedSeeConsole'));
					console.log(err);
				}
			);
		},
		/**
		 * 提交删除API
		 * @param {Object} aid
		 */
		apiDeleteSubmit(aid) {
			this.$confirm(this.$t('DeleteConfirm'), this.$t('Tips'), {
				confirmButtonText: this.$t('Confirm'),
				cancelButtonText: this.$t('Cancel'),
				type: 'warning'
			})
				.then(() => {
					deleteAPI(
						aid,
						res => {
							var data = res.data;
							console.log('delete API...');
							console.log(data);
							if (data.code == 200) {
								this.$message.success(this.$t('DeleteSuccess'));
								this.findApisAndLoad(this.group.groupId);
							} else {
								this.$message.error(this.$t('FailedToDelete') + ':' + data.msg);
							}
						},
						err => {
							this.$message.error(this.$t('FailedToModifySeeConsole'));
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
					console.log('API move up...');
					console.log(data);
					if (data.code == 200) {
						this.$message.success(this.$t('MoveSuccess'));
						this.findApisAndLoad(this.group.groupId);
					} else {
						this.$message.error(this.$t('MoveFailed') + ':' + data.msg);
					}
				},
				err => {
					this.$message.error(this.$t('MoveFailedSeeConsole'));
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
					console.log('API move down...');
					console.log(data);
					if (data.code == 200) {
						this.$message.success(this.$t('MoveSuccess'));
						this.findApisAndLoad(this.group.groupId);
					} else {
						this.$message.error(this.$t('MoveFailed') + ':' + data.msg);
					}
				},
				err => {
					this.$message.error(this.$t('MoveFailedSeeConsole'));
					console.log(err);
				}
			);
		},
		/**
		 * 递归响应的数据并给数据创建id
		 * @param {Object} data
		 */
		recursionCreateTableRandomRowKey(data) {
			data.tableRowKeyId = 'rowkey-' + Math.random();
			if (data.items == null) {
				return data;
			}
			for (var i = 0; i < data.items.length; i++) {
				this.recursionCreateTableRandomRowKey(data.items[i]);
			}
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
}

.alink:active,
.alink:hover {
	outline-width: 0;
	opacity: 0.8;
}

.group-items {
	margin-top: 5px;
	padding: 0;
	list-style-type: none;
}

.group-items li {
	display: flex;
	align-items: center;
	padding: 5px 0 3px 5px;
	border-left: 3px solid transparent;
	cursor: pointer;
}

.group-items li .group-item {
	padding-bottom: 2px;
	border-bottom: 2px solid transparent;
}

.group-items li:hover .group-item {
	color: #409eff;
	border-bottom: 2px solid #409eff;
}

.group-items .current {
	color: #409eff;
	border-left: 3px solid #409eff;
}

.td-item {
	text-align: right;
	padding-right: 5px;
}
</style>
