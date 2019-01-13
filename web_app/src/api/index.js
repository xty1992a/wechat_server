import request, {loadData} from './request'

export const getWxConfig = (url) => loadData('/wechat/getWxConfig', {url});
