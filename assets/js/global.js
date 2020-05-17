const messages = [document.querySelector('.failed') || null, document.querySelector('.success') || null]

const TIMEOUT = 5000

messages.forEach((message) => {
  if (message) {
    setTimeout(() => {
      message.remove()
    }, TIMEOUT)
  }
})
