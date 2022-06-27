import request from '@/utils/request'

export function fetchRisk(query) {
  return request({
    url: 'http://127.0.0.1:5000/api/list_risk',
    method: 'get',
    params: query
  })
}
