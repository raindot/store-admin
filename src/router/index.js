import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    meta: {
      needLogin: false
    }
  },
  {
    path: '/',
    component: () => import('../views/Layout.vue'),
    meta: {
      needLogin: false
    },
    children: [
      {
        path: 'products',
        name: 'products',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/ProductList.vue'),
        meta: {
          needLogin: false
        }
      },
      // {
      //   path: '',
      //   name: 'home',
      //   component: () => import('../views/Home.vue'),
      //   meta: {
      //     needLogin: false
      //   }
      // },
      // {
      //   path: 'about',
      //   component: () => import('../views/About.vue'),
      //   meta: {
      //     needLogin: false
      //   }
      // },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/Cart.vue'),
        meta: {
          needLogin: false
        }
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('../views/Order.vue'),
        meta: {
          needLogin: false
        }
      },
      {
        path: 'product-detail/:id',
        component: () => import('../views/ProductDetail.vue'),
        props: true,
        meta: {
          needLogin: false
        }
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      needLogin: true
    },
    // beforeEnter(to, from, next) {
    //   checkLogin().then((res) => {
    //     console.log('beforeEnter', res);
    //     next();
    //   }).catch((err) => {
    //     console.log(err);
    //     next({
    //       name: 'Login',
    //       query: { redirect: to.fullPath },
    //     });
    //   });
    // },
    children: [
      {
        path: 'products',
        name: 'products-admin',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductsAdmin.vue'),
        meta: {
          needLogin: true
        }
      },
      {
        path: 'order-list',
        name: 'order-list',
        component: () => import('../views/OrderList.vue'),
        meta: {
          needLogin: true
        }
      },
      {
        path: 'coupon-list',
        name: 'coupon-list',
        component: () => import('../views/CouponList.vue'),
        meta: {
          needLogin: true
        }
      },
      {
        path: 'file-list',
        name: 'file-list',
        component: () => import('../views/FileList.vue'),
        meta: {
          needLogin: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
