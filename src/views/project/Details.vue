<template>
	<div>
		<div style="width: 98%; max-width: 1240px;padding: 10px 0;margin: auto;display: flex;align-items: center;">
			<div>
				<b>{{ mode === 'edit' ? $t('ModifyProject') : $t('ProjectInformation') }}</b>
			</div>
			<div style="margin-left: auto;">
				<div v-show="mode === 'view'">
					<el-button size="mini" type="primary" @click="copySubmit()">{{ $t('MakeACopy') }}</el-button>
					<el-button size="mini" type="primary" @click="mode = 'edit'">{{ $t('Modify') }}</el-button>
					<el-button size="mini" type="danger" @click="deleteSubmit()">{{ $t('Delete') }}</el-button>
				</div>
				<div v-show="mode === 'edit'">
					<el-button size="mini" @click="mode = 'view'">{{ $t('Cancel') }}</el-button>
				</div>
			</div>
		</div>
		<div style="width: 98%; max-width: 1240px;margin: auto">
			<!-- 显示的属性 -->
			<table v-show="mode === 'view'" style="width: 100%;" cellspacing="10">
				<tr>
					<td width="120px" class="project-item">{{ $t('ProjectName') }}</td>
					<td>
						{{ project.name }}
						<span style="font-size: 0.8em;">{{ project.versions }}</span>
					</td>
				</tr>
				<tr v-show="project.lastTime">
					<td class="project-item">{{ $t('LastUpdateTime') }}</td>
					<td>{{ formatDate(project.lastTime) }}</td>
				</tr>
				<tr v-show="project.description" valign="top">
					<td width="120px" class="project-item">{{ $t('ProjectDescription') }}</td>
					<td v-html="project.description"></td>
				</tr>
				<tr>
					<td class="project-item" valign="top">{{ $t('Servers') }}</td>
					<td>
						<div v-for="(item, idx) in project.servers" :key="idx">
							<div>{{ item.url }}</div>
							<div v-show="item.description" style="color: #888;">{{ item.description }}</div>
						</div>
					</td>
				</tr>
				<tr v-show="project.contactName">
					<td class="project-item">{{ $t('Contacts') }}</td>
					<td>{{ project.contactName }}</td>
				</tr>
				<tr v-show="project.contactInfo">
					<td class="project-item">{{ $t('ContactInfo') }}</td>
					<td v-html="project.contactInfo"></td>
				</tr>
				<tr v-show="project.exDdescription && project.exDurl">
					<td class="project-item" valign="top">{{ $t('ExtDocsDesc') }}</td>
					<td>
						<div v-show="project.exDdescription" v-html="project.exDdescription"></div>
						<a v-show="project.exDurl" :href="project.exDurl" target="_blank" class="alink" style="margin-left: 0;">{{ projectEdit.exDurl }}</a>
					</td>
				</tr>
				<tr>
					<td class="project-item">{{ $t('Operation') }}</td>
					<td>
						<a :href="'/project/downJson/' + project.key" class="alink" style="margin-left: 0;">{{ $t('ExportDocument') }}</a>
						<a :href="'/Client-UI/index.html?id=' + project.key" target="_blank" class="alink">{{ $t('OpenOnClient') }}</a>
					</td>
				</tr>
			</table>

			<!-- 修改的属性 -->
			<el-form v-show="mode === 'edit'" ref="projectEditForm" :rules="editRules" :model="projectEdit" label-width="120px">
				<el-form-item :label="$t('ProjectName')" prop="name"><el-input v-model="projectEdit.name" :placeholder="$t('EnterProjectName')"></el-input></el-form-item>
				<el-form-item :label="$t('ProjectVersion')" prop="versions"><el-input v-model="projectEdit.versions" :placeholder="$t('EnterProjectVersion')"></el-input></el-form-item>
				<el-form-item :label="$t('ProjectRanking')" prop="sorts"><el-input v-model.number="projectEdit.sorts" :placeholder="$t('EnterProjectRanking')"></el-input></el-form-item>
				<el-form-item :label="$t('ProjectDescription')" prop="description">
					<el-input v-model="projectEdit.description" type="textarea" :placeholder="$t('EnterProjectDescription')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('Servers')" prop="servers">
					<template>
						<div style="border: 1px solid #DCDFE6;padding: 5px;margin-bottom: 5px;" v-for="(server, idx) in projectEdit.servers" :key="idx">
							<el-input v-model="server.url" :placeholder="$t('EnterHostAddress')"></el-input>
							<el-input v-model="server.description" :placeholder="$t('EnterHostDescription')" class="novalidate"></el-input>
							<div style="text-align: right;padding-top: 3px;">
								<el-button size="mini" @click="removeServer(idx)">{{ $t('Remove') }}</el-button>
							</div>
						</div>
						<div style="text-align: right;">
							<el-button size="medium" @click="addServer()">{{ $t('AddMore') }}</el-button>
						</div>
					</template>
				</el-form-item>
				<el-form-item :label="$t('Contacts')" prop="contactName"><el-input v-model="projectEdit.contactName" :placeholder="$t('EnterContacts')"></el-input></el-form-item>
				<el-form-item :label="$t('ContactInfo')" prop="contactInfo"><el-input v-model="projectEdit.contactInfo" :placeholder="$t('EnterContactInfo')"></el-input></el-form-item>
				<el-form-item :label="$t('ExtDocsURL')" prop="exDurl"><el-input v-model="projectEdit.exDurl" :placeholder="$t('EnterExtDocsURL')"></el-input></el-form-item>
				<el-form-item :label="$t('ExtDocsDesc')" prop="exDdescription">
					<el-input v-model="projectEdit.exDdescription" type="textarea" :autosize="{ minRows: 2, maxRows: 10 }" :placeholder="$t('EnterExtDocsDesc')"></el-input>
				</el-form-item>
				<el-form-item>
					<div style="text-align: center;">
						<el-button type="primary" @click="updateSubmit()">{{ $t('SubmitModify') }}</el-button>
					</div>
				</el-form-item>
			</el-form>
		</div>
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

		<!-- 分组列表 -->
		<div v-show="mode === 'view'" style="width: 98%; max-width: 1240px;margin: auto;">
			<div style="padding: 10px 0;display: flex;align-items: center;">
				<div>
					<b>{{ $t('GroupList') }}</b>
				</div>
				<div style="margin-left: auto;">
					<div v-show="mode === 'view'">
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
								<el-button size="mini" @click="groupMoveUp(g.groupId)">{{ $t('MoveUp') }}</el-button>
								<el-button size="mini" @click="groupMoveDown(g.groupId)">{{ $t('MoveDown') }}</el-button>
								<el-button size="mini" type="primary" @click="showGroupUpdateDialog(g)">{{ $t('ModifyGroup') }}</el-button>
								<el-button size="mini" type="danger" @click="groupDeleteSubmit(g.groupId)">{{ $t('DeleteGroup') }}</el-button>
								<el-button size="mini" type="primary" style="margin-left: auto;" @click="$router.push({ path: `/index/post/project/api/${project.key}/${g.groupId}` })">
									{{ $t('NewApi') }}
								</el-button>
							</div>
							<!-- 分组的描述 -->
							<p v-html="g.description"></p>
							<!-- 拓展文档 -->
							<div v-if="g.externalDocs != null">
								<div v-if="JSON.parse(g.externalDocs).description != null" v-html="JSON.parse(g.externalDocs).description"></div>
								<a v-if="JSON.parse(g.externalDocs).url != null" :href="JSON.parse(g.externalDocs).url" target="_blank" class="alink" style="margin-left: 0;">
									{{ JSON.parse(g.externalDocs).url }}
								</a>
							</div>
						</div>
						<!-- 接口列表 -->
						<div v-for="api in g.apis" :key="api.apiId" style="margin-bottom: 10px;">
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
									<a :href="'#/index/put/project/api/' + project.key + '/' + api.groupId + '/' + api.apiId" style="margin:0 10px;">
										<el-button size="mini" type="primary">{{ $t('Modify') }}</el-button>
									</a>
									<el-button size="mini" @click="apiMoveUp(api.apiId)">{{ $t('MoveUp') }}</el-button>
									<el-button size="mini" @click="apiMoveDown(api.apiId)">{{ $t('MoveDown') }}</el-button>
									<!-- 		<a :href="'#/index/get/project/api/'+project.key+'/'+api.groupId+'/'+api.apiId" target="_blank" style="margin-left: 10px;">
											<el-button size="mini" type="primary">查看详情</el-button>
										</a> -->
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
import { datetimeFormat } from '@/utils/DataFormat';
/**查看模式*/
const MODE_VIEW = 'view';
/**编辑模式*/
const MODE_EDIT = 'edit';
export default {
	data() {
		var validateServers = (rule, value, callback) => {
			var flag = false;
			if (value != null) {
				for (var i = 0; i < value.length; i++) {
					if (value[i].url.trim() != '') {
						flag = true;
						break;
					}
				}
			}
			if (flag) {
				callback();
			} else {
				callback(new Error(this.$t('LeastOneHostAddress')));
			}
		};
		return {
			/**查看项目的属性*/
			project: {},
			/**编辑的项目属性*/
			projectEdit: {},
			/**项目信息表达校验*/
			editRules: {
				name: [
					{
						required: true,
						message: this.$t('EnterProjectName'),
						trigger: 'blur'
					}
				],
				versions: [
					{
						required: true,
						message: this.$t('EnterProjectVersion'),
						trigger: 'blur'
					}
				],
				servers: [
					{
						required: true,
						validator: validateServers,
						trigger: 'blur'
					}
				]
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
			/**分组与接口合集*/
			groups: [],
			/**分组列表加载中*/
			groupsLoading: true
		};
	},
	created() {
		var pid = this.$route.params.pid;
		if (pid == null) {
			this.$message.warning(this.$t('FailedToLoadTheProjectInvalidID'));
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
					console.log('get project...');
					console.log(data);
					if (data.code == 200) {
						if (data.data == null) {
							this.$message.error(this.$t('FailedToLoadTheProjectInvalidID'));
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
						this.$message.error(this.$t('FailedToGetProjectInfo') + ':' + data.msg);
					}
				},
				err => {
					this.$message.error(this.$t('FailedToGetProjectInfoSeeConsole'));
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
				this.$confirm(this.$t('RemoveConfirm'), this.$t('Tips'), {
					confirmButtonText: this.$t('Confirm'),
					cancelButtonText: this.$t('Cancel'),
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
					console.log('Modify project...');
					console.log(reqData);
					updateProjectAPI(
						reqData,
						res => {
							console.log(data);
							var data = res.data;
							if (data.code == 200) {
								this.$message.success(this.$t('ModifySuccess'));
								this.loadProject(reqData.key);
								this.mode = MODE_VIEW;
							} else {
								this.$message.error(this.$t('FailedToAdd') + ':' + data.msg);
							}
						},
						err => {
							this.$message.error(this.$t('FailedToModifySeeConsole'));
							console.log(err);
						}
					);
				} else {
					this.$message.error(this.$t('MissingRequiredInformation'));
					return false;
				}
			});
		},
		copySubmit() {
			this.$confirm(this.$t('CopyConfirm'), this.$t('Tips'), {
				confirmButtonText: this.$t('Confirm'),
				cancelButtonText: this.$t('Cancel'),
				type: 'warning'
			})
				.then(() => {
					copyProjectAPI(
						this.project.key,
						res => {
							console.log(data);
							var data = res.data;
							if (data.code == 200) {
								this.$message.success(this.$t('CopySuccess'));
								this.$router.push('/index');
							} else {
								this.$message.error(this.$t('CopyFailed') + ':' + data.msg);
							}
						},
						er => {
							this.$message.error(this.$t('FailedToModifySeeConsole'));
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
			this.$confirm(this.$t('DeleteConfirm'), this.$t('Tips'), {
				confirmButtonText: this.$t('Confirm'),
				cancelButtonText: this.$t('Cancel'),
				type: 'warning'
			})
				.then(() => {
					deleteProjectAPI(
						this.project.key,
						res => {
							console.log(data);
							var data = res.data;
							if (data.code == 200) {
								this.$message.success(this.$t('DeleteSuccess'));
								this.$router.push('/index');
							} else {
								this.$message.error(this.$t('FailedToDelete') + ':' + data.msg);
							}
						},
						er => {
							this.$message.error(this.$t('FailedToModifySeeConsole'));
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
					console.log('get project list...');
					console.log(data);
					if (data.code == 200) {
						for (var g = 0; g < data.data.length; g++) {
							for (var a = 0; a < data.data[g].apis.length; a++) {
								var api = data.data[g].apis[a];
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
							}
						}
						this.groups = data.data;
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
								this.loadProjectGroups(pid);
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
								this.loadProjectGroups(pid);
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
								this.loadProjectGroups(this.project.key);
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
						this.loadProjectGroups(this.project.key);
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
						this.loadProjectGroups(this.project.key);
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
								this.loadProjectGroups(this.project.key);
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
						this.loadProjectGroups(this.project.key);
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
						this.loadProjectGroups(this.project.key);
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

.novalidate input {
	border-color: #dcdfe6 !important;
}

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
