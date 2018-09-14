const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @router  GET api/profiles/test
// @desc    Test profiles routes
// @access  Public
router.get("/testprofile", () => res.json({ name: "profile" }));

// @router  GET api/profiles
// @desc    Get current user profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      Profile.findOne({ user: req.user.id })
        .populate("user", ["name", "avatar"])
        .then(profile => {
          if (!profile) {
            return res.status(404).json({ error: "Profile Not Found" });
          }
          res.send(profile);
        })
        .catch(err =>
          res.status(500).json({ error: " INternal Server Error" })
        );
    } catch (error) {
      res.status(500).json({ error: " Internal Server Error" });
    }
  }
);

// @router  POST api/profiles/
// @desc    Create or update user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      let profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.handle) profileFields.handle = req.body.handle;
      if (req.body.company) profileFields.company = req.body.company;
      if (req.body.website) profileFields.website = req.body.website;
      if (req.body.bio) profileFields.bio = req.body.bio;
      if (req.body.location) profileFields.location = req.body.location;
      if (req.body.status) profileFields.status = req.body.status;
      if (req.body.githubusername)
        profileFields.handle = req.body.githubusername;
      //skills
      console.log("TYPE OFFF", typeof req.body.skills);
      if (typeof req.body.skills === undefined) {
        console.log("IFFFFF");
        profileFields.skills = null;
      } else {
        profileFields.skills = req.body.skills.split(",");
      }
      //Social
      profileFields.social = {};

      if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
      if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
      if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
      if (req.body.instagram)
        profileFields.social.instagram = req.body.instagram;

      Profile.findOne({ user: req.user.id })
        .then(profile => {
          if (profile) {
            //update
            Profile.findOneAndUpdate(
              { user: req.user.id },
              { $set: profileFields },
              { new: true }
            )
              .then(updatedProfile => {
                res.send(updatedProfile);
              })
              .catch(error =>
                res.status(400).json({ error: "Some fields are required" })
              );
          } else {
            //create
            Profile.findOne({ handle: req.body.handle }).then(profile => {
              if (profile) {
                res.status(400).json({ error: "Handle Already Exists" });
              } else {
                new Profile(profileFields)
                  .save()
                  .then(profile => res.send(profile))
                  .catch(error => res.status(400).json({ error: error }));
              }
            });
          }
        })
        .catch(error => res.status(400).json({ error: "SOME ERROR" }));
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// @router  GET api/profiles/handle/:handle
// @desc    Get user profile by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  try {
    Profile.findOne({ handle: req.params.handle })
      .populate("users", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          res.status(404).json({ error: "Profile Not found" });
        }
        res.json(profile);
      })
      .catch(error => res.status(500).json({ error: "Internal Server Error" }));
  } catch (error) {
    res.status(500).send(error);
  }
});

// @router  GET api/profiles/user/:user_id
// @desc    Get user profile by user id
// @access  Public
router.get("/user/:user_id", (req, res) => {
  try {
    Profile.findOne({ user: req.params.user_id })
      .populate("users", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          res.status(404).json({ error: "Profile Not found" });
        }
        res.json(profile);
      })
      .catch(error => res.status(500).json({ error: "Internal Server Error" }));
  } catch (error) {
    res.status(500).send(error);
  }
});

// @router  GET api/profiles/all
// @desc    Get all user profiles
// @access  Public
router.get("/all", (req, res) => {
  try {
    Profile.find()
      .populate("user", ["name", "avatar"])
      .then(profiles => {
        if (!profiles)
          return res.status(404).json({ error: "There area no profiles" });
        res.send(profiles);
      })
      .catch(error => res.status(500).json({ error: "Internal Server Error" }));
  } catch (error) {
    res.status(500).json({ error: "INternal Server Error" });
  }
});

// @router  POST api/profiles/experience
// @desc    Add experience
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      Profile.findOne({ user: req.user.id })
        .then(profile => {
          const exp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
          };

          // Add to experience array
          profile.experience.unshift(exp);

          profile
            .save()
            .then(profile => res.json(profile))
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        })
        .catch(err => res.status(500).json(err));
    } catch (error) {
      res.status(500).json({ error: "INternal Server Error" });
    }
  }
);

// @router  POST api/profiles/education
// @desc    Add education
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      Profile.findOne({ user: req.user.id })
        .then(profile => {
          const edu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldOfStudy: req.body.fieldOfStudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
          };

          // Add to experience array
          profile.education.unshift(edu);

          profile
            .save()
            .then(profile => res.json(profile))
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        })
        .catch(err => res.status(500).json(err));
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// @router  DELETE api/profiles/experience/:exp_id
// @desc    DELETE experience
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      Profile.findOne({ user: req.user.id })
        .then(profile => {
          const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);
          profile.experience.splice(removeIndex, 1);

          profile
            .save()
            .then(profile => res.send(profile))
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(500).json(err));
    } catch (error) {
      res.status(500).json({ error: "INternal Server Error" });
    }
  }
);

// @router  DELETE api/profiles/education/:edu_id
// @desc    DELETE education
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      Profile.findOne({ user: req.user.id })
        .then(profile => {
          const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(req.params.exp_id);
          profile.education.splice(removeIndex, 1);

          profile
            .save()
            .then(profile => res.send(profile))
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(500).json(err));
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// @router  DELETE api/profiles
// @desc    DELETE user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: true }),
  (req, res) => {
    try {
      Profile.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findOneAndRemove({ _id: req.user.id })
          .then(user => {
            res.send(user);
          })
          .catch(err => {
            res.status(500).json({ error: "Internal Server Error" });
          })
          .catch(error => {
            res.status(500).json({ error: "Internal Server Error" });
          });
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
