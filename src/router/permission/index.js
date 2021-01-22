
import router from '../modules/index'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const whiteList = ['/login'];//白名单

router.beforeEach((to, from, next) => {
    NProgress.start();
    let token = localStorage.getItem('access_token')
    console.log(token)
    if (token) {
        if (to.path === '/login') { // 如果登录成功访问登录页跳转到主页
            next({
                path: '/',
            })
        } else {
            // check login user.roles is null
            // if (store.getters.roles.length === 0) {
            //     // request login userInfo

            //     store.dispatch('GetInfo')
            //         .then(res => {
            //             const roles = res.result && res.result.role
            //             // generate dynamic router
            //             store.dispatch('GenerateRoutes', { roles }).then(() => {
            //                 // 根据roles权限生成可访问的路由表
            //                 // 动态添加可访问路由表
            //                 router.addRoutes(store.getters.addRouters)
            //                 // 请求带有 redirect 重定向时，登录自动重定向到该地址
            //                 const redirect = decodeURIComponent(from.query.redirect || to.path)
            //                 if (to.path === redirect) {
            //                     // set the replace: true so the navigation will not leave a history record
            //                     next({ ...to, replace: true })
            //                 } else {
            //                     // 跳转到目的路由
            //                     next({ path: redirect })
            //                 }
            //             })
            //         })
            //         .catch(() => {
            //             // notification.error({
            //             //     message: '错误',
            //             //     description: '请求用户信息失败，请重试'
            //             // })
            //             // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            //             // store.dispatch('Logout').then(() => {
            //             //     next({ path: loginRoutePath, query: { redirect: to.fullPath } })
            //             // })
            //         })
            // } else {
                next()
            // }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login');
            NProgress.done();
        }
    }
})

router.afterEach(() => {
    NProgress.done();
    // let title = store.getters.tag.label;
    // let i18n = store.getters.tag.meta.i18n;
    // title = router.$avueRouter.generateTitle(title, i18n)
    // // 根据当前的标签也获取label的值动态设置浏览器标题
    // router.$avueRouter.setTitle(title);
});