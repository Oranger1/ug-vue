import http, { post } from '@/http/http';

export function pageStation(params) { // 
  return http({
      url: '/station/page',
      method: 'post',
      data:params
  })
  
}

    
export function addStation(params) { //
  console.log('add',params);
    return post('/station/add',params)
}

export function updateStation (params) { //
  console.log('update',params);
     return http({
          url: '/station/update',
          method: 'put',
          data:params
      })
}

export function queryLines (params) { //
  console.log('queryLines',params);
     return http({
          url: '/line/query',
          method: 'get',
          data:params
      })
}

export function queryMapObj () { //
     return http({
          url: '/getMap',
          method: 'get'
      })
}