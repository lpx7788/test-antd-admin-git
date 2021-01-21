import request from '@/util/axios'
import apiUrl from '../apiUrlConfig'

export const getdefaultpermissions = (option) =>
    request({
        url: apiUrl.Url_auth_getDefaultPermissions,
        data: option,
        method: 'post'
    })
export const editdefaultpermissions = (option) =>
    request({
        url: apiUrl.Url_auth_editDefaultPermissions,
        data: option,
        method: 'post'
    })
