import { GridItem } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import isAuthenticated from "../Auth/IsAuthenticated";
import FeedFetcher from "../FeedFetcher";
import Feed from "./Feed";
import FollowedCreatorsSection from "./FollowedCreatorsSection";
import HomeLayout from "./HomeLayout";
import "./index.css";

export default function Home() {
    const history = useHistory();

    useEffect(() => {
        async function checkAuthenticated() {
            if (!(await isAuthenticated())) {
                history.push('/login')
            }
        }

        checkAuthenticated();
    }, [])

    return (
        <HomeLayout>
            <FollowedCreatorsSection />
            <GridItem gridArea="feed">
                <FeedFetcher Component={Feed} feedUrl="/api/feed" />
            </GridItem>
        </HomeLayout>
    )
}