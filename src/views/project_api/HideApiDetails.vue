<template>
	<div style="width: 98%; max-width: 1240px;padding: 10px 0;margin: auto;">
		<div style="display: flex;align-items: center;padding-bottom: 8px;">
			<div>
				<b>{{ $t('ApiDetails') }}</b>
			</div>
			<div style="margin-left: auto;">
				<el-button size="mini" type="danger" @click="apiDeleteSubmit(apiId)">{{ $t('PermanentlyDelete') }}</el-button>
				<el-button size="mini" type="primary" @click="showApiSubmit(api.apiId)">{{ $t('ApiShow') }}</el-button>
			</div>
		</div>
		<div class="api-body" :class="['api-body-' + api.method]">
			<!-- API基本信息 -->
			<div class="prem05" v-if="api.deprecated">{{ api.deprecated ? $t('DeprecatedWillDelete'):''}} </div>
			<div class="api-header" :class="['api-header-' + api.method]"
				:style="api.deprecated ? 'text-decoration: line-through;' : ''">
				<div class="api-header-item">Method: {{ api.method.toUpperCase() }}</div>
				<div class="api-header-item">Path: {{ api.path }}</div>
				<div class="api-header-item">{{ api.title }}</div>
			</div>
			<!-- 接口的描述 -->
			<div class="prem05 background-color-white">
				<div v-html="(api.description||'').replace(/\n/g, '<br>')"></div>
				<div v-for="(addi, index) in api.additional" :key="index">
					<div style="margin-top: 5px;">
						<b>{{ addi.title }}</b>
					</div>
					<div v-html="(addi.description||'').replace(/\n/g, '<br>')"></div>
				</div>
				<div v-if="api.externalDocs" style="margin-top: 0.5rem;">
					<div style="padding-right: 0.5rem;">
						<b>{{ $t('ExtDocsDesc') }}:</b>
					</div>
					<div>
						<div v-html="(api.externalDocs.description||'').replace(/\n/g, '<br>')"></div>
						<b>{{ $t('ExtDocsURL') }}:</b><br /> <a :href="api.externalDocs.url" style="color: #409EFF;"
							target="_blank">{{ api.externalDocs.url }}</a>
					</div>
				</div>
			</div>
			<!-- 请求参数标题 -->
			<div style="padding:10px;">
				<div style="display: flex;align-items: center;">
					<div style="min-width: 60px;">
						<b>{{ $t('Parameters') }}</b>
					</div>
					<div style="margin-left: auto;" v-if="api.consumes != null">Consumes:
						{{ api.consumes }}
					</div>
				</div>
			</div>
			<!-- 请求参数 -->
			<div style="padding:5px 10px;background-color: white">
				<el-table :data="parameters" style="width: 100%;" row-key="tableRowkey" border default-expand-all :tree-props="{ children: 'items', hasChildren: 'hasChildren' }"
					:empty-text="$t('ThereIsNoNeedToRequestParameters')">
					<el-table-column prop="required" :label="$t('Required')" width="100" align="right">
						<template slot-scope="scope">
							<span
								v-if="scope.row.required != null">{{ scope.row.required == 'true' || scope.row.required == true ? $t('True') : $t('False') }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="in" :label="$t('Position')" width="120" align="right"></el-table-column>
					<el-table-column prop="type" :label="$t('Type')" width="120">
					</el-table-column>
					<el-table-column prop="name" :label="$t('ParamName')" width="300">
					</el-table-column>
					<el-table-column prop="description" :label="$t('ParamDescription')">
						<template slot-scope="scope">
							<div v-if="scope.row.description" v-html="scope.row.description">
							</div>
							<div class="desc-constraint">
								<span v-if="scope.row.def">{{ $t('Default') }}:
									{{ scope.row.def }}</span>
								<span v-if="scope.row.minLength">{{ $t('MinLength') }}:
									{{ scope.row.minLength }}</span>
								<span v-if="scope.row.maxLength">{{ $t('MaxLength') }}:
									{{ scope.row.maxLength }}</span>
								<span v-if="scope.row.minValue">{{ $t('Minimum') }}:
									{{ scope.row.minValue }}</span>
								<span v-if="scope.row.maxValue">{{ $t('Maximum') }}:
									{{ scope.row.maxValue }}</span>
								<span v-if="scope.row.enums">{{ $t('Enums') }}:
									{{ scope.row.enums }}</span>
								<span v-if="scope.row.regex">{{ $t('Pattern') }}:
									{{ scope.row.regex }}</span>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<div v-if="api.body">
					<json-viewer :expand-depth="10" :value="api.body" />
				</div>
			</div>
			<!-- 响应参数标题 -->
			<div style="padding:10px;">
				<div style="display: flex;align-items: center;">
					<div style="min-width: 60px;">
						<b>{{ $t('Responses') }}</b>
					</div>
					<div style="margin-left: auto;" v-if="api.produces != null">Produces:
						{{ api.produces }}
					</div>
				</div>
			</div>
			<!-- 响应参数 -->
			<div style="padding:5px 10px;background-color: white">
				<div v-for="(resp, idx) in responses" :key="idx">
					<p>{{ $t('Status') }}: {{ resp.status }} {{ $t('StatusMsg') }}:
						{{ resp.msg }}
					</p>
					<div v-if="resp.schema">
						<json-viewer :expand-depth="10" :value="resp.schema" />
					</div>
					<el-table :data="resp.data" style="width: 100%;" row-key="tableRowkey" border default-expand-all
						:tree-props="{ children: 'items', hasChildren: 'hasChildren' }"
						v-if="resp.data && resp.data.length > 0">
						<el-table-column prop="in" :label="$t('Position')" width="120" align="right"></el-table-column>
						<el-table-column prop="type" :label="$t('Type')" width="100" align="right"></el-table-column>
						<el-table-column prop="name" :label="$t('ParamName')" width="300">
						</el-table-column>
						<el-table-column prop="description" :label="$t('ParamDescription')">
							<template slot-scope="scope">
								<div v-if="scope.row.description" v-html="scope.row.description"></div>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import JsonViewer from 'vue-json-viewer';
	import {
		getApiAPI,
		deleteApiAPI,
		showApiAPI
	} from '@/api/Project';
	import store from '@/store/index.js';
	export default {
		components: {
			JsonViewer
		},
		data() {
			return {
				apiId: '',
				dataLoading: true,
				api: {
					// apiId: 'apiId',
					// deprecated: true,
					// groupId: 'groupId',
					method: 'get'
					// path: '/utils/DataFormat/utils/DataFormat/utils/DataFormat',
					// title: '分组列表分组列表分组列表分组列表分组列表分组列表分组分组列表分组列表列表分组列表',
					// description: 'description',
					// consumes: '["test"]',
					// produces: '["test"]',
					// externalDocs: '{"url":"url","description":"附加文档"}',
					// additional: '[{"title":"title","description":"附加文手动阀档"}]',
					// parameters: [{
					// 	required: 'true',
					// 	in: 'query',
					// 	type: 'type',
					// 	name: 'name',
					// 	description: 'description',
					// 	def: 'test',
					// 	minLength: 123,
					// 	enums: '["q","ee","etet"]',
					// 	pattern: 'scope.row.pattern ',
					// 	items: [{
					// 		rowKeyId: 'rowKeyId1',
					// 		type: 'type',
					// 		name: 'name',
					// 		description: 'description'
					// 	}]
					// }],
					// responses: []
				},
				apiRules: {
					path: [{
						required: true,
						message: this.$t('EnterPath'),
						trigger: 'blur'
					}],
					title: [{
						required: true,
						message: this.$t('EnterApiName'),
						trigger: 'blur'
					}]
				},
				parameters: [],
				/**是否显示数据编辑框*/
				dialogDataEditVisible: false,
				parameterData: {},
				responses: [{
					status: 200,
					msg: 'ok',
					data: []
				}],
				additional: []
			};
		},
		created() {
			let role = store.getters.role;
			if (role != 'ROOT' && role != 'SERVER') {
				this.$router.push('/index');
			} else {
				this.apiId = this.$route.params.aid;
				if (this.apiId == null) {
					this.$message.warning(this.$t('FailedToLoadTheProjectInvalidID'));
					return;
				}
				this.loadApi(this.apiId);
			}
		},
		methods: {
			/**
			 * 还原API
			 * @param {Object} aid
			 */
			showApiSubmit(aid) {
				this.$confirm(this.$t('ApiShowConfirm'), this.$t('Tips'), {
						confirmButtonText: this.$t('Confirm'),
						cancelButtonText: this.$t('Cancel'),
						type: 'warning'
					})
					.then(() => {
						showApiAPI(
							aid,
							res => {
								console.log(data);
								var data = res.data;
								if (data.code == 200) {
									this.$message.success(this.$t('ModifySuccess'));
									this.$router.push('/index/get/recycler');
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
			 * 提交删除API
			 * @param {Object} aid
			 */
			apiDeleteSubmit(aid) {
				this.$confirm(this.$t('DeleteConfirm'), this.$t('Tips'), {
						confirmButtonText: this.$t('Confirm'),
						cancelButtonText: this.$t('Cancel'),
						type: 'warning'
					})
					.then(() => {
						deleteApiAPI(
							aid,
							res => {
								var data = res.data;
								console.log('delete API...');
								console.log(data);
								if (data.code == 200) {
									this.$message.success(this.$t('DeleteSuccess'));
									this.$router.push('/index/get/recycler');
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
			 * 加载API信息
			 * @param {Object} aid
			 */
			loadApi(aid) {
				if (aid == null || aid == '') {
					return;
				}
				this.dataLoading = true;
				getApiAPI(
					aid,
					res => {
						let data = res.data;
						console.log('load API...');
						console.log(data);
						if (data.code == 200) {
							if (data.data.apiId == null || data.data.apiId == '') {
								this.$message.error(this.$t('FailedToLoadTheProjectInvalidID'));
								return;
							}
							if (data.data.additional != null && data.data.additional != '') {
								data.data.additional = JSON.parse(data.data.additional);
							}
							if (data.data.externalDocs != null && data.data.externalDocs != '') {
								data.data.externalDocs = JSON.parse(data.data.externalDocs);
								if (data.data.externalDocs.description != null) {
									data.data.exDdescription = data.data.externalDocs.description;
								}
								if (data.data.externalDocs.url != null) {
									data.data.exDurl = data.data.externalDocs.url;
								}
							}
							data.data.deprecated = (data.data.deprecated == true || data.data.deprecated == 'true')
							if (data.data.consumes != null && data.data.consumes != '') {
								data.data.consumes = JSON.parse(data.data.consumes);
							}
							if (data.data.produces != null && data.data.produces != '') {
								data.data.produces = JSON.parse(data.data.produces);
							}
							if (data.data.parameters != null && data.data.parameters != '') {
								let reqd = JSON.parse(data.data.parameters);
								for (let i = 0; i < reqd.length; i++) {
									reqd[i].tableRowkey = this.getTableRandomRowKey();
									reqd[i].tableRowLevel = 1;
									reqd[i].required = reqd[i].required == true || reqd[i].required == 'true';
									reqd[i].ref = reqd;
									if (reqd[i].items != null) {
										this.recursionLoadTableData(reqd[i]);
									} else {
										reqd[i].items = [];
									}
								}
								this.parameters = reqd;
							} else {
								this.parameters = [];
							}
							if (data.data.responses != null && data.data.responses != '') {
								let respd = JSON.parse(data.data.responses);
								if (respd != null && respd.length > 0 && (respd[0].status == null || respd[0].data ==
										null)) {
									respd = [{
										status: 200,
										msg: 'ok',
										data: respd
									}];
								} else {
									respd = respd;
								}
								for (let i = 0; i < respd.length; i++) {
									let responsed = respd[i].data;
									for (let j = 0; j < responsed.length; j++) {
										let d = responsed[j];
										d.tableRowkey = this.getTableRandomRowKey();
										d.tableRowLevel = 1;
										d.ref = responsed;
										if (d.items != null) {
											this.recursionLoadTableData(d);
										} else {
											d.items = [];
										}
									}
								}
								this.responses = respd;
							} else {
								this.responses = [];
							}
							if (data.data.additional != null && data.data.additional != '') {
								if (Array.isArray(data.data.additional)) {
									this.additional = data.data.additional;
								} else {
									this.additional = JSON.parse(data.data.additional);
								}
							}
							this.api = data.data;
						}
						this.dataLoading = false;
					},
					err => {
						this.$message.error(this.$t('FailedToGetGroupInfoSeeConsole'));
						console.log(err);
					}
				);
			},
			/**
			 * 递归添加要显示的表格参数
			 * @param {Object} data
			 */
			recursionLoadTableData(data) {
				if (data.items == null || data.items.length == 0) {
					return;
				}
				for (let i = 0; i < data.items.length; i++) {
					let d = data.items[i];
					d.tableRowkey = this.getTableRandomRowKey();
					d.tableRowLevel = data.tableRowLevel + 1;
					d.ref = data.items;
					if (d.items != null) {
						this.recursionLoadTableData(d);
					} else {
						d.items = [];
					}
				}
			},
			/**
			 * 提交新建API
			 */
			submitUpdateApi() {
				this.$refs.apiForm.validate(valid => {
					if (valid) {
						let reqData = {};
						reqData.apiId = this.apiId;
						reqData.method = this.api.method;
						reqData.deprecated = this.api.deprecated;
						reqData.path = this.api.path.replace(/(\/)+/g, '/');
						if (!reqData.path.startsWith('/')) {
							reqData.path = '/' + reqData.path;
						}
						reqData.title = this.api.title;
						reqData.description = this.api.description || '';
						if (!isNaN(this.api.sorts)) {
							reqData.sorts = parseInt(this.api.sorts);
						}
						if (this.api.consumes != null && this.api.consumes.length > 0) {
							reqData.consumes = JSON.stringify(this.api.consumes);
						} else {
							reqData.consumes = '[]';
						}
						if (this.api.produces != null && this.api.produces.length > 0) {
							reqData.produces = JSON.stringify(this.api.produces);
						} else {
							reqData.produces = '[]';
						}
						// 请求参数开始
						if (this.parameters.length > 0) {
							let params = [];
							for (let i = 0; i < this.parameters.length; i++) {
								let p = this.parameters[i];
								if (p.name == null || p.name == '') {
									continue;
								}
								let d = {
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
								if (p.minimum != null && p.minimum != '') {
									d.minimum = p.minimum;
								}
								if (p.maximum != null && p.maximum != '') {
									d.maximum = p.maximum;
								}
								if (p.enums != null && p.enums != '') {
									let cs = p.enums.split(',');
									let enums = [];
									for (let i = 0; i < cs.length; i++) {
										if (cs[i] == ',' || cs[i] == '') {
											continue;
										}
										enums.push(cs[i]);
									}
									if (enums.length > 0) {
										d.enums = JSON.stringify(enums);
									}
								}
								if (p.pattern != null && p.pattern != '') {
									d.pattern = p.pattern;
								}
								if (p.items != null && p.items.length > 0) {
									d.items = [];
									this.recursionConverter(d.items, p.items);
								}
								params.push(d);
							}
							reqData.parameters = JSON.stringify(params);
						} else {
							reqData.parameters = "[]";
						}
						reqData.body = this.api.body;
						// 请求参数结束,响应结束开始
						if (this.responses.length > 0) {
							let params = [];
							for (let i = 0; i < this.responses.length; i++) {
								let p = this.responses[i];
								if ((p.status == null || p.status == '') && (p.data == null || p.data.length ==
										0)) {
									continue;
								}
								let d = {
									status: p.status,
									msg: p.msg
								};
								d.data = [];
								for (let j = 0; j < p.data.length; j++) {
									let pd = p.data[j];
									if (pd.name == null || pd.name == '') {
										continue;
									}
									let dd = {
										type: pd.type,
										in: pd.in,
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
							reqData.responses = JSON.stringify(params);
						} else {
							reqData.responses = "[]";
						}
						// 响应参数结束

						let exd = null;
						if (this.api.exDdescription != null) {
							exd = {
								description: this.api.exDdescription
							};
						}
						if (this.api.exDurl != null) {
							if (exd == null) {
								exd = {};
							}
							exd.url = this.api.exDurl;
						}
						if (exd != null) {
							reqData.externalDocs = JSON.stringify(exd);
						}

						if (this.additional != null && this.additional.length > 0) {
							reqData.additional = JSON.stringify(this.additional);
						}
						console.log('update API');
						console.log(reqData);
						updateApiAPI(
							reqData,
							res => {
								let data = res.data;
								if (data.code == 200) {
									this.$confirm(this.$t('ModifySuccessAskReturn'), this.$t(
											'ModifySuccess'), {
											confirmButtonText: this.$t('GoBack'),
											cancelButtonText: this.$t('Cancel'),
											type: 'success'
										})
										.then(() => {
											this.$router.go(-1);
										})
										.catch(() => {
											location.reload();
										});
								}
							},
							err => {
								this.$message.error(this.$t('FailedToModifySeeConsole'));
								console.log(err);
							}
						);
					} else {
						this.$message.warning(this.$t('MissingRequiredInformation'));
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
				for (let i = 0; i < items.length; i++) {
					let p = {};
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
			 * 添加请求参数
			 */
			addParameter() {
				this.parameters.push({
					tableRowkey: this.getTableRandomRowKey(),
					tableRowLevel: 1,
					required: true,
					in: 'query',
					type: 'string',
					name: '',
					description: '',
					items: [],
					ref: this.parameters
				});
			},
			showParameterEdit(data) {
				this.dialogDataEditVisible = true;
				if (data.enums != null) {
					try {
						data.enums = JSON.parse(data.enums).join(',');
					} catch (e) {
						console.log('data.enums convert err: ', e)
					}
				}
				this.parameterData = data;
			},
			/**
			 * 添加响应参数
			 */
			addResponse() {
				this.responses.push({
					status: null,
					msg: null,
					data: []
				});
			},
			/**
			 * 给响应数据添加参数
			 * @param {Object} data
			 */
			addResponseData(data) {
				data.push({
					tableRowkey: this.getTableRandomRowKey(),
					tableRowLevel: 1,
					type: 'string',
					name: '',
					in: 'body',
					description: '',
					items: [],
					ref: data
				});
			},
			/**
			 * 移除响应数据
			 * @param {Object} index
			 */
			removeResponseData(index) {
				this.$confirm(this.$t('RemoveConfirm'), this.$t('Tips'), {
						confirmButtonText: this.$t('Confirm'),
						cancelButtonText: this.$t('Cancel'),
						type: 'warning'
					})
					.then(() => {
						this.responses.splice(index, 1);
					})
					.catch(() => {});
			},
			/**
			 * 显示响应参数编辑框
			 * @param {Object} data
			 */
			showResponseDataEdit(data) {
				this.dialogResponseEditVisible = true;
				this.responseEditData = data;
				console.log(data);
			},
			/**
			 * 编辑参数添加数据
			 * @param {Object} data
			 */
			addDataItems(data) {
				data.items.push({
					tableRowkey: this.getTableRandomRowKey(),
					tableRowLevel: data.tableRowLevel + 1,
					type: 'string',
					name: '',
					in: 'body',
					description: '',
					items: [],
					ref: data.items
				});
			},
			/**
			 * 数据上下数据列移动
			 * @param {Object} row 数据
			 * @param {Object} key 要移动的数据id
			 * @param {Object} flag 0=下移,1=上移
			 */
			tableColumnMove(row, key, flag) {
				let idx = -1;
				let data = row.ref;
				for (let i = 0; i < data.length; i++) {
					if (data[i].tableRowkey == key) {
						idx = i;
						break;
					}
				}
				if (idx == -1 || (flag == 0 && idx == 0) || (flag == 1 && idx == data.length - 1)) {
					return;
				}
				let temp = data[idx];
				if (flag == 0) {
					this.$set(data, idx, data[idx - 1]);
					this.$set(data, idx - 1, temp);
				} else {
					this.$set(data, idx, data[idx + 1]);
					this.$set(data, idx + 1, temp);
				}
			},
			/**
			 * 移除数据列
			 * @param {Object} row
			 */
			tableColumnRemove(row) {
				this.$confirm(this.$t('RemoveConfirm'), this.$t('Tips'), {
						confirmButtonText: this.$t('Confirm'),
						cancelButtonText: this.$t('Cancel'),
						type: 'warning'
					})
					.then(() => {
						this.findDataAndDelete(row.ref, row.tableRowkey);
					})
					.catch(() => {});
			},
			/**
			 * 找到需要删除的响应数据并删除他
			 * @param {Object} data 数据
			 * @param {Object} index 要删除的id
			 */
			findDataAndDelete(data, index) {
				for (let i = 0; i < data.length; i++) {
					if (data[i].tableRowkey == index) {
						data.splice(i, 1);
						return;
					}
					if (data[i].items != null && data[i].items.length > 0) {
						this.findDataAndDelete(data[i].items, index);
					}
				}
			},
			removeAdditional(idx) {
				this.$confirm(this.$t('RemoveConfirm'), this.$t('Tips'), {
						confirmButtonText: this.$t('Confirm'),
						cancelButtonText: this.$t('Cancel'),
						type: 'warning'
					})
					.then(() => {
						this.additional.splice(idx, 1);
					})
					.catch(() => {});
			},
			/**
			 * 判断类型是否为数值类型
			 * @param {Object} type
			 */
			isNumber(type) {
				return type == 'int' || type == 'long' || type == 'float' || type == 'double' || type == 'number';
			},
			/**
			 * 判断类型是否支持正则与枚举
			 * @param {Object} type
			 */
			isCanEnumsOrRegex(type) {
				return type != 'boolean' && type != 'object' && type != 'array';
			},
			/**
			 * 获取表格数据RowKey
			 */
			getTableRandomRowKey() {
				return 'rowkey-' + Math.random();
			}
		}
	};
</script>


<style scoped>
	/* 通用样式 */
	a {
		text-decoration: none;
		color: #304455;
	}

	img {
		border: none;
	}

	.body-max-width {
		max-width: 1240px;
	}

	.xs-left-sm-rigth {
		text-align: right;
	}

	.mb10px {
		margin-bottom: 10px;
	}

	.prem05 {
		padding: 0.5rem;
	}

	.plrrem05 {
		padding: 0 0.5rem;
	}

	.background-color-white {
		background-color: white;
	}

	.flexCenter {
		display: flex;
		align-items: center;
	}

	.api-body {
		border: 1px solid #3b4151;
		background-color: #f5f7fa;
		margin-bottom: 50px;
	}

	.api-body .api-header {
		background-color: #3b4151;
		font-size: 1.25rem;
		color: white;
		padding: 0.3125rem 0.625rem;
	}

	.api-body-get {
		background-color: #ebf3fb;
		border: 1px solid #61affe;
	}

	.api-body .api-header-get {
		background-color: #61affe;
	}

	.api-body-post {
		background-color: #e8f6f0;
		border: 1px solid #49cc90;
	}

	.api-body .api-header-post {
		background-color: #49cc90;
	}

	.api-body-put {
		background-color: #fbf1e6;
		border: 1px solid #fca130;
	}

	.api-body .api-header-put {
		background-color: #fca130;
	}

	.api-body-delete {
		background-color: #fae7e7;
		border: 1px solid #f93e3e;
	}

	.api-body .api-header-delete {
		background-color: #f93e3e;
	}

	.api-body-head {
		background-color: #f4e7ff;
		border: 1px solid #9012fe;
	}

	.api-body .api-header-head {
		background-color: #9012fe;
	}

	.api-body-options {
		background-color: #e6eef6;
		border: 1px solid #0d5aa7;
	}

	.api-body .api-header-options {
		background-color: #0d5aa7;
	}

	.api-body-patch {
		background-color: #edfcf9;
		border: 1px solid #50e3c2;
	}

	.api-body .api-header-patch {
		background-color: #50e3c2;
	}

	.api-body-trace {
		background-color: #ffe9e6;
		border: 1px solid #ffa8be;
	}

	.api-body .api-header-trace {
		background-color: #ffa8be;
	}

	.api-body-connect {
		background-color: #e6f6f1;
		border: 1px solid #83bb83;
	}

	.api-body .api-header-connect {
		background-color: #83bb83;
	}

	.api-body .api-header .api-header-item {
		line-height: 2.5rem;
	}

	.api-body .api-body-param-header {
		padding: 0.5rem;
		display: flex;
		flex-wrap: wrap;
		align-items: first baseline;
		justify-content: space-between;
	}

	.api-body .api-body-result-header {
		padding: 0.5rem;
		display: flex;
		flex-wrap: wrap;
		align-items: first baseline;
		justify-content: space-between;
	}

	.api-body .api-body-response-header {
		padding: 0.5rem;
		display: flex;
		flex-wrap: wrap;
		align-items: first baseline;
		justify-content: space-between;
	}

	.api-body .api-body-response-body {
		color: white;
		background-color: #18181a;
		padding: 0 0.5rem 0.5rem 0.5rem;
		display: flex;
	}

	.api-body .api-body-response-body .el-tabs__item {
		color: white;
	}

	.api-body .api-body-response-body .el-tabs__item.is-active {
		color: #409eff;
	}

	.api-body .api-body-response-body .el-divider__text {
		background-color: #18181a;
		color: #409eff;
	}

	.api-body .api-body-response-body .jv-container {
		background-color: #18181a;
	}

	.api-body .api-body-response-body .jv-container.jv-light {
		color: white;
	}

	.api-body .api-body-response-body .jv-container.jv-light .jv-item.jv-object {
		color: white;
	}

	.api-body .api-body-response-body .jv-container.jv-light .jv-item.jv-array {
		color: white;
	}

	.api-body .api-body-response-body .jv-container.jv-light .jv-item.jv-string {
		color: #ff7de9;
	}

	.api-body .api-body-response-body .jv-container.jv-light .jv-item.jv-boolean {
		color: gold;
	}

	.api-body .api-body-response-body .jv-container.jv-light .jv-key {
		color: #409eff;
	}

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

	.group-items {
		margin-top: 5px;
		padding: 0;
		list-style-type: none;
	}

	.group-items li {
		display: flex;
		align-items: center;
		padding: 5px 0 3px 5px;
		border-left: 3px solid transparent;
		cursor: pointer;
	}

	.group-items li .group-item {
		padding-bottom: 2px;
		border-bottom: 2px solid transparent;
	}

	.group-items li:hover .group-item {
		color: #409eff;
		border-bottom: 2px solid #409eff;
	}

	.group-items .current {
		color: #409eff;
		border-left: 3px solid #409eff;
	}

	.td-item {
		text-align: right;
		padding-right: 5px;
	}
</style>
