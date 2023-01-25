<script lang="ts" setup>
import type ProfilePicture from './ProfilePicture.vue';

import { faHeart, faComments } from '@fortawesome/free-regular-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import type { Post, User } from '@/types/models';
import router from '@/router';

import { viewProfile, formatNumber, renderPostDate } from '@/utils/postUtils';
import { ref, type Ref } from 'vue';
import UserCard from './UserCard.vue';

const config = window._config;
const props = defineProps<{
    post: Post
    author: User
}>()

const { post, author } = props;
let likedBy: Ref<Array<User>> = ref([]);
let likesLoading = ref(true);

let dialogTableVisible = ref(false);
const viewPost = (postId: string) => {
    router.push(`/posts/${postId}`)
}

const showLikes = async () => {
    likesLoading.value = true
    dialogTableVisible.value = !dialogTableVisible.value

    try {
        // Load likes
        let req = new Request(`${window._config.backendUrl}/api/v1/posts/${post.id}/liked_by`)
        let res = await fetch(req);
        if(res.status != 200) {
            console.log(`Invalid status code ${res.status} received`);
            return
        }
        let json = await res.json();
        likedBy.value = json as Array<User>;
        likesLoading.value = false;
    } catch(e) {
        console.error(`Unable to load likes: ${e}`)
    }
}

</script>

<template>
    <div class="post-group">
        <el-dialog v-model="dialogTableVisible" title="Liked by" class="likes-dialog" width="400">
            <div class="dialog-content" v-loading="likesLoading">
                <div class="user-likes" v-if="!likesLoading" v-loading="likesLoading">
                    <UserCard :user="user" v-for="user in likedBy"/>
                </div>
            </div>
        </el-dialog>
        <div class="post" @click.stop="() => viewPost(post.id)">
            <div class="post-top">
                <div class="author">
                    <ProfilePicture :size="48" shape="circle" fit="cover" class="author-profile-picture"
                        :src="`${config.backendUrl}/api/v1/users/@${author.username}/profile_picture`"
                        @click.stop="() => viewProfile(router, author.username)" />

                    <div class="author-info" @click.stop="viewProfile(router, author.username)">
                        <div class="name-surname-verified">
                            <div class="name-surname">
                                {{ author.displayName }}
                            </div>
                            <el-icon class="verified-badge" v-if="author.verified">
                                <CircleCheckFilled />
                            </el-icon>
                        </div>
                        <p class="username">@{{ author.username }}</p>
                    </div>
                </div>

                <div class="post-actions">
                    <el-icon class="clickable">
                        <MoreFilled />
                    </el-icon>
                </div>
            </div>

            <div class="post-content" @click.stop="">
                <div class="post-message">
                    {{ post.content }}
                </div>
            </div>

            <div class="post-footer">
                <div class="post-actions">
                    <div class="post-action">
                        <div class="post-action-icon like-button">
                            <font-awesome-icon :icon="faHeart" />
                        </div>
                        <div class="post-action-count clickable" @click.stop="showLikes">
                            {{ formatNumber(post.likes) }}
                        </div>
                    </div>

                    <div class="post-action">
                        <div class="post-action-icon reply-button">
                            <font-awesome-icon :icon="faComments" />
                        </div>
                        <div class="post-action-count">
                            {{ formatNumber(post.comments) }}
                        </div>
                    </div>

                    <div class="post-action">
                        <div class="post-action-icon boost-button">
                            <font-awesome-icon :icon="faRetweet" />
                        </div>
                        <div class="post-action-count">
                            {{ formatNumber(post.boosts) }}
                        </div>
                    </div>
                </div>

                <div class="post-date">
                    {{ renderPostDate(post.createdAt) }}
                </div>
            </div>
        </div>

        <div class="post-replies" v-if="(post.replies !== undefined)">
            <PostReply v-for="reply in post.replies" :post="reply"></PostReply>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.clickable {
    cursor: pointer;
}

$postBorderRadius: 10px;
$postPadding: 20px;

.author-profile-picture {
    cursor: pointer;
}

div.likes-dialog {
    div.dialog-content {
        div.user-likes {
            display: flex;
            flex-direction: column;
            row-gap: 20px;
        }
    }
}

div.post-actions {
    display: flex;
    flex-direction: row;
    column-gap: 20px;

    margin-left: -5px;

    div.post-action {
        display: flex;
        align-items: center;
        column-gap: 4px;
        user-select: none;

        div.post-action-icon {
            $iconSize: 32px;
            $iconInnerSize: 18px;

            cursor: pointer;
            color: #424242;
            border-radius: $iconSize;
            font-size: $iconInnerSize;
            width: $iconSize;
            height: $iconSize;
            line-height: $iconSize;
            text-align: center;

            $transitionTime: 0.2s;
            $easeFunction: linear;

            transition: color $transitionTime $easeFunction;
            transition: background-color $transitionTime $easeFunction;

            &:hover {
                background-color: #cdcdcd;
            }

            &.like-button:hover {
                color: var(--color-like);
                background-color: var(--color-like-background);
            }

            &.reply-button:hover {
                color: var(--color-comment);
                background-color: var(--color-comment-background);
            }

            &.boost-button:hover {
                color: var(--color-boost);
                background-color: var(--color-boost-background);
            }
        }

        div.post-action-count {
            text-align: left;

            &.clickable {
                cursor: pointer;
            }
        }
    }
}

div.post-group {
    width: 100%;
}

div.post {
    display: flex;
    flex-direction: column;

    background-color: var(--color-post-background);

    border-radius: $postBorderRadius;
    padding: $postPadding;
    width: 100%;
    min-height: 100px;

    div.post-top {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
    }

    div.post-content {
        margin-top: 1rem;

        div.post-message {
            font-size: 16px;
            font-weight: 400;
        }
    }

    div.author {
        display: flex;
        flex-direction: row;
        column-gap: 15px;

        div.author-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            row-gap: 0px;
            cursor: pointer;

            div.name-surname-verified {
                display: flex;
                column-gap: 10px;
                align-items: center;
                justify-items: center;

                div.name-surname {
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 25px;
                }

                .verified-badge {
                    color: var(--color-verified);
                }
            }

            p.username {
                font-size: 14px;
                height: 20px;
                line-height: 20px;
                color: var(--color-text-soft);
            }
        }
    }

    div.post-footer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 1rem;

        $footerHeight: 25px;

        div.post-date {
            color: var(--color-text-soft);
            height: $footerHeight;
            line-height: $footerHeight;
        }
    }
}

div.post-replies {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    $marginLeft: 60px;
    margin-left: $marginLeft;
    padding: 10px;
    max-width: 600px - $marginLeft + $postPadding;

    div.post-replies-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
}

@media screen and (max-width: 800px) {
    div.post {
        width: 80vw;

        div.post-footer {
            flex-direction: column;

            div.post-date {
                align-self: end;
            }
        }
    }
}
</style>