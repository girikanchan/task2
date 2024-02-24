const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser"); 
//router.use(bodyParser.json());


const loginController = require('../models/controllers/login');
const logoutController = require('../models/controllers/logout');
const registerController = require('../models/controllers/register');
const updateController = require('../models/controllers/update');
const postController = require('../models/controllers/post');
const addpostController = require('../models/controllers/addpost');
const likeController = require('../models/controllers/like');
const postCommentsController = require('../models/controllers/comments');
const seeCommentsController = require('../models/controllers/seepostComments');
const searchprofile = require('../models/controllers/searchUser');



const db = require('../models/db')
router.post('/login', loginController);
router.post('/logout', logoutController);
router.post('/register', registerController);
router.put('/update', updateController);
router.get('/post', postController);
router.post('/like', likeController);
router.post('/addpost', addpostController);
router.post('/comments/:postId', postCommentsController);
router.get('/searchprofile', searchprofile);
router.get('/seeComments', seeCommentsController);
module.exports = router;
