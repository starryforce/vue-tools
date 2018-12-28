export default [
  {
    path: '/',
    redirect: '/home/workbench',
  },
  {
    path: 'home',
    name: 'home',
    redirect: '/home/workbench',
  },
  {
    path: '/home/member/:scene',
    name: 'home-member',
    props: true,
    meta: {
      showMainNav: true,
    },
    component: () => lazyLoadView(import('@views/HomeMember')),
  },
  {
    path: '/home/activity',
    meta: {
      showMainNav: true,
    },
    component: () => lazyLoadView(import('@views/HomeActivity')),
    children: [
      {
        path: '',
        redirect: {
          name: 'home-activity-online',
        },
      },
      {
        path: 'online',
        name: 'home-activity-online',
        meta: {
          showMainNav: true,
        },
        component: () => lazyLoadView(import('@views/Activity/ActivityOnline')),
      },
      {
        path: 'offline',
        name: 'home-activity-offline',
        meta: {
          showMainNav: true,
        },
        component: () =>
          lazyLoadView(import('@views/Activity/ActivityOffline')),
      },
    ],
  },
  {
    path: '/activity/online/detail',
    name: 'activity-online-detail',
    meta: {
      showMainNav: true,
    },
    component: () =>
      lazyLoadView(import('@views/Activity/ActivityOnlineDetail')),
  },
  {
    path: '/activity/offline/detail/:id',
    name: 'activity-offline-detail',
    meta: {
      showMainNav: true,
    },
    props: true,
    component: () =>
      lazyLoadView(import('@views/Activity/ActivityOfflineDetail')),
  },
  {
    path: '/home/workbench',
    name: 'home-workbench',
    meta: {
      showMainNav: true,
    },
    component: () => lazyLoadView(import('@views/HomeWorkbench')),
  },
  {
    path: '/limit/manage',
    name: 'limit-manage',
    component: () => lazyLoadView(import('@views/LimitManage/LimitManage')),
  },
  {
    path: '/home/order',
    meta: {
      showMainNav: true,
    },
    component: () => lazyLoadView(import('@views/HomeOrder')),
    children: [
      {
        path: '',
        redirect: {
          name: 'home-order-statistics',
        },
      },
      {
        path: 'statistics',
        name: 'home-order-statistics',
        meta: {
          showMainNav: true,
        },
        component: () => lazyLoadView(import('@views/OrderStatistics')),
      },
      {
        path: 'return',
        name: 'home-order-return',
        meta: {
          showMainNav: true,
        },
        component: () => lazyLoadView(import('@views/OrderReturn/OrderReturn')),
      },
      {
        path: 'pickup',
        name: 'home-order-pickup',
        meta: {
          showMainNav: true,
        },
        component: () => lazyLoadView(import('@views/OrderPickUp')),
      },
    ],
  },
  {
    path: '/order/detail/:orderID',
    name: 'order-detail',
    meta: {},
    props: true,
    component: () => lazyLoadView(import('@views/OrderDetail')),
  },
  {
    path: '/join/vip/:memberID',
    name: 'join-vip',
    meta: {},
    props: true,
    component: () => import('@views/JoinVip'),
  },
  {
    path: '/order/create',
    name: 'order-create',
    meta: {},
    component: () => import('@views/OrderCreate/OrderCreate'),
  },
  {
    path: '/order/checkout/:orderID',
    name: 'order-checkout',
    meta: {},
    props: true,
    component: () => import('@views/OrderCheckout'),
  },
  {
    path: '/order/returnCreate/:orderID?',
    name: 'order-return-create',
    meta: {},
    props: true,
    component: () => import('@views/OrderReturn/OrderReturnCreate'),
  },
  {
    path: '/order/return/detail/:id',
    name: 'order-return-detail',
    meta: {},
    props: true,
    component: () =>
      lazyLoadView(import('@views/OrderReturn/OrderReturnDetail')),
  },
  {
    path: '/order/pickup/detail/:orderID',
    name: 'order-pickup-detail',
    meta: {},
    props: true,
    component: () => lazyLoadView(import('@views/OrderPickUpDetail')),
  },
  {
    path: '/home/my',
    name: 'home-my',
    meta: {
      showMainNav: true,
    },
    component: () => lazyLoadView(import('@views/HomeMy')),
  },
  {
    path: '/my/statistics',
    name: 'my-statistics',
    meta: {},
    component: () => lazyLoadView(import('@views/MyStatistics')),
  },
  {
    path: '/member/face/:id',
    name: 'member-face',
    meta: {},
    props: true,
    component: () => lazyLoadView(import('@views/MemberFace')),
  },
  {
    path: '/member/today',
    name: 'member-today',
    meta: {},
    props: true,
    component: () => lazyLoadView(import('@views/MemberToday')),
  },
  {
    path: '/face/list/:id',
    name: 'face-list',
    meta: {},
    props: true,
    component: () => lazyLoadView(import('@views/FaceList')),
  },
  {
    path: '/member/label',
    name: 'member-label',
    meta: {},
    component: () => lazyLoadView(import('@views/MemberLabel')),
  },
  {
    path: '/add/credit/:memberID',
    name: 'add-credit',
    meta: {},
    props: true,
    component: () => lazyLoadView(import('@views/AddCredit')),
  },
  {
    path: '/item/center',
    name: 'item-center',
    props: true,
    meta: {},
    component: () => lazyLoadView(import('@views/ItemCenter/ItemCenter')),
  },
  {
    path: '/item/baskets',
    name: 'item-baskets',
    meta: {},
    component: () => lazyLoadView(import('@views/ItemCenter/ItemBaskets')),
  },
  {
    path: '/address/manage/:memberID',
    name: 'address-manage',
    meta: {},
    props: true,
    component: () => lazyLoadView(import('@views/AddressManage')),
  },
  {
    path: '/address/edit',
    name: 'address-edit',
    meta: {},
    props: route => {
      return {
        addressInfo: route.params.addressInfo,
      }
    },
    component: () => lazyLoadView(import('@views/AddressEdit')),
  },
  {
    path: '/address/add/:memberID',
    name: 'address-add',
    meta: {},
    props: true,
    component: () => lazyLoadView(import('@views/AddressEdit')),
  },
  {
    path: '/member/label/edit/:id',
    name: 'member-label-edit',
    meta: {},
    props: route => {
      return {
        id: route.params.id,
      }
    },
    component: () => lazyLoadView(import('@views/MemberLabelModify')),
  },
  {
    path: '/member/information/:id',
    name: 'member-information',
    props: true,
    meta: {},
    component: () =>
      lazyLoadView(import('@views/MemberInformation/MemberInformation')),
  },
  {
    path: '/member/coupon/:memberID',
    name: 'member-coupon',
    props: true,
    meta: {},
    component: () =>
      lazyLoadView(import('@views/MemberInformation/MemberCoupon')),
  },
  {
    path: '/member/point/:memberID',
    name: 'member-point',
    props: true,
    meta: {},
    component: () =>
      lazyLoadView(import('@views/MemberInformation/MemberPoint')),
  },
  {
    path: '/member/balance/:memberID',
    name: 'member-balance',
    props: true,
    meta: {},
    component: () =>
      lazyLoadView(import('@views/MemberInformation/MemberBalance')),
  },
  {
    path: '/404',
    name: '404',
    component: require('@views/Common/_404').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
]

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require('@views/Common/_loading').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require('@views/Common/_timeout').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}
