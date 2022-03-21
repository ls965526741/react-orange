import request from '../utils/request';

const methodUrl = {
  create: {
    url: '/v1/verification_codes',
    method: 'post',
  },
};

export async function create(data) {
  return request({
    ...methodUrl.create,
    data,
  });
}
