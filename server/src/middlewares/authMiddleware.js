const jwt = require("../lib/jwt");
const photoManager = require("../managers/photoManager");
const { SECRET, TOKEN_KEY } = require("../config/config");

exports.auth = async (req, res, next) => {
  const token = req.cookies[TOKEN_KEY];

  if (token) {
    try {
      const decodedToken = await jwt.verify(token, SECRET);
      req.user = decodedToken;
      res.locals.user = decodedToken;
      res.locals.isAuthenticated = true;

      next();
    } catch (err) {
      res.clearCookie(TOKEN_KEY);

      res.redirect("/users/login");
    }
  } else {
    next();
  }
};

exports.isAuth = async (req, res, next) => {
    const token = req.cookies[TOKEN_KEY];
    const photoId = req.params.photoId;
    const decodedToken = await jwt.verify(token, SECRET);
    const userId = decodedToken._id;
    const photoData = await photoManager.getOne(photoId);
    const photoOwner = photoData.owner._id;

    if(userId != photoOwner){
        const error = new Error();
        error.status = 401;
        error.message = 'You are not authorized!';
        return next(error);
    }
    next();

};

exports.isOwner = async (req, res, next) => {
  const photoId = req.params.id;
  const photo = await photoManager.getOne(photoId);

  if (photo.owner._id == req.user?._id) {
    next();
  } else {
    return res.redirect("404");
  }
};
