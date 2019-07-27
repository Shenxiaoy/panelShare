/*
*  待完善部分：对于额外的axios config，写在interceptors.request.use 中是有问题的，需要合并到return callback中config去
* */

import axios from 'axios'

/*
* api url 转换
* */
function transformUrl(url, data, type) {
    if(data && typeof data !== 'string' && !Array.isArray(data) && Object.keys(data).length ) {
        let newUrl = url
        const newData = Object.assign({}, data)

        Object.keys(data).forEach((k, i) => {
            const reg = new RegExp(`{${k}}`, 'g')
            newUrl = newUrl.replace(reg, data[k])

            if(reg.test(url)) {
                newData[k] = undefined
            }
        })

        if(type === 'params') {
            return newData
        } else {
            return newUrl
        }
    } else {
        if(type === 'params') {
            return data
        } else {
            return url
        }
    }
}

const request = axios.create({
    timeout: 5000
})

function requestData(method, data) {
    return JSON.stringify(data)
}

function sendRequest(url, baseUrl, method, requestConfig) {
    const transUrl = baseUrl.replace(/^\//g, '')
    request.interceptors.request.use(function(config) {
        // config.baseURL =  transUrl + '/'
        // config.method = method
        config.responseType = 'json'
        config.headers = {'content-type': 'application/json;charset=UTF-8'}
        config.transformRequest = [requestData.bind(null, method)]

        if(requestConfig) {
            config = Object.assign(config, requestConfig)
        }
        return config

    }, function(error) {
        return Promise.reject(error)
    })

    request.interceptors.response.use(function(response) {
        console.log(response, 'hhhh')
        const data = {
            data: response.data

        }
        return data

    }, function(error) {
        return Promise.reject(error)
    })

    return function(params) {
        if(method === 'get') {
            return request({
                url: transformUrl(url, params),
                params: transformUrl(url, params, 'params'),
                method: method,
                baseURL: transUrl + '/'
            })
        } else {
            return request({
                url: transformUrl(url, params),
                data: transformUrl(url, params, 'params'),
                method: method,
                baseURL: transUrl + '/'
            })
        }

    }

}

const getMethod = {
    get: (url, baseUrl, config) => sendRequest(url, baseUrl, 'get', config),
    post: (url, baseUrl, config) => sendRequest(url, baseUrl, 'post', config),
    delete: (url, baseUrl, config) => sendRequest(url, baseUrl, 'delete', config),
    put: (url, baseUrl, config) => sendRequest(url, baseUrl, 'put', config),
    patch: (url, baseUrl, config) => sendRequest(url, baseUrl, 'patch', config),
}

export default getMethod





