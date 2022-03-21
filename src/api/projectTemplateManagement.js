import request from '../utils/request';

const methodUrl = {
  getList: {
    url: '/v1/project_templates/list',
    method: 'get',
  },
  doCreate: {
    url: '/v1/project_templates',
    method: 'post',
  },
  doEdit: {
    url: '/v1/project_templates',
    method: 'put',
  },
  doDelete: {
    url: '/v1/project_templates',
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
