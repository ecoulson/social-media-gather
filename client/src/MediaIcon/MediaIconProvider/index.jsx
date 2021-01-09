import React from "react";
import { IconContext } from "react-icons";
import MediaIconType from "../Type";

const getStyle = (type) => {
    switch(type) {
        case MediaIconType.INSTAGRAM:
            return {
                style: {
                    fill: "white",
                    background: "linear-gradient(45deg, rgba(9,198,17,1) 0%, rgba(209,121,23,1) 50%, rgba(139,0,255,1) 100%)"
                }
            }
        case MediaIconType.YOUTUBE:
            return {
                style: {
                    fill: "white",
                    background: "red"
                }
            }
        case MediaIconType.TWITCH:
            return {
                style: {
                    fill: "white",
                    background: "#6441A4"
                }
            }
        case MediaIconType.TWITTER:
            return {
                style: {
                    background: "#1DA1F2",
                    fill: "white"
                }
            }
        default:
            return {};
    }
}

export default ({ type, children }) => {
    return (
        <IconContext.Provider value={getStyle(type)}>
            {children}
        </IconContext.Provider>
    )
}