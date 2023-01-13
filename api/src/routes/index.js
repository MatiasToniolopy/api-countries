const { Router } = require('express');
const countries = require('../controllers/countries.js')
const activity = require('../controllers/activity.js')

const router = Router();

// Configurar los routers
router.use('/countries', countries);
router.use('/activity', activity);


module.exports = router;
