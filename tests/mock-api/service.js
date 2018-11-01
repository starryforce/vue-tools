const app = require('express')()

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  next()
})

require('../mock-api')(app)

app.listen(3000)
