const express = require('express');
const multer = require('multer');
const catcontrollers = require('../controllers/catController');


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => {
    // console.log("got here")
    const ext = file.originalname.match(/\.\w+/);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

const router = express.Router();

router.get('/', catcontrollers.get_cats_page);
router.get('/cats', catcontrollers.get_cats);
router.post('/', upload.single('photo'), catcontrollers.post_cats);

module.exports = router;
