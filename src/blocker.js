module.exports = (req, res, next) => {
  if (
    process.env.REJECTED_HOSTS &&
    (process.env.REJECTED_HOSTS != null || process.env.REJECTED_HOSTS != '') &&
    req.host === process.env.REJECTED_HOSTS
  ) {
    return res.redirect('/')
  }
  next()
}
