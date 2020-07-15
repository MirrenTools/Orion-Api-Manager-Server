import axios from 'axios'
const request = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	headers: {
		'content-type': 'application/x-www-form-urlencoded'
	},
	timeout: 30000,
});

//请求拦截器
// request.interceptors.request.use(req => {
// 	console.log("request : succee...")
// 	console.log(req)
// 	return req;
// });

//响应拦截器
// request.interceptors.response.use(res => {
// 	console.log("response : succee...");
// 	return res;
// });

export default request
