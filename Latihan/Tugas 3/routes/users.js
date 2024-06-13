const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/users', (req, res, next) => {
    res.sendFile(path.join(require.main.path, 'views', 'users.html'));
})

module.exports = router;