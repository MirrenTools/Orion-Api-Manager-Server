<template>
	<div style="width: 98%; max-width: 1240px;padding: 10px 0;margin:auto;">
		<div style="text-align: center;" v-show="projectListLoading == true">
			<h2>{{ welcome }}</h2>
			<div>{{ projectListTips }}</div>
		</div>
		<div v-loading="projectListLoading">
			<div style="display: flex;justify-content: center;align-items: center;margin-bottom: 5px;">
				<div>{{ $t('ProjectQuantity') }}{{ projectList.length || 0 }}</div>
				<div style="margin-left: auto;">
					<div v-if="sessionUserRole == 'ROOT' || sessionUserRole == 'SERVER'">
						<router-link class="alink" to="/index/members">
							<el-button type="primary">{{ $t('Members') }}</el-button>
						</router-link>
						<router-link class="alink" to="/index/import">
							<el-button type="primary">{{ $t('ImportAPI') }}</el-button>
						</router-link>
						<router-link class="alink" style="margin-right: 0;" to="/index/new/project">
							<el-button type="primary">{{ $t('NewProjects') }}</el-button>
						</router-link>
					</div>
				</div>
			</div>
			<!-- 项目列表 -->
			<div>
				<el-table :data="projectList" style="width: 100%" border>
					<el-table-column prop="name" :label="$t('ProjectName')" min-width="300"></el-table-column>
					<el-table-column prop="version" :label="$t('ProjectVersion')" width="120"></el-table-column>
					<el-table-column prop="time" :label="$t('LastUpdateTime')" width="200">
						<template slot-scope="scope">
							<span>{{ formatDate(scope.row.time) }}</span>
						</template>
					</el-table-column>
					<el-table-column :label="$t('ProjectRanking')" width="130" v-if="sessionUserRole == 'ROOT' || sessionUserRole == 'SERVER'">
						<template slot-scope="scope">
							<span>{{ scope.row.sorts }}</span>
							&nbsp;
							<el-link
								type="primary"
								:underline="false"
								@click="moveUp(scope.row.key)"
								v-if="sessionUserRole == 'ROOT' || (sessionUserRole == 'SERVER' && sessionUserId == scope.row.owner)"
							>
								{{ $t('MoveUp') }}
							</el-link>
							&nbsp;
							<el-link
								type="primary"
								:underline="false"
								@click="moveDown(scope.row.key)"
								v-if="sessionUserRole == 'ROOT' || (sessionUserRole == 'SERVER' && sessionUserId == scope.row.owner)"
							>
								{{ $t('MoveDown') }}
							</el-link>
						</template>
					</el-table-column>
					<el-table-column :label="$t('Operation')" width="300">
						<template slot-scope="scope">
							<div v-if="sessionUserRole == 'ROOT' || (sessionUserRole == 'SERVER' && sessionUserId == scope.row.owner)">
								<router-link :to="'/index/get/project/' + scope.row.key" class="alink">{{ $t('CheckDetails') }}</router-link>
								<router-link :to="'/index/get/groups/' + scope.row.key" class="alink">{{ $t('ApiManage') }}</router-link>
								<a :href="exportServerHost + '/client/index.html?id=' + scope.row.key + '&token=' + sessionId" target="_blank" class="alink">{{ $t('OpenOnClient') }}</a>
							</div>
							<div v-else>
								<a :href="exportServerHost + '/client/index.html?id=' + scope.row.key + '&token=' + sessionId" class="alink">{{ $t('OpenOnClient') }}</a>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
import { getConsoleConfigAPI } from '@/api/Common';
import { findProjectListAPI, projectMoveUpAPI, projectMoveDownAPI } from '@/api/Project';
import { datetimeFormat } from '@/utils/DataFormat';
import store from '@/store/index.js';
export default {
	data() {
		return {
			/**服务器的地址*/
			exportServerHost: process.env.VUE_APP_BASE_API,
			/**欢迎语句*/
			welcome: 'Welcome to Orion-API-Manager',
			/**用户的角色ROOT:超级管理员,SERVER:普通管理员,CLIENT:普通用户*/
			sessionUserRole: store.getters.role,
			/**用户的id*/
			sessionUserId: store.getters.uid,
			/**用户的会话id*/
			sessionId: store.getters.sessionId,
			/**项目列表*/
			projectList: [],
			/**项目是否加载中*/
			projectListLoading: true,
			/**欢迎与项目正在加载中提醒文字*/
			projectListTips: this.$t('ProjectLoading')
		};
	},
	created() {
		//显示默认的欢迎语句
		getConsoleConfigAPI(
			res => {
				let data = res.data;
				console.log('get console config: ', data);
				if (data.code == 200) {
					document.title = data.data.title;
					this.welcome = data.data.welcome;
				}
			},
			err => {
				console.log('get console config failed: ', err);
			}
		);
		var sessionId = store.getters.sessionId;
		if (sessionId == null) {
			this.$router.push('/login');
		} else {
			this.loadProjects();
		}
	},
	methods: {
		/**
		 * 加载项目
		 */
		loadProjects() {
			findProjectListAPI(
				res => {
					var data = res.data;
					console.log(data);
					if (data.code == 200) {
						this.projectList = data.data;
						this.projectListLoading = false;
					}
				},
				err => {
					this.$message.error(this.$t('FailedToGetGroupInfoSeeConsole'));
					this.projectListTips = this.$t('FailedToGetGroupInfoSeeConsole');
					console.log(err);
				}
			);
		},
		/**
		 * 上移动项目
		 * @param {Object} pid
		 */
		moveUp(pid) {
			projectMoveUpAPI(
				pid,
				res => {
					var data = res.data;
					if (data.code == 200) {
						this.loadProjects();
					}
				},
				err => {
					this.$message.error(this.$t('MoveFailedSeeConsole'));
					console.log(err);
				}
			);
		},
		/**
		 * 下移动项目
		 * @param {Object} pid
		 */
		moveDown(pid) {
			projectMoveDownAPI(
				pid,
				res => {
					var data = res.data;
					if (data.code == 200) {
						this.loadProjects();
					}
				},
				err => {
					this.$message.error(this.$t('MoveFailedSeeConsole'));
					console.log(err);
				}
			);
		},
		formatDate(time) {
			return datetimeFormat(time);
		}
	}
};
</script>

<style>
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
</style>
