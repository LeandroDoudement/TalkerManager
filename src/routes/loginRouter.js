const express = require('express');

const router = express.Router();

const generateToken = require('../utils/generateToken');

const {
  validateEmail,
  validatePassword,
} = require('../middlewares/loginValidation');

router.post('/', validateEmail, validatePassword, (req, res) => {
  try {
    return res.status(200).json({ token: generateToken() });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
