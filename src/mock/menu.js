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
          id: 1,
          path: "home",
          name: "home",
          meta: {
            title: "首页平台66",
            icon: "home",
          },
        },
        {
          id: 7,
          path: "mallSystem",
          name: "mallSystem",
          meta: {
            title: "商城系统管理66",
            icon: "shop",
          },
          children: [
            {
              id: 71,
              path: "role",
              name: "role",
              meta: {
                title: "商城角色管理77",
                icon: "team",
              },
              parentId: 7,
            },
            {
              id: 72,
              path: "defaultPermission",
              name: "defaultPermission",
              meta: {
                title: "商城默认权限88",
                icon: "cluster",
              },
              parentId: 7,
            },
            {
              id: 73,
              path: "permissionResource",
              name: "permissionResource",
              meta: {
                title: "商城权限资源",
                icon: "apartment",
              },
              parentId: 7,
            },
          ],
        },
      ],
      'msg': '操作成功',
    }
    return json
  });
}
