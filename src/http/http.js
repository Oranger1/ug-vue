import axios from 'axios';
import { Notification } from 'element-ui';

// const token = 'grubbyloveyou'; // 服务端拿的 token 可以从 vuex、localStorage 等地方取

// axios.defaults.headers['authorization'] = `Bearer ${token}`;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        var token = sessionStorage.getItem('stlToken');
        if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            token = sessionStorage.getItem('stlToken');
            // config.headers.authorization = `Basic ${new Buffer(token).toString('base64')}`;
            // console.log(token,'token');
            config.headers.authorization = `${new Buffer(token)}`;
        }
        // config.headers.post['Content-Type'] = 'multipart/form-data;charset=UTF-8'
        return config;
    },
    err => {
        return Promise.reject(err);
});

//http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.config.url == '/login'){
            // debugger
            // if (response.config.headers.authorization) {
            //     console.log("这里是token" + response.config.headers.authorization);
            //     sessionStorage.setItem('stlToken',response.config.headers.authorization);
            //     debugger
            // }
            //存放token
            if(response.data.token){
                sessionStorage.setItem('stlToken',response.data.token);
            }
        }
        
        Notification({
            message: response.data.message ? response.data.message : '操作成功',
            type: response.data.error ? 'error' : 'success',
            duration: 3 * 1000,
            position: 'top-right'
        });
        return response.data;
    },
    error => {
        return responseError(error);
    }
)
//失败
function responseError(error) {
    let message = null;
    let title = null;

    if (!error.response) {
        message = error.message
    } else {
        let data = error.response.data;
        if (typeof (data.error) === 'string') {
            message = data.error
        } else if (typeof (data.error) == 'object') {
            title = data.error.message
            message = (data.error.validationErrors && data.error.validationErrors.length > 0) ? data.error.validationErrors[0] : data.error.message
        }
    }
    if (message) {
        Notification({
            title,
            message,
            type: 'error',
            duration: 3 * 1000,
            position: 'top-right'
        });
    }
    return Promise.reject(error);
}


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: data
        })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err)
            })
    })
}
export function post(url,data = {}){
    console.log("?");
    return new Promise((resolve,reject) => {
    //   axios.post(url, data, {
    //       headers: {'Content-Type': 'multipart/form-data'}
    //     }
    // )
      axios.post(url,data)
           .then(response => {
             resolve(response);
           },err => {
             reject(err)
           })
    })
}
export function put(url,data = {}){
    return new Promise((resolve,reject) => {
      axios.put(url,data)
           .then(response => {
             resolve(response.data);
           },err => {
             reject(err)
           })
    })
  }
export default axios