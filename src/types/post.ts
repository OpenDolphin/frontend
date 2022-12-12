type Reply = {
    displayName: string,
    username: string,
    verified: boolean,
    profilePicture: string,
    message: string,
    time: Date,
    color: string,

    likes: number;
    comments: number;
    boosts: number;
};

type User = {
    id: number;
    displayName: string;
    username: string;
    verified: boolean;
};

type PostResponse = {
    posts: Array<Post>;
    users: Array<User>;
};

type Post = {
    id: string;
    content: string;
    likes: number;
    author: number;
    replies?: Array<Post>;
    createdAt: Date;
}

export type { PostResponse, User, Post };