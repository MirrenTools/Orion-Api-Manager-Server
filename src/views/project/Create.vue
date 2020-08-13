<template>
	<div style="width: 98%; max-width: 1240px;margin: auto;padding-top: 15px;">
		<el-form ref="projectEditForm" :rules="editRules" :model="projectEdit" label-width="120px">
			<el-form-item label="项目名称" prop="name"><el-input v-model="projectEdit.name" placeholder="请输入项目名称"></el-input></el-form-item>
			<el-form-item label="项目版本" prop="versions"><el-input v-model="projectEdit.versions" placeholder="请输入项目版本号"></el-input></el-form-item>
			<el-form-item label="项目排序" prop="sorts"><el-input v-model.number="projectEdit.sorts" placeholder="请输入项目排序"></el-input></el-form-item>
			<el-form-item label="项目描述" prop="description"><el-input v-model="projectEdit.description" type="textarea" placeholder="请输入项目描述,支持HTML"></el-input></el-form-item>
			<el-form-item label="服务地址集" prop="servers">
				<template>
					<div style="border: 1px solid #DCDFE6;padding: 5px;margin-bottom: 5px;" v-for="(server, idx) in projectEdit.servers" :key="idx">
						<el-input v-model="server.url" placeholder="请输入主机地址,必填,示例 http://127.0.0.1:8080/v1"></el-input>
						<el-input v-model="server.description" placeholder="请输入主机说明,选填,示例 本地开发服务器" class="novalidate"></el-input>
						<div style="text-align: right;padding-top: 3px;"><el-button size="mini" @click="removeServer(idx)">移除</el-button></div>
					</div>
					<div style="text-align: right;"><el-button size="medium" @click="addServer()">添加更多</el-button></div>
				</template>
			</el-form-item>
			<el-form-item label="联系人" prop="contactName"><el-input v-model="projectEdit.contactName" placeholder="请输入联系人"></el-input></el-form-item>
			<el-form-item label="联系信息" prop="contactInfo"><el-input v-model="projectEdit.contactInfo" placeholder="请输入联系信息,支持HTML"></el-input></el-form-item>
			<el-form-item label="附加文档描述" prop="exDdescription"><el-input v-model="projectEdit.exDdescription" placeholder="请输入附加文档描述,支持HTML"></el-input></el-form-item>
			<el-form-item label="附加文档URL" prop="exDurl"><el-input v-model="projectEdit.exDurl" placeholder="请输入附加文档URL"></el-input></el-form-item>
			<el-form-item>
				<div style="text-align: center;"><el-button type="primary" @click="saveSubmit()">提交</el-button></div>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { saveProjectAPI } from '@/api/Project';
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
				callback(new Error('请最少添加一个主机地址'));
			}
		};
		return {
			/**编辑的项目属性*/
			projectEdit: {
				versions: '1.0.0',
				sorts: 0,
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
						message: '请输入项目名称',
						trigger: 'blur'
					}
				],
				versions: [
					{
						required: true,
						message: '请输入项目版本号',
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
			}
		};
	},
	methods: {
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
		saveSubmit() {
			this.$refs.projectEditForm.validate(valid => {
				if (valid) {
					var reqData = {};
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
					console.log('执行新增项目...');
					console.log(reqData);
					saveProjectAPI(
						reqData,
						res => {
							console.log(data);
							var data = res.data;
							if (data.code == 200) {
								this.$confirm('新增成功!', '提示', {
									confirmButtonText: '继续新增',
									cancelButtonText: '返回列表',
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
							} else {
								this.$message.error('新增失败:' + data.msg);
							}
						},
						err => {
							this.$message.error('新增失败,更多信息请查看控制台!');
							console.log(err);
						}
					);
				} else {
					this.$message.warning('新增失败,请按提示完善项目信息!');
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
