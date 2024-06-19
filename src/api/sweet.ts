import http from '@/services/http'
const sweetApi = {
	getSweetList: '/sweet',
	getSweetDeatil: '/sweet/detail',
}

const getSweetList = (data?: any) => {
	return http({
		url: sweetApi.getSweetList,
		method: 'GET',
		params: data,
	})
}

const getSweetDeatil = (data?: any) => {
	return http({
		url: sweetApi.getSweetDeatil,
		method: 'POST',
		data,
	})
}

export default {
    getSweetList,
	getSweetDeatil
}