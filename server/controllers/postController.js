const { userModel, postModel } = require("../models");

function newPost(title, category, image, description, userId, postId) {
  return postModel
    .create({ title, category, image, description, userId, postId })
    .then((post) => {
      return Promise.all([
        userModel.updateOne(
          { _id: userId },
          { $push: { posts: post._id }, $addToSet: { like: userId } }
        ),
        postModel.findByIdAndUpdate(
          { _id: postId },
          { $push: { posts: post._id }, $addToSet: { like: userId } },
          { new: true }
        ),
      ]);
    });
}

const getAllPosts = (req, res, next) => {
  const limit = Number(req.query.limit) || 0;

  postModel
    .find()
    .sort({ created_at: -1 })
    .limit(limit)
    .populate("userId")
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(next);
};

function createPost(req, res, next) {
  const { title, category, description, image } = req.body;
  const { _id: userId } = req.user;

  postModel
    .create({
      title,
      category,
      description,
      image,
      userId,
      likes: [],
    })
    .then((post) => {
      return userModel
        .updateOne({ _id: userId }, { $addToSet: { posts: post._id } })
        .then(() => post);
    })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch(next);
}



function editPost(req, res, next) {
  const { postId } = req.params;
  const { title, category, image, description } = req.body;
  const { _id: userId } = req.user;

  postModel
    .findOneAndUpdate(
      { _id: postId, userId },
      {
        title: title,
        category: category,
        image: image,
        description: description,
      },
      { new: true }
    )
    .then((updatedPost) => {
      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}


function deletePost(req, res, next) {
  const { postId } = req.params;
  const { _id: userId } = req.user;

  Promise.all([
    postModel.findOneAndDelete({ _id: postId, userId }),
    userModel.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } }),
  ])
    .then(([deletedOne, _, __]) => {
      if (deletedOne) {
        res.status(200).json(deletedOne);
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}


async function like(req, res, next) {
  const postId = req.params.postId;
  const userId = req.user._id;

  try {
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId }, $inc: { likesCount: 1 } },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
}

async function unlike(req, res, next) {
  const postId = req.params.postId;
  const userId = req.user._id;

  try {
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId }, $inc: { likesCount: -1 } },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};



async function getLikeStatus(req, res, next) {
  const { postId } = req.params;
  const userId = req.user._id; 
  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likes.includes(userId);

    res.status(200).json({ liked: isLiked });
  } catch (error) {
    next(error);
  }
};

async function getUserPosts(req, res, next) {
  const userId = req.user._id;

  try {
    const user = await userModel.findById(userId).populate('posts');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.posts || user.posts.length === 0) {
      return res.status(404).json({ message: 'User has no posts' });
    }
    res.status(200).json(user.posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    next(error);
  }
}


function getOnePost(req, res, next) {
  const { postId } = req.params;

  if (!postId) {
    return res.status(400).json({ message: "postId is required" });
  }




  postModel
  .findById(postId)
  .populate("userId")
  .then((post) => {
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  })
  .catch((error) => {
    console.error("Error populating userId:", error);
    next(error);
  });


}

module.exports = {
  getAllPosts,
  newPost,
  createPost,
  editPost,
  deletePost,
  like,
  unlike,
  getLikeStatus,
  getUserPosts,
  getOnePost,
};
