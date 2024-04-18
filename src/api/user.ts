import http from '@/services/http'
const userApi = {
	login: '/user/login',
}

// 登录
const login = (data?: any) => {
	return http({
		url: userApi.login,
		method: 'POST',
		data,
	})
}
// const test = (data?: any) => {
// 	return http({
// 		url: '/user/test',
// 		method: 'GET',
// 		params: data,
// 	})
// }

export default {
    login,
	// test,
}