// const _ = require('lodash')
var Mock = require('mockjs')

module.exports = {
  all: Mock.mock({
    'data|6-10': [
      {
        id: '@guid',
        name: '@cname',
        nickname: '@first @last',
        avatar: '@image("120x60",@color, @color)',
        cardID: 'WX@integer(000000,999999)',
        mobile: '@integer(13000000000,19999999999)',
        registerTime: '@date',
        shop: '@county(true) 店',
        salesperson: '@cname',
        'tags|1-3': ['@ctitle(2,3)'],
        relationShip: '@cname',
        consumption: '@float(0,50000,0,2)',
        timesOfConsume: '@integer(0,20)',
        average: '@float(0,5000,0,2)',
        recentActivityDate: '@date',
        recentConsumeDate: '@date',
        points: '@integer(0,5000)',
        pointsRecord: '',
        coupons: {
          active: '@integer(0,20)',
          used: '@integer(0,20)',
          expired: '@integer(0,20)',
        },
        'orders|2-6': [
          {
            id: '@guid',
            orderTime: '@datetime',
            payment: '@float(0,5000,0,2)',
            'items|1-15': [
              {
                id: '@guid',
                cover: '@image("120x60",@color, @color)',
              },
            ],
          },
        ],
        'activities|1-7': [
          {
            id: '@guid',
            startTime: '@datetime',
            name: '@ctitle',
            shop: '@county(true) 店',
            cover: '@image("120x60",@color, @color)',
          },
        ],
      },
    ],
  }),
  findBy(propertyName, value) {
    const matchedMember = this.all.data.find(
      member => member[propertyName] === value
    )
    return matchedMember
  },
}
