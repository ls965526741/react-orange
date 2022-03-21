import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { message } from 'antd'

const request = axios.create({
  baseURL: '/api',
})
request.interceptors.request.use(function (config) {
  NProgress.start()
  config.headers["Authorization"] = "Bearer " + localStorage.getItem('token')
  config.headers['x-csrf-token'] = "Bearer " + localStorage.getItem('token')
  return config;
}, function (error) {
  return Promise.reject(error);
});

request.interceptors.response.use(function (response) {
  NProgress.done()
  return response;
}, function (error) {
  NProgress.done()
  message.error(error.response.data.msg)
  return Promise.reject(error);
  // return error.response.data
});
export default request
