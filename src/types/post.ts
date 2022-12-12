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
    
    // Counters
    likes: number;
    comments: number;
    boosts: number;

    author: number;
    replies?: Array<Post>;
    createdAt: string;
}

export type { PostResponse, User, Post };