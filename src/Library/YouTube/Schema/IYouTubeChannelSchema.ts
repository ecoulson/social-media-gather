import IYouTubeChannelSnippetSchema from "./IYouTubeChannelSnippetSchema";
import IYouTubeContentDetailsSchema from "./IYouTubeContentDetailsSchema";

export default interface IYouTubeChannelSchema {
    kind: "youtube#channel";
    etag: string;
    id: string;
    snippet: IYouTubeChannelSnippetSchema;
    contentDetails: IYouTubeContentDetailsSchema;
    statistics: {
        viewCount: number;
        subscriberCount: number;
        hiddenSubscriberCount: boolean;
        videoCount: number;
    };
    topicDetails: {
        topicIds: string[];
        topicCategories: string[];
    };
    status: {
        privacyStatus: string;
        isLinked: boolean;
        longUploadsStatus: string;
        madeForKids: boolean;
        selfDeclaredMadeForKids: boolean;
    };
    brandingSettings: {
        channel: {
            title: string;
            description: string;
            keywords: string;
            defaultTab: string;
            trackingAnalyticsAccountId: string;
            moderateComments: boolean;
            showRelatedChannels: boolean;
            showBrowseView: boolean;
            featuredChannelsTitle: string;
            featuredChannelsUrls: string[];
            unsubscribedTrailer: string;
            profileColor: string;
            defaultLanguage: string;
            country: string;
        };
        watch: {
            textColor: string;
            backgroundColor: string;
            featuredPlaylistId: string;
        };
    };
    auditDetails: {
        overallGoodStanding: boolean;
        communityGuidelinesGoodStanding: boolean;
        copyrightStrikesGoodStanding: boolean;
        contentIdClaimsGoodStanding: boolean;
    };
    contentOwnerDetails: {
        contentOwner: string;
        timeLinked: Date;
    };
    localizations: {
        (key): {
            title: string;
            description: string;
        };
    };
}
