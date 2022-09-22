const fs = require("fs");
const path = require("path");

function isGod(req, res, next) {
  try {

    if (req.dataToken.role === 'God') {
      next();
    } else {
      return res.status(403).json({
        status: "error",
        msg: "No puedes acceder sin permisos 'God'.",
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: "error",
      error,
    });
  }
}

module.exports = isGod;
