<template>
	<div>
		<div style="width: 98%;padding: 10px 0;margin: auto;display: flex;justify-content: center;align-items: center;">
			<div>项目数量:123456</div>
			<div style="margin-left: auto;">
				<el-button type="primary">新建项目</el-button>
			</div>
		</div>
		<div style="width: 98%;margin: auto;">
			<el-table :data="projectList" style="width: 100%" border>
				<el-table-column prop="name" label="项目名称" width="180"> </el-table-column>
				<el-table-column prop="version" label="版本号" width="180"> </el-table-column>
				<el-table-column prop="time" label="更新时间"></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				projectList: [{
					name: 'name',
					version: 'version',
					time: 'time'
				}]
			}
		}
	}
</script>

<style>
</style>
