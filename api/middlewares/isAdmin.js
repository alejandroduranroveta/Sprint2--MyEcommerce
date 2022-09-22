function isAdmin(req, res, next) {
  try {

    if (req.dataToken.role === 'Admin' || req.dataToken.role === 'God') {
      next();
    } else {
      return res.status(403).json({
        status: "error",
        msg: "No podes acceder sin permisos de administrador",
      });
    }

  } catch (error) {
    return res.status(500).json({
      status: "error",
      error,
    });
  }
}

module.exports = isAdmin;
