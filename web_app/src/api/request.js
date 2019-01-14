import axios from 'axios'
import {getParams} from '../utils/index'
import {Message} from '@redbuck/packages'

const params = getParams();

const defaultOpt = {
  method: 'GET',
  data: {},
  params: {},
  headers: {
	code: params.code || '',
  },
};

export default function request(url, data) {
  let config = {
	...defaultOpt,
	url,
  };
  if (config.method.toUpperCase() === 'GET') {
	config.params = data
  }
  else {
	config.data = data
  }
  return axios(config)
}

export function loadData(url, data, toast = true) {
  return new Promise(async resolve => {
	try {
	  let res = await request(url, data);
	  if (res.status === 200 && res.data.success) {
		toast && Message && Message('成功');
		resolve({success: true, data: res.data.data || res.data, message: res.data.message || '请求成功!'});
	  }
	  resolve({success: false, data: res.data.data || res.data, message: res.data.message || '业务失败!'});
	} catch (e) {
	  resolve({success: false, data: e, message: '网络异常!'});
	}
  })
}
