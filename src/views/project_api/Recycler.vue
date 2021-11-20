<template>
	<div style="width: 98%; max-width: 1240px;padding: 10px 0;margin: auto;">
		<el-container>
			<el-container>
				<el-main style="padding:0 0 0 15px;">
					<h3 style="text-align: center;" v-show="apis.length==0">{{$t('NoApiYet')}}</h3>
					<!-- 接口列表 -->
					<div v-for="api in apis" :key="api.apiId" style="margin-bottom: 10px;">
						<div :class="['api', api.method]">
							<!-- API的方法与路径与简介 -->
							<div
								:class="['api-header', api.deprecated == true || api.deprecated == 'true' ? 'text-through' : '']">
								<div class="api-method">{{ api.method }}</div>
								<div class="api-path-summary">
									<span v-if="api.deprecated == true || api.deprecated == 'true'">
										<b>({{ $t('Deprecated') }})</b>
									</span>
									{{ api.path }}
								</div>
								<div class="api-path-summary">{{ api.title }}</div>
							</div>
							<!-- API操作 -->
							<div style="padding:5px 10px;text-align: right;">
								<el-button size="mini" @click.stop="exportApi(api.apiId)">{{ $t('Export') }}
								</el-button>
								<el-button size="mini" type="primary" @click.stop="showApiSubmit(api.apiId)">
									{{ $t('ApiShow') }}
								</el-button>
								<a :href="'#/index/get/recycler/' + api.apiId"
									style="margin:0 10px;">
									<el-button size="mini" type="primary">{{ $t('CheckDetails') }}</el-button>
								</a>
							</div>
						</div>
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import {
		getProjectAPI,findHideApisAPI,showApiAPI,getApiAPI
	} from '@/api/Project';
	import store from '@/store/index.js';
	export default {
		data() {
			return {
				/**服务器的地址*/
				exportServerHost: process.env.VUE_APP_BASE_API,
				/**用户的会话id*/
				sessionId: store.getters.sessionId,
				/**项目的id*/
				projectId: '',
				/**项目的名称*/
				projectName: '项目的名称',
				/**当前分组的接口合集*/
				apis: []
			};
		},
		created() {
			var role = store.getters.role;
			if (role != 'ROOT' && role != 'SERVER') {
				this.$router.push('/index');
			} else {
				this.findApisAndLoad()
			}
		},
		methods: {
			/**
			 * 获取API信息并加载
			 */
			findApisAndLoad() {
				this.apis = [];
				findHideApisAPI(
					resp => {
						var data = resp.data;
						console.log('get API list...');
						console.log(data);
						if (data.code == 200) {
							for (var a = 0; a < data.data.length; a++) {
								var api = data.data[a];
								this.apis.push(api);
							}
						}
					},
					err => {
						this.$message.error(this.$t('FailedToGetGroupInfoSeeConsole'));
						console.log(err);
					}
				);
			},
			/**
			 * 导出API到粘贴板
			 * @param {Object} aid
			 */
			exportApi(aid) {
				getApiAPI(aid,
					res => {
						var data = res.data;
						console.log('get API...');
						console.log(data);
						if (data.code == 200) {
							delete(data.data.apiId);
							delete(data.data.groupId);
							let json = JSON.stringify(data.data);
							let oInput = document.createElement('input');
							oInput.value = json;
							document.body.appendChild(oInput);
							oInput.select();
							document.execCommand('Copy');
							this.$message.success(this.$t('ExportSucceeded'));
							oInput.remove();
						}
					},
					err => {
						this.$message.error(this.$t('FailedToGetInfoSeeConsole'));
						console.log(err);
					}
				);
			},
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
									this.findApisAndLoad();
								}
							},
							err => {
								this.$message.error(this.$t('FailedToModifySeeConsole'));
								console.log(err);
							}
						);
					})
					.catch(() => {});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/styles/api-method-style.scss';

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
