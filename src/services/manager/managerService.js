import http, { post } from '@/http/http';

export function pageManagers(params) { // 查询管理员
    return http({
        url: '/manager/page',
        method: 'post',
        data:params
    })
    
}

export function queryManager(params) { // 查询管理员
        return http({
            url: '/manager/query',
            method: 'get',
            params
        })
}
    
export function addManager(params) { // 增加管理员
    console.log('add',params);
    return post('/manager/add',params)
}

export function updateManager(params) { // 修改管理员
    console.log('update',params);
     return http({
            url: '/manager/update',
            method: 'put',
            data:params
        })
}

export function delManager(params) { // 删除管理员
    return http({
        url: '/manager/del',
        method: 'get',
        params
    })
}
    