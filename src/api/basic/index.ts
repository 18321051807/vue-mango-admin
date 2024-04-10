import { request } from '@/utils/http';


export const getDailyEnglish = (data?: object) => {
    return request({
        url: '/basic-api/api/dailyEnglish',
        method: 'get',
        params: data,
    })
}