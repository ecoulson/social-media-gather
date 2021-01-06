export default interface IYouTubeThumbnailSchema {
    type: "standard" | "medium" | "high" | "maxres" | "default";
    url: string;
    width: number;
    height: number;
}
