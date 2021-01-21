
const apiUrl = {
  Login: '/auth/login',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  UserInfo: '/user/info',
  UserMenu: '/user/nav',
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',

  // 商城角色管理
  Url_auth_getTemplateRoles: '/auth/msapi/gettemplateroles',
  Url_auth_deleteTemplateroles: '/auth/msapi/deleteroletemplate',
  Url_auth_addTemplateroles: '/auth/msapi/addroletemplate',
  Url_auth_updateTemplateroles: '/auth/msapi/updateroletemplate',
  Url_auth_getBaseResourceList: '/auth/getbaseresourcelist',

  // 商城默认权限
  Url_auth_getDefaultPermissions: '/auth/getdefaultpermissions',
  Url_auth_editDefaultPermissions: '/auth/updatedefaultpermissionresource',

  // 商城权限资源管理
  Url_auth_getResourcelist: '/auth/msapi/getresourcelist',
  Url_auth_deleteResourceList: '/auth/removebaseresource',
  Url_auth_addResourceList: '/auth/addbaseresource',
  Url_auth_updateResourceList: '/auth/updatebaseresource'

}

export default apiUrl
