import Mock from 'mockjs'
export default ({
  mock,
}) => {
  if (!mock) return;
  // 用户登录
  Mock.mock('http://user/menu.cn', 'post', () => {
    // data: new Date().getTime() + ''
    const json = {
      'code': 200,
      'success': true,
      'data': [
        {
          'name': 'home',
          'parentId': 0,
          'id': 1,
          'meta': {
            'icon': 'home',
            'title': '首页',
          },
          'component': 'Home',
        },
        {
          'name': 'mallSystem',
          'parentId': 0,
          'id': 2,
          'meta': {
            'icon': 'shop',
            'title': '商城系统管理',
          },
          'component': 'RouteView',
          'redirect': '/mallSystem/role'
        },
        {
          'name': 'role',
          'parentId': 2,
          'id': 22,
          'meta': {
            'title': '商城角色管理',
            'icon': 'team',
          },
          'component': 'Role'
        },
        {
          'name': 'defaultPermission',
          'parentId': 2,
          'id': 23,
          'meta': {
            'title': '商城角色管理',
            'icon': 'team',
          },
          'component': 'DefaultPermission'
        },
        {
          'name': 'permissionResource',
          'parentId': 2,
          'id': 24,
          'meta': {
            'title': '商城角色管理',
            'icon': 'team',
          },
          'component': 'PermissionResource'
        },
      ],
      'msg': '操作成功',
    }
    return json
  });
}
