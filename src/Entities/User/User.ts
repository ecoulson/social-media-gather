import UserRecord from "../../Records/User/UserRecord";
import IUser from "./IUser";

export default class User implements IUser {
    constructor(
        private id_: string,
        private twitterId_: string,
        private youTubeId_: string,
        private twitchId_: string,
        private instagramId_: string,
        private email_: string,
        private username_: string,
        private verified_: boolean,
        private followingIds_: string[],
        private userRecord: InstanceType<typeof UserRecord>,
    ) { }

    id() { 
        return this.id_; 
    }

    twitterId() {
        return this.twitterId_;
    }

    youTubeId() { 
        return this.youTubeId_;
    }

    twitchId() { 
        return this.twitchId_; 
    }

    instagramId() { 
        return this.instagramId_; 
    }

    email() { 
        return this.email_; 
    }

    username() { 
        return this.username_; 
    }

    verified() { 
        return this.verified_; 
    }

    async following() {
        return Promise.all(this.followingIds_.map(id => this.userRecord.findById(id)));
    }

    followingIds() {
        return this.followingIds_;
    }
}