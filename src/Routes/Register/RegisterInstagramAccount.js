const requiresAuth = require("../../Middleware/RequiresAuth");
const IgApiClient = require("instagram-private-api").IgApiClient;
const ig = new IgApiClient();
const router = require("express").Router();
const Post = require("../../Models/Post");
const User = require("../../Models/User");
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, (err, content) => {
    if (err) {
        return console.log('Error loading client secret file:', err);
    }
    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), setupInstagram);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
            return getNewToken(oAuth2Client, callback)
        }
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) {
                return console.error('Error retrieving access token', err);
            }
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getEmails(auth) {
    return new Promise((resolve, reject) => {
        const gmail = google.gmail({version: 'v1', auth});
        gmail.users.messages.list({
            userId: 'me',
            fields: "from: no-reply@mail.instagram.com"
        }, (err, res) => {
            if (err) {
                return reject('The API returned an error: ' + err);
            }
            const messages = res.data.messages;
            if (messages.length) {
                const threads = [];
                messages.forEach((message) => {
                    gmail.users.threads.get({
                        id: message.threadId,
                        userId: 'me'
                    }, (err, res) => {
                        if (err) {
                            console.log(err);
                        }
                        threads.push(res.data);
                    });
                });
                resolve(threads);
            } else {
                reject('No messages found.');
            }
        });
    })
}

ig.state.generateDevice(process.env.INSTAGRAM_USER);

async function setupInstagram(auth) {
    try {
        await ig.simulate.preLoginFlow();
        await ig.account.login(process.env.INSTAGRAM_USER, process.env.INSTAGRAM_PASSWORD);
        process.nextTick(async () => await ig.simulate.postLoginFlow());
    } catch (e) {
        console.log(e);
        let challenge = await ig.challenge.state();
        await ig.challenge.selectVerifyMethod(challenge.step_data.choice);
        challenge = await ig.challenge.state();
        emails = await getEmails(auth);
        console.log(emails);
        await ig.challenge.sendSecurityCode(challenge.nonce_code);
        console.log(await ig.challenge.state());    
        process.nextTick(async () => await ig.simulate.postLoginFlow());
    }
    console.log("instagram setup");
}

router.get("/", async (req, res) => {
    res.json(await searchUsers(req.query.username))
})

async function searchUsers(username) {
    const searchResults = await ig.search.users(username);
    return searchResults.map((user) => {
        return {
            username: user.username,
            id: user.pk,
            profilePicture: user.profile_pic_url
        }
    })
}

router.post("/", requiresAuth(), async (req, res) => {
    res.json(await registerAccount(req.user, req.body.id))
})

router.post("/add", requiresAuth(), async (req, res) => {
    const user = await User.findOne({ _id: req.body.userId });
    res.json(await registerAccount(user, req.body.id))
})

async function registerAccount(user, instagramId) {
    user.instagramId = instagramId;
    await user.save();
    const igUser = await ig.user.info(instagramId);
    const userFeed = ig.feed.user(instagramId);
    let count = 0;
    let page = await userFeed.items();
    while (count < igUser.media_count) {
        count += page.length;
        await Promise.all(page.map(async (post) => {
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
                            }
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
        }));
        page = await userFeed.items();
        await wait(5000 + Math.random() * 500);
    }
}

function getCaption(post) {
    if (post.caption) {
        return post.caption.text
    }
    return "";
}

async function wait(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    })
}

module.exports = router;