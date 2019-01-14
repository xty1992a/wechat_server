import request, {loadData} from './request'

export const getWxConfig = (url) => loadData('/wechat/getWxConfig', {url});
export const getWxMenu = (url) => loadData('/wechat/getMenus', {}, false);
