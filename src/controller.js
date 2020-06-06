const { Model, categories, years } = require('./model')
const { capitalize } = require('./utils')

module.exports = {
  getCreatePage: (_, res) => {
    return res.status(200).render('create', { categories, years })
  },

  createPage: async (req, res) => {
    const { title, category, year, minister } = req.body

    if (title === '') {
      return res.render('create', {
        message: {
          text: 'Title can not be empty',
          class: 'failed'
        },
        categories,
        years
      })
    }

    const newMessage = Model({ title, category, year, minister })

    await newMessage.save()

    return res.status(201).render('create', {
      message: {
        text: 'Successfully added a new message',
        class: 'success'
      },
      categories,
      years
    })
  },

  getIndexPage: async (req, res) => {
    const options = {
      limit: req.query.limit || 10,
      page: req.query.page || 1
      // sort: 'title'
    }

    const docs = await Model.paginate({}, options)
    const paginationOptions = getPaginationOptions(docs)

    return res.status(200).render('index', {
      messages: docs.docs || [],
      paginationOptions,
      categories,
      years
    })
  },

  indexPage: async (req, res) => {
    const options = {
      limit: req.query.limit || 10,
      page: req.query.page || 1
      // sort: 'title'
    }
    const { title, category, year, minister } = req.body
    const query = {}

    // build query
    if (title) query.title = new RegExp(`.*${capitalize(title.trim())}.*`)
    if (category) query.category = category
    if (year) query.year = year
    if (minister) query.minister = minister

    const docs = await Model.paginate(query, options)
    const paginationOptions = getPaginationOptions(docs)

    return res.render('index', {
      messages: docs.docs || [],
      paginationOptions,
      categories,
      years
    })
  }
}

const getPaginationOptions = (docs) => {
  const paginationOptions = {}

  Object.keys(docs)
    .filter((key) => !['docs'].includes(key))
    .forEach((key) => (paginationOptions[key] = docs[key]))

  return paginationOptions
}
