import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router);

import Layout from '@/layout'
// import NavTest from './modules/nav-test'
import {Message} from 'element-ui'
import getTitle from '@/utils/getTitle'

/**
 * 路由相关属性说明
 * hidden: 当设置hidden为true时，意思不在sideBars侧边栏中显示
 * mete{
 * title: xxx,  设置sideBars侧边栏名称
 * icon: xxx,  设置ideBars侧边栏图标
 * noCache: true  当设置为true时不缓存该路由页面
 * }
 */

/*通用routers*/
export const currencyRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login'),
        meta: {title: '登录页'},
        hidden: true
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue'),
        hidden: true
    },
    {
        path: '/',
        name: 'Home',
        component: Layout,
        redirect: '/dashbord',
        children: [
            {
                path: 'dashbord',
                name: 'Dashbord',
                component: () => import('@/views/dashboard'),
                meta: {title: '首页', icon: 'el-icon-s-data'}
            }
        ]
    },
    // {
    //     path: '/personal',
    //     name: 'Personal',
    //     component: Layout,
    //     redirect: '/personal/index',
    //     hidden: true,
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'Personal-index',
    //             component: () => import('@/views/personal'),
    //             meta: {title: '个人中心'}
    //         }
    //     ]
    // },
];
/*动态添加routers*/
let provinces = [
    '湖北省', '香港', '台湾', '北京市', '上海市', '广东省', '福建省', '澳门', '浙江省', '天津市', '内蒙古自治区', '甘肃省', '山东省', '江苏省', '四川省', '陕西省',
    '云南省', '河南省', '河北省', '重庆市', '黑龙江省', '广西壮族自治区', '山西省', '辽宁省', '吉林省', '江西省', '湖南省', '安徽省', '海南省', '贵州省', '新疆维吾尔自治区',
    '宁夏回族自治区', '青海省', '西藏自治区'
];
let proArr = [];
for (let item of provinces) {
    let obj = {
        path: `/${item}`,
        component: Layout,
        name: `${item}`,
        redirect: `/${item}/city`,
        meta: {icon: 'el-icon-map-location', title: `${item}`},
        children: [
            {
                path: 'overall',
                name: 'overall',
                component: () => import(`@/views/${item}/overall`),
                meta: {title: '历史数据'}
            },
            {
                path: 'city',
                name: 'city',
                component: () => import(`@/views/${item}/city`),
                meta: {title: '城市疫情'}
            },
        ]
    };
    proArr.push(obj);
}
let basicRoutes = [
    {
        path: '/table',
        name: 'Table',
        redirect: '/table/base-table',
        component: Layout,
        meta: {
            title: 'Table',
            icon: 'el-icon-table iconfont'
        },
        children: [
            {
                path: 'base-table',
                name: 'BaseTable',
                component: () => import('@/views/table/common-table'),
                meta: {title: '普通表格'}
            },
            {
                path: 'complex-table',
                name: 'ComplexTable',
                component: () => import('@/views/table/complex-table'),
                meta: {title: '复杂表格'}
            }
        ]
    },
    {
        path: '/icons',
        component: Layout,
        name: 'Icons',
        redirect: '/icons/index',
        children: [
            {
                path: 'index',
                name: 'Icons-index',
                component: () => import('@/views/icons'),
                meta: {title: 'Icons图标', icon: 'el-icon-map-location'}
            }
        ]
    },
    {
        path: '/components',
        component: Layout,
        name: 'Components',
        redirect: '/components/slide-yz',
        meta: {icon: 'el-icon-coin', title: '部分组件'},
        children: [
            {
                path: 'slide-yz',
                name: 'Sldie-yz',
                component: () => import('@/views/components/slide-yz'),
                meta: {icon: 'el-icon-s-claim', title: '滑动验证'}
            },
            {
                path: 'upload',
                name: 'Upload',
                component: () => import('@/views/components/pushImg'),
                meta: {icon: 'el-icon-upload', title: '上传图片'}
            },
            {
                path: 'carousel',
                name: 'Carousel',
                component: () => import('@/views/components/carousel'),
                meta: {icon: 'el-icon-lunbo iconfont', title: '轮播'}
            }
        ]
    },
    {
        path: '/echarts',
        component: Layout,
        name: 'Echarts',
        redirect: '/echarts/slide-chart',
        meta: {icon: 'el-icon-s-marketing', title: 'Echarts'},
        children: [
            {
                path: 'slide-chart',
                name: 'Sldie-chart',
                component: () => import('@/views/echarts/slide-chart'),
                meta: {title: '滑动charts'}
            },
            {
                path: 'dynamic-chart',
                name: 'Dynamic-chart',
                component: () => import('@/views/echarts/dynamic-chart'),
                meta: {title: '切换charts'}
            },
            {
                path: 'map-chart',
                name: 'Map-chart',
                component: () => import('@/views/echarts/map-chart'),
                meta: {title: 'map'}
            }
        ]
    },
    {
        path: '/excel',
        component: Layout,
        name: 'Excel',
        redirect: '/excel-operate/excel-out',
        meta: {icon: 'el-icon-excel iconfont', title: 'Excel'},
        children: [
            {
                path: 'excel-out',
                name: 'Excel-out',
                component: () => import('@/views/excel-operate/excel-out'),
                meta: {title: 'Excel导出'}
            },
            {
                path: 'excel-in',
                name: 'Excel-in',
                component: () => import('@/views/excel-operate/excel-in'),
                meta: {title: 'Excel导入'}
            },
            {
                path: 'mutiheader-out',
                name: 'Mutiheader-out',
                component: () => import('@/views/excel-operate/mutiheader-out'),
                meta: {title: '多级表头导出'}
            }
        ]
    },
    {
        path: '/error',
        component: Layout,
        name: 'Error',
        redirect: '/error/404',
        children: [
            {
                path: '404',
                name: 'Page404',
                component: () => import('@/views/error-page/404'),
                meta: {title: '404', icon: 'el-icon-s-release'}
            }
        ]
    },
    // {
    //     path: '/nav-test',
    //     component: Layout,
    //     name: 'NavTest',
    //     meta: {title: '导航菜单测试', icon: 'el-icon-s-grid'},
    //     redirect: '/nav-test/nav1',
    //     children: [
    //         {
    //             path: 'nav1',
    //             name: 'Nav1',
    //             component: () => import('@/views/nav-test/nav1'),
    //             meta: {title: '菜单1', icon: 'el-icon-coffee'}
    //         },
    //         {
    //             path: 'nav2',
    //             name: 'Nav2',
    //             component: () => import('@/views/nav-test/nav2'),
    //             meta: {title: '菜单2', icon: 'el-icon-cherry'},
    //             redirect: '/nav-test/nav2/nav2-1',
    //             children: [
    //                 {
    //                     path: 'nav2-1',
    //                     name: 'Nav2-1',
    //                     component: () => import('@/views/nav-test/nav2/nav2-1'),
    //                     meta: {title: '菜单2-1'}
    //                 },
    //                 {
    //                     path: 'nav2-2',
    //                     name: 'Nav2-2',
    //                     component: () => import('@/views/nav-test/nav2/nav2-2'),
    //                     meta: {title: '菜单2-2'},
    //                     redirect: '/nav-test/nav2/nav2-2/nav2-2-1',
    //                     children: [
    //                         {
    //                             path: 'nav2-2-1',
    //                             name: 'Nav2-2-1',
    //                             component: () => import('@/views/nav-test/nav2/nav2-2/nav2-2-1'),
    //                             meta: {title: '菜单2-2-1', icon: 'el-icon-lollipop'}
    //                         },
    //                         {
    //                             path: 'nav2-2-2',
    //                             name: 'Nav2-2-2',
    //                             component: () => import('@/views/nav-test/nav2/nav2-2/nav2-2-2'),
    //                             meta: {title: '菜单2-2-2'}
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     path: '/2019ncov',
    //     component: Layout,
    //     name: '2019ncov',
    //     meta: {title: '社区疫情数据', icon: 'el-icon-s-grid'},
    //     children: [
    //         {
    //             path: '湖北省',
    //             name: '湖北省',
    //             component: () => import('@/views/2019ncov/湖北省'),
    //             meta: {title: '菜单2', icon: 'el-icon-cherry'},
    //             redirect: '/2019ncov/湖北省/nav2-1',
    //             children: [
    //                 {
    //                     path: 'city',
    //                     name: 'Nav2-1',
    //                     component: () => import('@/views/2019ncov/湖北省/city'),
    //                     meta: {title: 'city'}
    //                 },
    //                 {
    //                     path: 'overall',
    //                     name: 'Nav2-2',
    //                     component: () => import('@/views/2019ncov/湖北省/overall'),
    //                     meta: {title: '菜单2-2'},
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     path: 'https://github.com/gcddblue/vue-admin-webapp',
    //     name: 'Github',
    //     meta: {icon: 'el-icon-link', title: '项目链接'}
    // },
    // {
    //     path: '/nav-test',
    //     component: Layout,
    //     name: 'NavTest',
    //     meta: {title: '社区疫情数据', icon: 'el-icon-s-grid'},
    //     redirect: '/nav-test/nav1',
    //     children: [
    //         {
    //             path: 'nav1',
    //             name: 'Nav1',
    //             component: () => import('@/views/nav-test/nav1'),
    //             meta: {title: '菜单1', icon: 'el-icon-coffee'}
    //         },
    //         {
    //             path: 'nav2',
    //             name: 'Nav2',
    //             component: () => import('@/views/nav-test/nav2'),
    //             meta: {title: '菜单2', icon: 'el-icon-cherry'},
    //             redirect: '/nav-test/nav2/nav2-1',
    //             children: [
    //                 {
    //                     path: 'nav2-1',
    //                     name: 'Nav2-1',
    //                     component: () => import('@/views/nav-test/nav2/nav2-1'),
    //                     meta: {title: '菜单2-1'}
    //                 },
    //                 {
    //                     path: 'nav2-2',
    //                     name: 'Nav2-2',
    //                     component: () => import('@/views/nav-test/nav2/nav2-2'),
    //                     meta: {title: '菜单2-2'},
    //                 }
    //             ]
    //         }
    //     ]
    // },
    {
        path: '*',
        name: '*404',
        redirect: '/404',
        hidden: true
    }
];
let asyncRoutes = basicRoutes.concat(proArr);
export {asyncRoutes}
const router = new Router({
    routes: currencyRoutes,
    scrollBehavior() {
        return {x: 0, y: 0}
    }
});


// 解决addRoute不能删除动态路由问题
export function resetRouter() {
    const reset = creatRouter();
    router.matcher = reset.matcher
}

// 导航守卫
router.beforeEach(async (to, from, next) => {
    document.title = getTitle(to.meta.title);
    if (to.path === '/login') {
        next()
    } else {
        if (store.getters.token) {
            const hasRoles = store.getters.roles.length > 0;
            if (hasRoles) {
                next()
            } else {
                try {
                    const {roles} = await store.dispatch('user/_getInfo');
                    const addRoutes = await store.dispatch(
                        'permission/getAsyncRoutes',
                        roles
                    );
                    router.addRoutes(addRoutes);

                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({...to, replace: true})
                } catch (error) {
                    Message.error(error)
                }
            }
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    }
});
export default router
