<template>
	<div style="width: 98%; max-width: 1240px;margin: auto;padding-top: 15px;">
		<el-form ref="projectEditForm" :rules="editRules" :model="projectEdit" label-width="120px">
			<el-form-item label="项目名称" prop="name"><el-input v-model="projectEdit.name" placeholder="请输入项目名称"></el-input></el-form-item>
			<el-form-item label="项目版本" prop="versions"><el-input v-model="projectEdit.versions" placeholder="请输入项目版本号"></el-input></el-form-item>
			<el-form-item label="项目排序" prop="sorts"><el-input v-model.number="projectEdit.sorts" placeholder="请输入项目排序"></el-input></el-form-item>
			<el-form-item label="项目描述" prop="description"><el-input v-model="projectEdit.description" type="textarea" placeholder="请输入项目描述"></el-input></el-form-item>
			<el-form-item label="主机地址" prop="host"><el-input v-model="projectEdit.host" placeholder="请输入主机地址"></el-input></el-form-item>
			<el-form-item label="服务协议" prop="schemes">
				<el-checkbox-group v-model="projectEdit.schemes">
					<el-checkbox label="http" name="schemes"></el-checkbox>
					<el-checkbox label="https" name="schemes"></el-checkbox>
					<el-checkbox label="ws" name="schemes"></el-checkbox>
					<el-checkbox label="wss" name="schemes"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="根路径" prop="basePath"><el-input v-model="projectEdit.basePath" placeholder="请输入根路径"></el-input></el-form-item>
			<el-form-item label="联系人" prop="contactName"><el-input v-model="projectEdit.contactName" placeholder="请输入联系人"></el-input></el-form-item>
			<el-form-item label="联系信息" prop="contactInfo"><el-input v-model="projectEdit.contactInfo" placeholder="请输入联系信息"></el-input></el-form-item>
			<el-form-item label="附加文档描述" prop="exDdescription"><el-input v-model="projectEdit.exDdescription" placeholder="请输入附加文档描述"></el-input></el-form-item>
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
		return {
			/**编辑的项目属性*/
			projectEdit: {
				versions: '1.0.0',
				sorts: 0,
				schemes: []
			},
			/**项目信息表达校验*/
			editRules: {
				name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
				versions: [{ required: true, message: '请输入项目版本号', trigger: 'blur' }],
				host: [{ required: true, message: '请输入主机地址', trigger: 'blur' }],
				schemes: [{ type: 'array', required: true, message: '请至少选择一个服务', trigger: 'change' }]
			}
		};
	},
	methods: {
		/**
		 * 提交修改项目信息
		 */
		saveSubmit() {
			this.$refs.projectEditForm.validate(valid => {
				if (valid) {
					var reqData = {};
					reqData.name = this.projectEdit.name;
					reqData.host = this.projectEdit.host;
					reqData.versions = this.projectEdit.versions;
					if (this.projectEdit.description != null) {
						reqData.description = this.projectEdit.description;
					}
					if (this.projectEdit.basePath != null) {
						reqData.basePath = this.projectEdit.basePath;
					}
					reqData.sorts = parseInt(this.projectEdit.sorts);
					reqData.schemes = JSON.stringify(this.projectEdit.schemes);
					var exd = null;
					if (this.projectEdit.exDdescription != null) {
						exd = { description: this.projectEdit.exDdescription };
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
					if (this.projectEdit.contactName != '') {
						reqData.contactName = this.projectEdit.contactName;
					}
					if (this.projectEdit.contactInfo != '') {
						reqData.contactInfo = this.projectEdit.contactInfo;
					}
					if (this.projectEdit.extensions != '') {
						reqData.extensions = this.projectEdit.extensions;
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
					this.$message.error('新增失败,请按提示完善项目信息!');
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

<style></style>
