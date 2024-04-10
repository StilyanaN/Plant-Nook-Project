const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { postController } = require('../controllers');

// middleware that is specific to this router

router.get('/', postController.getAllPosts);
router.get('/:postId', postController.getOnePost);
router.post('/', auth(), postController.createPost);
// router.put('/:postId/', auth(), postController.like);
router.delete('/delete/:postId', auth(), postController.deletePost);
router.put('/:postId/edit', auth(), postController.editPost);
// router.get('/:userId',postController.getUserPosts);

module.exports = router