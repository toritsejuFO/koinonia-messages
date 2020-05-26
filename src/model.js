const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    get: (value) => capitalize(value),
    set: (value) => capitalize(value)
  },
  category: {
    type: String,
    required: true
  },
  year: {
    type: String,
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
  capitalize
}
