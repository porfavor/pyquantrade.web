import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'http://127.0.0.1:5000/api/list_parameter',
    method: 'get',
    params: query
  })
}

export function fetchParameter(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createParameter(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateParameter(data) {
  return request({
    url: 'http://127.0.0.1:5000/api/update_parameter',
    method: 'post',
    data
  })
}
