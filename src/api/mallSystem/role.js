import request from '@/util/axios'
import apiUrl from '../apiUrlConfig'

export const getTemplateRoles = (option) =>
    request({
        url: apiUrl.Url_auth_getTemplateRoles,
        data: option,
        method: 'post'
    })

export const deleteTemplateRole = (option) =>
    request({
        url: apiUrl.Url_auth_deleteTemplateroles,
        data: option,
        method: 'post'
    })

export const addRoleTemplate = (option) =>
    request({
        url: apiUrl.Url_auth_addTemplateroles,
        data: option,
        method: 'post'
    })
export const updateRoleTemplate = (option) =>
    request({
        url: apiUrl.Url_auth_updateTemplateroles,
        data: option,
        method: 'post'
    })

export const getBaseResourceList = (option) =>
    request({
        url: apiUrl.Url_auth_getBaseResourceList,
        params: option,
        method: 'get'
    })
