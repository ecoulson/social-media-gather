export default interface ITwitterUserMentionsSchema {
    id: number;
    id_str: string;
    indices: [number, number];
    name: string;
    screen_name: string;
}
