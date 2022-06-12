const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');

router.get('/chamada-video', adminAuth.authenticate, (req, res) => {
    res.render('metting');
});

module.exports = router;