<template>
	<div>
		<div style="width: 98%; max-width: 1240px;padding: 10px 0;margin: auto;display: flex;align-items: center;">
			<div>
				<b>新增API</b>
			</div>
		</div>
		<div style="width: 98%; max-width: 1240px;margin:0 auto 50px;">
			<el-form label-position="right" label-width="120px" :model="api">
				<el-form-item label="Method">
					<el-select v-model="api.method" placeholder="请选择">
						<el-option value="get">get</el-option>
						<el-option value="head">head</el-option>
						<el-option value="post">post</el-option>
						<el-option value="put">put</el-option>
						<el-option value="delete">delete</el-option>
						<el-option value="options">options</el-option>
						<el-option value="patch">patch</el-option>
						<el-option value="trace">trace</el-option>
						<el-option value="connect">connect</el-option>
						<el-option value="other">other</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Path">
					<el-input v-model="api.path" placeholder="URL上的path,必填,已/开始,如果没有系统会自动加上/ ,path参数请加上英文{},示例:{id}"></el-input>
				</el-form-item>
				<el-form-item label="接口名称">
					<el-input v-model="api.title" placeholder="接口的名称,必填 "></el-input>
				</el-form-item>
				<el-form-item label="详细说明">
					<el-input type="textarea" v-model="api.description" placeholder="接口的详细描述,支持HTML"></el-input>
				</el-form-item>
				<el-form-item label="排序">
					<el-input v-model="api.sorts" placeholder="接口在分组中的排序"></el-input>
				</el-form-item>
				<el-form-item label="Consumes">
					<el-input v-model="api.consumes" placeholder="consumes 多个以英文的,号分开"></el-input>
				</el-form-item>
				<el-form-item label="请求参数">
					<div>
						<el-table :data="parameters" style="width: 100%;" class="min-height-table" row-key="tableXxxxxxRandomRowKeyId"
						 border default-expand-all :tree-props="{ children: 'items', hasChildren: 'hasChildren' }">
							<el-table-column prop="type" label="参数类型" width="120" style="padding: 0 !important;"></el-table-column>
							<el-table-column prop="name" label="参数名称" width="300" style="padding: 0 !important;"></el-table-column>
							<el-table-column prop="description" label="参数描述" style="padding: 0 !important;">
								<template slot-scope="scope">
									<div v-if="scope.row.description" v-html="scope.row.description"></div>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-form-item>
				<el-form-item label="Produces">
					<el-input v-model="api.produces" placeholder="produces 多个以英文的,号分开"></el-input>
				</el-form-item>
				<el-form-item label="响应结果">
					<div>
						<div v-for="(resp, idx) in responses" :key="idx" style="border: 1px solid #c6e2ff; padding: 5px;margin-bottom: 5px;">
							<div style="display: flex;">
								<div style="width: 10%;margin-right: 5px;">状态码:</div>
								<div style="width: 30%;margin-right: 5px;">
									<el-input v-model="resp.status" placeholder="响应状态码"></el-input>
								</div>
								<div style="width: 10%;margin-right: 5px;">状态信息:</div>
								<div style="width: 100%;">
									<el-input v-model="resp.msg" placeholder="响应状态信息"></el-input>
								</div>
							</div>
							<div>响应数据: </div>
							<el-table :data="resp.data" style="width: 100%;" class="min-height-table" row-key="tableXxxxxxRandomRowKeyId"
							 border default-expand-all :tree-props="{ children: 'items', hasChildren: 'hasChildren' }">
								<el-table-column prop="type" label="参数类型" width="180" align="right">
									<template v-slot="scope">
										<el-select v-model="scope.row.type" placeholder="请选择" style="width: 120px;">
											<el-option value="string">string</el-option>
											<el-option value="int">int</el-option>
											<el-option value="long">long</el-option>
											<el-option value="object">object</el-option>
											<el-option value="array">array</el-option>
											<el-option value="float">float</el-option>
											<el-option value="double">double</el-option>
											<el-option value="number">number</el-option>
											<el-option value="boolean">boolean</el-option>
										</el-select>
										<!-- <el-input v-model="scope.row.type" placeholder="响应状态信息" style="margin: 5px auto;"></el-input> -->
									</template>
								</el-table-column>
								<el-table-column prop="tableXxxxxxLevel" label="层级" width="60"></el-table-column>
								<el-table-column prop="name" label="参数名称" width="250">
									<template v-slot="scope">
										<el-input v-model="scope.row.name" placeholder="请输入参数名称"></el-input>
									</template>
								</el-table-column>
								<el-table-column prop="description" label="参数描述">
									<template v-slot="scope">
										<el-input v-model="scope.row.description" type="textarea" :rows="1" placeholder="请输入参数描述,支持HTML" style="margin: 5px auto;"></el-input>
									</template>
								</el-table-column>
								<el-table-column label="操作" width="300px">
									<template v-slot="scope">
										<el-button size="mini" @click="responseDataMove(resp.data,scope.row.tableXxxxxxLevel,scope.row.tableXxxxxxRandomRowKeyId,0)">上移</el-button>
										<el-button size="mini" @click="responseDataMove(resp.data,scope.row.tableXxxxxxLevel,scope.row.tableXxxxxxRandomRowKeyId,1)">下移</el-button>
										<el-button size="mini" type="primary" v-show="(scope.row.type=='object'||scope.row.type=='array')" @click="addResponseEditData(scope.row)">添加参数</el-button>
										<el-button size="mini" type="danger" @click="addResponseDataRemove(resp.data,scope.row.tableXxxxxxRandomRowKeyId)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
							<div style="text-align: right;padding-top: 3px;">
								<el-button size="mini" @click="addResponseData(resp.data)">添加参数</el-button>
							</div>
						</div>
						<div style="text-align: right;">
							<el-button @click="addResponse()">添加更多</el-button>
						</div>
					</div>
				</el-form-item>

				<!-- 				<el-form-item label="附加说明">
					<div style="border: 1px solid #CCC;padding: 5px;margin-bottom: 5px;" v-for="(add,idx) in additional" :key="idx">
						<el-input v-model="add.title" placeholder="附加标题标题"></el-input>
						<el-input type="textarea" v-model="add.description" placeholder="附加说明描述"></el-input>
						<div style="text-align: right;padding-top: 3px;"><el-button size="mini" v-show="additional.length>1">上移</el-button><el-button size="mini" v-show="additional.length>1">下移</el-button><el-button size="mini">移除</el-button></div>
					</div>
					<div style="text-align: right;">
						<el-button @click="addAdditional()">添加更多</el-button>
					</div>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary">立即创建</el-button>
				</el-form-item>
			</el-form>
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
				groupId: '',
				api: {
					// apiId: 'apiId',
					// deprecated: true,
					// groupId: 'groupId',
					method: 'get',
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
					// 	regex: 'scope.row.regex ',
					// 	items: [{
					// 		rowKeyId: 'rowKeyId1',
					// 		type: 'type',
					// 		name: 'name',
					// 		description: 'description'
					// 	}]
					// }],
					// responses: []
				},
				parameters: [],
				responses: [{
					status: 200,
					msg: 'ok',
					data: []
				}],
				/**是否显示响应参数的编辑框*/
				dialogResponseEditVisible: false,
				/**响应参数编辑框的数据*/
				responseEditData: {},




				// additional:[{title:'title',description:'description'}]
			};
		},
		created() {
			this.projectId = this.$route.params.pid;
			this.groupId = this.$route.params.gid;
			if (this.groupId == null) {
				this.$message.warning('加载项目信息失败!分组的id不能为空!');
				return;
			}
		},
		methods: {
			/**
			 * 加载API
			 * @param {Object} aid
			 */
			loadApi(aid) {

			},
			/**
			 * 添加响应参数
			 */
			addResponse() {
				this.responses.push({
					status: null,
					msg: null,
					data: []
				})
			},
			/**
			 * 给响应数据添加参数
			 * @param {Object} data
			 */
			addResponseData(data) {
				data.push({
					tableXxxxxxRandomRowKeyId: this.getTableRandomRowKey(),
					tableXxxxxxLevel: 1,
					type: 'string',
					name: '',
					description: '',
					items: []
				})
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
			addResponseEditData(data) {
				data.items.push({
					tableXxxxxxRandomRowKeyId: this.getTableRandomRowKey(),
					tableXxxxxxLevel: data.tableXxxxxxLevel + 1,
					type: 'string',
					name: '',
					description: '',
					items: [],
					ref: data
				});
			},
			/**
			 * 数据上下移动
			 * @param {Object} data 数据
			 * @param {Object} level 数据的级别
			 * @param {Object} key 要移动的数据id
			 * @param {Object} flag 0=下移,1=上移
			 */
			responseDataMove(data, level, key, flag) {
				console.log(level)
				console.log(key)
				console.log(flag)
				console.log(data)
				if (level == 1) {
					var idx = -1;
					for (var i = 0; i < data.length; i++) {
						if (data[i].tableXxxxxxRandomRowKeyId == key) {
							idx = i;
							break;
						}
					}
					console.log(idx)
					if (idx == -1 || (flag == 0 && idx == 0) || (flag == 1 && idx == data.length)) {
						return;
					}
					var temp = data[idx];
					if (flag == 0) {
						data[idx] = data[idx - 1];
						data[idx - 1] = temp;
					} else {
						data[idx] = data[idx + 1];
						data[idx + 1] = temp;
					}
					console.log(data)
					
				} else {

				}
				
			},
			/**
			 * 移除响应数据列
			 * @param {Object} row
			 */
			addResponseDataRemove(data, index) {
				console.log(index)
				this.$confirm('确定移除行数据吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(() => {
						this.findDataAndDelete(data, index);
					})
					.catch(() => {});
			},
			/**
			 * 找到需要删除的响应数据并删除他
			 * @param {Object} data 数据
			 * @param {Object} index 要删除的id
			 */
			findDataAndDelete(data, index) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].tableXxxxxxRandomRowKeyId == index) {
						data.splice(i, 1);
						return;
					}
					if (data[i].items != null && data[i].items.length > 0) {
						this.findDataAndDelete(data[i].items, index);
					}
				}
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
