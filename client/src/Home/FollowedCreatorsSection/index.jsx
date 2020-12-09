import React from "react";
import AddCreatorSection from "./AddCreatorSection";
import FollowedCreators from "./FollowedCreators";
import FollowedCreatorsHeader from "./FollowedCreatorsHeader";
import FollowedCreatorsLayout from "./FollowedCreatorsLayout";

export default function FollowedCreatorsSection() {
    return (
        <FollowedCreatorsLayout>
            <FollowedCreatorsHeader />
            <FollowedCreators />
            <AddCreatorSection />
        </FollowedCreatorsLayout>
    );
}