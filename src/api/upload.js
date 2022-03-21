import request from '../utils/request';

const methodUrl = {
  upload: {
    url: '/v1/uploads',
    method: 'post',
  },
};

export function upload(data) {
  return request({
    ...methodUrl.upload,
    data,
  });
}
