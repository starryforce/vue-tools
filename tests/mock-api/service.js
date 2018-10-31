const app = require('express')()
var cors = require('cors')

app.use(cors())

require('../mock-api')(app)

app.listen(3000, function() {})
