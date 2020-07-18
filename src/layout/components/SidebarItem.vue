<template>
	<div class="sidebar-item-container" :class="{ collapse: collapse }">
		<el-menu default-active="/index" background-color="#304156" text-color="#fff" active-text-color="#409eff" :router="true" :collapse="collapse" :collapse-transition="false">
			<template v-for="item in menus">
				<el-submenu v-if="item.items" :index="item.path">
					<template slot="title">
						<i :class="item.icon"></i>
						<span slot="title">{{ item.title }}</span>
					</template>
					<el-menu-item-group v-for="item1 in item.items" :key="item1.path">
						<el-menu-item :index="item1.path">{{ item1.title }}</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-menu-item v-else :index="item.path">
					<i :class="item.icon"></i>
					<span slot="title">
						{{ item.title }}
						<span class="badge" v-if="getBadge(item.badge) !== 0" v-text="getBadge(item.badge)"></span>
					</span>
				</el-menu-item>
			</template>
		</el-menu>
	</div>
</template>

<script>
export default {
	name: 'SidebarItem',
	props: {
		collapse: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			menus: [
				{ path: '/index', title: '项目列表', icon: 'el-icon-notebook-2' },
				{ path: '/index/fromSwagger', title: '导入Swagger', icon: 'el-icon-attract' }
			]
		};
	},
	methods: {
		getBadge(id) {
			if (id == null || id == '') {
				return 0;
			}
			return this.$store.getters.id;
		}
	}
};
</script>

<style lang="scss" scoped>
.el-menu {
	border: 0;
}

.sidebar-item-container {
	position: relative;
	width: 100%;
	height: 95%;
	line-height: 50px;
	text-align: left;
	overflow-y: auto;
	overflow-x: hidden;
	scrollbar-width: none;

	& .sidebar-link {
		height: 100%;
		width: 100%;
		display: flex;
		color: white;
		text-decoration-line: none;
		& .sidebar-title {
			display: inline-block;
			margin: 0;
			font-weight: 600;
			line-height: 50px;
			font-size: 14px;
			font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
			vertical-align: middle;
		}
		& .sidebar-icon {
			width: 54px;
			height: 50px;
			font-size: 1.5rem;
		}
		&:hover {
			background-color: #263445;
		}
	}
}
.badge {
	border-radius: 8px;
	background-color: red;
	padding: 1px 5px;
	color: white;
}
</style>
