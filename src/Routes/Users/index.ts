import { Router } from "express";
import GetUserByUsernameRoute from "./GetUserByUsername";
import GetUserPosts from "./GetUserPosts";
import FollowUser from "./FollowUser";
import UnfollowUser from "./UnfollowUser";
import IsFollowing from "./IsFollowing";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";
import GetUserById from "./GetUserById";

const router = Router();

router.use("/get-by-username", GetUserByUsernameRoute);
router.use("/get-user-posts", GetUserPosts);
router.use("/follow", FollowUser);
router.use("/unfollow", UnfollowUser);
router.use("/is-following", IsFollowing);
router.use("/delete", DeleteUser);
router.use("/update", UpdateUser);
router.use("/get-by-id", GetUserById);

export default router;
