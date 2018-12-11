import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
import NoMore from '@components/NoMore'

Vue.use(InfiniteLoading, {
  slots: {
    // keep default styles
    noResults: '没有数据',
    // remove default styles
    noMore: NoMore,
  },
})
