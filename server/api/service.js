import requset from '../utils/axios/request'

let login = function(params) {
    return requset({
        methos: "GET",
        url: '/api/login',
        params
    })
}

let uploadFile = (data)=> {
    return requset({
        methos: "POST",
        url: '/uploadFile',
        data
    })
}

let testApi = (params) => {
    return requset({
        methos: "GET",
        url: '/api',
        params
    })
}

export {
    login,
    uploadFile,
    testApi
}