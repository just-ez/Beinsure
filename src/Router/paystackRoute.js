const router = require('../core/routeConfig');
const paystack = require('../controller/paystack')
const hasToken = require('../core/userAuth')
router.post('/initializePayment', hasToken, paystack.initializePayment)

router.post('/verifyPayment', hasToken, paystack.verifyPayment )
module.exports = router