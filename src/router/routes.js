import store from '@state/store'

export default [
  {
    path: '/',
    redirect: '/home/workbench',
  },
  {
    path: '/home/member',
    name: 'home-member',
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
        redirect: { name: 'home-activity-online' },
      },
      {
        path: 'online',
        name: 'home-activity-online',
        meta: {
          showMainNav: true,
        },
        component: () => lazyLoadView(import('@views/ActivityOnline')),
      },
      {
        path: 'offline',
        name: 'home-activity-offline',
        meta: {
          showMainNav: true,
        },
        component: () => lazyLoadView(import('@views/ActivityOffline')),
      },
    ],
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
    path: '/home/order',
    meta: {
      showMainNav: true,
    },
    component: () => lazyLoadView(import('@views/HomeOrder')),
    children: [
      {
        path: '',
        redirect: { name: 'home-order-statistics' },
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
        component: () => lazyLoadView(import('@views/OrderReturn')),
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
    path: '/order/return/detail',
    name: 'order-return-detail',
    meta: {},
    component: () => lazyLoadView(import('@views/OrderReturnDetail')),
  },
  {
    path: '/order/return/confirm',
    name: 'order-return-confirm',
    meta: {},
    component: () => lazyLoadView(import('@views/OrderReturnDetail')),
  },
  {
    path: '/order/pickup/detail',
    name: 'order-pickup-detail',
    meta: {},
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
    path: '/member/label',
    name: 'member-label',
    meta: {},
    component: () => lazyLoadView(import('@views/MemberLabel')),
  },
  {
    path: '/member/label/add',
    name: 'member-label-add',
    meta: {},
    props: { mode: 'add' },
    component: () => lazyLoadView(import('@views/MemberLabelModify')),
  },
  {
    path: '/member/label/edit',
    name: 'member-label-edit',
    meta: {},
    props: { mode: 'edit' },
    component: () => lazyLoadView(import('@views/MemberLabelModify')),
  },
  {
    path: '/member/information/:id',
    name: 'member-information',
    props: true,
    meta: {},
    component: () => lazyLoadView(import('@views/MemberInformation')),
  },
  {
    path: '/login',
    name: 'login',
    component: () => lazyLoadView(import('@views/login')),
    beforeEnter(routeTo, routeFrom, next) {
      // If the user is already logged in
      if (store.getters['auth/loggedIn']) {
        // Redirect to the home page instead
        next({ name: 'home' })
      } else {
        // Continue to the login page
        next()
      }
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => lazyLoadView(import('@views/profile')),
    meta: {
      authRequired: true,
    },
    props: route => ({ user: store.state.auth.currentUser }),
  },
  {
    path: '/profile/:username',
    name: 'username-profile',
    component: () => lazyLoadView(import('@views/profile')),
    meta: {
      authRequired: true,
    },
    beforeEnter(routeTo, routeFrom, next) {
      store
        // Try to fetch the user's information by their username
        .dispatch('users/fetchUser', { username: routeTo.params.username })
        .then(user => {
          // Add the user to the route params, so that it can
          // be provided as a prop for the view component below.
          routeTo.params.user = user
          // Continue to the route.
          next()
        })
        .catch(() => {
          // If a user with the provided username could not be
          // found, redirect to the 404 page.
          next({ name: '404', params: { resource: 'User' } })
        })
    },
    // Set the user from the route params, once it's set in the
    // beforeEnter route guard.
    props: route => ({ user: route.params.user }),
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
    },
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('auth/logOut')
      const authRequiredOnPreviousRoute = routeFrom.matched.some(
        route => route.meta.authRequired
      )
      // Navigate back to previous page, or home as a fallback
      next(authRequiredOnPreviousRoute ? { name: 'home' } : { ...routeFrom })
    },
  },
  {
    path: '/404',
    name: '404',
    component: require('@views/404').default,
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
    loading: require('@views/loading').default,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require('@views/timeout').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
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
