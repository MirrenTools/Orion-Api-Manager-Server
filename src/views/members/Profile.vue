<template>
	<div style="width: 98%; max-width: 1240px;margin: auto">
		<!-- 显示的属性 -->
		<table style="width: 100%;" cellspacing="10">
			<tr>
				<td width="120px" class="profile-item">{{ $t('Account') }}</td>
				<td>{{ userUid }}</td>
			</tr>
			<tr>
				<td width="120px" class="profile-item">{{ $t('Password') }}</td>
				<td>
					<span v-if="userRole == 'ROOT'">{{ $t('IfSuperAdministratorWantsToChangeThePasswordNeedsToBeModifiedInConf') }}(./config/user.json)</span>
					<el-link v-else type="primary" @click="modifyPasswordVisible = true">{{ $t('ModifyPassword') }}</el-link>
				</td>
			</tr>
		</table>

		<el-dialog :title="$t('ModifyPassword')" :visible.sync="modifyPasswordVisible">
			<el-form :model="form" ref="form">
				<el-form-item
					prop="password"
					:rules="[{ required: true, message: this.$t('PasswordRequires_4_32'), trigger: 'blur' }, { min: 4, max: 32, message: this.$t('PasswordRequires_4_32'), trigger: 'blur' }]"
				>
					<el-input v-model="form.password" :placeholder="$t('EnterPassword')" clearable></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="modifyPasswordVisible = false">{{ $t('Cancel') }}</el-button>
				<el-button type="primary" @click="modifyPasswordSubmit()">{{ $t('SubmitModify') }}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import MD5 from '@/utils/md5.js';
import { putPasswordAPI } from '@/api/Members';
import store from '@/store/index.js';
export default {
	data() {
		return {
			/**用户的角色*/
			userUid: store.getters.uid,
			/**用户的角色*/
			userRole: store.getters.role,
			/**是否显示修改密码框*/
			modifyPasswordVisible: false,
			/**修改密码的表单*/
			form: {
				password: ''
			}
		};
	},
	methods: {
		/**
		 * 提交修改密码
		 */
		modifyPasswordSubmit() {
			this.$refs['form'].validate(valid => {
				if (valid) {
					var data = {
						id: this.userUid,
						pwd: MD5(this.form.password)
					};
					putPasswordAPI(
						data,
						resp => {
							var data = resp.data;
							console.log('put password...');
							console.log(data);
							if (data.code == 200) {
								this.$message.success(this.$t('ModifySuccess'));
							}
							this.modifyPasswordVisible = false;
						},
						err => {
							this.$message.error(this.$t('FailedToModifySeeConsole'));
							console.log(err);
						}
					);
				}
			});
		}
	}
};
</script>

<style>
.profile-item {
	text-align: right;
	padding-right: 5px;
	color: #666;
}
</style>
