import http from '@/services/http'
const userApi = {
	login: '/user/login',
	getUserInfo: '/user',
	getAddress: '/user/address',
	setAddressDefault: '/user/setAddressDefault',
	deleteAddress: '/user/deleteAddress',
}

// 登录
const login = (data?: any) => {
	return http({
		url: userApi.login,
		method: 'POST',
		data,
	})
}
const getUserInfo = (data?: any) => {
	return http({
		url: userApi.getUserInfo,
		method: 'GET',
		params: data,
	})
}
const getAddress = (data?: any) => {
	return http({
		url: userApi.getAddress,
		method: 'GET',
		params: data,
	})
}
const setAddressDefault = (data?: any) => {
	return http({
		url: userApi.setAddressDefault,
		method: 'POST',
		data,
	})
}
const deleteAddress = (data?: any) => {
	return http({
		url: userApi.deleteAddress,
		method: 'DELETE',
		data,
	})
}

export default {
    login,
	getUserInfo,
	getAddress,
	setAddressDefault,
	deleteAddress,
}