export default interface ITwitterURLSchema {
    display_url: string;
    expanded_url: string;
    indices: [number, number];
    url: string;
    unwound?: {
        url: string;
        status: number;
        title: string;
        description: string;
    };
}
