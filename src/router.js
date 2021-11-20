import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from './layout'
// name在国际化中写i18n的名称
// meta格式说明:
// title = 当前页面的标题
// breadcrumb: 面包屑上有哪些连接
//   path = 请求连接
//   title = 标题,在国际化中写i18n的名称
//   queryKeys =  ['query参数的key']
//   pathKeys =  ['path参数的key,优先取路由的param参数,取不到就取query参数,再取不到就保持原有']
export const constantRoutes = [{
		path: '/',
		name: '/',
		redirect: 'index'
	}, {
		path: '/login',
		name: 'Login',
		component: () => import('./views/login/Login')
	},
	{
		path: '/404',
		name: '404',
		component: () => import('./views/404')
	},
	{
		path: '/index',
		component: Layout,
		children: [{
			path: '',
			name: 'ProjectList',
			component: () => import('./views/Projects')
		}, {
			path: 'profile',
			name: 'Profile',
			component: () => import('./views/members/Profile'),
			meta: {
				title: 'Profile',
				breadcrumb: [{
					path: '/index',
					title: 'ProjectList'
				}]
			}
		}, {
			path: 'members',
			name: 'Members',
			component: () => import('./views/members/Members'),
			meta: {
				title: 'Members',
				breadcrumb: [{
					path: '/index',
					title: 'ProjectList'
				}]
			}
		}, {
			path: 'import',
			name: 'ImportAPI',
			component: () => import('./views/ImportApi'),
			meta: {
				title: 'ImportAPI',
				breadcrumb: [{
					path: '/index',
					title: 'ProjectList'
				}]
			}
		}, {
			path: 'new/project',
			name: 'NewProjects',
			component: () => import('./views/project/Create'),
			meta: {
				title: 'NewProjects',
				breadcrumb: [{
					path: '/index',
					title: 'ProjectList'
				}]
			}
		}, {
			path: 'get/project/:pid',
			name: 'ProjectDetails',
			component: () => import('./views/project/Details'),
			meta: {
				title: 'ProjectDetails',
				breadcrumb: [{
					path: '/index',
					title: 'ProjectList'
				}]
			}
		}, {
			path: 'get/recycler',
			name: 'ApiRecycler',
			component: () => import('./views/project_api/Recycler'),
			meta: {
				title: 'ApiRecycler',
				breadcrumb: [{
					path: '/index',
					title: 'ProjectList'
				}]
			}
		}, {
			path: 'get/recycler/:aid',
			name: 'ApiHideDetails',
			component: () => import('./views/project_api/HideApiDetails'),
			meta: {
				title: 'ApiRecycler',
				breadcrumb: [{
					path: '/index',
					title: 'ProjectList'
				},{
					path: '/index/get/recycler',
					title: 'ApiRecycler',
					pathKeys: ['pid']
				}]
			}
		}, {
			path: 'get/groups/:pid',
			name: 'GroupList',
			component: () => import('./views/project_api/Groups'),
			meta: {
				title: 'GroupList',
				breadcrumb: [{
					path: '/index',
					title: 'ProjectList'
				},{
					path: '/index/get/project/:pid',
					title: 'ProjectDetails',
					pathKeys: ['pid']
				}]
			}
		}, {
			path: 'post/project/api/:pid/:gid',
			name: 'NewApi',
			component: () => import('./views/project_api/Create'),
			meta: {
				title: 'NewApi',
				breadcrumb: [{
					path: '/index',
					title: 'ProjectList'
				}, {
					path: '/index/get/project/:pid',
					title: 'ProjectDetails',
					pathKeys: ['pid']
				}, {
					path: '/index/get/groups/:pid',
					title: 'GroupList',
					pathKeys: ['pid']
				}]
			}
		}, {
			path: 'put/project/api/:pid/:gid/:aid',
			name: 'ModifyApi',
			component: () => import('./views/project_api/Update'),
			meta: {
				title: 'ModifyApi',
				breadcrumb: [{
					path: '/index',
					title: 'ProjectList'
				}, {
					path: '/index/get/project/:pid',
					title: 'ProjectDetails',
					pathKeys: ['pid']
				}, {
					path: '/index/get/groups/:pid',
					title: 'GroupList',
					pathKeys: ['pid']
				}]
			}
		}, {
			path: 'get/project/api/:pid/:gid/:aid',
			name: 'ApiDetails',
			component: () => import('./views/project_api/Details'),
			meta: {
				title: 'ApiDetails',
				breadcrumb: [{
					path: '/index',
					title: 'ProjectList'
				}, {
					path: '/index/get/project/:pid',
					title: 'ProjectDetails',
					pathKeys: ['pid']
				}, {
					path: '/index/get/groups/:pid',
					title: 'GroupList',
					pathKeys: ['pid']
				}]
			}
		}]
	},
	// 404 page must be placed at the end !!!
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
]

const createRouter = () => new Router({
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher
}

export default router
