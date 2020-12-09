import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import isAuthenticated from "../Auth/IsAuthenticated";
import FeedFetcher from "../FeedFetcher";
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
            <FeedFetcher feedUrl="/api/feed" />
        </HomeLayout>
    )
}