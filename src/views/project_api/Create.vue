<template>
	<div>
		<div style="width: 98%; max-width: 1240px;padding: 10px 0;margin: auto;display: flex;align-items: center;">
			<div>
				<b>{{ $t('NewApi') }}</b>
			</div>
		</div>
		<div style="width: 98%; max-width: 1240px;margin:0 auto 50px;">
			<el-form ref="apiForm" label-position="right" label-width="120px" :model="api" :rules="apiRules">
				<el-form-item label="Method">
					<div style="display: flex;">
						<div>
							<el-select v-model="api.method" :placeholder="$t('Select')">
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
						</div>
						<div style="margin-left: auto;">
							<el-select v-model="selectTemplate" :placeholder="$t('TemplateList')" @change="loadTemplate">
								<el-option v-for="item in templateList" :key="item.tid" :value="item.tid" :label="item.name">
									<span style="float: left;max-width: 500px;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">{{ item.name }}</span>
									<div style="float: right;display: inline-block;margin-left: 10px;">
										<el-link type="danger" @click="deleteTemplate(item.tid)">{{ $t('Delete') }}</el-link>
									</div>
								</el-option>
							</el-select>
						</div>
					</div>
				</el-form-item>
				<el-form-item prop="path" label="Path"><el-input v-model="api.path" :placeholder="$t('EnterPath')"></el-input></el-form-item>
				<el-form-item prop="title" :label="$t('ApiName')"><el-input v-model="api.title" :placeholder="$t('EnterApiName')"></el-input></el-form-item>
				<el-form-item :label="$t('ApiDescription')"><el-input type="textarea" v-model="api.description" :placeholder="$t('EnterApiDescription')"></el-input></el-form-item>
				<el-form-item :label="$t('Ranking')"><el-input v-model="api.sorts" type="number" :placeholder="$t('EnterRanking')"></el-input></el-form-item>
				<el-form-item label="Consumes"><el-input v-model="api.consumes" :placeholder="$t('EnterConsumes')"></el-input></el-form-item>
				<!-- 请求参数 -->
				<el-form-item :label="$t('Parameters')">
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
							<el-table-column prop="required" :label="$t('Required')" width="100" align="right">
								<template v-slot="scope">
									<el-checkbox v-model="scope.row.required" v-show="scope.row.tableRowLevel == 1" style="width:100%;"></el-checkbox>
								</template>
							</el-table-column>
							<el-table-column prop="in" :label="$t('Position')" width="120">
								<template v-slot="scope">
									<el-select v-model="scope.row.in" :placeholder="$t('Select')" v-show="scope.row.tableRowLevel == 1">
										<el-option value="query">query</el-option>
										<el-option value="body">body</el-option>
										<el-option value="path">path</el-option>
										<el-option value="header">header</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column prop="type" :label="$t('Type')" width="140">
								<template v-slot="scope">
									<el-select v-model="scope.row.type" :placeholder="$t('Select')" style="width: 120px;">
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
							<el-table-column prop="name" :label="$t('ParamName')" width="250">
								<template v-slot="scope">
									<el-input v-model="scope.row.name" :placeholder="$t('EnterParamName')"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="description" :label="$t('ParamDescription')">
								<template v-slot="scope">
									<el-input
										v-model="scope.row.description"
										type="textarea"
										:autosize="{ minRows: 1, maxRows: 3 }"
										:placeholder="$t('EnterParamDescription')"
										style="margin: 5px auto;"
									></el-input>
								</template>
							</el-table-column>
							<el-table-column :label="$t('Operation')" width="65">
								<template v-slot="scope">
									<el-popover placement="left-start" trigger="click">
										<el-button size="mini" @click="tableColumnMove(scope.row, scope.row.tableRowkey, 0)">{{ $t('MoveUp') }}</el-button>
										<el-button size="mini" @click="tableColumnMove(scope.row, scope.row.tableRowkey, 1)">{{ $t('MoveDown') }}</el-button>
										<el-button v-show="scope.row.type != 'boolean'" size="mini" type="primary" @click="showParameterEdit(scope.row)">{{ $t('Edit') }}</el-button>
										<el-button size="mini" type="danger" @click="tableColumnRemove(scope.row)">{{ $t('Delete') }}</el-button>
										<el-button slot="reference" size="mini" icon="el-icon-edit"></el-button>
									</el-popover>
								</template>
							</el-table-column>
						</el-table>
						<div style="text-align: right;margin-top: 5px;margin-bottom: 3px;">
							<div style="text-align: right;">
								<el-button @click="removeParameterToLocal()" size="mini">{{ $t('ClearLock') }}</el-button>
								<el-button @click="saveParameterToLocal()" size="mini">{{ $t('Lock') }}</el-button>
								<el-button @click="addParameter()">{{ $t('AddParam') }}</el-button>
								<el-input v-model="parameterItems" style="width: 50px;margin-left:3px;" size="mini"></el-input>
								{{ $t('Item') }}
							</div>
						</div>
						<div><el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10 }" :placeholder="$t('EnterRequestBody')" v-model="api.body"></el-input></div>
					</div>
				</el-form-item>
				<el-form-item label="Produces"><el-input v-model="api.produces" :placeholder="$t('EnterProduces')"></el-input></el-form-item>
				<!-- 响应结果 -->
				<el-form-item :label="$t('ResponsesResult')">
					<div>
						<div v-for="(resp, idx) in responses" :key="idx" style="border: 1px solid #c6e2ff; padding: 5px;margin-bottom: 5px;">
							<div style="display: flex;">
								<div style="width: 10%;min-width: 50px;margin-right: 5px;">{{ $t('Status') }}:</div>
								<div style="width: 30%;margin-right: 5px;"><el-input v-model="resp.status" :placeholder="$t('ResponseStatus')"></el-input></div>
								<div style="width: 10%;min-width: 60px;margin-right: 5px;">{{ $t('StatusMsg') }}:</div>
								<div style="width: 100%;"><el-input v-model="resp.msg" :placeholder="$t('ResponseStatusMsg')"></el-input></div>
							</div>
							<div>{{ $t('Responses') }}:</div>
							<el-table
								:data="resp.data"
								style="width: 100%;"
								class="min-height-table"
								row-key="tableRowkey"
								border
								default-expand-all
								:tree-props="{ children: 'items', hasChildren: 'hasChildren' }"
							>
								<el-table-column prop="in" :label="$t('Position')" width="180" align="right">
									<template v-slot="scope">
										<el-select v-model="scope.row.in" :placeholder="$t('Select')" v-if="scope.row.tableRowLevel == 1" style="width: 100px;">
											<el-option value="body">body</el-option>
											<el-option value="header">header</el-option>
										</el-select>
									</template>
								</el-table-column>
								<el-table-column prop="tableRowLevel" :label="$t('Level')" width="60"></el-table-column>
								<el-table-column prop="type" :label="$t('Type')" width="120">
									<template v-slot="scope">
										<el-select v-model="scope.row.type" :placeholder="$t('Select')" style="width: 100px;">
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
								<el-table-column prop="name" :label="$t('ParamName')" width="250">
									<template v-slot="scope">
										<el-input v-model="scope.row.name" :placeholder="$t('EnterParamName')"></el-input>
									</template>
								</el-table-column>
								<el-table-column prop="description" :label="$t('ParamDescription')">
									<template v-slot="scope">
										<el-input
											v-model="scope.row.description"
											type="textarea"
											:autosize="{ minRows: 1, maxRows: 3 }"
											:placeholder="$t('EnterParamDescription')"
											style="margin: 5px auto;"
										></el-input>
									</template>
								</el-table-column>
								<el-table-column :label="$t('Operation')" width="65">
									<template v-slot="scope">
										<el-popover placement="left-start" trigger="click" @show="parameterDataEditItems=1">
											<el-button size="mini" @click="tableColumnMove(scope.row, scope.row.tableRowkey, 0)">{{ $t('MoveUp') }}</el-button>
											<el-button size="mini" @click="tableColumnMove(scope.row, scope.row.tableRowkey, 1)">{{ $t('MoveDown') }}</el-button>
											<div style="margin-left:10px;display: inline-block;">
												<div v-show="scope.row.type == 'object' || scope.row.type == 'array'" style="margin-right: 10px;">
													<el-button size="mini" type="primary" @click="addDataItems(scope.row,parameterDataEditItems)">{{ $t('AddParam') }}</el-button>
													<el-input v-model="parameterDataEditItems" style="width: 50px;margin-left:3px;" size="mini"></el-input>
													{{ $t('Item') }}
												</div>
											</div>
											<el-button size="mini" type="danger" @click="tableColumnRemove(scope.row)">{{ $t('Delete') }}</el-button>
											<el-button slot="reference" size="mini" icon="el-icon-edit"></el-button>
										</el-popover>
									</template>
								</el-table-column>
							</el-table>
							<div style="text-align: right;padding-top: 3px;">
								<el-button size="mini" type="danger" @click="removeResponseData(idx)">{{ $t('Remove') }}</el-button>
								<el-button size="mini" @click="addResponseData(resp)">{{ $t('AddParam') }}</el-button>
								<el-input v-model="resp.parameterItems" style="width: 50px;margin-left:3px;" size="mini"></el-input>
								{{ $t('Item') }}
							</div>
						</div>
						<div style="text-align: right;">
							<el-button @click="removeResponseToLocal()" size="mini">{{ $t('ClearLock') }}</el-button>
							<el-button @click="saveResponseToLocal()" size="mini">{{ $t('Lock') }}</el-button>
							<el-button @click="addResponse()">{{ $t('AddMore') }}</el-button>
						</div>
					</div>
				</el-form-item>
				<el-form-item :label="$t('ExtDocsURL')"><el-input v-model="api.exDurl" :placeholder="$t('EnterExtDocsURL')"></el-input></el-form-item>
				<el-form-item :label="$t('ExtDocsDesc')"><el-input type="textarea" v-model="api.exDdescription" :placeholder="$t('EnterExtDocsDesc')"></el-input></el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitCreateApi()">{{ $t('Submit') }}</el-button>
					<el-button @click="saveAsTemplate()">{{ $t('SaveAsTemplate') }}</el-button>
				</el-form-item>
			</el-form>
		</div>

		<!-- 编辑参数的弹窗 -->
		<el-dialog :title="$t('Edit')" :visible.sync="dialogDataEditVisible">
			<el-form :model="parameterData" label-width="100px">
				<el-form-item :label="$t('Type')">
					<el-select v-model="parameterData.type" :placeholder="$t('Select')">
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
				<el-form-item :label="$t('ParamDescription')" v-show="parameterData.type == 'object' || parameterData.type == 'array'">
					<el-table
						:data="parameterData.items"
						style="width: 100%;"
						class="min-height-table"
						row-key="tableRowkey"
						border
						default-expand-all
						:tree-props="{ children: 'items', hasChildren: 'hasChildren' }"
					>
						<el-table-column prop="type" :label="$t('Type')" align="right">
							<template v-slot="scope">
								<el-select v-model="scope.row.type" :placeholder="$t('Select')" style="width: 120px;">
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
						<el-table-column prop="name" :label="$t('ParamName')">
							<template v-slot="scope">
								<el-input v-model="scope.row.name" :placeholder="$t('EnterParamName')"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="description" :label="$t('ParamDescription')">
							<template v-slot="scope">
								<el-input
									v-model="scope.row.description"
									type="textarea"
									:autosize="{ minRows: 1, maxRows: 3 }"
									:placeholder="$t('EnterParamDescription')"
									style="margin: 5px auto;"
								></el-input>
							</template>
						</el-table-column>
						<el-table-column :label="$t('Operation')" width="65">
							<template v-slot="scope">
								<el-popover placement="left-start" trigger="click" @show="parameterDataEditItems=1">
									<el-button size="mini" @click="tableColumnMove(scope.row, scope.row.tableRowkey, 0)">{{ $t('MoveUp') }}</el-button>
									<el-button size="mini" @click="tableColumnMove(scope.row, scope.row.tableRowkey, 1)">{{ $t('MoveDown') }}</el-button>
									<div style="margin-left:10px;display: inline-block;">
										<div v-show="scope.row.type == 'object' || scope.row.type == 'array'" style="margin-right: 10px;">
											<el-button size="mini" type="primary" @click="addDataItems(scope.row,parameterDataEditItems)">{{ $t('AddParam') }}</el-button>
											<el-input v-model="parameterDataEditItems" style="width: 50px;margin-left:3px;" size="mini"></el-input>
											{{ $t('Item') }}
										</div>
									</div>
									<el-button size="mini" type="danger" @click="tableColumnRemove(scope.row)">{{ $t('Delete') }}</el-button>
									<el-button slot="reference" size="mini" icon="el-icon-edit"></el-button>
								</el-popover>
							</template>
						</el-table-column>
					</el-table>
					<div style="text-align: right;">
						<el-button size="mini" @click="parameterEditAddDataItem(parameterData)">{{ $t('AddParam') }}</el-button>
						<el-input v-model="parameterDataItems" style="width: 50px;margin-left:3px;" size="mini"></el-input>
						{{ $t('Item') }}
					</div>
				</el-form-item>
				<el-form-item :label="$t('MaxLength')" v-show="parameterData.type == 'string'">
					<el-input v-model="parameterData.maxLength" :placeholder="$t('MaxLength')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('MinLength')" v-show="parameterData.type == 'string'">
					<el-input v-model="parameterData.minLength" :placeholder="$t('MinLength')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('Maximum')" v-show="isNumber(parameterData.type)"><el-input v-model="parameterData.maximum" :placeholder="$t('Maximum')"></el-input></el-form-item>
				<el-form-item :label="$t('Minimum')" v-show="isNumber(parameterData.type)"><el-input v-model="parameterData.minimum" :placeholder="$t('Minimum')"></el-input></el-form-item>
				<el-form-item :label="$t('Default')" v-show="isCanEnumsOrRegex(parameterData.type)">
					<el-input v-model="parameterData.def" :placeholder="$t('Default')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('Enums')" v-show="isCanEnumsOrRegex(parameterData.type)">
					<el-input v-model="parameterData.enums" :placeholder="$t('EnterEnums')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('Pattern')" v-show="isCanEnumsOrRegex(parameterData.type)">
					<el-input v-model="parameterData.pattern" :placeholder="$t('Pattern')"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogDataEditVisible = false">{{ $t('Cancel') }}</el-button>
				<el-button type="primary" @click="dialogDataEditVisible = false">{{ $t('Confirm') }}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { saveApiAPI, findApiTemplateListAPI, getApiTemplateAPI, postApiTemplateAPI, deleteApiTemplateAPI } from '@/api/Project';
