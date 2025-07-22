const router = require('express').Router();
const { statsController } = require('../controllers/statsController.js');
const { adminStatsController } = require('../controllers/statsController.js');
const { adminAuth } = require('../middleware/auth.js');



router.get('/', statsController);
router.get('/admin',adminAuth, adminStatsController);



module.exports = router;
  