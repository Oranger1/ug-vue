import http, { post } from '@/http/http';

export function pageBill() { // 分页查询地铁线路
  return http({
      url: '/bill/page',
      method: 'post',
  })
  
}

export function pageTakeRecord() { // 分页查询地铁线路
  return http({
      url: '/takeRecord/page',
      method: 'post',
  })
  
}