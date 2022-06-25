import request from '@/utils/request'

export function fetchPosition(query) {
  return request({
    url: 'http://127.0.0.1:5000/api/list_position',
    method: 'get',
    params: query
  })
}

