import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from './layout'
// meta格式说明:
// title = 当前页面的标题
// breadcrumb: 面包屑上有哪些连接
//   path = 请求连接
//   title = 标题
//   queryKeys =  ['query参数的key']
//   pathKeys =  ['path参数的key,优先取路由的param参数,取不到就取query参数,再取不到就保持原有']
export const constantRoutes = [{
		path: '/',
		name: '/',
		redirect: 'index'
	}, {
		path: '/login',
		name: '登录',
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
			name: '项目列表',
			component: () => import('./views/Projects')
		}, {
			path: 'new/project',
			name: '新增项目',
			component: () => import('./views/project/Create'),
			meta: {
				title: '新增项目',
				breadcrumb: [{
					path: '/index',
					title: '项目列表'
				}]
			}
		}, {
			path: 'get/project/:pid',
			name: '项目详情',
			component: () => import('./views/project/Details'),
			meta: {
				title: '项目详情',
				breadcrumb: [{
					path: '/index',
					title: '项目列表'
				}]
			}
		}, {
			path: 'get/project/api/:pid/:gid/:aid',
			name: 'API详情',
			component: () => import('./views/project_api/Details'),
			meta: {
				title: 'API详情',
				breadcrumb: [{
					path: '/index',
					title: '项目列表'
				},{
					path: '/index/get/project/:pid',
					title: '项目详情',
					pathKeys:['pid']
				}]
			}
		}, {
			path: 'post/project/api/:pid/:gid',
			name: '新增API',
			component: () => import('./views/project_api/Create'),
			meta: {
				title: '新增API',
				breadcrumb: [{
					path: '/index',
					title: '项目列表'
				},{
					path: '/index/get/project/:pid',
					title: '项目详情',
					pathKeys:['pid']
				}]
			}
		}, {
			path: 'put/project/api/:pid/:gid/:aid',
			name: '修改API',
			component: () => import('./views/project_api/Update'),
			meta: {
				title: '修改API',
				breadcrumb: [{
					path: '/index',
					title: '项目列表'
				},{
					path: '/index/get/project/:pid',
					title: '项目详情',
					pathKeys:['pid']
				}]
			}
		}, {
			path: 'import',
			name: '导入API',
			component: () => import('./views/ImportApi'),
			meta: {
				title: '导入API',
				breadcrumb: [{
					path: '/index',
					title: '项目列表'
				}]
			}
		}]
	},
	// 404 page must be placed at the end !!!
	// {
	// 	path: '*',
	// 	redirect: '/404',
	// 	hidden: true
	// }
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
