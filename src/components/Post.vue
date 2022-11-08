<script lang="ts" setup>
import type ProfilePicture from './ProfilePicture.vue';

import { faHeart, faComments } from '@fortawesome/free-regular-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';
import { Post } from '@/types/post';

defineProps({
    post: {
        type: Post,
        required: true,
    }
})

function renderPostDate(date: Date): string {
    let relativeTime = DateTime.fromJSDate(date).toRelative();
    if(relativeTime != null) {
        return relativeTime;
    }

    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_MED);
}

function formatNumber(n: number): string {
    if(n == undefined) {
        return '0';
    }
    if(n > 1000) {
        let ks = Math.round(n/100)/10;
        return `${ks}k`;
    }
    return `${n}`;
}
</script>

<template>
    <div class="post-group">
        <div class="post">
            <div class="post-top">
                <div class="author">
                    <ProfilePicture
                        :size="48"
                        shape="circle"
                        fit="cover"
                        :src="post.profilePicture"
                        :highlightColor="post.color"
                    />

                    <div class="author-info">
                        <div class="name-surname-verified">
                            <div class="name-surname">
                                {{ post.displayName }}
                            </div>
                            <el-icon 
                                class="verified-badge"
                                v-if="post.verified">
                                <CircleCheckFilled />
                            </el-icon>
                        </div>
                        <p class="username">@{{ post.username }}</p>
                    </div>
                </div>

                <div class="post-actions">
                    <el-icon class="clickable">
                        <MoreFilled />
                    </el-icon>
                </div>
            </div>

            <div class="post-content">
                <div class="post-message">
                    {{ post.message }}
                </div>
            </div>

            <div class="post-footer">
                <div class="post-actions">
                    <div class="post-action">
                        <div class="post-action-icon like-button">
                            <font-awesome-icon :icon="faHeart"/>
                        </div>
                        <div class="post-action-count">
                            {{ formatNumber(post.likes) }}
                        </div>
                    </div>

                    <div class="post-action">
                        <div class="post-action-icon reply-button">
                            <font-awesome-icon :icon="faComments"/>
                        </div>
                        <div class="post-action-count">
                            {{ formatNumber(post.comments) }}
                        </div>
                    </div>

                    <div class="post-action">
                        <div class="post-action-icon boost-button">
                            <font-awesome-icon :icon="faRetweet"/>
                        </div>
                        <div class="post-action-count">
                            {{ formatNumber(post.boosts) }}
                        </div>
                    </div>
                </div>

                <div class="post-date">
                    {{ renderPostDate(post.time) }}
                </div>
            </div>
        </div>

        <div class="post-replies" v-if="post.replies.length > 0">
            <div class="post-reply" v-for="reply in post.replies">
                
                <div class="post-reply-left">
                    <ProfilePicture
                        :size="50"
                        :src="reply.profilePicture"
                        :highlightColor="reply.color"
                        shape="circle"
                    />
                </div>

                <div class="post-reply-content">
                    <div class="user-info">
                        <div class="user-info--display-name">
                            {{ reply.displayName }}
                        </div>
                        <div class="user-info--verified-badge" v-if="reply.verified">
                            <el-icon><CircleCheckFilled /></el-icon>
                        </div>
                        <div class="user-info--username">
                            @{{ reply.username }}
                        </div>
                    </div>
                    <div class="post-content">
                        {{ reply.message }}
                    </div>
                    <div class="post-reply-footer">
                        <div class="post-actions">
                            <div class="post-action">
                                <div class="post-action-icon like-button">
                                    <font-awesome-icon :icon="faHeart"/>
                                </div>
                                <div class="post-action-count">
                                    {{ formatNumber(reply.likes) }}
                                </div>
                            </div>

                            <div class="post-action">
                                <div class="post-action-icon reply-button">
                                    <font-awesome-icon :icon="faComments"/>
                                </div>
                                <div class="post-action-count">
                                    {{ formatNumber(reply.comments) }}
                                </div>
                            </div>

                            <div class="post-action">
                                <div class="post-action-icon boost-button">
                                    <font-awesome-icon :icon="faRetweet"/>
                                </div>
                                <div class="post-action-count">
                                    {{ formatNumber(reply.boosts) }}
                                </div>
                            </div>
                        </div>
                        <div class="post-reply-timestamp">
                            {{ renderPostDate(reply.time) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.clickable {
    cursor: pointer;
}

$postBorderRadius: 10px;
$postPadding: 20px;

div.post-actions {
    display: flex;
    flex-direction: row;
    column-gap: 20px;

    margin-left: -5px;

    div.post-action {
        display: flex;
        align-items: center;
        column-gap: 4px;

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
        }
    }
}

div.post {
    display: flex;
    flex-direction: column;

    background-color: var(--color-post-background);

    border-radius: $postBorderRadius;
    padding: $postPadding;

    width: 600px;

    min-height: 100px;
    margin: 0px 10px 0px 10px;


    div.post-top {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;

        div.post-actions {
        }
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

            div.name-surname-verified {
                display: flex;
                column-gap: 10px;
                align-items: center;
                justify-items: center;

                div.name-surname {
                    font-size: 18px;
                    font-weight: bold;
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

    div.post-reply {
        display: flex;
        flex-direction: row;
        background-color: var(--color-post-background);
        align-items: flex-start;
        border-radius: $postBorderRadius;
        padding: $postPadding;
        column-gap: 18px;

        div.post-reply-content {
            display: flex;
            flex-direction: column;
            font-size: 16px;
        }

        $footerHeight: 20px;

        div.user-info {
            display: flex;
            font-size: 14px;
            margin-bottom: 4px;
            color: var(--color-text-soft);
            align-items: center;
            flex-direction: row;
            column-gap: 8px;
            height: $footerHeight;
            line-height: $footerHeight;

            div.user-info--display-name {
                font-weight: bold;
            }

            div.user-info--verified-badge {
                display: flex;
                align-items: center;
                color: var(--color-verified);
                height: $footerHeight;
                line-height: $footerHeight;
            }
        }
        div.post-reply-footer {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-top: 10px;
            height: $footerHeight;
            font-size: 14px;

            div.post-reply-timestamp {
                line-height: $footerHeight;
                color: var(--color-text-soft);
            }
        }

        div.post-actions {
            display: flex;
            flex-direction: row;

            div.post-action {
                display: flex;
                flex-direction: row;
            }
        }
    }
}
</style>