const router = require('express').Router();
const user = require('../Controller/UserLoginRegistration');
const { fireBaseUpload } = require('../Middleware/ImageUploade');
const { protect } = require('../Middleware/Protect');

router.post('/registration', fireBaseUpload, user.userRegistration);
router.post('/login', user.userAuth);
router.get('/isLogin', protect, user.isLogin);
// router.get('/logOut', protect, user.userLogOut);
module.exports = router;
