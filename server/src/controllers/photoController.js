const router = require('express').Router();

const photoManager = require('../managers/photoManager');

const { getErrorMessage } = require('../utils/errorHelpers');

const {isAuth} = require('../middlewares/authMiddleware');


router.get('/photos', async (req, res) => {
    const photos = await photoManager.getAll();
    res.json(photos);
});


router.post('/create',isAuth, async (req, res) => {
    const photo = req.body.photoData;
    photo.owner = req.body.owner;

    try {
        const newPhoto = await photoManager.create(photo);
        res.send(newPhoto);
    } catch (err) {
        res.send({ error: getErrorMessage(err) });
    }
});

router.get('/details/:photoId', async (req, res) => {
    const photoId = req.params.photoId;
    const photo = await photoManager.getOne(photoId);
   res.json(photo);
});

router.post('/details/:photoId/edit',isAuth, async (req, res) => {
    const photo = req.body.photoData;
    photo.owner = req.body.owner;
    const photoId = req.params.photoId;
    

    try {
        await photoManager.update(photoId, photo);

        res.status(200).send({ok: true});
    } catch (err) {
        res.status(400).send({error: getErrorMessage(err)});
    }
});



router.delete('/details/:photoId/delete',isAuth, async (req, res) => {
    const photoId = req.params.photoId;
    try {
        await photoManager.delete(photoId);

        res.json({ok: true});
    } catch (err) {
        res.status(400).send({ error: 'Unsuccesful photo deletion!' });
    }
});



// router.post('/:photoId/comments',isAuth, async (req,res) => {
//     const photoId = req.params.photoId;
//     const {message} = req.body;
//     const user = req.user._id;

//     await photoManager.addComment(photoId, { user, message});
//     res.redirect(`/photos/${photoId}/details`);
// }); 
 

module.exports = router;