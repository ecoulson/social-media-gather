export default interface IYouTubeChannelBrandingSettingSchema {
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
}
