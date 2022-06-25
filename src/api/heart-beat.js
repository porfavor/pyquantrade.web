import request from '@/utils/request'

export function fetchHeartBeat(query) {
  return request({
    url: 'http://127.0.0.1:5000/api/list_heart_beat',
    method: 'get',
    params: query
  })
}
