const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

const User = require('../../models/User');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + '-' + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage });

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
  '/',
  // upload.single('image'),
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    // const file = req.file;
    // if (!file) {
    //   const error = new Error('Please upload a file');
    //   console.log(file);
    //   error.httpStatusCode = 400;
    //   return next(error);
    // }
    // const img = fs.readFileSync(req.file.path);
    // const encode_image = img.toString('base64');
    // // define a JSON object for the image
    // const finalImg = {
    //   contentType: req.file.mimetype,
    //   path: req.file.path,
    //   image: new Buffer(encode_image, 'base64'),
    // };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      user = new User({
        name,
        email,
        password,
        // image: finalImg,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      res.send('User Registered');
    } catch (err) {}
  }
);

module.exports = router;
