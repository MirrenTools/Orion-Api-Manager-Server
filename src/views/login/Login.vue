<template>
	<div class="login-container">
		<el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-form">
			<div class="title-container">
				<h3 class="title">{{ welcome }}</h3>
			</div>
			<el-form-item prop="id">
				<span class="svg-container">
					<svg t="1594903948207" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4053" width="16" height="16">
						<path
							d="M858.5 763.6c-18.9-44.8-46.1-85-80.6-119.5-34.5-34.5-74.7-61.6-119.5-80.6-0.4-0.2-0.8-0.3-1.2-0.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-0.4 0.2-0.8 0.3-1.2 0.5-44.8 18.9-85 46-119.5 80.6-34.5 34.5-61.6 74.7-80.6 119.5C146.9 807.5 137 854 136 901.8c-0.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c0.1 4.4 3.6 7.8 8 7.8h60c4.5 0 8.1-3.7 8-8.2-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"
							p-id="4054"
							fill="#EEEEEE"
						></path>
					</svg>
				</span>
				<el-input ref="id" v-model="loginForm.id" :placeholder="$t('EnterAccount')" type="text" tabindex="1" autocomplete="off" />
			</el-form-item>
			<el-form-item prop="password">
				<span class="svg-container">
					<svg t="1594903789026" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3765" width="16" height="16">
						<path
							d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240z m460 600H232V536h560v304z"
							p-id="3766"
							fill="#EEEEEE"
						></path>
						<path
							d="M484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53c12.1-8.7 20-22.9 20-39 0-26.5-21.5-48-48-48s-48 21.5-48 48c0 16.1 7.9 30.3 20 39z"
							p-id="3767"
							fill="#EEEEEE"
						></path>
					</svg>
				</span>
				<el-input
					:key="passwordType"
					ref="password"
					v-model="loginForm.password"
					:type="passwordType"
					:placeholder="$t('EnterPassword')"
					tabindex="2"
					autocomplete="off"
					@keyup.enter.native="loginHandler"
				/>
				<span class="show-pwd" @click="showPwd">
					<svg
						v-show="passwordType === 'password'"
						t="1594906186816"
						class="icon"
						viewBox="0 0 1024 1024"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						p-id="4292"
						width="16"
						height="16"
					>
						<path
							d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3-7.7 16.2-7.7 35.2 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766z"
							p-id="4293"
							fill="#EEEEEE"
						></path>
						<path
							d="M508 336c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176z m0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"
							p-id="4294"
							fill="#EEEEEE"
						></path>
					</svg>
					<svg
						v-show="passwordType !== 'password'"
						t="1594906203171"
						class="icon"
						viewBox="0 0 1024 1024"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						p-id="4527"
						width="16"
						height="16"
					>
						<path
							d="M942.3 486.4l-0.1-0.1-0.1-0.1c-36.4-76.7-80-138.7-130.7-186L760.7 351c43.7 40.2 81.5 93.7 114.1 160.9C791.5 684.2 673.4 766 512 766c-51.3 0-98.3-8.3-141.2-25.1l-54.7 54.7C374.6 823.8 439.8 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0.1-51.3z m-64-332.2l-42.4-42.4c-3.1-3.1-8.2-3.1-11.3 0L707.8 228.5C649.4 200.2 584.2 186 512 186c-192.2 0-335.4 100.5-430.2 300.3v0.1c-7.7 16.2-7.7 35.2 0 51.5 36.4 76.7 80 138.7 130.7 186.1L111.8 824.5c-3.1 3.1-3.1 8.2 0 11.3l42.4 42.4c3.1 3.1 8.2 3.1 11.3 0l712.8-712.8c3.1-3 3.1-8.1 0-11.2zM398.9 537.4c-1.9-8.2-2.9-16.7-2.9-25.4 0-61.9 50.1-112 112-112 8.7 0 17.3 1 25.4 2.9L398.9 537.4z m184.5-184.5C560.5 342.1 535 336 508 336c-97.2 0-176 78.8-176 176 0 27 6.1 52.5 16.9 75.4L263.3 673c-43.7-40.2-81.5-93.7-114.1-160.9C232.6 339.8 350.7 258 512 258c51.3 0 98.3 8.3 141.2 25.1l-69.8 69.8z"
							p-id="4528"
							fill="#EEEEEE"
						></path>
						<path
							d="M508 624c-6.4 0-12.7-0.5-18.8-1.6l-51.1 51.1c21.4 9.3 45.1 14.4 69.9 14.4 97.2 0 176-78.8 176-176 0-24.8-5.1-48.5-14.4-69.9l-51.1 51.1c1 6.1 1.6 12.4 1.6 18.8C620 573.9 569.9 624 508 624z"
							p-id="4529"
							fill="#EEEEEE"
						></path>
					</svg>
				</span>
			</el-form-item>
			<el-form-item>
				<div style="display: flex;justify-content: right;padding: 3px 10px;">
					<Verification
						:tipsColor="'#C0C4CC'"
						:resetColor="'#EEE'"
						:dataUrl="exportServerHost + '/verification/data'"
						:imgPrefix="exportServerHost + '/verification/img/'"
						:loadDataErrHandler="verifyErr"
						:clickFinishHandler="verifyFinish"
						ref="verification"
					/>
				</div>
			</el-form-item>
			<p v-show="loginError" style="text-align: center;color: #F56C6C;font-size:14px;">{{ loginFailedTips }}</p>
			<el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="loginCheckHandler">{{ $t('Login') }}</el-button>
		</el-form>
		<!-- 如不想显示Powered by OAM 您可以注释下方代码 -->
		<!-- 如果您是商用或外部使用,注释后我希望您对我的项目进行赞助或打赏,我们将在首页展示您 -->
		<!-- 设计与编码并开源不易,感谢您的慷慨!祝您愉快! -->
		<div style="z-index: 2002;position: fixed;bottom:0;right: 0;padding:20px;cursor: pointer;">
			<a
				href="https://mirren.gitee.io/orion-api-manager-docs/"
				target="_blank"
				title="MirrenTools.org developed program Orion-API-Manager"
				style="color: white;text-decoration: none;"
			>
				Powered by OAM
			</a>
		</div>
	</div>
