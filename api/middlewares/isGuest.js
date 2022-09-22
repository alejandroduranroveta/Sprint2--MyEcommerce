function isGuest(req,res,next) {
  try {

    if (req.dataToken.role === 'Guest' || req.dataToken.role === 'Admin' || req.dataToken.role === 'God') {
      next();

    }else{
      return res.status(403).json({
        status: 'error',
        msg: 'Al menos debes ser usuario "Guest"'
      });
    }

  } catch (error) {
    return res.status(500).json({
      status: "error",
      error,
    });
  }
}
module.exports = isGuest;
