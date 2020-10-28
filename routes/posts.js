const express = require('express');
const router = express.Router();
let Post = require('../models/Post');
let User = require('../models/User');
const authentication = require('../middleware/authentication');
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    let posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

router.get('api/most_liked', async (req, res) => {
  try {
    // orders from most liked comment to least liked
    let posts = await Post.find().sort({ likes: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

router.get('/most_recent', async (req, res) => {
  try {
    let posts = await Post.find().sort({ createdAt: 1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

router.get('/most_comments', async (req, res) => {
  try {
    let posts = await Post.find().sort({ comments: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

router.get('/:post_id', async (req, res) => {
  try {
    let posts = await Post.findById(req.params.post_id);
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

router.get('/user_posts/:user_id', async (req, res) => {
  try {
    let posts = await Post.findById({ user: req.params.user_id });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

router.get('/user_posts', authentication, async (req, res) => {
  try {
    let posts = await Post.find();
    let userPosts = posts.filter(
      (post) => post.user.toString() === req.user.id.toString()
    );
    res.json(userPosts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

router.post(
  '/',
  authentication,
  [check('postText', 'Text is required!').not().isEmpty()],
  async (req, res) => {
    let { postText } = req.body;
    let errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      let user = await User.findById(req.user.id).select('-password');

      if (!user) return res.status(404).json('User not found');

      let newPost = new Post({
        postText,
        userName: user.userName,
        avatar: user.avatar,
        user: req.user.id,
      });

      await newPost.save();

      res.json('Post created');
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;
