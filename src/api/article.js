import request from '@/utils/request'

export function fetchHeartBeatList(query) {
  return request({
    url: 'http://127.0.0.1:5000/api/list_heart_beat',
    method: 'get',
    params: query
  })
}

export function fetchPositionList(query) {
  return request({
    url: 'http://127.0.0.1:5000/api/list_position',
    method: 'get',
    params: query
  })
}

export function fetchList(query) {
  return request({
    url: 'http://127.0.0.1:5000/api/list_pos_control',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
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

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: 'http://127.0.0.1:5000/api/update_pos_control',
    method: 'post',
    data
  })
}
