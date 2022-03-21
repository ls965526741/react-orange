import request from '../utils/request';

const methodUrl = {
  doChange: {
    url: '/v1/user_project_collects/change',
    method: 'post',
  },
};

export function doChange(data) {
  return request({
    ...methodUrl.doChange,
    data,
  });
}
