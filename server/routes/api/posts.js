const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// @router  GET api/posts/test
// @desc    Test posts routes
// @access  Public
router.get("/testposts", () => res.json({ name: "posts" }));

// @router  POST api/posts/
// @desc    Create posts
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      const newpost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      });

      newpost
        .save()
        .then(post => res.json(post))
        .catch(err => {
          console.log(err);
          res.status(400).json({ error: "Unable to post" });
        });
    } catch (error) {
      console.log("***************************", error);
      res.status(500).json({ error: error });
    }
  }
);

// @router  GET api/posts/
// @desc    GET posts
// @access  Public
router.get("/", (req, res) => {
  try {
    Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(error => res.status(400).json({ error: "Unable to fetch Posts" }));
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// @router  GET api/posts/:id
// @desc    GET posts by id
// @access  Public
router.get("/:id", (req, res) => {
  try {
    Post.findById(req.params.id)
      .then(post => res.json(post))
      .catch(error => res.status(400).json({ error: "Unable to fetch Posts" }));
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// @router  DELETE api/posts/:id
// @desc    DELETE posts
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      Profile.findOne({ user: req.user.id })
        .then(profile => {
          //   res.json(profile);
          Post.findById(req.params.id).then(post => {
            if (post.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ error: "You are not authorized to delete post" });
            }
            post
              .remove()
              .then(() => {
                res.json({ success: true });
              })
              .catch(err => {
                res.status(400).json({ error: "Unable to delete post" });
              });
          });
        })
        .catch(err => {
          res.status(400).json({ error: error });
        });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

// @router  POST api/posts/like/:id
// @desc    Like and unlike post
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      Post.findById(req.params.id).then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          post.likes.splice(removeIndex, 1);
          post
            .save()
            .then(post => {
              return res.json(post);
            })
            .catch(err => {
              console.log("DISLIKE", err);
              return res.status(400).json({ error: "Unable to like Post" });
            });
        } else {
          post.likes.unshift({ user: req.user.id });
          post
            .save()
            .then(post => {
              return res.json(post);
            })
            .catch(err => {
              console.log("like", err);
              return res.status(400).json({ error: "Unable to dislike Post" });
            });
        }
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

// @router  POST api/posts/comment/:id
// @desc    Comment on post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("GOT YOU..!!");
    try {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };

      Post.findById(req.params.id)
        .then(post => {
          post.comments.unshift(newComment);
          post
            .save()
            .then(post => res.send(post))
            .catch(err =>
              res.status(400).json({ error: "Unable to postcomment" })
            );
        })
        .catch(err => res.status(400).json({ error: "Unable to find Post" }));
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

// @router  DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment on post
// @access  Private
router.delete(
  "/:post_id/comment/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        // Post not found
        if (!post) {
          return res.status(404).json({ postNotFound: "Post not found" });
        }
        // Get the comment to delete
        const commentToDelete = post.comments.find(
          comment => comment._id == req.params.comment_id
        );
        // Return 404 if not exist
        if (!commentToDelete) {
          return res
            .status(404)
            .json({ commentNotExits: "Comment does not exist" });
        }
        // Check if the user is the owner of the post or the comment
        if (post.user != req.user.id) {
          if (commentToDelete.user != req.user.id) {
            return res
              .status(401)
              .json({ canNotDeleteComment: "You can't delete this comment" });
          }
        }
        // Update the comments array with MongoDB's $pull operator
        post
          .update({ $pull: { comments: { _id: req.params.comment_id } } })
          .then(() => res.json({ deletedComment: "Comment deleted" }))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
