type Reply = {
    displayName: String,
    username: String,
    verified: boolean,
    profilePicture: String,
    message: String,
    time: Date,
    color: String,

    likes: number;
    comments: number;
    boosts: number;
};

class Post {
    displayName: string = '';
    username: string = '';
    verified: boolean = false;
    profilePicture: string = '';
    message: string = '';
    color: string = '';
    time: Date = new Date();
    replies: Array<Reply> = [];

    likes: number = 0;
    comments: number = 0;
    boosts: number = 0;
};

export { Post };