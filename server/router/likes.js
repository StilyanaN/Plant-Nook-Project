const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { postController } = require('../controllers');


router.post('/:postId/like', auth(), postController.like);
router.delete('/:postId/like/remove', auth(), postController.unlike);
router.get('/:postId/like/status',auth(), postController.getLikeStatus);

module.exports = router
