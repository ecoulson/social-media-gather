import styled from "@emotion/styled";
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