import request from '@/utils/request'

export function fetchPosition(query) {
  return request({
    url: 'http://127.0.0.1:5000/api/list_position',
    method: 'get',
    params: query
  })
}

export function updatePosition(data) {
  return request({
    url: 'http://127.0.0.1:5000/api/update_position',
    method: 'post',
    data
  })
}
