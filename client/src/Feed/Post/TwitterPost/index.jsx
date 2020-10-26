import React from "react";
import ReactPlayer from "react-player";
import { ReactComponent as Twitter } from "../../../Assets/twitter.svg";
import "./index.css";

export default function TwitterPost(props) {
    return (
        <div className="twitter-post-container">
            <div className="twitter-header">
                <Twitter className="twitter-header-logo" />
                <span className="twitter-header-date">
                    {new Date(props.post.publishedAt).toDateString()}
                </span>
            </div>
            <div className="tweet">{renderTweet(props.post, props.post.text)}</div>
            <div className="tweet-author-container"><a href={`https://twitter.com/${props.post.screenName}`} className="tweet-user">@{props.post.screenName}</a></div>
        </div>
    )
} 

function renderTweet(tweet, text) {
    const elements = [];
    const userMentions = text.match(/@\w*/g);
    const hashtags = text.match(/#\w*/g);
    const urls = text.match(/(https|http):\/\/\S*/g)
    const entityPositions = [];
    if (userMentions) {
        userMentions.forEach((userMention) => {
            const startIndex = text.indexOf(userMention);
            const endIndex = startIndex + userMention.length;
            entityPositions.push({
                startIndex, 
                endIndex,
                value: userMention,
                type: "user_mention"
            });
        })
    }
    if (hashtags) {
        hashtags.forEach((hashtag) => {
            const startIndex = text.indexOf(hashtag);
            const endIndex = startIndex + hashtag.length;
            entityPositions.push({
                startIndex,
                endIndex,
                value: hashtag,
                type: "hashtag"
            });
        })
    }

    if (urls) {
        urls.forEach((url) => {
            const startIndex = text.indexOf(url);
            const endIndex = startIndex + url.length;
            entityPositions.push({
                startIndex,
                endIndex,
                value: url,
                type: "url"
            });
        })
    }

    let currentIndex = 0;
    entityPositions.forEach((position) => {
        elements.push(text.substring(currentIndex, position.startIndex));
        currentIndex = position.endIndex;
        if (position.type === "hashtag") {
            elements.push(<a className="tweet-hashtag" href={`https://twitter.com/search?q=${position.value}`}>{position.value}</a>);
        }
        if (position.type === "user_mention") {
            elements.push(<a href={`https://twitter.com/${position.value.replace("@", "")}`} className="tweet-user">{position.value}</a>)
        }
        if (position.type === "url") {
            elements.push(<a href={position.value}>{position.value}</a>)
        }
    })
    elements.push(text.substring(currentIndex, text.length))

    if (tweet.media.length > 0) {
        tweet.media.forEach((media) => {
            if (media.type === "photo") {
                elements.push(<img alt="twitter post" className="twitter-media-attachment" src={media.url} />)
            } else {
                elements.push(<ReactPlayer controls className="twitter-media-attachment" url={media.url} />)
            }
        })
    }
    return elements;
}