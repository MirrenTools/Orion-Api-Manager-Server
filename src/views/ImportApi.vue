<template>
	<div style="width: 98%; max-width: 1240px;margin: auto;padding-top: 15px;" v-loading="requestLoading">
		<div style="margin-top: 15px;">
			<el-input placeholder="请输入文档的URL,代理请求可加上P: 示例:P:https://xxx.xxx/xx" v-model="documentUrl">
				<template slot="append">
					<el-button @click="getDocumentOfUrl()">加载</el-button>
					<div style="display: inline-block; border-left: 2px solid #ccc;margin-left:17px;margin-right:15px;">&nbsp;</div>
					<el-button @click="$refs.readFile.click()">本地加载</el-button>
				</template>
			</el-input>
			<input type="file" style="display: none" accept=".json,.txt" ref="readFile" @change="getProjectOfFile" />
			<div style="color: #666;font-size: 80%;margin-top: 3px;">提示:支持导入Orion-API-Gateway、OpenAPI 3.0与Swagger 2.0的JSON格式API文档</div>
		</div>
		<div style="margin-top: 20px;">
			<!-- 修改的属性 -->
			<el-form  ref="projectEditForm" :rules="editRules" :model="projectEdit" label-width="120px">
				<el-form-item label="项目名称" prop="name">
					<el-input v-model="projectEdit.name" placeholder="请输入项目名称"></el-input>
				</el-form-item>
				<el-form-item label="项目版本" prop="versions">
					<el-input v-model="projectEdit.versions" placeholder="请输入项目版本号"></el-input>
				</el-form-item>
				<el-form-item label="项目描述" prop="description">
					<el-input v-model="projectEdit.description" type="textarea" placeholder="请输入项目描述"></el-input>
				</el-form-item>
				<el-form-item label="服务地址集" prop="servers">
					<template>
						<div style="border: 1px solid #DCDFE6;padding: 5px;margin-bottom: 5px;" v-for="(server,idx) in projectEdit.servers"
						 :key="idx">
							<el-input v-model="server.url" placeholder="请输入主机地址,必填,示例 http://127.0.0.1:8080/v1"></el-input>
							<el-input v-model="server.description" placeholder="请输入主机说明,选填,示例 本地开发服务器" class="novalidate"></el-input>
							<div style="text-align: right;padding-top: 3px;">
								<el-button size="mini" @click="removeServer(idx)">移除</el-button>
							</div>
						</div>
						<div style="text-align: right;">
							<el-button size="medium" @click="addServer()">添加更多</el-button>
						</div>
					</template>
				</el-form-item>
				<el-form-item label="联系人" prop="contactName">
					<el-input v-model="projectEdit.contactName" placeholder="请输入联系人"></el-input>
				</el-form-item>
				<el-form-item label="联系信息" prop="contactInfo">
					<el-input v-model="projectEdit.contactInfo" placeholder="请输入联系信息"></el-input>
				</el-form-item>
				<el-form-item label="附加文档描述" prop="exDdescription">
					<el-input v-model="projectEdit.exDdescription" placeholder="请输入附加文档描述"></el-input>
				</el-form-item>
				<el-form-item label="附加文档URL" prop="exDurl">
					<el-input v-model="projectEdit.exDurl" placeholder="请输入附加文档URL"></el-input>
				</el-form-item>
				<el-form-item>
					<div style="text-align: center;">
						<el-button type="primary" @click="updateSubmit()">提交</el-button>
					</div>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	data() {
		var validateServers = (rule, value, callback) => {
			var flag = false;
			for (var i = 0; i < value.length; i++) {
				if (value[i].url.trim() != '') {
					flag = true;
					break;
				}
			}
			if (flag) {
				callback();
			} else {
				callback(new Error('请最少添加一个主机地址'));
			}
		};
		return {
			requestLoading: false,
			documentUrl: '',
			projectEdit:{},
			/**项目信息表达校验*/
			editRules: {
				name: [{
					required: true,
					message: '请输入项目名称',
					trigger: 'blur'
				}],
				versions: [{
					required: true,
					message: '请输入项目版本号',
					trigger: 'blur'
				}],
				servers: [{
					required: true,
					validator: validateServers,
					trigger: 'blur'
				}]
			}
		};
	},
	methods: {
		/**
		 * 通过网络加载文件
		 */
		getDocumentOfUrl() {
			if (this.documentUrl.trim() === '') {
				return;
			}
			this.requestLoading = true;
			var urls = this.documentUrl.trim();
			if (urls.charAt(0) == 'P' && urls.charAt(1) == ':') {
				urls = urls.substring(2);
				axios
					.get(process.env.VUE_APP_BASE_API + '/proxy/project?url=' + urls)
					.then(res => {
						if (res.data.code == 200) {
							this.loadDocument(JSON.parse(res.data.data));
						} else {
							this.$message.error('代理请求项目信息失败,更多信息请查看控制台!');
							console.log(res);
							this.requestLoading = false;
						}
					})
					.catch(err => {
						this.$message.error('代理请求项目信息失败,更多信息请查看控制台!');
						console.log(err);
						this.requestLoading = false;
					});
			} else {
				axios
					.get(urls)
					.then(res => {
						this.loadDocument(res.data);
					})
					.catch(err => {
						this.$message.error('代理请求项目信息失败,更多信息请查看控制台!');
						console.log(err);
						this.requestLoading = false;
					});
			}
		},
		/**
		 * 通过本地加载文件
		 */
		getProjectOfFile() {
			var reader = new FileReader();
			var file = this.$refs.readFile.files[0];
			reader.readAsText(file);
			reader.onload = res => {
				try {
					this.loadDocument(JSON.parse(res.target.result));
				} catch (err) {
					this.$message.error('加载项目信息失败,更多信息请查看控制台!');
					console.log(err);
				}
			};
		},
		/**
		 * 加载接口文档
		 * @param {Object} data
		 */
		loadDocument(data) {
			var orion = data.orionApi;
			var openapi = data.openapi;
			var swagger = data.swagger;
			if (orion != null && orion.startsWith('1.')) {
				this.loadDocumentOfOrionAPI(data);
			} else if (openapi != null && openapi.startsWith('3.')) {
				this.loadDocumentOfOpenAPI(data);
			} else if (swagger != null && swagger.startsWith('2.')) {
				this.loadDocumentOfSwagger(data);
			} else {
				this.$message.error('加载失败,无法识别的文档');
			}
			console.log(data);
		},
		loadDocumentOfOrionAPI(data) {
			console.log('load Orion API');
			this.requestLoading = false;
			this.projectEdit=data;
		},
		loadDocumentOfOpenAPI(data) {
			console.log('load Open API');
			this.requestLoading = false;
		},
		loadDocumentOfSwagger(data) {
			console.log('load Swagger');
			this.requestLoading = false;
			
		}
	}
};
</script>

<style></style>
