export default [{
    id: 7,
    path: "mallsystem",
    name: "mallSystem",
    meta: {
        title: "商城系统管理",
        icon: ""
    },
    component: () => import( '@/page/RouteView/index.vue'),
    children: [{
            id: 71,
            path: "role",
            name: "role",
            meta: {
                title: "商城角色管理",
                icon: ""
            },
            component: () => import( '@/views/mallSystem/role.vue'),
        },
        {
            id: 72,
            path: "defaultPermission",
            name: "defaultPermission",
            meta: {
                title: "商城默认权限",
                icon: ""
            },
            component: () => import( '@/views/mallSystem/defaultPermission.vue'),
        },
        {
            id: 73,
            path: "permissionResource",
            name: "permissionResource",
            meta: {
                title: "商城权限资源",
                icon: ""
            },
            component: () => import( '@/views/mallSystem/permissionResource.vue'),
        },
    ]
}]