const len = (string) => string.length

const isLetter = (string) => /[a-zA-Z]/.test(string)

articles = ['a', 'the', 'of', 'an', 'and', 'to', 'is', 'in']

const capitalizeSingleWord = (value, wordPosition) => {

  // non letter(s)
  if (!isLetter(value) && len(value) === 1) return value

  if (!isLetter(value[0]) && len(value) === 2) {
    return value[0] + value[1].toUpperCase()
  }

  if (!isLetter(value[0]) && len(value) > 2) {
    return value[0] + value[1].toUpperCase() + value.slice(2).toLowerCase()
  }

  // letter(s)
  if ((len(value) === 1 || articles.includes(value.toLowerCase())) && wordPosition > 0) return value.toLowerCase()

  return value[0].toUpperCase() + value.slice(1).toLowerCase()
}


const capitalize = (value) => {
  return value
    .split(' ')
    .map((str, index) => capitalizeSingleWord(str, index))
    .join(' ')
}

module.exports = {
  capitalize
}
