const Member = require('../resources/member')
const Label = require('../resources/label')

module.exports = app => {
  app.post('/api/member/GetMemberList', (request, response) => {
    const { keyword } = request.body
    let data = Member.all
    if (keyword) {
      response.json({
        code: 200,
        msg: 'ok',
        data: { data: data.data.filter(item => item.name.includes(keyword)) },
      })
    } else {
      response.json({
        code: 200,
        msg: 'ok',
        data: data,
      })
    }
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
