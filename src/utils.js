const len = (string) => string.length

const isLetter = (string) => /[a-zA-Z]/.test(string)

const capitalizeSingleWord = (value) => {
  if (len(value) === 1 && isLetter(value)) return value.toUpperCase()

  if (len(value) === 1 && !isLetter(value)) return value

  if (!isLetter(value[0]) && len(value) === 2) {
    return value[0] + value[1].toUpperCase()
  }

  if (!isLetter(value[0]) && len(value) > 2) {
    return value[0] + value[1].toUpperCase() + value.slice(2).toLowerCase()
  }

  return value[0].toUpperCase() + value.slice(1).toLowerCase()
}

const capitalize = (value) => {
  return value
    .split(' ')
    .map((str) => capitalizeSingleWord(str))
    .join(' ')
}

module.exports = {
  capitalize,
  isOneLetter
}
