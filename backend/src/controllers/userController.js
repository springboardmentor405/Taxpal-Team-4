exports.getProfile = async (req, res) => {

  res.json({
    id: req.user._id,
    fullName: req.user.fullName,
    email: req.user.email
  })

}