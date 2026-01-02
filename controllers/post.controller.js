const Post = require('../models/post.model');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user.id
    });

    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
exports.getPaginatedPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const total = await Post.countDocuments();

    const posts = await Post.find()
      .populate('author', 'username email') // optional
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      count: posts.length,
      posts
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};exports.toggleLikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes.pull(userId); // unlike
    } else {
      post.likes.push(userId); // like
    }

    await post.save();

    res.json({
      message: alreadyLiked ? 'Post unliked' : 'Post liked',
      likesCount: post.likes.length,
      liked: !alreadyLiked
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
exports.getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Post.countDocuments({ author: userId });

    const posts = await Post.find({ author: userId })
      .populate('author', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      userId,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      count: posts.length,
      posts
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
