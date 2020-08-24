<template>
	<div class="navbar">
		<!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->
		<img src="../../assets/logo.png" class="hamburger-container" style="margin-left: 5px;" />
		<breadcrumb class="breadcrumb-container" />
		<div class="right-menu">
			<el-popover placement="bottom" :title="$t('LogoutConfirm')" width="200" trigger="click" v-model="logoutVisible">
				<div style="text-align: right; margin: 0">
					<el-button size="mini" @click="logoutVisible = false">{{$t('Cancel')}}</el-button>
					<el-button type="primary" size="mini" @click.native="logout">{{$t('Confirm')}}</el-button>
				</div>
				<el-link type="info" slot="reference" style="margin-right: 0.5rem;">{{$t('Logout')}}</el-link>
			</el-popover>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from './NavbarBreadcrumb';
import Hamburger from './NavbarHamburger';
import { apiLogout } from '@/api/Login';

export default {
	data() {
		return {
			logoutVisible: false
		};
	},
	components: {
		Breadcrumb,
		Hamburger
	},
	computed: {
		...mapGetters(['sidebar', 'avatar'])
	},
	methods: {
		toggleSideBar() {
			this.$store.dispatch('app/toggleSideBar');
		},
		async logout() {
			var sessionid = this.$store.sessionId;
			apiLogout(
				{ sessionId: sessionid },
				res => {
					this.$store.dispatch('app/logout');
					this.$router.push(`/login?redirect=${this.$route.fullPath}`);
				},
				err => {
					var requestFailedTips = this.$t('RequestFailedSeeConsole');
					this.$message.error(requestFailedTips);
					console.log(err);
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.navbar {
	height: 50px;
	overflow: hidden;
	position: relative;
	background: #fff;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

	.hamburger-container {
		line-height: 46px;
		height: 100%;
		float: left;
		cursor: pointer;
		transition: background 0.3s;
		-webkit-tap-highlight-color: transparent;

		// &:hover {
		// 	background: rgba(0, 0, 0, 0.025);
		// }
	}

	.breadcrumb-container {
		float: left;
	}

	.right-menu {
		float: right;
		height: 100%;
		line-height: 50px;

		&:focus {
			outline: none;
		}

		.right-menu-item {
			display: inline-block;
			padding: 0 8px;
			height: 100%;
			font-size: 18px;
			color: #5a5e66;
			vertical-align: text-bottom;

			&.hover-effect {
				cursor: pointer;
				transition: background 0.3s;

				&:hover {
					background: rgba(0, 0, 0, 0.025);
				}
			}
		}

		.avatar-container {
			margin-right: 30px;

			.avatar-wrapper {
				margin-top: 5px;
				position: relative;

				.user-avatar {
					cursor: pointer;
					width: 40px;
					height: 40px;
					border-radius: 10px;
				}

				.el-icon-caret-bottom {
					cursor: pointer;
					position: absolute;
					right: -20px;
					top: 25px;
					font-size: 12px;
				}
			}
		}
	}
}
</style>
