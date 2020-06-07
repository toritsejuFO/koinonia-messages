const { Model, categories, years, ministers } = require('./model')

module.exports = {
  getCreatePage: (_, res) => {
    return res.status(200).render('create', { categories, years, ministers })
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
        years,
        ministers
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
      years,
      ministers
    })
  },

  getIndexPage: async (req, res) => {
    const options = {
      limit: req.query.limit || 10,
      page: req.query.page || 1
      // sort: 'title'
    }
    const { title, category, year, minister } = req.query
    const query = {}

    if (title) query.title = new RegExp(title.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i')
    if (category) query.category = category
    if (year) query.year = year
    if (minister) query.minister = minister

    const docs = await Model.paginate(query, options)
    const paginationOptions = getPaginationOptions(docs)

    return res.status(200).render('index', {
      messages: docs.docs || [],
      paginationOptions,
      categories,
      years,
      ministers,
      searchParams: `title=${title || ''}&category=${category || ''}&year=${year || ''}&minister=${minister || ''}`
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
    if (title) query.title = new RegExp(title.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i')
    if (category) query.category = category
    if (year) query.year = year
    if (minister) query.minister = minister

    const docs = await Model.paginate(query, options)
    const paginationOptions = getPaginationOptions(docs)

    return res.render('index', {
      messages: docs.docs || [],
      paginationOptions,
      categories,
      years,
      ministers,
      searchParams: `title=${title || ''}&category=${category || ''}&year=${year || ''}&minister=${minister || ''}`
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
