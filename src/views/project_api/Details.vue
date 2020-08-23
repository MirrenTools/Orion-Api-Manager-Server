<template>
	<div>
		<div style="width: 98%; max-width: 1240px;padding: 10px 0;margin: auto;display: flex;align-items: center;">
			<div>
				<b>API详情</b>
			</div>
			<div style="margin-left: auto;">
				<el-button size="mini" type="danger" @click="apiDeleteSubmit(api.apiId)">删除</el-button>
				<el-button size="mini" type="primary" @click="$router.push({path:`/index/put/project/api/${projectId}/${groupId}/${apiId}`})">修改</el-button>
			</div>
		</div>
		<div style="width: 98%; max-width: 1240px;margin:0 auto 50px;" v-loading="dataLoading">
			<div :class="['api', api.method]" v-show="!dataLoading">
				<!-- API的方法与路径与简介 -->
				<div style="padding:5px 5px 0"><span v-if="(api.deprecated==true||api.deprecated=='true')"><b> (已过期)</b></span> {{ api.title }}</div>
				<div class="api-header">
					<div class="api-method">{{ api.method }}</div>
					<div class="api-path-summary">{{ api.path }}</div>
				</div>
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
						<a v-if="api.externalDocs.url != null" :href="api.externalDocs.url" target="_blank" class="alink" style="margin-left: 0;">
							{{ api.externalDocs.url }}
						</a>
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
					<el-table :data="api.parameters" style="width: 100%;" row-key="tableRowKeyId" border
					 default-expand-all :tree-props="{ children: 'items', hasChildren: 'hasChildren' }" empty-text="无需请求数据">
						<el-table-column prop="required" label="必填" width="100" align="right">
							<template slot-scope="scope">
								<span v-if="scope.row.required">{{ scope.row.required === 'true' ? '是' : '否' }}</span>
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
									<span v-if="scope.row.minimum">最小值: {{ scope.row.minimum }}</span>
									<span v-if="scope.row.maximum">最大值: {{ scope.row.maximum }}</span>
									<span v-if="scope.row.enums">枚举值: {{ scope.row.enums }}</span>
									<span v-if="scope.row.pattern">正则: {{ scope.row.pattern }}</span>
								</div>
							</template>
						</el-table-column>
					</el-table>
					<div>
						<el-input
							type="textarea"
							:autosize="{ minRows: 1, maxRows: 10 }"
							placeholder="请求的body,定义格式或占位或schema,比如请求格式要求为:{&quot;id&quot;:{id},&quot;name&quot;:&quot;userName&quot;},{id}代表变量请求时会自动填充body参数"
							v-model="api.body"
						></el-input>
					</div>
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
							<el-table-column prop="in" label="参数位置" width="120" align="right"></el-table-column>
							<el-table-column prop="type" label="参数类型" width="100" align="right"></el-table-column>
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
</template>

<script>
	import {
		getApiAPI,
		deleteAPI
	} from '@/api/Project';
	export default {
		data() {
			return {
				projectId: '',
				groupId:'',
				apiId:'',
				dataLoading: true,
				api: {
					// apiId: 'apiId',
					// deprecated: true,
					// groupId: 'groupId',
					// method: 'get',
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
				}
			};
		},
		created() {
			this.projectId = this.$route.params.pid;
			this.groupId = this.$route.params.gid;
			var aid = this.$route.params.aid;
			if (aid == null) {
				this.$message.warning('加载项目信息失败!API的id不能为空!');
				return;
			}
			this.apiId=aid;
			this.loadApi(aid);
		},
		methods: {
			/**
			 * 加载API
			 * @param {Object} aid
			 */
			loadApi(aid) {
				if (aid == null || aid == '') {
					return;
				}
				getApiAPI(
					aid,
					res => {
						var data = res.data;
						console.log('加载API...');
						console.log(data);
						if (data.code == 200) {
							if (data.data.apiId == null || data.data.apiId == '') {
								this.$message.error('获取API信息失败:数据不存在,请检查id是否有误!');
								return;
							}
							if (data.data.additional != null && data.data.additional != '') {
								data.data.additional = JSON.parse(data.data.additional);
							}
							if (data.data.externalDocs != null && data.data.externalDocs != '') {
								data.data.externalDocs = JSON.parse(data.data.externalDocs);
							}
							if (data.data.parameters != null && data.data.parameters != '') {
								var reqd = JSON.parse(data.data.parameters);
								for (var i = 0; i < reqd.length; i++) {
									this.recursionCreateTableRandomRowKey(reqd[i]);
								}
								data.data.parameters = reqd;
							} else {
								data.data.parameters = [];
							}
							if (data.data.responses != null && data.data.responses != '') {
								var respd = JSON.parse(data.data.responses);
								if ((respd != null && respd.length > 0) && (respd[0].status == undefined || respd[0].data == undefined)) {
									data.data.responses = [{
										status: 200,
										msg: 'ok',
										data: respd
									}];
								} else {
									data.data.responses = respd;
								}
								for (var i = 0; i < data.data.responses.length; i++) {
									var responsed = data.data.responses[i].data;
									for (var j = 0; j < responsed.length; j++) {
										this.recursionCreateTableRandomRowKey(responsed[j]);
									}
								}
							} else {
								data.data.responses = [];
							}
							this.api = data.data;
						} else {
							this.$message.error('获取API信息失败:' + data.msg);
						}
						this.dataLoading = false;
					},
					err => {
						this.$message.error('获取API信息失败,更多信息请查看浏览器控制台!');
						console.log(err);
					}
				);
			},
			/**
			 * 提交删除API
			 * @param {Object} aid
			 */
			apiDeleteSubmit(aid) {
				this.$confirm('确定删除API吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(() => {
						deleteAPI(
							aid,
							res => {
								var data = res.data;
								console.log('删除API...');
								console.log(data);
								if (data.code == 200) {
									this.$message.success('删除成功!');
									this.$router.push({
										path: '/index/get/project/' + this.projectId
									});
								} else {
									this.$message.error('删除失败:' + data.msg);
								}
							},
							err => {
								this.$message.error('删除失败,更多信息请查看控制台!');
								console.log(err);
							}
						);
					})
					.catch(() => {});
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
			},
		}
	};
</script>
<style lang="scss" scoped>
	@import '@/styles/api-method-style.scss';

	.desc-constraint span {
		display: inline-block;
		padding-right: 10px;
	}
</style>
