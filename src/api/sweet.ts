import http from '@/services/http'
const sweetApi = {
	getSweetList: '/sweet',
}

const getSweetList = (data?: any) => {
	return http({
		url: sweetApi.getSweetList,
		method: 'GET',
		params: data,
	})
}

export default {
    getSweetList,
}