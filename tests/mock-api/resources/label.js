var Mock = require('mockjs')

module.exports = {
  all: Mock.mock({
    'data|10-20': [
      {
        id: '@guid',
        labelName: '@ctitle',
      },
    ],
  }),
}
