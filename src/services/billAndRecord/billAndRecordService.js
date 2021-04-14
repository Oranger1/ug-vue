import http, { post } from '@/http/http';

export function pageBill() { 
  return http({
      url: '/bill/page',
      method: 'post',
  })
  
}

export function pageTakeRecord() { 
  return http({
      url: '/takeRecord/page',
      method: 'post',
  })
  
}

export function ListBill() { 
  return http({
      url: '/bill/query',
      method: 'post',
  })
  
}

export function ListTakeRecord() { 
  return http({
      url: '/takeRecord/query',
      method: 'post',
  })
  
}