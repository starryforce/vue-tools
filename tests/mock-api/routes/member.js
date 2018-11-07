const Member = require('../resources/member')
const Label = require('../resources/label')

module.exports = app => {
  app.post('/api/member/GetMemberList', (request, response) => {
    response.json({
      code: 200,
      msg: 'ok',
      data: Member.all,
    })
  })
  app.post('/api/member/GetMemberInformation', (request, response) => {
    response.json({
      code: 200,
      msg: 'ok',
      data: Member.findBy('id', request.body.id),
    })
  })
  app.post('/api/member/GetLabelList', (request, response) => {
    response.json({
      code: 200,
      msg: 'ok',
      data: Label.all,
    })
  })
}
