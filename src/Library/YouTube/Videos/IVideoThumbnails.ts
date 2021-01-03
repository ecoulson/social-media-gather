export default interface IVideoThumbnails {
    standard?: IThumbnail;
    maxres?: IThumbnail;
    high?: IThumbnail;
    medium?: IThumbnail;
    default?: IThumbnail;
}

interface IThumbnail {
    url: string;
}
