


export const verifyAdmin = (req, res, next) => {
  if (req.role !== 'admin') {
    res
      .status(403)
      .json({
        status: 'fail',
        message: 'you are not authorized to perform this action',
      })
  }

  next()
}
