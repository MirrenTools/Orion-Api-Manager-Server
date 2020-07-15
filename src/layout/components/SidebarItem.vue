<template>
	<div class="sidebar-item-container" :class="{ collapse: collapse }">
		<el-menu default-active="1-3" background-color="#304156" text-color="#fff" active-text-color="#409eff" :router="true" :collapse="collapse" :collapse-transition="false">
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
				{ path: '/test/test', title: '/test/indexind', icon: 'el-icon-delete', badge: 'badge-data-id' },
				{ path: '/test/lalala', title: '/test/lalala', icon: 'el-icon-edit' },
				{
					path: '/form/test2',
					title: '/form/test',
					icon: 'el-icon-share',
					items: [{ path: '/form/test', title: '/form/test', icon: 'el-icon-edit' }, { path: '/form/index', title: '/form/index', icon: 'el-icon-delete' }]
				},
				{ path: '/form/index3', title: '/form/index', icon: 'el-icon-share' },
				{ path: '/form/test4', title: '/form/index', icon: 'el-icon-share' },
				{ path: '/form/index5', title: '/form/index', icon: 'el-icon-share' },
				{
					path: '/form/test6',
					title: '/form/test',
					icon: 'el-icon-share',
					items: [{ path: '/test', title: '/form/test', icon: 'el-icon-edit' }, { path: '/index', title: '/form/index', icon: 'el-icon-delete' }]
				}
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
