<template>
	<div style="width: 98%; max-width: 1240px;margin: auto;padding-top: 15px;">
		<el-form ref="projectEditForm" :rules="editRules" :model="projectEdit" label-width="120px">
			<el-form-item :label="$t('ProjectName')" prop="name"><el-input v-model="projectEdit.name" :placeholder="$t('EnterProjectName')"></el-input></el-form-item>
			<el-form-item :label="$t('ProjectVersion')" prop="versions"><el-input v-model="projectEdit.versions" :placeholder="$t('EnterProjectVersion')"></el-input></el-form-item>
			<el-form-item :label="$t('ProjectRanking')" prop="sorts"><el-input v-model.number="projectEdit.sorts" :placeholder="$t('EnterProjectRanking')"></el-input></el-form-item>
			<el-form-item :label="$t('ProjectDescription')" prop="description">
				<el-input v-model="projectEdit.description" type="textarea" :placeholder="$t('EnterProjectDescription')"></el-input>
			</el-form-item>
			<el-form-item :label="$t('Owner')" prop="owner" v-if="userRole == 'ROOT'">
				<el-select filterable v-model="projectEdit.owner" :placeholder="$t('SelectOwner')" style="width:100%">
					<el-option v-for="item in userList" :key="item.uid" :label="item.nickname" :value="item.uid"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item :label="$t('ProjectAllowedTags')" prop="owners">
				<el-select v-model="projectEdit.owners" multiple :placeholder="$t('SelectTheUserAllowedToAccessAllByDefault')" style="width:100%">
					<el-option v-for="item in userTags" :key="item.tid" :label="item.tname" :value="item.tid"></el-option>
				</el-select>
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
					<el-button type="primary" @click="saveSubmit()">{{ $t('Submit') }}</el-button>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { saveProjectAPI } from '@/api/Project';
import { findTagsAPI, findServerUsersAPI } from '@/api/Members';
import store from '@/store/index.js';

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
			/**编辑的项目属性*/
			projectEdit: {
				versions: '1.0.0',
				sorts: 0,
				owners: [],
				servers: [
					{
						url: 'http://127.0.0.1:8080',
						description: ''
					}
				]
			},
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
			/**用户的角色*/
			userRole: '',
			/**用户标签列表*/
			userTags: [],
			/**用户列表*/
			userList: []
		};
	},
	created() {
		var role = store.getters.role;
		if (role != 'ROOT' && role != 'SERVER') {
			this.$router.push('/index');
		} else {
			this.userRole = role;
			this.loadUserTags();
			if (role == 'ROOT') {
				this.loadServerUsers();
			}
		}
	},
	methods: {
		/**
		 * 加载用户标签列表
		 */
		loadUserTags() {
			findTagsAPI(
				resp => {
					var data = resp.data;
					console.log('load tags...');
					console.log(data);
					if (data.code == 200) {
						this.userTags = data.data;
					}
				},
				err => {
					this.$message.error(this.$t('FailedToLoadSeeConsole'));
					console.log(err);
				}
			);
		},
		/**
		 * 加载管理员列表
		 */
		loadServerUsers() {
			findServerUsersAPI(
				res => {
					console.log('load user list...');
					var data = res.data;
					console.log(data);
					if (data.code == 200) {
						this.userList = data.data;
					}
				},
				err => {
					this.$message.error(this.$t('LoadUserListFailed'));
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
		saveSubmit() {
			this.$refs.projectEditForm.validate(valid => {
				if (valid) {
					var reqData = {};
					reqData.name = this.projectEdit.name;
					reqData.versions = this.projectEdit.versions;
					if (this.projectEdit.description != null) {
						reqData.description = this.projectEdit.description;
					}
					if (this.projectEdit.owner != null && this.projectEdit.owner != '') {
						reqData.owner = this.projectEdit.owner;
					}
					reqData.owners = JSON.stringify(this.projectEdit.owners);
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
					if (this.projectEdit.exDdescription != null) {
						exd = {
							description: this.projectEdit.exDdescription
						};
					}
					if (this.projectEdit.exDurl != null) {
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
					console.log('Submit new Project...');
					console.log(reqData);
					saveProjectAPI(
						reqData,
						res => {
							console.log(data);
							var data = res.data;
							if (data.code == 200) {
								this.$confirm(this.$t('AddSuccess'), this.$t('Tips'), {
									confirmButtonText: this.$t('Continued'),
									cancelButtonText: this.$t('BackToList'),
									type: 'success'
								})
									.then(() => {
										this.projectEdit = {
											versions: '1.0.0',
											sorts: 0,
											schemes: []
										};
									})
									.catch(() => {
										this.$router.push('/index');
									});
							}
						},
						err => {
							this.$message.error(this.$t('FailedToAddSeeConsole'));
							console.log(err);
						}
					);
				} else {
					this.$message.warning(this.$t('MissingRequiredInformation'));
					return false;
				}
			});
		},
		closeReturn() {
			return;
		}
	}
};
</script>

<style>
.novalidate input {
	border-color: #dcdfe6 !important;
}
</style>
