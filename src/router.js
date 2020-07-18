import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from './layout'
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
			path: 'fromSwagger',
			name: '导入Swagger',
			component: () => import('./views/FromSwagger'),
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
