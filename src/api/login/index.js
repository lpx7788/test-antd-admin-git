import request from '@/util/axios'

export const login = (option) =>
    request({
        url: 'http://user/login.cn',
        data: option,
        method: 'post'
    })
export const getInfo = (option) =>
    request({
        url: 'http://user/userInfo.cn',
        data: option,
        method: 'get'
    })
export const logout = (option) =>
    request({
        url: 'http://user/logout.cn',
        data: option,
        method: 'post'
    })
export const getMenu = (option) =>
    request({
        url: 'http://user/menu.cn',
        data: option,
        method: 'post'
    })
