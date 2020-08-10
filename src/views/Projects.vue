<template>
	<div>
		<div style="width: 98%; max-width: 1240px;padding: 10px 0;margin: auto;display: flex;justify-content: center;align-items: center;">
			<div>项目数量:{{ projectList.length || 0 }}</div>
			<div style="margin-left: auto;">
				<router-link class="alink" to="/index/new/project"><el-button type="primary">导入API</el-button></router-link>
				<router-link class="alink" to="/index/fromSwagger"><el-button type="primary">导入Swagger</el-button></router-link>
				<router-link class="alink" style="margin-right: 0;" to="/index/new/project"><el-button type="primary">新建项目</el-button></router-link>
			</div>
		</div>
		<div style="width: 98%;max-width: 1240px;margin: auto;">
			<el-table :data="projectList" style="width: 100%" border v-loading="projectListLoading">
				<el-table-column prop="name" label="项目名称"></el-table-column>
				<el-table-column prop="version" label="版本号" width="120"></el-table-column>
				<el-table-column prop="time" label="更新时间" width="200">
					<template slot-scope="scope">
						<span>{{ formatDate(scope.row.time) }}</span>
					</template>
				</el-table-column>
				<el-table-column label="排序" width="120">
					<template slot-scope="scope">
						<span>{{ scope.row.sorts }}</span>
						&nbsp;
						<el-link type="primary" :underline="false" @click="moveUp(scope.row.key)">上移</el-link>
						&nbsp;
						<el-link type="primary" :underline="false" @click="moveDown(scope.row.key)">下移</el-link>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<router-link :to="'/index/get/project/' + scope.row.key" class="alink">查看详情</router-link>
						<a :href="'/Client-UI/index.html?file=/project/getJson/' + scope.row.key + '&id=' + scope.row.key" target="_blank" class="alink">在客户端查看</a>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
import { findProjectListAPI, projectMoveUpAPI, projectMoveDownAPI } from '@/api/Project';
import { datetimeFormat } from '@/utils/DataFormat';
export default {
	data() {
		return {
			projectList: [],
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
