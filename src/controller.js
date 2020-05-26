const { Model, capitalize } = require('./model')

module.exports = {
  getCreatePage: (req, res) => {
    return res.status(200).render('create')
  },

  createPage: async (req, res) => {
    const { title, category, year, minister } = req.body

    if (title === '') {
      return res.render('create', {
        message: {
          text: 'Title can not be empty',
          class: 'failed'
        }
      })
    }

    const newMessage = Model({ title, category, year, minister })

    await newMessage.save()

    return res.status(200).render('create', {
      message: {
        text: 'Successfully added a new message',
        class: 'success'
      }
    })
  },

  getIndexPage: async (req, res) => {
    const messages = await Model.find({})

    return res.status(200).render('index', {
      messages: messages || [],
      title: ''
    })
  },

  indexPage: async (req, res) => {
    const { title, category, year, minister } = req.body

    const query = {}

    if (title) query.title = new RegExp(`.*${isOneLetter(title) ? title : capitalize(title)}.*`)
    if (category) query.category = category
    if (year) query.year = year
    if (minister) query.minister = minister

    const messages = await Model.find(query)

    return res.render('index', {
      messages: messages || [],
      title
    })
  }
}

const isOneLetter = (string) => string.length === 0
