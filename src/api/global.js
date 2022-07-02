import request from '@/utils/request'

export function fetchGlobal(query) {
  return request({
    url: 'http://127.0.0.1:5000/api/list_global',
    method: 'get',
    params: query
  })
}

export function updateGlobal(data) {
  return request({
    url: 'http://127.0.0.1:5000/api/update_global',
    method: 'post',
    data
  })
}
