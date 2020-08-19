<template>
	<div style="width: 98%; max-width: 1240px;margin: auto;padding-top: 15px;">
		<div style="margin-top: 15px;">
			<el-input placeholder="文档的URL,支持导入Orion-API-Gateway、OpenAPI 3.0与Swagger 2.0的JSON格式API文档,代理请求可加上P: 示例:P:https://xxx.xxx/xx"
			 v-model="documentUrl">
				<template slot="append">
					<el-button @click="getDocumentOfUrl()" :loading="requestLoading">加载</el-button>
					<div style="display: inline-block; border-left: 2px solid #ccc;margin-left:17px;margin-right:15px;">&nbsp;</div>
					<el-button @click="$refs.readFile.click()" :loading="projectLoading">本地加载</el-button>
				</template>
			</el-input>
			<input type="file" style="display: none" accept=".json,.txt" ref="readFile" @change="getProjectOfFile" />
		</div>
		<div style="margin-top: 20px;" v-show="loaded" v-loading="projectLoading">
			<!-- 修改的属性 -->
			<el-form ref="projectEditForm" :rules="editRules" :model="projectEdit" label-width="120px">
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
						<div style="border: 1px solid #DCDFE6;padding: 5px;margin-bottom: 5px;" v-for="(server, idx) in projectEdit.servers"
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
			</el-form>
		</div>

		<!-- 项目信息 -->
		<div style="width: 98%; max-width: 1240px;margin:10px auto;" v-show="loaded" v-loading="projectLoading">
			<div style="padding: 10px 0;display: flex;align-items: center;">
				<div><b>项目信息</b></div>
			</div>
			<!-- 显示的属性 -->
			<table style="width: 100%;" cellspacing="10">
				<tr v-show="projectEdit.name">
					<td width="120px" class="project-item">项目名称</td>
					<td>
						{{ projectEdit.name }}
						<span style="font-size: 0.8em;">{{ projectEdit.versions }}</span>
					</td>
				</tr>
				<tr v-show="projectEdit.description">
					<td width="120px" class="project-item" valign="top">项目描述</td>
					<td v-html="projectEdit.description"></td>
				</tr>
				<tr v-show="projectEdit.servers">
					<td class="project-item" valign="top">服务地址集</td>
					<td>
						<div v-for="(item, idx) in projectEdit.servers" :key="idx">
							<div>{{ item.url }}</div>
							<div v-show="item.description" style="color: #888;">{{ item.description }}</div>
						</div>
					</td>
				</tr>
				<tr v-show="projectEdit.contactName">
					<td class="project-item">联系人</td>
					<td>{{ projectEdit.contactName }}</td>
				</tr>
				<tr v-show="projectEdit.contactInfo">
					<td class="project-item">联系信息</td>
					<td v-html="projectEdit.contactInfo"></td>
				</tr>
				<tr v-show="projectEdit.exDdescription && projectEdit.exDurl">
					<td class="project-item" valign="top">附加文档</td>
					<td>
						<div v-show="projectEdit.exDdescription" v-html="projectEdit.exDdescription"></div>
						<a v-show="projectEdit.exDurl" :href="projectEdit.exDurl" target="_blank" class="alink" style="margin-left: 0;">{{ projectEdit.exDurl }}</a>
					</td>
				</tr>
			</table>
		</div>
		<!-- 分组列表 -->
		<div style="width: 98%; max-width: 1240px;margin: auto;">
			<div style="padding: 10px 0;display: flex;align-items: center;">
				<div><b>分组列表</b></div>
			</div>
			<div>
				<el-collapse v-loading="projectLoading">
					<el-collapse-item v-for="(g, idx) in projectGroups" :key="idx">
						<!-- 分组名称与简介 -->
						<template slot="title">
							<div style="vertical-align: middle;">
								<span style="font-size: 20px;">
									<b>{{ g.name }}</b>
								</span>
								<span style="margin-left: 5px;">{{ g.summary }}</span>
							</div>
						</template>
						<!-- 分组的操作 -->
						<div style="padding-bottom: 10px;">
							<!-- 分组的描述 -->
							<p v-html="g.description"></p>
							<!-- 拓展文档 -->
							<div v-if="g.externalDocs != null">
								<div v-if="g.externalDocs.description != null" v-html="g.externalDocs.description"></div>
								<a v-if="g.externalDocs.url != null" :href="g.externalDocs.url" target="_blank" class="alink" style="margin-left: 0;">{{ g.externalDocs.url }}</a>
							</div>
						</div>
						<!-- 接口列表 -->
						<div v-for="api in g.apis" :key="api.apiId" style="margin-bottom: 10px;">
							<div :class="['api', api.method]">
								<!-- API的方法与路径与简介 -->
								<div :class="['api-header', api.deprecated == true || api.deprecated == 'true' ? 'text-through' : '']" @click="api.show = !api.show">
									<div class="api-method">{{ api.method }}</div>
									<div class="api-path-summary">
										<span v-if="api.deprecated == true || api.deprecated == 'true'"><b>(已过期)</b></span>
										{{ api.path }}
									</div>
									<div class="api-path-summary">{{ api.title }}</div>
									<div style="margin-left: auto;">
										<i v-show="!api.show" class="el-icon-arrow-right"></i>
										<i v-show="api.show" class="el-icon-arrow-down"></i>
									</div>
								</div>
								<div v-show="api.show">
									<!-- API说明 -->
									<div style="padding:10px;background-color: white">
										<!-- API描述 -->
										<div v-if="api.description" v-html="api.description.replace(/\n/g, '<br>')"></div>
										<!-- API附件说明 -->
										<div v-for="(addi, idx) in api.additional" :key="idx">
											<div>
												<b>{{ addi.title }}</b>
											</div>
											<div v-if="addi.description" v-html="addi.description.replace(/\n/g, '<br>')"></div>
										</div>
										<!-- 拓展文档 -->
										<div v-if="api.externalDocs != null">
											<div v-if="api.externalDocs.description != null" v-html="api.externalDocs.description"></div>
											<a v-if="api.externalDocs.url != null" :href="api.externalDocs.url" target="_blank" class="alink" style="margin-left: 0;">{{ api.externalDocs.url }}</a>
										</div>
									</div>
									<!-- 请求参数标题 -->
									<div style="padding:10px;">
										<div style="display: flex;align-items: center;">
											<div style="min-width: 60px;"><b>请求参数</b></div>
											<div style="margin-left: auto;" v-if="api.consumes != null">Consumes: {{ api.consumes }}</div>
										</div>
									</div>
									<!-- 请求参数 -->
									<div style="padding:5px 10px;background-color: white">
										<el-table :data="api.parameters" style="width: 100%;" row-key="tableRowKeyId" border default-expand-all
										 :tree-props="{ children: 'items', hasChildren: 'hasChildren' }" empty-text="无需请求数据">
											<el-table-column prop="required" label="必填" width="100" align="right">
												<template slot-scope="scope">
													<span v-if="scope.row.required">{{ scope.row.required == 'true' || scope.row.required == true ? '是' : '否' }}</span>
												</template>
											</el-table-column>
											<el-table-column prop="in" label="参数位置" width="120"></el-table-column>
											<el-table-column prop="type" label="参数类型" width="120"></el-table-column>
											<el-table-column prop="name" label="参数名称" width="300"></el-table-column>
											<el-table-column prop="description" label="参数描述">
												<template slot-scope="scope">
													<div v-if="scope.row.description" v-html="scope.row.description"></div>
													<div class="desc-constraint">
														<span v-if="scope.row.def">默认值: {{ scope.row.def }}</span>
														<span v-if="scope.row.minLength">最小长度: {{ scope.row.minLength }}</span>
														<span v-if="scope.row.maxLength">最大长度: {{ scope.row.maxLength }}</span>
														<span v-if="scope.row.minValue">最小值: {{ scope.row.minValue }}</span>
														<span v-if="scope.row.maxValue">最大值: {{ scope.row.maxValue }}</span>
														<span v-if="scope.row.enums">枚举值: {{ scope.row.enums }}</span>
														<span v-if="scope.row.regex">正则: {{ scope.row.regex }}</span>
													</div>
												</template>
											</el-table-column>
										</el-table>
									</div>
									<!-- 响应参数标题 -->
									<div style="padding:10px;">
										<div style="display: flex;align-items: center;">
											<div style="min-width: 60px;"><b>响应参数</b></div>
											<div style="margin-left: auto;" v-if="api.produces != null">Produces: {{ api.produces }}</div>
										</div>
									</div>
									<!-- 响应参数 -->
									<div style="padding:5px 10px;background-color: white">
										<div v-for="(resp, idx) in api.responses" :key="idx">
											<p>状态码: {{ resp.status }} 状态信息: {{ resp.msg }}</p>
											<el-table :data="resp.data" style="width: 100%;" row-key="tableRowKeyId" border default-expand-all
											 :tree-props="{ children: 'items', hasChildren: 'hasChildren' }">
												<el-table-column prop="type" label="参数类型" width="120" align="right"></el-table-column>
												<el-table-column prop="in" label="参数位置" width="80"></el-table-column>
												<el-table-column prop="name" label="参数名称" width="300"></el-table-column>
												<el-table-column prop="description" label="参数描述">
													<template slot-scope="scope">
														<div v-if="scope.row.description" v-html="scope.row.description"></div>
													</template>
												</el-table-column>
											</el-table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</el-collapse-item>
				</el-collapse>
			</div>
		</div>
		<div style="text-align: center;margin:30px auto 50px ;">
			<el-button type="primary" @click="saveSubmit()" :loading="saving">确定导入</el-button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import {
		saveProjectFronJsonAPI
	} from '@/api/Project';
	import swaggerConvert from '@/utils/ConvertSwaggerDocs.js';

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
				/**是否请求加载中*/
				requestLoading: false,
				/**项目数据是否加载中*/
				projectLoading: false,
				/**是否正在创建中*/
				saving: false,
				/**数据是否已经加载*/
				loaded: true,
				/**json文件的URL*/
				documentUrl: '',
				/**项目信息*/
				projectEdit: {},
				/**分组信息*/
				projectGroups: [],
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
				this.projectLoading = true;
				try {
					var reader = new FileReader();
					var file = this.$refs.readFile.files[0];
					reader.readAsText(file);
					reader.onload = res => {
						try {
							this.loadDocument(JSON.parse(res.target.result));
						} catch (err) {
							this.projectLoading = false;
							this.$message.error('加载项目信息失败,更多信息请查看控制台!');
							console.log(err);
						}
					};
				} catch (err) {
					this.projectLoading = false;
					this.$message.error('加载项目信息失败,更多信息请查看控制台!');
					console.log(err);
				}
			},
			/**
			 * 加载接口文档
			 * @param {Object} data
			 */
			loadDocument(data) {
				if (data == null) {
					return;
				}
				console.log(data);
				//恢复到默认信息
				this.projectEdit = {};
				this.projectGroups = [];
				//获取数据版本
				var orion = data.orionApi;
				var openapi = data.openapi;
				var swagger = data.swagger;
				try {
					if (openapi != null && openapi.startsWith('3.')) {
						var orionData = swaggerConvert(data);
						if (orionData == null) {
							this.projectLoading = false;
							this.$message.error('加载项目,该文档无效或无法识别!');
							return;
						}
						this.requestLoading = false;
						this.projectLoading = true;
						this.loadProject(orionData);
					} else if (swagger != null && swagger.startsWith('2.')) {
						var orionData = swaggerConvert(data);
						if (orionData == null) {
							this.projectLoading = false;
							this.$message.error('加载项目,该文档无效或无法识别!');
							return;
						}
						this.requestLoading = false;
						this.projectLoading = true;
						this.loadProject(orionData);
					} else {
						this.loadDocumentOfOrionAPI(data);
					}
				} catch (err) {
					this.projectLoading = false;
					this.$message.error('加载项目信息失败,更多信息请查看控制台!');
					console.log(err);
				}
			},
			/**
			 * 加载默认类型的文档
			 * @param {Object} data
			 */
			loadDocumentOfOrionAPI(data) {
				console.log('load Orion API:');
				this.requestLoading = false;
				this.projectLoading = true;
				this.loadProject(data);
			},
			/**
			 * 加载项目信息
			 * @param {Object} data
			 */
			loadProject(data) {
				console.log('data');
				console.log(data);
				if (data.externalDocs != null) {
					if (data.externalDocs.description != null) {
						data.exDdescription = data.externalDocs.description;
					}
					if (data.externalDocs.url != null) {
						data.exDurl = data.externalDocs.url;
					}
				}
				if (data.content != null) {
					var groups = JSON.parse(JSON.stringify(data.content));
					delete data.content;
					for (var g = 0; g < groups.length; g++) {
						if (groups[g].apis == null || groups[g].apis.length == 0) {
							continue;
						}
						for (var a = 0; a < groups[g].apis.length; a++) {
							var api = groups[g].apis[a];
							api.show = false;
							for (var i = 0; i < api.parameters.length; i++) {
								this.recursionCreateTableRandomRowKey(api.parameters[i]);
							}
							if (api.responses != null && api.responses.length > 0) {
								if (api.responses[0].status == undefined || api.responses[0].data == undefined) {
									api.responses = [{
										status: 200,
										msg: 'ok',
										data: api.responses
									}];
								}
								for (var r = 0; r < api.responses.length; r++) {
									var respd = api.responses[r].data;
									for (var i = 0; i < respd.length; i++) {
										if (respd[i].in == null) {
											respd[i].in = 'body';
										}
										this.recursionCreateTableRandomRowKey(respd[i]);
									}
								}
							}
						}
					}
					console.log('groups:');
					console.log(groups);
					this.projectGroups = groups;
				}
				this.projectEdit = data;
				this.projectLoading = false;
			},
			/**
			 * 提交保存项目
			 */
			saveSubmit() {
				this.$refs.projectEditForm.validate(valid => {
					if (valid) {
						this.saving = true;
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
						var groups = [];
						if (this.projectGroups != null && this.projectGroups.length > 0) {
							for (var g = 0; g < this.projectGroups.length; g++) {
								var gd = this.projectGroups[g];
								var group = {
									name: gd.name,
									summary: gd.summary,
									description: gd.description,
									sorts: g
								};
								if (gd.externalDocs != null) {
									var ext = {};
									if (gd.externalDocs.externalUrl != null && gd.externalDocs.externalUrl != '') {
										ext.url = gd.externalDocs.externalUrl;
									}
									if (gd.externalDocs.externalDesc != null && gd.externalDocs.externalDesc != '') {
										ext.description = gd.externalDocs.externalDesc;
									}
									group.externalDocs = JSON.stringify(ext);
								}
								var apis = [];
								if (gd.apis != null) {
									for (var a = 0; a < gd.apis.length; a++) {
										var ad = gd.apis[a];
										var api = {};
										api.sorts = a;
										api.method = ad.method;
										api.path = ad.path.replace(/(\/)+/g, '/');
										if (!api.path.startsWith('/')) {
											api.path = '/' + api.path;
										}
										api.title = ad.title;
										if (ad.description != null && ad.description != '') {
											api.description = ad.description;
										}
										if (ad.consumes != null && ad.consumes != '') {
											var cs = ad.consumes;
											var consumes = [];
											for (var i = 0; i < cs.length; i++) {
												if (cs[i] == ',' || cs[i] == '') {
													continue;
												}
												consumes.push(cs[i]);
											}
											if (consumes.length > 0) {
												api.consumes = JSON.stringify(consumes);
											}
										}
										if (ad.produces != null && ad.produces != '') {
											var cs = ad.produces;
											var produces = [];
											for (var i = 0; i < cs.length; i++) {
												if (cs[i] == ',' || cs[i] == '') {
													continue;
												}
												produces.push(cs[i]);
											}
											if (produces.length > 0) {
												api.produces = JSON.stringify(produces);
											}
										}

										// 请求参数开始
										if (ad.parameters.length > 0) {
											var params = [];
											for (var i = 0; i < ad.parameters.length; i++) {
												var p = ad.parameters[i];
												if (p.name == null || p.name == '') {
													continue;
												}
												var d = {
													required: p.required,
													in: p.in,
													type: p.type,
													name: p.name,
													description: p.description
												};
												if (p.def != null && p.def != '') {
													d.def = p.def;
												}
												if (p.minLength != null && p.minLength != '') {
													d.minLength = p.minLength;
												}
												if (p.maxLength != null && p.maxLength != '') {
													d.maxLength = p.maxLength;
												}
												if (p.minValue != null && p.minValue != '') {
													d.minValue = p.minValue;
												}
												if (p.maxValue != null && p.maxValue != '') {
													d.maxValue = p.maxValue;
												}
												if (p.enums != null && p.enums != '') {
													var cs = p.enums.split(',');
													var enums = [];
													for (var i = 0; i < cs.length; i++) {
														if (cs[i] == ',' || cs[i] == '') {
															continue;
														}
														enums.push(cs[i]);
													}
													if (enums.length > 0) {
														d.enums = JSON.stringify(enums);
													}
												}
												if (p.regex != null && p.regex != '') {
													d.regex = p.regex;
												}
												if (p.items != null && p.items.length > 0) {
													d.items = [];
													this.recursionConverter(d.items, p.items);
												}
												params.push(d);
											}
											api.parameters = JSON.stringify(params);
										}
										// 请求参数结束,响应结束开始
										if (ad.responses.length > 0) {
											var params = [];
											for (var i = 0; i < ad.responses.length; i++) {
												var p = ad.responses[i];
												if (p.status == null || p.status == '' || (p.data == null || p.data.length == 0)) {
													continue;
												}
												var d = {
													status: p.status,
													msg: p.msg
												};
												d.data = [];
												for (var j = 0; j < p.data.length; j++) {
													var pd = p.data[j];
													if (pd.name == null || pd.name == '') {
														continue;
													}
													var dd = {
														type: pd.type,
														in: pd.in || 'body',
														name: pd.name,
														description: pd.description
													};
													if (pd.items != null && pd.items.length > 0) {
														dd.items = [];
														this.recursionConverter(dd.items, pd.items);
													}
													d.data.push(dd);
												}
												params.push(d);
											}
											api.responses = JSON.stringify(params);
										}
										apis.push(api);
									}
								}
								group.apis = apis;
								groups.push(group);
							}
						}
						reqData.content = groups;
						console.log('执行保存项目...');
						console.log(reqData);
						saveProjectFronJsonAPI({
								project: JSON.stringify(reqData)
							},
							res => {
								console.log(data);
								var data = res.data;
								if (data.code == 200) {
									this.$confirm('保存成功!', '提示', {
											confirmButtonText: '返回列表',
											cancelButtonText: '取消',
											type: 'success'
										})
										.then(() => {
											this.$router.push('/index');
										})
										.catch(() => {});
								} else {
									this.$message.error('保存失败:' + data.msg);
								}
								this.saving = false;
							},
							err => {
								this.$message.error('保存失败,更多信息请查看控制台!');
								console.log(err);
								this.saving = false;
							}
						);
					} else {
						this.$message.warning('保存失败,请按提示完善项目信息!');
						return false;
					}
				});
			},
			/**
			 * 递归获取items里面的内容
			 * @param {Object} to
			 * @param {Object} items
			 */
			recursionConverter(to, items) {
				if (items == null || items.length == 0) {
					return;
				}
				for (var i = 0; i < items.length; i++) {
					var p = {};
					p.type = items[i].type;
					p.name = items[i].name;
					p.description = items[i].description;
					if (items[i].items != null && items[i].items.length != 0) {
						p.items = [];
						this.recursionConverter(p.items, items[i].items);
					}
					to.push(p);
				}
			},
			/**
			 * 添加服务地址
			 */
			addServer() {
				if (this.projectEdit.servers == null) {
					this.$set(this.projectEdit, 'servers', []);
				}
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
			 * 递归响应的数据并给数据创建id
			 * @param {Object} data
			 */
			recursionCreateTableRandomRowKey(data) {
				data.tableRowKeyId = 'rowkey-' + Math.random();
				if (data.items == null) {
					return data;
				}
				for (var i = 0; i < data.items.length; i++) {
					this.recursionCreateTableRandomRowKey(data.items[i]);
				}
			}
		}
	};
</script>

<style lang="scss">
	@import '@/styles/api-method-style.scss';

	.novalidate input {
		border-color: #dcdfe6 !important;
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
