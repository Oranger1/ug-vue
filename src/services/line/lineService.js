import http, { post } from '@/http/http';

export function pageLines() { // 分页查询地铁线路
    return http({
        url: '/line/page',
        method: 'get',
    })
    
}


export function addLine(params) { // 增加地铁线路
  console.log('add',params);
    return post('/line/add',params)
}

export function updateLine(params) { // 修改地铁线路
  console.log('update',params);
     return http({
          url: '/line/update',
          method: 'put',
          data:params
      })
}

export function delLine(params) { // 删除地铁线路
  return http({
            url: '/line/del',
            method: 'get',
            params
        })
 
}