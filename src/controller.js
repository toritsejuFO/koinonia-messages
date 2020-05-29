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
    const options = {
      limit: req.query.limit || 10,
      page: req.query.page || 1
    }

    const docs = await Model.paginate({}, options)
    const paginationOptions = getPaginationOptions(docs)

    return res.status(200).render('index', {
      messages: docs.docs || [],
      paginationOptions
    })
  },

  indexPage: async (req, res) => {
    const options = {
      limit: req.query.limit || 10,
      page: req.query.page || 1
    }
    const { title, category, year, minister } = req.body
    const query = {}

    // build query
    if (title) query.title = new RegExp(`.*${isOneLetter(title) ? title : capitalize(title)}.*`)
    if (category) query.category = category
    if (year) query.year = year
    if (minister) query.minister = minister

    const docs = await Model.paginate(query, options)
    const paginationOptions = getPaginationOptions(docs)

    return res.render('index', {
      messages: docs.docs || [],
      title,
      paginationOptions
    })
  }
}

const isOneLetter = (string) => string.length === 0

const getPaginationOptions = (docs) => {
  const paginationOptions = {}

  Object.keys(docs)
    .filter((key) => !['docs'].includes(key))
    .forEach((key) => (paginationOptions[key] = docs[key]))
  console.log(paginationOptions)

  return paginationOptions
}
