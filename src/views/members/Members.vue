<template>
	<div style="width: 98%; max-width: 1240px;padding: 10px 0;margin:auto;">
		<div style="padding-left: 5px;margin-bottom: 15px;">
			<div style="display: flex;justify-content: center;align-items: center;margin-bottom: 5px;">
				<div>{{ $t('TagList') }}: {{ tagsList.length || 0 }}</div>
				<div style="margin-left: auto;">
					<div style="display: flex;">
						<el-button type="primary" @click="showNewTags">{{ $t('NewTags') }}</el-button>
					</div>
				</div>
			</div>
			<div>
				<el-popover placement="left-start" trigger="click" v-for="tag in tagsList" :key="tag.tid">
					<el-button size="mini" @click="loadUserByTag(tag.tid)">{{ $t('QueryUsers') }}</el-button>
					<el-button size="mini" type="primary" @click="showUpdateTags(tag)">{{ $t('Modify') }}</el-button>
					<el-button size="mini" type="danger" @click="deleteTagSubmit(tag)">{{ $t('Delete') }}</el-button>
					<el-link slot="reference" style="margin-right: 10px;">{{ tag.tname }}</el-link>
				</el-popover>
			</div>
		</div>
		<div style="display: flex;justify-content: center;align-items: center;margin-bottom: 5px;">
			<div style="padding-left: 5px;">{{ $t('UserList') }}: {{ pages.totals }}</div>
			<div style="margin-left: auto;">
				<div style="display: flex;">
					<div style="margin-right: 5px;">
						<el-input :placeholder="$t('SearchUsersAllByDefault')" v-model="keywords" class="input-with-select" clearable>
							<el-button slot="append" icon="el-icon-search" @click="loadUserBySearch()"></el-button>
						</el-input>
					</div>
					<el-button type="primary" @click="showNewMembers">{{ $t('NewUsers') }}</el-button>
				</div>
			</div>
		</div>
		<div>
			<div style="padding-left: 5px;">
				<el-table :data="membersList" style="width: 100%" border>
					<el-table-column prop="uid" :label="$t('Account')"></el-table-column>
					<el-table-column prop="nickname" :label="$t('Nickname')"></el-table-column>
					<el-table-column prop="role" :label="$t('UserRole')">
						<template slot-scope="scope">
							<span>{{ scope.row.role == 'SERVER' ? $t('Administrator') : $t('CommonUser') }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="summary" :label="$t('UserSummary')"></el-table-column>
					<el-table-column prop="contact" :label="$t('UserContact')"></el-table-column>
					<el-table-column prop="lasttime" :label="$t('LastLoginTime')">
						<template slot-scope="scope">
							<span>{{ formatDate(scope.row.lasttime) }}</span>
						</template>
					</el-table-column>
					<el-table-column :label="$t('Operation')" width="120">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="showUpdateMembers(scope.row)">{{ $t('Edit') }}</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-pagination
				v-show="pages.pages > 1"
				@current-change="handleCurrentChange"
				:current-page.sync="pages.page"
				:page-size="pages.size"
				:total="pages.totals"
				layout="prev, pager, next, jumper"
				background
				style="margin-top: 5px;margin-left: 0;padding-left: 0;"
			></el-pagination>
		</div>

		<!-- 新增标签或修改标签的弹窗 -->
		<el-dialog :title="dialogMode == 'view' ? $t('ModifyTags') : $t('NewTags')" :visible.sync="dialogTagsVisible">
			<el-form :model="tagData" :rules="tagDataRules" label-width="100px" ref="tagsEditForm">
				<el-form-item :label="$t('TagsName')" prop="tname"><el-input v-model="tagData.tname" :placeholder="$t('EnterTagsName')"></el-input></el-form-item>
				<el-form-item :label="$t('TagsSorts')" prop="sorts"><el-input v-model="tagData.sorts" type="number" :placeholder="$t('EnterTagsRanking')"></el-input></el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="danger" v-show="isShowDeleteBtn()">{{ $t('Delete') }}</el-button>
				<el-button @click="dialogTagsVisible = false">{{ $t('Cancel') }}</el-button>
				<el-button type="primary" @click="createTagSubmit" v-show="dialogMode == 'edit'">{{ $t('Submit') }}</el-button>
				<el-button type="primary" @click="updateTagSubmit" v-show="dialogMode == 'view'">{{ $t('SubmitModify') }}</el-button>
			</div>
		</el-dialog>

		<!-- 新增用户或修改用户的弹窗 -->
		<el-dialog :title="dialogMode == 'view' ? $t('ModifyUsers') : $t('NewUsers')" :visible.sync="dialogVisible">
			<el-form :model="membersData" :rules="membersDataRules" label-width="100px" ref="membersEditForm">
				<el-form-item :label="$t('Account')" prop="uid">
					<el-input @blur="membersData.uid=membersData.uid.replace('X-','')" v-model="membersData.uid" :placeholder="$t('EnterAccount')" :disabled="dialogMode == 'view'"></el-input>
				</el-form-item>
				<el-form-item :label="$t('Password')" prop="pwd"><el-input v-model="membersData.pwd" :placeholder="$t('EnterPassword')"></el-input></el-form-item>
				<el-form-item :label="$t('Nickname')" prop="nickname"><el-input v-model="membersData.nickname" :placeholder="$t('EnterNickname')"></el-input></el-form-item>
				<el-form-item :label="$t('UserContact')" prop="contact"><el-input v-model="membersData.contact" :placeholder="$t('EnterUserContact')"></el-input></el-form-item>
				<el-form-item :label="$t('UserSummary')" prop="summary">
					<el-input type="textarea" v-model="membersData.summary" :placeholder="$t('EnterUserSummary')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('UserTags')" prop="tags">
					<el-select v-model="membersData.tags" :placeholder="$t('Select')" style="width: 100%;" multiple>
						<el-option v-for="tag in tagsList" :key="tag.tid" :value="tag.tid" :label="tag.tname"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('UserRole')" prop="role">
					<el-select v-model="membersData.role" :placeholder="$t('Select')" style="width: 100%;">
						<el-option value="CLIENT" :label="$t('CommonUser')" v-if="userRole == 'ROOT'"></el-option>
						<el-option value="SERVER" :label="$t('Administrator')"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="danger" v-show="isShowDeleteBtn()" @click="deleteSubmit(membersData.uid)">{{ $t('Delete') }}</el-button>
				<el-button @click="dialogVisible = false">{{ $t('Cancel') }}</el-button>
				<el-button type="primary" @click="createSubmit" v-show="dialogMode == 'edit'">{{ $t('Submit') }}</el-button>
				<el-button type="primary" @click="updateSubmit" v-show="dialogMode == 'view' && isShowDeleteBtn()">{{ $t('SubmitModify') }}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import MD5 from '@/utils/md5.js';
import { findTagsAPI, getTagAPI, postTagAPI, putTagAPI, deleteTagAPI, findUsersAPI, getUserAPI, postUserAPI, putUserAPI, deleteUserAPI } from '@/api/Members';
import { datetimeFormat } from '@/utils/DataFormat';
import store from '@/store/index.js';
/**查看模式*/
const MODE_VIEW = 'view';
/**编辑模式*/
const MODE_EDIT = 'edit';

export default {
	data() {
		var validatePass = (rule, value, callback) => {
			if (value == null) {
				value = '';
			}
			if (this.dialogMode == MODE_VIEW && value.trim().length == 0) {
				callback();
			} else if (value.length < 4 || value.length > 32) {
				var tips = this.$t('PasswordRequires_4_32');
				callback(new Error(tips));
			} else {
				callback();
			}
		};
		return {
			/**项目是否加载中*/
			listLoading: true,
			/**用户的角色*/
			userRole: store.getters.role,
			/**弹窗的模式*/
			dialogMode: MODE_EDIT,
			/**是否显示标签弹窗*/
			dialogTagsVisible: false,
			/**是否显示弹窗*/
			dialogVisible: false,
			/**搜索的选中的标签*/
			tagid: '',
			/**搜索的关键字*/
			keywords: '',
			/**新增或修改标签数据*/
			tagData: {},
			/**标签的表单检查*/
			tagDataRules: {
				tname: [
					{
						required: true,
						message: this.$t('EnterTagsName'),
						trigger: 'blur'
					}
				]
			},
			/**用户的表单检查*/
			membersDataRules: {
				uid: [
					{
						required: true,
						message: this.$t('AccountRequires_4_32'),
						trigger: 'blur'
					},
					{ min: 4, max: 32, message: this.$t('AccountRequires_4_32'), trigger: 'blur' }
				],
				pwd: [{ validator: validatePass, trigger: 'blur' }],
				nickname: [
					{
						required: true,
						message: this.$t('EnterTheGroupName'),
						trigger: 'blur'
					}
				],
				contact: [
					{
						required: true,
						message: this.$t('EnterGroupSummary'),
						trigger: 'blur'
					}
				]
			},
			/**
			 * 新建或编辑用户数据
			 */
			membersData: {
				role: 'CLIENT'
			},
			/**
			 * 标签列表
			 */
			tagsList: [],
			/**
			 * 分页信息
			 */
			pages: {
				totals: 0,
				pages: 0,
				page: 1,
				size: 30
			},
			/**项目列表*/
			membersList: []
		};
	},
	created() {
		var role = store.getters.role;
		if (role != 'ROOT' && role != 'SERVER') {
			this.$router.push('/index');
		} else {
			this.findTags();
			this.findUser();
		}
	},
	methods: {
		/**
		 * 是否显示用户删除按钮
		 */
		isShowDeleteBtn() {
			if (this.dialogMode == MODE_VIEW) {
				if (this.userRole == 'ROOT' || (this.userRole == 'SERVER' && this.membersData.role == 'CLIENT')) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
		/**
		 * 获取所有标签
		 */
		findTags() {
			findTagsAPI(
				resp => {
					var data = resp.data;
					console.log('load tags...');
					console.log(data);
					if (data.code == 200) {
						this.tagsList = data.data;
					} 
				},
				err => {
					this.$message.error(this.$t('FailedToLoadSeeConsole'));
					console.log(err);
				}
			);
		},
		/**
		 * 加载指定标签的用户
		 * @param {Object} tid
		 */
		loadUserByTag(tid) {
			this.tagid = tid;
			this.findUser({ tid: this.tagid });
		},
		/**
		 * 搜索并加载用户
		 */
		loadUserBySearch() {
			if (this.keywords == '') {
				this.tagid='';
				this.findUser();
			} else {
				this.findUser({ keywords: this.keywords });
			}
		},
		/**
		 * 分页点击查询事件
		 * @param {Object} val
		 */
		handleCurrentChange(val) {
			var data = { page: val };
			if (this.tagid != '') {
				data.tid = this.tagid;
			}
			if (this.keywords != '') {
				data.keywords = this.keywords;
			}
			this.findUser(data);
		},
		/**
		 * 获取用户列表
		 * tag(String):'标签的id'
		 * keywords(String):'用户的名称关键字'
		 * page(int):第几页
		 *
		 * @param {Object} data
		 */
		findUser(data) {
			console.log('find user:');
			console.log(data);
			findUsersAPI(
				data,
				resp => {
					var data = resp.data;
					console.log('load tags...');
					console.log(data);
					if (data.code == 200) {
						var res = data.data;
						this.pages.totals = res.totals;
						this.pages.pages = res.pages;
						this.pages.page = res.page;
						this.pages.size = res.size;
						this.membersList = res.data || [];
					} 
				},
				err => {
					this.$message.error(this.$t('FailedToLoadSeeConsole'));
					console.log(err);
				}
			);
		},
		/**
		 * 新增标签
		 */
		showNewTags() {
			this.dialogTagsVisible = true;
			this.dialogMode = MODE_EDIT;
			this.tagData = {};
			this.$nextTick(() => {
				this.$refs.tagsEditForm.clearValidate();
			});
		},
		/**
		 * 新增用户
		 */
		showNewMembers() {
			this.dialogVisible = true;
			this.dialogMode = MODE_EDIT;
			this.membersData = {
				role: 'CLIENT'
			};
			this.$nextTick(() => {
				this.$refs.membersEditForm.clearValidate();
			});
		},
		/**
		 * 新增标签
		 */
		showUpdateTags(data) {
			console.log(data);
			this.dialogTagsVisible = true;
			this.dialogMode = MODE_VIEW;
			this.tagData = JSON.parse(JSON.stringify(data));
			this.$nextTick(() => {
				this.$refs.tagsEditForm.clearValidate();
			});
		},
		/**
		 * 查看与修改用户
		 * @param {Object} data
		 */
		showUpdateMembers(data) {
			this.dialogVisible = true;
			this.dialogMode = MODE_VIEW;
			this.membersData = data;
			if (this.membersData.tags) {
				this.membersData.tags = JSON.parse(this.membersData.tags);
			}
			this.$nextTick(() => {
				this.$refs.membersEditForm.clearValidate();
			});
		},
		/**
		 * 提交新建标签
		 */
		createTagSubmit() {
			this.$refs.tagsEditForm.validate(valid => {
				if (valid) {
					var sorts = parseInt(this.tagData.sorts) || 0;
					var tname = this.tagData.tname;
					var reqdata = { tname: tname, sorts: sorts };
					console.log('new tag...');
					console.log(reqdata);
					postTagAPI(
						reqdata,
						resp => {
							var data = resp.data;
							console.log('new tag result...');
							console.log(data);
							if (data.code == 200) {
								this.$message.success(this.$t('AddSuccess'));
								this.dialogTagsVisible = false;
								this.findTags();
							} 
						},
						err => {
							this.$message.error(this.$t('FailedToAddSeeConsole'));
							console.log(err);
						}
					);
				} else {
					this.$message.warning(this.$t('MissingRequiredInformation'));
				}
			});
		},
		/**
		 * 提交修改标签
		 */
		updateTagSubmit() {
			this.$refs.tagsEditForm.validate(valid => {
				if (valid) {
					var sorts = parseInt(this.tagData.sorts) || 0;
					var tname = this.tagData.tname;
					var reqdata = { tid: this.tagData.tid, tname: tname, sorts: sorts };
					console.log('update tag...');
					console.log(reqdata);
					putTagAPI(
						reqdata,
						resp => {
							var data = resp.data;
							console.log('update tag result...');
							console.log(data);
							if (data.code == 200) {
								this.$message.success(this.$t('ModifySuccess'));
								this.dialogTagsVisible = false;
								this.findTags();
							} 
						},
						err => {
							this.$message.error(this.$t('FailedToModifySeeConsole'));
							console.log(err);
						}
					);
				} else {
					this.$message.warning(this.$t('MissingRequiredInformation'));
				}
			});
		},
		/**
		 * 提交删除标签
		 * @param {Object} tag
		 */
		deleteTagSubmit(tag) {
			this.$confirm(this.$t('DeleteConfirm'), this.$t('Tips'), {
				confirmButtonText: this.$t('Confirm'),
				cancelButtonText: this.$t('Cancel'),
				type: 'warning'
			})
				.then(() => {
					console.log('delete: ' + tag.tid);
					deleteTagAPI(
						tag.tid,
						res => {
							var data = res.data;
							console.log('delete tag result...');
							console.log(data);
							if (data.code == 200) {
								this.$message.success(this.$t('DeleteSuccess'));
								this.findTags();
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
		 * 提交新建用户
		 */
		createSubmit() {
			this.$refs.membersEditForm.validate(valid => {
				if (valid) {
					console.log('new user...');
					console.log(this.membersData);
					var reqdata = JSON.parse(JSON.stringify(this.membersData));
					if (reqdata.tags) {
						reqdata.tags = JSON.stringify(reqdata.tags);
					}
					reqdata.pwd = MD5(reqdata.pwd);
					postUserAPI(
						reqdata,
						resp => {
							var data = resp.data;
							console.log('new user result...');
							console.log(data);
							if (data.code == 200) {
								this.$message.success(this.$t('AddSuccess'));
								this.dialogVisible = false;
								this.findUser();
							} 
						},
						err => {
							this.$message.error(this.$t('FailedToAddSeeConsole'));
							console.log(err);
						}
					);
				} else {
					this.$message.warning(this.$t('MissingRequiredInformation'));
				}
			});
		},
		/**
		 * 提交修改用户
		 */
		updateSubmit() {
			this.$refs.membersEditForm.validate(valid => {
				if (valid) {
					console.log('update user...');
					console.log(this.membersData);
					var reqdata = JSON.parse(JSON.stringify(this.membersData));
					if (reqdata.tags) {
						reqdata.tags = JSON.stringify(reqdata.tags);
					}
					if (reqdata.pwd != null && reqdata.pwd != '') {
						reqdata.pwd = MD5(reqdata.pwd);
					}
					putUserAPI(
						reqdata,
						resp => {
							var data = resp.data;
							console.log('update user result...');
							console.log(data);
							if (data.code == 200) {
								this.$message.success(this.$t('ModifySuccess'));
								this.dialogVisible = false;
								this.findUser();
							} 
						},
						err => {
							this.$message.error(this.$t('FailedToModifySeeConsole'));
							console.log(err);
						}
					);
				} else {
					this.$message.warning(this.$t('MissingRequiredInformation'));
				}
			});
		},
		/**
		 * 提交删除用户
		 * @param {Object} uid
		 */
		deleteSubmit(uid) {
			this.$confirm(this.$t('DeleteConfirm'), this.$t('Tips'), {
				confirmButtonText: this.$t('Confirm'),
				cancelButtonText: this.$t('Cancel'),
				type: 'warning'
			})
				.then(() => {
					console.log('delete user: ' + uid);
					deleteUserAPI(
						uid,
						res => {
							var data = res.data;
							console.log('delete user result...');
							console.log(data);
							if (data.code == 200) {
								this.$message.success(this.$t('DeleteSuccess'));
								this.dialogVisible = false;
								this.findUser();
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
		 * 时间显示格式化
		 * @param {Object} time
		 */
		formatDate(time) {
			if (time == null || time == '') {
				return '';
			}
			return datetimeFormat(time);
		}
	}
};
</script>

<style></style>
