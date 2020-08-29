<template>
	<div>
		<div style="width: 98%; max-width: 1240px;padding: 10px 0;margin: auto;display: flex;justify-content: center;align-items: center;">
			<div>{{$t('ProjectQuantity')}}{{ projectList.length || 0 }}</div>
			<div style="margin-left: auto;">
				<router-link class="alink" to="/index/import">
					<el-button type="primary">{{$t('ImportAPI')}}</el-button>
				</router-link>
				<router-link class="alink" style="margin-right: 0;" to="/index/new/project">
					<el-button type="primary">{{$t('NewProjects')}}</el-button>
				</router-link>
			</div>
		</div>
		<div style="width: 98%;max-width: 1240px;margin: auto;">
			<el-table :data="projectList" style="width: 100%" border v-loading="projectListLoading">
				<el-table-column prop="name" :label="$t('ProjectName')" min-width="300"></el-table-column>
				<el-table-column prop="version" :label="$t('ProjectVersion')" width="120"></el-table-column>
				<el-table-column prop="time" :label="$t('LastUpdateTime')" width="200">
					<template slot-scope="scope">
						<span>{{ formatDate(scope.row.time) }}</span>
					</template>
				</el-table-column>
				<el-table-column :label="$t('ProjectRanking')" width="130">
					<template slot-scope="scope">
						<span>{{ scope.row.sorts }}</span>
						&nbsp;
						<el-link type="primary" :underline="false" @click="moveUp(scope.row.key)">{{$t('MoveUp')}}</el-link>
						&nbsp;
						<el-link type="primary" :underline="false" @click="moveDown(scope.row.key)">{{$t('MoveDown')}}</el-link>
					</template>
				</el-table-column>
				<el-table-column :label="$t('Operation')" width="300">
					<template slot-scope="scope">
						<router-link :to="'/index/get/project/' + scope.row.key" class="alink">{{$t('CheckDetails')}}</router-link>
						<router-link :to="'/index/get/groups/' + scope.row.key" class="alink">{{$t('ApiManage')}}</router-link>
						<a :href="exportServerHost+'/Client-UI/index.html?id=' + scope.row.key" target="_blank" class="alink">{{$t('OpenOnClient')}}</a>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import {
		findProjectListAPI,
		projectMoveUpAPI,
		projectMoveDownAPI
	} from '@/api/Project';
	import {
		datetimeFormat
	} from '@/utils/DataFormat';
	export default {
		data() {
			return {
				/**服务器的地址*/
				exportServerHost:process.env.VUE_APP_BASE_API,
				/**项目列表*/
				projectList: [],
				/**项目是否加载中*/
				projectListLoading: true
			};
		},
		created() {
			this.loadProjects();
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
						} else {
							this.$message.error('获取项目列表失败:' + data.msg);
						}
					},
					err => {
						this.$message.error('获取项目列表失败,更多信息请查看浏览器控制台!');
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
						} else {
							this.$message.error('项目排序上移失败:' + data.msg);
						}
					},
					err => {
						this.$message.error('项目排序上移失败,更多信息请查看浏览器控制台!');
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
						} else {
							this.$message.error('项目排序下移失败:' + data.msg);
						}
					},
					err => {
						this.$message.error('项目排序下移失败,更多信息请查看浏览器控制台!');
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
