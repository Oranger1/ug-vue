import http, { post } from '@/http/http';

export function pageStation(params) { // 
  return http({
      url: '/station/page',
      method: 'post',
      data:params
  })
  
}

    
export function addStation(params) { //
   return post('/station/add',params)
}

export function updateStation (params) { //
     return http({
          url: '/station/update',
          method: 'put',
          data:params
      })
}

export function queryLines (params) { //
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

export function getPrice(params) {
  return http({
    url: '/station/getPrice',
    method: 'get',
    params
  })
}


export function toPay(params) {
  console.log(params)
  return http({
    url: '/apily',
    method: 'get',
    params
  })
}

export function takeOn(params) {
  return http({
    url: '/takeRecord/getOn',
    method: 'get',
    params
  })
}

export function takeOff(params) {
  return http({
    url: '/takeRecord/getOff',
    method: 'get',
    params
  })
}