</template>

<script>
import MD5 from '@/utils/md5.js';
import { apiLogin } from '@/api/Login';
import { getConsoleConfigAPI } from '@/api/Common';
import Verification from './components/VerificationCode.vue';
export default {
	components: {
		Verification
	},
	data() {
		let validateId = (rule, value, callback) => {
			if (value.length < 4 || value.length > 32) {
				callback(new Error(this.$t('AccountRequires_4_32')));
			} else {
				callback();
			}
		};
		let validatePass = (rule, value, callback) => {
			if (value.length < 4 || value.length > 32) {
				callback(new Error(this.$t('PasswordRequires_4_32')));
			} else {
				callback();
			}
		};
		return {
			/**服务器的地址*/
			exportServerHost: process.env.VUE_APP_BASE_API,
			/**控制台欢迎语句*/
			welcome: 'Welcome to Orion-API-Manager',
			/**验证码的下标*/
			verifyIndex: '',
			/**验证码的值*/
			verifyValue: '',
			/**登录的表单*/
			loginForm: {
				id: '',
				password: ''
			},
			/**表单的验证*/
			rules: {
				id: [
					{
						validator: validateId,
						trigger: 'blur'
					}
				],
				password: [
					{
						validator: validatePass,
						trigger: 'blur'
					}
				]
			},
			/**密码显示的类型*/
			passwordType: 'password',
			/**是否登录中*/
			loading: false,
			/**登录失败了*/
			loginError: false,
			/**登录失败的提示*/
			loginFailedTips: this.$t('LoginFailed')
		};
	},
	created() {
		//显示默认的欢迎语句
		getConsoleConfigAPI(
			res => {
				let data = res.data;
				console.log('get console config: ', data);
				if (data.code == 200) {
					document.title = data.data.title;
					this.welcome = data.data.welcome;
				}
			},
			err => {
				console.log('get console config failed: ', err);
			}
		);
	},
	methods: {
		/**
		 * 显示与隐藏密码
		 */
		showPwd() {
			if (this.passwordType === 'password') {
				this.passwordType = '';
			} else {
				this.passwordType = 'password';
			}
			this.$nextTick(() => {
				this.$refs.password.focus();
			});
		},
		/**
		 * 验证码组件加载异常
		 * @param {Object} err
		 */
		verifyErr(err) {
			console.log(err);
		},
		/**
		 * 验证码选择完毕
		 * @param {Object} index
		 * @param {Object} value
		 */
		verifyFinish(index, value) {
			this.verifyIndex = index;
			this.verifyValue = value;
			if (this.loginForm.id != '' && this.loginForm.password != '') {
				this.loginCheckHandler();
			}
		},
		/**
		 * 登录前检查操作,主要检查是否使用了默认的登录账号与密码
		 */
		loginCheckHandler() {
			this.loginHandler();
		},
		/**
		 * 执行登录
		 * @param {String} index 验证码下表
		 * @param {String} value 验证码
		 */
		loginHandler() {
			this.loading = true;
			this.loginError = false;
			this.$refs.loginForm.validate(Verified => {
				if (Verified) {
					if (this.verifyValue.length != 8) {
						this.loginError = true;
						this.loginFailedTips = this.$t('PleaseSelectCaptcha');
						this.loading = false;
						return;
					}
					let data = {
						id: this.loginForm.id,
						pwd: MD5(this.loginForm.password),
						index: this.verifyIndex,
						value: this.verifyValue
					};
					apiLogin(
						data,
						res => {
							this.loading = false;
							let resp = res.data;
							if (resp.code == 200) {
								let info = resp.data;
								this.$store.dispatch('app/login', info);
								console.log('Login successful!');
								if (this.loginForm.id == 'X-root' && this.loginForm.password == 'helloOAM') {
									this.$alert(this.$t('PleaseModifyTheLoginPassword'), this.$t('Tips'), {
										confirmButtonText: this.$t('Confirm'),
										callback: action => {
											this.$router.push('/index');
										}
									});
								}
							} else if (resp.code == 1304) {
								console.log('Login failed:' + resp.msg);
								this.loginError = true;
								this.loginFailedTips = this.$t('ResultStatus1304');
								this.$refs.verification.reset();
							} else {
								console.log('Login failed:' + resp.msg);
								this.loginError = true;
								this.loginFailedTips = this.$t('LoginFailed');
								this.$refs.verification.reset();
							}
						},
						err => {
							this.loading = false;
							let requestFailedTips = this.$t('RequestFailedSeeConsole');
							this.$message.error(requestFailedTips);
							this.loginError = true;
							this.loginFailedTips = requestFailedTips;
							console.log('Request failed!');
							console.log(err);
						}
					);
				} else {
					this.loading = false;
				}
			});
		}
	}
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
	.login-container .el-input input {
		color: $cursor;
	}
}

/* reset element-ui css */
.login-container {
	.el-input {
		display: inline-block;
		height: 47px;
		width: 85%;

		input {
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 15px;
			color: $light_gray;
			height: 47px;
			caret-color: $cursor;

			&:-webkit-autofill {
				box-shadow: 0 0 0px 1000px $bg inset !important;
				-webkit-text-fill-color: $cursor !important;
			}
		}
	}

	.el-form-item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: #454545;
	}
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
	height: 100vh;
	width: 100%;
	overflow: hidden;
	background: $bg url('../../assets/links.svg') no-repeat 50%;

	.login-form {
		position: relative;
		width: 500px;
		max-width: 100%;
		margin: 20vh auto 0;
	}

	.svg-container {
		padding-left: 12px;
		vertical-align: middle;
	}

	.title-container {
		position: relative;

		.title {
			font-size: 26px;
			color: $light_gray;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}
	}

	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}

	.thirdparty-button {
		position: absolute;
		right: 0;
		bottom: 6px;
	}

	@media only screen and (max-width: 470px) {
		.thirdparty-button {
			display: none;
		}
	}

	@media (max-width: 450px) {
		.login-form {
			width: 90%;
		}
	}
}
</style>
