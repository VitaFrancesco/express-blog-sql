const express = require('express');
const router = express.Router();

const postsController = require('../controllers/controllerPosts');
const validateObj = require('../middleware/validateObj');

// index
router.get('/', postsController.index);

// show
router.get('/:id', postsController.show);

// store
router.post('/', validateObj, postsController.store);

// update
router.put('/:id', validateObj, postsController.update);

// modify
router.patch('/:id', postsController.modify);

// destroy
router.delete('/:id', postsController.destroy);

module.exports = router;