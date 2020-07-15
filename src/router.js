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
				name: '首页标题',
				component: () => import('./views/Client')
			}, {
				path: 'test',
				name: 'fi',
				component: () => import('./views/Lalala'),
				meta: {
					breadcrumb: [{
						path: '/index',
						title: '首页',
						queryKeys: ['id']
					}, {
						path: '/index/lalala',
						title: '二级标题'
					}]
				}
			},
			{
				path: 'lalala',
				name: 'Form',
				component: () => import('./views/Lalala'),
				meta: {
					breadcrumb: [{
						path: '/index',
						title: '首页',
						queryKeys: ['id']
					}, {
						path: '/index/test',
						title: '二级标题'
					}]
				}
			}
		]
	},
	{
		path: '/test',
		component: Layout,
		children: [{
				path: '',
				name: '测试标题',
				component: () => import('./views/Client'),
				meta: {
					breadcrumb: [{
						path: '/index',
						title: '首页',
						queryKeys: ['id']
					}, {
						path: '/index/test',
						title: '二级标题'
					}]
				}
			}, {
				path: 'test',
				name: 'fi',
				component: () => import('./views/Client'),
				meta: {
					breadcrumb: [{
						path: '/index',
						title: '首页',
						queryKeys: ['id']
					}, {
						path: '/index/lalala',
						title: '二级标题'
					}]
				}
			},
			{
				path: 'lalala',
				name: 'Form',
				component: () => import('./views/Lalala'),
				meta: {
					breadcrumb: [{
						path: '/index',
						title: '首页',
						queryKeys: ['id']
					}, {
						path: '/index/test',
						title: '二级标题'
					}]
				}
			}
		]
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
