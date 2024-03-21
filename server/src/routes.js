const router = require('express').Router();

const userController = require('./controllers/userController');
const photoController = require('./controllers/photoController');

router.use('/users', userController);
router.use('/photos', photoController);
// router.get('*', (req,res) => {
//    res.redirect('/404');
// });


module.exports = router;