import request from '@/utils/request'

export function fetchParameter(query) {
  return request({
    url: 'http://127.0.0.1:5000/api/list_parameter_neuron',
    method: 'get',
    params: query
  })
}

export function updateParameter(data) {
  return request({
    url: 'http://127.0.0.1:5000/api/update_parameter_neuron',
    method: 'post',
    data
  })
}
