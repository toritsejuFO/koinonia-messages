const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const home = 'koinoniaglobal.org'
const categories = [
  {
    name: 'SPIRITUAL GROWTH AND TRANSFORMATION',
    link: `${home}/category/#1567064172760-99b48f2d-a370`
  },
  {
    name: 'PURPOSE AND DESTINY',
    link: `${home}/category/#1567064172777-c8eaf265-86b0`
  },
  {
    name: 'BUSINESS, FINANCE AND KINGDOM ECONOMICS',
    link: `${home}/category/#1567064175111-543b36ba-7a64`
  },
  {
    name: 'RELATIONSHIP AND FAMILY LIFE',
    link: `${home}/category/#1567064188159-4301e35f-452e`
  },
  {
    name: 'LEADERSHIP, SUCCESS AND PERSONAL DEVELOPMENT',
    link: `${home}/category/#1567064190651-34682890-9fc2`
  },
  {
    name: 'PRAYER, FASTING AND SPIRITUAL EMPHASIS',
    link: `${home}/category/#1567064210913-e15e8b0c-18cd`
  },
  {
    name: 'MIRACLE SERVICES',
    link: `${home}/category/#1567064212387-198154d3-e3cf`
  }
]

const years = [
  { name: '2020', link: `${home}/downloads/#1580157942606-9fbd55f7-9295` },
  { name: '2019', link: `${home}/downloads/#1566982349248-4122a135-ed99` },
  { name: '2018', link: `${home}/downloads/#1566982348505-a8882bd9-ff29` },
  { name: '2017', link: `${home}/downloads/#1566982347767-61453079-08f0` },
  { name: '2016', link: `${home}/downloads/#1566982347091-8ca59fdc-6969` },
  { name: '2015', link: `${home}/downloads/#1566982345734-2d91c99c-905b` },
  { name: '2014', link: `${home}/downloads/#1566982343126-567ef199-31e3` },
  { name: '2013', link: `${home}/downloads/#1566982341655-05b59145-5088` },
  { name: '2012', link: `${home}/downloads/#1566982168421-a016a941-e3fe` },
  { name: '2011', link: `${home}/downloads/#1566982168409-1e3d0c6e-2bae` }
]

const Schema = mongoose
  .Schema(
    {
      title: {
        type: String,
        required: true,
        get: (value) => capitalize(value),
        set: (value) => capitalize(value)
      },
      category: {
        type: Object,
        required: true
      },
      year: {
        type: Object,
        required: true
      },
      minister: {
        type: String,
        required: true
      },
      createdAt: {
        type: String,
        default: Date.now
      }
    },
    {
      toObject: { virtuals: true },
      toJSON: { virtuals: true }
    }
  )
  .plugin(mongoosePaginate)

Schema.virtual('categoryLink', {
  localField: 'categoryLink',
  foreignField: 'category'
}).get(function () {
  let link = ''
  categories.forEach((category) => {
    if (category.name === this.category) link = category.link
  })
  return link
})

Schema.virtual('yearLink', {
  localField: 'yearLink',
  foreignField: 'minister'
}).get(function () {
  let link = ''
  years.forEach((year) => {
    if (year.name === this.year) link = year.link
  })
  return link
})

const Model = mongoose.model('Model', Schema)

const capitalize = (value) => {
  return value
    .split(' ')
    .map((str) => capitalizeSingleWord(str))
    .join(' ')
}

const capitalizeSingleWord = (value) => {
  return value[0].toUpperCase() + value.slice(1).toLowerCase()
}

module.exports = {
  dbConnect: () => {
    console.log('MONGODB CONNECTION: connecting...')
    mongoose
      .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      .then(() => {
        console.log('MONGODB CONNECTION: successful')
      })
      .catch(() => {
        console.log('MONGODB CONNECTION: failed')
      })
  },
  Model,
  capitalize,
  categories,
  years
}
