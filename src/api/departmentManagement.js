import request from '../utils/request';

const methodUrl = {
  getList: {
    url: '/v1/departments/list',
    method: 'get',
  },
  doCreate: {
    url: '/v1/departments',
    method: 'post',
  },
  doEdit: {
    url: '/v1/departments',
    method: 'put',
  },
  doDelete: {
    url: '/v1/departments',
    method: 'delete',
  },
};

export function getList(params) {
  return request({
    ...methodUrl.getList,
    params,
  });
}

export function doCreate(data) {
  return request({
    ...methodUrl.doCreate,
    data,
  });
}

export function doEdit(data) {
  return request({
    ...methodUrl.doEdit,
    data,
  });
}

export function doDelete(data) {
  return request({
    ...methodUrl.doDelete,
    data,
  });
}
