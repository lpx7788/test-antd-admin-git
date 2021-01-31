
import router from './index'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from '../store'
const whiteList = ['/login'];//白名单
router.beforeEach((to, from, next) => {
    NProgress.start();
    let token = localStorage.getItem('omp-token')
    next()
    if (token) {
        if (to.path === '/login') { // 如果登录成功访问登录页跳转到主页
            next({
                path: '/',
            })
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch('GetInfo')
                    .then(response => {
                        let res = response.data
                        const roles = res && res.role
                        store.dispatch('GenerateRoutes', { roles }).then((res) => {
                            router.addRoutes(store.getters.addRouters)
                            const redirect = decodeURIComponent(from.query.redirect || to.path)
                            if (to.path === redirect) {
                                next({ ...to, replace: true })
                            } else {
                                next({ path: redirect })
                            }
                        })
                    })
                    .catch((err) => {
                        store.dispatch('Logout').then(() => {
                            next('/login');
                        })
                    })
            } else {
                next()
            }
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