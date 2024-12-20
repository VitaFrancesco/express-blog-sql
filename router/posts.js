const express = require('express');
const router = express.Router();
const postsArray = require('../posts');

const postsController = require('../controllers/controllerPosts');
const validateObj = require('../middleware/validateObj');


router.param('id', (req, res, next, id) => {
    const postId = parseInt(req.params.id);
    let post = postsArray.find((el) => el.id === postId);

    if (!post) {
        res.status(404);
        return res.json({
            error: "Not Found",
            messagge: "Post non trovato (middleware)"
        })
    };

    req.post = post;
    next();
});

// index
router.get('/', postsController.index);

// show
router.get('/:key', postsController.show);

// store
router.post('/', validateObj, postsController.store);

// update
router.put('/:id', validateObj, postsController.update);

// modify
router.patch('/:id', postsController.modify);

// destroy
router.delete('/:id', postsController.destroy);

module.exports = router;