import store from '@/store/index.js';
/**保存请求参数的key*/
const LOCALSTORAGE_CACHE_KEY_PARAMETER = 'localstorage_cache_key_parameter';
/**保存响应参数的key*/
const LOCALSTORAGE_CACHE_KEY_RESPONSE = 'localstorage_cache_key_response';
export default {
	data() {
		return {
			/**项目的id*/
			projectId: '',
			/**分组的id*/
			groupId: '',
			/**API信息*/
			api: {
				// apiId: 'apiId',
				// deprecated: true,
				// groupId: 'groupId',
				method: 'get',
				// path: '/utils/DataFormat/utils/DataFormat/utils/DataFormat',
				// title: '分组列表分组列表分组列表分组列表分组列表分组列表分组分组列表分组列表列表分组列表',
				// description: 'description',
				consumes: 'x-www-form-urlencoded,application/json,form-data,application/xml'
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
			/**API的参数检查*/
			apiRules: {
				path: [
					{
						required: true,
						message: this.$t('EnterPath'),
						trigger: 'blur'
					}
				],
				title: [
					{
						required: true,
						message: this.$t('EnterApiName'),
						trigger: 'blur'
					}
				]
			},
			/**API中的请求参数*/
			parameters: [],
			/**添加多少项请求参数*/
			parameterItems: 1,
			/**是否显示数据编辑框*/
			dialogDataEditVisible: false,
			/**请求参数弹窗编辑的参数*/
			parameterData: {},
			/**请求参数弹窗编辑的参数的添加项*/
			parameterDataItems: 1,
			/**大于2级参数编辑参数时的添加项*/
			parameterDataEditItems:1,
			/***响应数据*/
			responses: [
				{
					//状态码
					status: 200,
					//状态信息
					msg: 'ok',
					//添加多少项参数
					parameterItems: 1,
					//数据信息
					data: []
				}
			],
			/**选中的模板id*/
			selectTemplate: '',
			/**模板列表*/
			templateList: [{ tid: 'template id', name: 'template name' }]
			/**附加请求说明*/
			// additional:[{title:'title',description:'description'}]
		};
	},
	created() {
		var role = store.getters.role;
		if (role != 'ROOT' && role != 'SERVER') {
			this.$router.push('/index');
		} else {
			this.projectId = this.$route.params.pid;
			this.groupId = this.$route.params.gid;
			if (this.groupId == null) {
				this.$message.warning(this.$t('FailedToLoadTheProjectInvalidID'));
				return;
			}
			//加载模板列表
			this.loadTemplateList();
			//加载锁定的请求参数
			var parameters = localStorage.getItem(LOCALSTORAGE_CACHE_KEY_PARAMETER);
			if (parameters != null && parameters != '') {
				var items = JSON.parse(parameters);
				console.log('parameter lock data:');
				console.log(items);
				this.parameters = [];
				this.convertToParameters(items);
			}
			//加载锁定的响应参数
			var responses = localStorage.getItem(LOCALSTORAGE_CACHE_KEY_RESPONSE);
			if (responses != null && responses != '') {
				this.responses = [];
				var items = JSON.parse(responses);
				console.log('response lock data:');
				console.log(items);
				this.convertToResponse(items);
			}
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
							if ((p.status == null || p.status == '') && (p.data == null || p.data.length == 0)) {
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
					console.log('create API...');
					console.log(reqData);
					saveApiAPI(
						reqData,
						res => {
							var data = res.data;
							if (data.code == 200) {
								this.$confirm(this.$t('NewApiSucceeded'), this.$t('AddSuccess'), {
									confirmButtonText: this.$t('GoBack'),
									cancelButtonText: this.$t('Continued'),
									type: 'success'
								}).then(() => {
									this.$router.go(-1);
								});
							}
						},
						err => {
							this.$message.error(this.$t('FailedToAddSeeConsole'));
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
		 * 保存为模板
		 */
		saveAsTemplate() {
			this.$prompt(this.$t('EnterTemplateName'), this.$t('Tips'), {
				confirmButtonText: this.$t('Confirm'),
				cancelButtonText: this.$t('Cancel'),
				inputPattern: /.+/,
				inputErrorMessage: this.$t('EnterTemplateName')
			})
				.then(({ value }) => {
					var seen = [];
					var replacer = function(key, value) {
						if (typeof value === 'object' && value !== null) {
							if (seen.indexOf(value) >= 0) {
								return;
							}
							seen.push(value);
						}
						return value;
					};
					var reqData = {};
					reqData.name = value;
					reqData.api = JSON.stringify(this.api);
					reqData.parameters = JSON.stringify(this.parameters, replacer);
					reqData.responses = JSON.stringify(this.responses, replacer);
					console.log('save as template ...');
					console.log(reqData);
					this.saveTemplate(reqData);
				})
				.catch(() => {});
		},
		/**
		 * 保存API模板
		 * @param {Object} reqData
		 */
		saveTemplate(reqData) {
			postApiTemplateAPI(
				reqData,
				res => {
					var data = res.data;
					console.log('save template ...');
					console.log(data);
					if (data.code == 200) {
						this.$message.success(this.$t('SaveSuccess'));
						this.loadTemplateList();
					}
				},
				err => {
					this.$message.error(this.$t('FailedToSaveSeeConsole'));
					console.log(err);
				}
			);
		},
		/**
		 * 加载API模板列表
		 */
		loadTemplateList() {
			findApiTemplateListAPI(
				res => {
					var data = res.data;
					console.log('load template list...');
					console.log(data);
					if (data.code == 200) {
						this.templateList = data.data;
					}
				},
				err => {
					FailedToGetInfoSeeConsole;
					this.$message.error(this.$t('FailedToGetInfoSeeConsole'));
					console.log(err);
				}
			);
		},
		/**
		 * 加载指定模板
		 * @param {Object} tid
		 */
		loadTemplate(tid) {
			console.log('load template ' + tid);
			getApiTemplateAPI(
				tid,
				res => {
					var data = res.data;
					console.log('load template ...');
					console.log(data);
					if (data.code == 200) {
						var res = data.data;
						if (res.api != null && res.api != '') {
							this.api = JSON.parse(res.api);
						}
						if (res.parameters != null && res.parameters != '') {
							var items = JSON.parse(res.parameters);
							this.parameters = [];
							this.convertToParameters(items);
						}
						if (res.responses != null && res.responses != '') {
							var items = JSON.parse(res.responses);
							this.responses = [];
							this.convertToResponse(items);
						}
					}
				},
				err => {
					this.$message.error(this.$t('FailedToGetInfoSeeConsole'));
					console.log(err);
				}
			);
		},
		/**
		 * 删除指定API模板
		 * @param {Object} tid
		 */
		deleteTemplate(tid) {
			this.$confirm(this.$t('DeleteConfirm'), this.$t('Tips'), {
				confirmButtonText: this.$t('Confirm'),
				cancelButtonText: this.$t('Cancel'),
				type: 'warning'
			})
				.then(() => {
					console.log('delete template ' + tid);
					deleteApiTemplateAPI(
						tid,
						res => {
							var data = res.data;
							console.log('delete template ...');
							console.log(data);
							if (data.code == 200) {
								this.loadTemplateList();
								this.selectTemplate = '';
								this.$message.success(this.$t('DeleteSuccess'));
							}
						},
						err => {
							this.$message.error(this.$t('FailedToAddSeeConsole'));
							console.log(err);
						}
					);
				})
				.catch(() => {});
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
		 * 将以保存的请求参数转换为显示数据
		 * @param {Object} items
		 */
		convertToParameters(items) {
			if (items == null || items.length == 0) {
				return;
			}
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				item.ref = this.parameters;
				if (item.items != null && item.items.length != 0) {
					this.recursionAddItemsRef(item.items, item.items);
				}
				this.parameters.push(item);
			}
		},
		/**
		 * 将以保存的响应数据转换为显示数据
		 * @param {Object} items
		 */
		convertToResponse(items) {
			if (items == null || items.length == 0) {
				return;
			}
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if (item.data != null) {
					for (var j = 0; j < item.data.length; j++) {
						item.data[j].ref = item.data;
						if (item.data[j].items != null && item.data[j].items.length != 0) {
							this.recursionAddItemsRef(item.data[j].items, item.data[j].items);
						}
					}
				}
				this.responses.push(item);
			}
		},
		/**
		 * 递归添加参数引用
		 * @param {Object} ref
		 * @param {Object} items
		 */
		recursionAddItemsRef(ref, items) {
			if (items == null || items.length == 0) {
				return;
			}
			for (var i = 0; i < items.length; i++) {
				items[i].ref = ref;
				if (items[i].items != null && items[i].items.length != 0) {
					this.recursionAddItemsRef(items[i].items, items[i].items);
				}
			}
		},
		/**
		 * 添加请求参数
		 */
		addParameter() {
			var sums = parseInt(this.parameterItems);
			if (isNaN(sums) || sums < 0) {
				sums = 1;
			}
			for (var i = 0; i < sums; i++) {
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
			}
		},
		/**
		 * 是否显示参数编辑框
		 * @param {Object} data
		 */
		showParameterEdit(data) {
			this.dialogDataEditVisible = true;
			this.parameterDataItems = 1;
			this.parameterData = data;
		},

		/**
		 * 本地保存请求参数
		 */
		saveParameterToLocal() {
			var seen = [];
			var replacer = function(key, value) {
				if (typeof value === 'object' && value !== null) {
					if (seen.indexOf(value) >= 0) {
						return;
					}
					seen.push(value);
				}
				return value;
			};
			var parameters = JSON.stringify(this.parameters, replacer);
			localStorage.setItem(LOCALSTORAGE_CACHE_KEY_PARAMETER, parameters);
			this.$message.success(this.$t('LockTips'));
		},
		/**
		 * 移除本地保存的请求参数
		 */
		removeParameterToLocal(){
			localStorage.removeItem(LOCALSTORAGE_CACHE_KEY_PARAMETER);
			this.$message.success(this.$t('Success'));
		},
		/**
		 * 添加响应参数
		 */
		addResponse() {
			this.responses.push({
				status: null,
				msg: null,
				parameterItems: 1,
				data: []
			});
		},
		/**
		 * 本地保存响应参数
		 */
		saveResponseToLocal() {
			var seen = [];
			var replacer = function(key, value) {
				if (typeof value === 'object' && value !== null) {
					if (seen.indexOf(value) >= 0) {
						return;
					}
					seen.push(value);
				}
				return value;
			};
			var responses = JSON.stringify(this.responses, replacer);
			localStorage.setItem(LOCALSTORAGE_CACHE_KEY_RESPONSE, responses);
			this.$message.success(this.$t('LockTips'));
		},
		/**
		 * 移除本地保存的响应参数
		 */
		removeResponseToLocal(){
			localStorage.removeItem(LOCALSTORAGE_CACHE_KEY_RESPONSE);
			this.$message.success(this.$t('Success'));
		},
		/**
		 * 给响应数据添加参数
		 * @param {Object} resp
		 */
		addResponseData(resp) {
			var sums = parseInt(resp.parameterItems);
			if (isNaN(sums) || sums < 0) {
				sums = 1;
			}
			for (var i = 0; i < sums; i++) {
				resp.data.push({
					tableRowkey: this.getTableRandomRowKey(),
					tableRowLevel: 1,
					type: 'string',
					name: '',
					in: 'body',
					description: '',
					items: [],
					ref: resp.data
				});
			}
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
		 * 请求参数编辑框添加参数
		 */
		parameterEditAddDataItem(data) {
			this.addDataItems(data, this.parameterDataItems);
		},
		/**
		 * 编辑参数添加数据
		 * @param {Object} data 那个参数要添加
		 * @param {Object} size 添加多少个
		 */
		addDataItems(data, size) {
			if (isNaN(size) || size < 0) {
				size = 1;
			}
			for (var i = 0; i < size; i++) {
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
			}
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
