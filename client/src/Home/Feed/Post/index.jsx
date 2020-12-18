import React from "react";
import Media from "./Media";
import Layout from "./Layout";
import Header from "./Header";
import Reactions from "./Reactions";
import Title from "./Title";

export default () => {
    return (
        <Layout>
            <Header />
            <Media url="https://www.youtube.com/watch?v=x5_-bA3oaSw" />
            <Reactions reactions={[
                { type: "views", value: 146558 }, 
                { type: "likes", value: 13000 },
                { type: "comments", value: 791 }
            ]} />
            <Title title="IS THIS THE END OF MIKEL ARTETA?? (FTW)" />
        </Layout>
    )
}