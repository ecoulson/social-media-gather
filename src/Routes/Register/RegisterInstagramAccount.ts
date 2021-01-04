import requiresAuth from "../../Middleware/RequiresAuth";
import { Router } from "express";
import Post from "../../Schemas/Mongo/Post/PostModel";
import User from "../../Schemas/Mongo/User/UserModel";
import IUserDocument from "../../Schemas/Mongo/User/IUserDocument";
import container from "../../bootstrap";
import { IgApiClient } from "instagram-private-api";
import Types from "../../@Types/Types";

const router = Router();

router.get("/", async (req, res) => {
    res.json(await searchUsers(req.query.username as string));
});

async function searchUsers(username: string) {
    const ig = container.get<IgApiClient>(Types.InstagramAPIClient);
    const searchResults = await ig.search.users(username);
    return searchResults.map((user) => {
        return {
            username: user.username,
            id: user.pk,
            profilePicture: user.profile_pic_url
        };
    });
}

router.post("/", requiresAuth(), async (req, res) => {
    res.json(await registerAccount(req.user, req.body.id));
});

router.post("/add", requiresAuth(), async (req, res) => {
    const user = await User.findOne({ _id: req.body.userId });
    res.json(await registerAccount(user, req.body.id));
});

async function registerAccount(user: IUserDocument, instagramId: string) {
    const ig = container.get<IgApiClient>(Types.InstagramAPIClient);
    user.instagramId = instagramId;
    await user.save();
    const igUser = await ig.user.info(instagramId);
    const userFeed = ig.feed.user(instagramId);
    let count = 0;
    let page = await userFeed.items();
    while (count < igUser.media_count) {
        count += page.length;
        await Promise.all(
            page.map(async (post) => {
                if (post.media_type === 8) {
                    const doc = new Post({
                        type: "INSTAGRAM",
                        timeCreated: new Date(post.taken_at * 1000),
                        userId: user.id,
                        instagram: {
                            id: post.id,
                            takenAt: new Date(post.taken_at * 1000),
                            likes: post.like_count,
                            caption: getCaption(post),
                            media: post.carousel_media.map((slide) => {
                                return {
                                    type: "IMAGE",
                                    url: slide.image_versions2.candidates[0].url
                                };
                            }),
                            thumbnail: {
                                type: "IMAGE",
                                url: post.carousel_media[0].image_versions2.candidates[0].url
                            }
                        }
                    });
                    return doc.save();
                } else if (post.media_type === 2) {
                    const doc = new Post({
                        type: "INSTAGRAM",
                        timeCreated: new Date(post.taken_at * 1000),
                        userId: user.id,
                        instagram: {
                            id: post.id,
                            takenAt: new Date(post.taken_at * 1000),
                            likes: post.like_count,
                            caption: getCaption(post),
                            media: [
                                {
                                    type: "VIDEO",
                                    url: post.video_versions[0].url
                                }
                            ],
                            thumbnail: {
                                type: "IMAGE",
                                url: post.image_versions2.candidates[0].url
                            }
                        }
                    });
                    return doc.save();
                } else {
                    const doc = new Post({
                        type: "INSTAGRAM",
                        timeCreated: new Date(post.taken_at * 1000),
                        userId: user.id,
                        instagram: {
                            id: post.id,
                            takenAt: new Date(post.taken_at * 1000),
                            likes: post.like_count,
                            caption: getCaption(post),
                            media: [
                                {
                                    type: "IMAGE",
                                    url: post.image_versions2.candidates[0].url
                                }
                            ],
                            thumbnail: {
                                type: "IMAGE",
                                url: post.image_versions2.candidates[0].url
                            }
                        }
                    });
                    return doc.save();
                }
            })
        );
        page = await userFeed.items();
        await wait(5000 + Math.random() * 500);
    }
}

function getCaption(post: {
    caption: {
        text: string;
    };
}) {
    if (post.caption) {
        return post.caption.text;
    }
    return "";
}

async function wait(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

export default router;
