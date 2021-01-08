import IYouTubeChannelAuditDetailsSchema from "./IYouTubeChannelAuditDetailsSchema";
import IYouTubeChannelBrandingSettingSchema from "./IYouTubeChannelBrandingSettingSchema";
import IYouTubeChannelContentOwnerDetailsSchema from "./IYouTubeChannelContentOwnerDetails";
import IYouTubeChannelSnippetSchema from "./IYouTubeChannelSnippetSchema";
import IYouTubeChannelStatisticsSchema from "./IYouTubeChannelStatisticsSchema";
import IYouTubeChannelStatusSchema from "./IYouTubeChannelStatusSchema";
import IYouTubeContentDetailsSchema from "./IYouTubeContentDetailsSchema";
import IYouTubeLocalizationSchema from "./IYouTubeLocalizationSchema";
import IYouTubeTopicDetailsSchema from "./IYouTubeTopicDetailsSchema";

export default interface IYouTubeChannelSchema {
    kind: "youtube#channel";
    etag: string;
    id: string;
    snippet: IYouTubeChannelSnippetSchema;
    contentDetails: IYouTubeContentDetailsSchema;
    statistics: IYouTubeChannelStatisticsSchema;
    topicDetails: IYouTubeTopicDetailsSchema;
    status: IYouTubeChannelStatusSchema;
    brandingSettings: IYouTubeChannelBrandingSettingSchema;
    auditDetails: IYouTubeChannelAuditDetailsSchema;
    contentOwnerDetails: IYouTubeChannelContentOwnerDetailsSchema;
    localizations: { [key: string]: IYouTubeLocalizationSchema };
}
