import request from '../utils/request';
const methodUrl = {
  doChange: {
    url: '/v1/user_task_likes/change',
    method: 'post',
  },
};

export function doChange(data) {
  return request({
    ...methodUrl.doChange,
    data,
  });
}
