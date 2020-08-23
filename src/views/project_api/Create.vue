<template>
	<div>
		<div style="width: 98%; max-width: 1240px;padding: 10px 0;margin: auto;display: flex;align-items: center;">
			<div><b>新增API</b></div>
		</div>
		<div style="width: 98%; max-width: 1240px;margin:0 auto 50px;">
			<el-form ref="apiForm" label-position="right" label-width="120px" :model="api" :rules="apiRules">
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
				<el-form-item prop="path" label="Path">
					<el-input v-model="api.path" placeholder="URL上的path,必填,已/开始,如果没有系统会自动加上/ ,path参数请加上英文{},示例:{id}"></el-input>
				</el-form-item>
				<el-form-item prop="title" label="接口名称"><el-input v-model="api.title" placeholder="接口的名称,必填 "></el-input></el-form-item>
				<el-form-item label="详细说明"><el-input type="textarea" v-model="api.description" placeholder="接口的详细描述,支持HTML"></el-input></el-form-item>
				<el-form-item label="排序"><el-input v-model="api.sorts" type="number" placeholder="接口在分组中的排序,默认:0"></el-input></el-form-item>
				<el-form-item label="Consumes"><el-input v-model="api.consumes" placeholder="consumes 多个以英文的,号分开"></el-input></el-form-item>
				<el-form-item label="请求参数">
					<div>
						<el-table
							:data="parameters"
							style="width: 100%;"
							class="min-height-table"
							row-key="tableRowkey"
							border
							default-expand-all
							:tree-props="{ children: 'items', hasChildren: 'hasChildren' }"
						>
							<el-table-column prop="required" label="必填" width="80" align="right">
								<template v-slot="scope">
									<el-checkbox v-model="scope.row.required" v-show="scope.row.tableRowLevel == 1" style="width:100%;"></el-checkbox>
								</template>
							</el-table-column>
							<el-table-column prop="in" label="参数位置" width="120">
								<template v-slot="scope">
									<el-select v-model="scope.row.in" placeholder="请选择" v-show="scope.row.tableRowLevel == 1">
										<el-option value="query">query</el-option>
										<el-option value="body">body</el-option>
										<el-option value="path">path</el-option>
										<el-option value="header">header</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column prop="type" label="参数类型" width="140">
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
								</template>
							</el-table-column>
							<el-table-column prop="name" label="参数名称" width="250">
								<template v-slot="scope">
									<el-input v-model="scope.row.name" placeholder="请输入参数名称"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="description" label="参数描述">
								<template v-slot="scope">
									<el-input
										v-model="scope.row.description"
										type="textarea"
										:autosize="{ minRows: 1, maxRows: 3 }"
										placeholder="请输入参数描述,支持HTML"
										style="margin: 5px auto;"
									></el-input>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="65">
								<template v-slot="scope">
									<el-popover placement="left-start" trigger="click">
										<el-button size="mini" @click="tableColumnMove(scope.row, scope.row.tableRowkey, 0)">上移</el-button>
										<el-button size="mini" @click="tableColumnMove(scope.row, scope.row.tableRowkey, 1)">下移</el-button>
										<el-button v-show="scope.row.type != 'boolean'" size="mini" type="primary" @click="showParameterEdit(scope.row)">编辑</el-button>
										<el-button size="mini" type="danger" @click="tableColumnRemove(scope.row)">删除</el-button>
										<el-button slot="reference" size="mini" icon="el-icon-edit"></el-button>
									</el-popover>
								</template>
							</el-table-column>
						</el-table>
						<div style="text-align: right;margin-top: 5px;margin-bottom: 3px;">
							<div style="text-align: right;"><el-button @click="addParameter()">添加参数</el-button></div>
						</div>
						<div>
							<el-input
								type="textarea"
								:autosize="{ minRows: 2, maxRows: 10 }"
								placeholder="请求的body,定义格式或占位或schema,比如请求格式要求为:{&quot;id&quot;:{id},&quot;name&quot;:&quot;userName&quot;},{id}代表变量请求时会自动填充body参数"
								v-model="api.body"
							></el-input>
						</div>
					</div>
				</el-form-item>
				<el-form-item label="Produces"><el-input v-model="api.produces" placeholder="produces 多个以英文的,号分开"></el-input></el-form-item>
				<el-form-item label="响应结果">
					<div>
						<div v-for="(resp, idx) in responses" :key="idx" style="border: 1px solid #c6e2ff; padding: 5px;margin-bottom: 5px;">
							<div style="display: flex;">
								<div style="width: 10%;min-width: 50px;margin-right: 5px;">状态码:</div>
								<div style="width: 30%;margin-right: 5px;"><el-input v-model="resp.status" placeholder="响应状态码"></el-input></div>
								<div style="width: 10%;min-width: 60px;margin-right: 5px;">状态信息:</div>
								<div style="width: 100%;"><el-input v-model="resp.msg" placeholder="响应状态信息"></el-input></div>
							</div>
							<div>响应数据:</div>
							<el-table
								:data="resp.data"
								style="width: 100%;"
								class="min-height-table"
								row-key="tableRowkey"
								border
								default-expand-all
								:tree-props="{ children: 'items', hasChildren: 'hasChildren' }"
							>
								<el-table-column prop="in" label="位置" width="180" align="right">
									<template v-slot="scope">
										<el-select v-model="scope.row.in" placeholder="请选择" v-if="scope.row.tableRowLevel == 1" style="width: 100px;">
											<el-option value="body">body</el-option>
											<el-option value="header">header</el-option>
										</el-select>
									</template>
								</el-table-column>
								<el-table-column prop="tableRowLevel" label="层级" width="60"></el-table-column>
								<el-table-column prop="type" label="参数类型" width="120">
									<template v-slot="scope">
										<el-select v-model="scope.row.type" placeholder="请选择" style="width: 100px;">
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
									</template>
								</el-table-column>
								<el-table-column prop="name" label="参数名称" width="250">
									<template v-slot="scope">
										<el-input v-model="scope.row.name" placeholder="请输入参数名称"></el-input>
									</template>
								</el-table-column>
								<el-table-column prop="description" label="参数描述">
									<template v-slot="scope">
										<el-input
											v-model="scope.row.description"
											type="textarea"
											:autosize="{ minRows: 1, maxRows: 3 }"
											placeholder="请输入参数描述,支持HTML"
											style="margin: 5px auto;"
										></el-input>
									</template>
								</el-table-column>
								<el-table-column label="操作" width="65">
									<template v-slot="scope">
										<el-popover placement="left-start" trigger="click">
											<el-button size="mini" @click="tableColumnMove(scope.row, scope.row.tableRowkey, 0)">上移</el-button>
											<el-button size="mini" @click="tableColumnMove(scope.row, scope.row.tableRowkey, 1)">下移</el-button>
											<el-button size="mini" type="primary" v-show="scope.row.type == 'object' || scope.row.type == 'array'" @click="addDataItems(scope.row)">添加参数</el-button>
											<el-button size="mini" type="danger" @click="tableColumnRemove(scope.row)">删除</el-button>
											<el-button slot="reference" size="mini" icon="el-icon-edit"></el-button>
										</el-popover>
									</template>
								</el-table-column>
							</el-table>
							<div style="text-align: right;padding-top: 3px;"><el-button size="mini" type="danger" @click="removeResponseData(idx)">移除</el-button> <el-button size="mini" @click="addResponseData(resp.data)">添加参数</el-button></div>
						</div>
						<div style="text-align: right;"><el-button @click="addResponse()">添加更多</el-button></div>
					</div>
				</el-form-item>
				<el-form-item label="附加文档URL"><el-input v-model="api.exDurl" placeholder="请输入附加文档的URL"></el-input></el-form-item>
				<el-form-item label="附加文档说明"><el-input type="textarea" v-model="api.exDdescription" placeholder="请输入附加文档的描述,支持HTML"></el-input></el-form-item>
				<el-form-item><el-button type="primary" @click="submitCreateApi()">立即创建</el-button></el-form-item>
			</el-form>
		</div>

		<el-dialog title="数据编辑" width="80%" style="max-width: 1240px;" :visible.sync="dialogDataEditVisible">
			<el-form :model="parameterData" label-width="100px">
				<el-form-item label="数据类型">
					<el-select v-model="parameterData.type" placeholder="请选择">
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
				</el-form-item>
				<el-form-item label="参数说明" v-show="parameterData.type == 'object' || parameterData.type == 'array'">
					<el-table
						:data="parameterData.items"
						style="width: 100%;"
						class="min-height-table"
						row-key="tableRowkey"
						border
						default-expand-all
						:tree-props="{ children: 'items', hasChildren: 'hasChildren' }"
					>
						<el-table-column prop="type" label="参数类型" align="right">
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
							</template>
						</el-table-column>
						<el-table-column prop="name" label="参数名称">
							<template v-slot="scope">
								<el-input v-model="scope.row.name" placeholder="请输入参数名称"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="description" label="参数描述">
							<template v-slot="scope">
								<el-input v-model="scope.row.description" type="textarea" :rows="1" placeholder="请输入参数描述,支持HTML" style="margin: 5px auto;"></el-input>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="65">
							<template v-slot="scope">
								<el-popover placement="left-start" trigger="click">
									<el-button size="mini" @click="tableColumnMove(scope.row, scope.row.tableRowkey, 0)">上移</el-button>
									<el-button size="mini" @click="tableColumnMove(scope.row, scope.row.tableRowkey, 1)">下移</el-button>
									<el-button size="mini" type="primary" v-show="scope.row.type == 'object' || scope.row.type == 'array'" @click="addDataItems(scope.row)">添加参数</el-button>
									<el-button size="mini" type="danger" @click="tableColumnRemove(scope.row)">删除</el-button>
									<el-button slot="reference" size="mini" icon="el-icon-edit"></el-button>
								</el-popover>
							</template>
						</el-table-column>
					</el-table>
					<div style="text-align: right;"><el-button size="mini" @click="addDataItems(parameterData)">添加参数</el-button></div>
				</el-form-item>
				<el-form-item label="最大长度" v-show="parameterData.type == 'string'"><el-input v-model="parameterData.maxLength" placeholder="最大长度"></el-input></el-form-item>
				<el-form-item label="最小长度" v-show="parameterData.type == 'string'"><el-input v-model="parameterData.minLength" placeholder="最小长度"></el-input></el-form-item>
				<el-form-item label="最大值" v-show="isNumber(parameterData.type)"><el-input v-model="parameterData.maximum" placeholder="最大值"></el-input></el-form-item>
				<el-form-item label="最小值" v-show="isNumber(parameterData.type)"><el-input v-model="parameterData.minimum" placeholder="最小值"></el-input></el-form-item>
				<el-form-item label="默认值" v-show="isCanEnumsOrRegex(parameterData.type)"><el-input v-model="parameterData.def" placeholder="默认值"></el-input></el-form-item>
				<el-form-item label="枚举值" v-show="isCanEnumsOrRegex(parameterData.type)">
					<el-input v-model="parameterData.enums" placeholder="枚举值,英文,号分隔"></el-input>
				</el-form-item>
				<el-form-item label="正则表达式" v-show="isCanEnumsOrRegex(parameterData.type)">
					<el-input v-model="parameterData.pattern" placeholder="正则表达式"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogDataEditVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogDataEditVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { saveApiAPI } from '@/api/Project';
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
				consumes: 'x-www-form-urlencoded,application/json,form-data,application/xml',
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
				path: [
					{
						required: true,
						message: '请输入Path',
						trigger: 'blur'
					}
				],
				title: [
					{
						required: true,
						message: '请输入接口的名称',
						trigger: 'blur'
					}
				]
			},
			parameters: [],
			/**是否显示数据编辑框*/
			dialogDataEditVisible: false,
			parameterData: {},
			responses: [
				{
					status: 200,
					msg: 'ok',
					data: []
				}
			]
			// additional:[{title:'title',description:'description'}]
		};
	},
	created() {
		this.projectId = this.$route.params.pid;
		this.groupId = this.$route.params.gid;
		if (this.groupId == null) {
			this.$message.warning('加载信息失败!分组的id不能为空!');
			return;
		}
	},
	methods: {
		/**
		 * 提交新建API
		 */
		submitCreateApi() {
			this.$refs.apiForm.validate(valid => {
				if (valid) {
					var reqData = {};
					reqData.groupId = this.groupId;
					reqData.method = this.api.method;
					reqData.path = this.api.path.replace(/(\/)+/g, '/');
					if (!reqData.path.startsWith('/')) {
						reqData.path = '/' + reqData.path;
					}
					reqData.title = this.api.title;
					if (this.api.description != null && this.api.description != '') {
						reqData.description = this.api.description;
					}
					if (!isNaN(this.api.sorts)) {
						reqData.sorts = parseInt(this.api.sorts);
					}
					if (this.api.consumes != null && this.api.consumes != '') {
						var cs = this.api.consumes.split(',');
						var consumes = [];
						for (var i = 0; i < cs.length; i++) {
							if (cs[i] == ',' || cs[i] == '') {
								continue;
							}
							consumes.push(cs[i]);
						}
						if (consumes.length > 0) {
							reqData.consumes = JSON.stringify(consumes);
						}
					}
					if (this.api.produces != null && this.api.produces != '') {
						var cs = this.api.produces.split(',');
						var produces = [];
						for (var i = 0; i < cs.length; i++) {
							if (cs[i] == ',' || cs[i] == '') {
								continue;
							}
							produces.push(cs[i]);
						}
						if (produces.length > 0) {
							reqData.produces = JSON.stringify(produces);
						}
					}
					// 请求参数开始
					if (this.parameters.length > 0) {
						var params = [];
						for (var i = 0; i < this.parameters.length; i++) {
							var p = this.parameters[i];
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
							if (p.minimum != null && p.minimum != '') {
								d.minimum = p.minimum;
							}
							if (p.maximum != null && p.maximum != '') {
								d.maximum = p.maximum;
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
					}
					if (this.api.body != null && this.api.body != '') {
						reqData.body = this.api.body;
					}
					// 请求参数结束,响应结束开始
					if (this.responses.length > 0) {
						var params = [];
						for (var i = 0; i < this.responses.length; i++) {
							var p = this.responses[i];
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
					}
					var exd = null;
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
					// 响应参数结束
					console.log('新增API');
					console.log(reqData);
					saveApiAPI(
						reqData,
						res => {
							var data = res.data;
							if (data.code == 200) {
								this.$confirm('新增成功,是否继续创建API?', '新增成功!', {
									confirmButtonText: '返回项目',
									cancelButtonText: '继续新增',
									type: 'success'
								}).then(() => {
									this.$router.go(-1);
								});
							} else {
								this.$message.error('新增成功失败:' + data.msg);
							}
						},
						err => {
							this.$message.error('新增成功失败,更多信息请查看浏览器控制台!');
							console.log(err);
						}
					);
				} else {
					this.$message.warning('新增失败,请按提示完善项目信息!');
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
		removeResponseData(index){
			this.$confirm('确定移除本响应结果吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.responses.splice(index,1)
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
			var idx = -1;
			var data = row.ref;
			for (var i = 0; i < data.length; i++) {
				if (data[i].tableRowkey == key) {
					idx = i;
					break;
				}
			}
			if (idx == -1 || (flag == 0 && idx == 0) || (flag == 1 && idx == data.length - 1)) {
				return;
			}
			var temp = data[idx];
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
			this.$confirm('确定移除行数据吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
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
			for (var i = 0; i < data.length; i++) {
				if (data[i].tableRowkey == index) {
					data.splice(i, 1);
					return;
				}
				if (data[i].items != null && data[i].items.length > 0) {
					this.findDataAndDelete(data[i].items, index);
				}
			}
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
