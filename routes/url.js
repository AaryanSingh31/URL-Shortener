const express = require('express');
const router = express.Router();

const { handleGenNewShortUrl, handleRedirectUrl} = require('../controllers/url');


router.post('/', handleGenNewShortUrl);
router.get('/:shortId', handleRedirectUrl);

module.exports = router;