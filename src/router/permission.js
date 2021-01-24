
import router from './index'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from '../store'
const whiteList = ['/login'];//白名单
// import router from './router'

router.beforeEach((to, from, next) => {
    console.log(to, from)
    NProgress.start();
    let token = localStorage.getItem('omp-token')
    next()
    // console.log(token)
    // if (token) {
    //     if (to.path === '/login') { // 如果登录成功访问登录页跳转到主页
    //         next({
    //             path: '/',
    //         })
    //     } else {
    //         console.log(66666)
    //         if (store.getters.roles.length === 0) {
    //             store.dispatch('GetInfo')
    //                 .then(response => {
    //                     let res = response.data
    //                     console.log('res===',res)
    //                     const roles = res && res.role
    //                     store.dispatch('GenerateRoutes', { roles }).then(() => {
    //                         console.log('store.getters.addRouters',store.getters.addRouters)
    //                         // router.addRoutes(store.getters.addRouters)
    //                         const redirect = decodeURIComponent(from.query.redirect || to.path)
    //                         if (to.path === redirect) {
    //                             next({ ...to, replace: true })
    //                         } else {
    //                             next({ path: redirect })
    //                         }
    //                     })
    //                 })
    //                 .catch((err) => {
    //                     console.log(err)
    //         //             // notification.error({
    //         //             //     message: '错误',
    //         //             //     description: '请求用户信息失败，请重试'
    //         //             // })
    //         //             // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
    //         //             // store.dispatch('Logout').then(() => {
    //         //             //     next({ path: loginRoutePath, query: { redirect: to.fullPath } })
    //         //             // })
    //                 })
    //         } else {
    //             console.log(99999)
    //             next()
    //         }
    //     }
    // } else {
    //     console.log(333)
    //     if (whiteList.indexOf(to.path) !== -1) {
    //         console.log(6666666)
    //         next()
    //     } else {
    //         console.log(35435)
    //         next('/login');
    //         NProgress.done();
    //     }
    // }
})

router.afterEach(() => {
    NProgress.done();
    // let title = store.getters.tag.label;
    // let i18n = store.getters.tag.meta.i18n;
    // title = router.$avueRouter.generateTitle(title, i18n)
    // // 根据当前的标签也获取label的值动态设置浏览器标题
    // router.$avueRouter.setTitle(title);
});