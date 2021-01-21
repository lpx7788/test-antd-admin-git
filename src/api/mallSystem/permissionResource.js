import request from '@/util/axios'
import apiUrl from '../apiUrlConfig'

    export const getResourceList = (option) =>
    request({
        url: apiUrl.Url_auth_getResourcelist,
        params: option,
        method: 'get'
    })
    export const deleteResourceList = (option) =>
    request({
        url: apiUrl.Url_auth_deleteResourceList,
        data: option,
        method: 'post'
    })
    export const addResourceList = (option) =>
    request({
        url: apiUrl.Url_auth_addResourceList,
        data: option,
        method: 'post'
    })
    export const updateResourceList = (option) =>
    request({
        url: apiUrl.Url_auth_updateResourceList,
        data: option,
        method: 'post'
    })
