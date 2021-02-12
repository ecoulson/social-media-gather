export default interface IYouTubeVideoStatusSchema {
    uploadStatus?: string;
    failureReason?: string;
    rejectionReason?: string;
    privacyStatus?: string;
    publishAt?: string;
    license?: string;
    embeddable?: boolean;
    publicStatsViewable?: boolean;
    madeForKids?: boolean;
    selfDeclaredMadeForKids?: boolean;
}
