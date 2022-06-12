const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');

router.get('/chat', adminAuth.authenticate, (req, res) => {
    res.render('chat');
})

module.exports = router;