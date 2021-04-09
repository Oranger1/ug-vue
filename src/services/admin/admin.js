import http from '../../http/http';

export function login(params) { // 登录接口 这是post方式  要写data:params  这是传json格式
    return http({
        url: '/login',
        method: 'post',
        data:params
    })
}

export function touristLogin(params) { // 游客登录接口 
    return http({
        url: '/touristLogin',
        method: 'get',
    })
}

export function getdata(params) { // 用来测试的接口  这是get方式  直接写params参数
    return http({
        url: '/manager/page',
        method: 'get',
        params
    })
}