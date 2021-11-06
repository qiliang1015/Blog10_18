const express = require('express')
const router = express.Router();
const db = require('../controllers/dbController')

router.get('/login', db.userLogin);

router.post('/register', db.userRegister);

module.exports = router;