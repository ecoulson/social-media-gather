import Builder from "../../Libraries/Builder/Builder";
import IImage from "../Media/IImage";
import Comment from "./Comment";
import IComment from "./IComment";

export default class CommentBuilder extends Builder<IComment> {
    private _id: string;
    private _postId: string;
    private _inReplyToId: string;
    private _text: string;
    private _replyCount: number;
    private _likes: number;
    private _dislikes: number;
    private _dateCreated: Date;
    private _username: string;
    private _profilePicture: IImage;

    reset(): void {
        this._id = null;
        this._postId = null;
        this._inReplyToId = null;
        this._text = null;
        this._replyCount = null;
        this._likes = null;
        this._dislikes = null;
        this._dateCreated = null;
        this._username = null;
        this._profilePicture = null;
    }
    construct(): IComment {
        return new Comment(
            this._id,
            this._postId,
            this._inReplyToId,
            this._text,
            this._replyCount,
            this._likes,
            this._dislikes,
            this._dateCreated,
            this._username,
            this._profilePicture
        );
    }

    setId(id: string): CommentBuilder {
        this._id = id;
        return this;
    }

    setPostId(postId: string): CommentBuilder {
        this._postId = postId;
        return this;
    }

    setInReplyToId(inReplyToId: string): CommentBuilder {
        this._inReplyToId = inReplyToId;
        return this;
    }
    setText(text: string): CommentBuilder {
        this._text = text;
        return this;
    }

    setReplyCount(replyCount: number): CommentBuilder {
        this._replyCount = replyCount;
        return this;
    }

    setLikes(likes: number): CommentBuilder {
        this._likes = likes;
        return this;
    }

    setDislikes(dislikes: number): CommentBuilder {
        this._dislikes = dislikes;
        return this;
    }

    setDateCreated(dateCreated: Date): CommentBuilder {
        this._dateCreated = dateCreated;
        return this;
    }
    setUsername(username: string): CommentBuilder {
        this._username = username;
        return this;
    }

    setProfileImage(profilePicture: IImage): CommentBuilder {
        this._profilePicture = profilePicture;
        return this;
    }
}
