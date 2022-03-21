import request from '../utils/request';

const methodUrl = {
  getRouterList: {
    url: '/v1/menus/user_menus',
    method: 'get',
  },
};

export function getRouterList(params) {
  return request({
    ...methodUrl.getRouterList,
    params,
  });
}
