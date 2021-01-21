export default [{
    id: 7,
    path: "company",
    name: "company",
    meta: {
        title: "商城系统管理",
        icon: ""
    },
    component: () => import( '../../page/RouteView/index.vue'),
    children: [{
            id: 71,
            path: "companys",
            name: "companys",
            meta: {
                title: "企业列表",
                icon: ""
            },
            component: () => import( '../../views/company/companys.vue'),
        },
        {
            id: 72,
            path: "users",
            name: "users",
            meta: {
                title: "用户列表",
                icon: ""
            },
            component: () => import( '../../views/company/users.vue'),
        },
    ]
}]