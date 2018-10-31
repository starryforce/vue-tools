const Members = require('../resources/members')
const Labels = require('../resources/labels')

module.exports = app => {
  app.post('/api/member/GetMemberList', (request, response) => {
    response.json({
      code: 200,
      msg: 'ok',
      data: {
        data: Members.all,
      },
    })
  })
  app.post('/api/member/GetLabelList', (request, response) => {
    response.json({
      code: 200,
      msg: 'ok',
      data: {
        data: Labels.all,
      },
    })
  })
}
