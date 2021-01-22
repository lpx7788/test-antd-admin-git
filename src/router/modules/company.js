export default [{
    id: 2,
    path: "company",
    name: "company",
    meta: {
        title: "商城系统管理",
        icon: ""
    },
    component: () => import( '@/page/RouteView/index.vue'),
    children: [{
            id: 21,
            path: "companys",
            name: "companys",
            meta: {
                title: "企业列表",
                icon: ""
            },
            component: () => import( '@/views/company/companys.vue'),
        },
        {
            id: 22,
            path: "users",
            name: "users",
            meta: {
                title: "用户列表",
                icon: ""
            },
            component: () => import( '@/views/company/users.vue'),
        },
    ]
}]