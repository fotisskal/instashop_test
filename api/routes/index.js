const ctrlLandmarks = require('../controllers/landmarks');
const ctrlUsers = require('../controllers/users');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

router.get('/landmarks', ctrlLandmarks.getSortedLandmarks);

router.get('/landmark/:id', ctrlLandmarks.getLandmark);

router.post('/login', ctrlUsers.loginUser);

router.post('/edit', upload.single('photo'), ctrlLandmarks.editContent);

module.exports = router;