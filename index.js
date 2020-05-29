require('dotenv').config()
const express = require('express')
require('express-async-errors')

const { dbConnect } = require('./src/model')
const controller = require('./src/controller')
const blocker = require('./src/blocker')

const PORT = process.env.PORT || 3333

dbConnect()
const app = express()

app.set('view engine', 'ejs')
app.use('/public', express.static('assets'))
app.use(express.json())
app.use(express.urlencoded())

app.get('/create', blocker, controller.getCreatePage)
app.post('/create', blocker, controller.createPage)
app.get('/', controller.getIndexPage)
app.post('/', controller.indexPage)

app.use((_, res, __) => {
  return res.render('404')
})

app.use((_, req, res, __) => {
  console.log(_)
  return res.render(`${req.path.slice(1)}`, {
    message: {
      text: 'An error seemed to have occurred, please try again.',
      class: 'failed'
    }
  })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
