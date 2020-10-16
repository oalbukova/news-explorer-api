const checkPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || !password.trim()) {
    res.status(400)
      .send({ massage: 'Поле "password" должно быть заполнено' });
  } else {
    next();
  }
};

module.exports = checkPassword;
