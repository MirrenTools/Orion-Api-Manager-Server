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
						<a :href="'#/index/get/groups/' + project.key" class="alink" style="margin-left: 0;">{{ $t('ApiManage') }}</a>
						<a :href="exportServerHost + '/project/downJson/' + project.key" class="alink">{{ $t('ExportDocument') }}</a>
						<a :href="exportServerHost + '/Client-UI/index.html?id=' + project.key" target="_blank" class="alink">{{ $t('OpenOnClient') }}</a>
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
	</div>
</template>

<script>
import { getProjectAPI, saveProjectAPI, copyProjectAPI, updateProjectAPI, deleteProjectAPI } from '@/api/Project';
import { datetimeFormat } from '@/utils/DataFormat';
import store from '@/store/index.js';
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
			exportServerHost: process.env.VUE_APP_BASE_API,
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
			/**分组列表加载中*/
			groupsLoading: true
		};
	},
	created() {
		var role = store.getters.role;
		if (role != 'ROOT' && role != 'SERVER') {
			this.$router.push('/index');
		} else {
			var pid = this.$route.params.pid;
			if (pid == null) {
				this.$message.warning(this.$t('FailedToLoadTheProjectInvalidID'));
				return;
			}
			this.loadProject(pid);
		}
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
		/**
		 * 复制项目
		 */
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
