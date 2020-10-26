const router = require("express").Router();
const GetUserByUsernameRoute = require("./GetUserByUsername");
const GetUserPosts = require("./GetUserPosts");
const FollowUser = require("./FollowUser");
const UnfollowUser = require("./UnfollowUser");
const SearchUsers = require("./SearchUsers");
const IsFollowing = require("./IsFollowing");
const DeleteUser = require("./DeleteUser");
const UpdateUser = require("./UpdateUser");

router.use("/get-by-username", GetUserByUsernameRoute);
router.use("/get-user-posts", GetUserPosts);
router.use("/follow", FollowUser);
router.use("/unfollow", UnfollowUser);
router.use("/search", SearchUsers);
router.use("/is-following", IsFollowing);
router.use("/delete", DeleteUser);
router.use("/update", UpdateUser);

module.exports = router;