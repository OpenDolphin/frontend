<script lang="ts" setup>
import type { Post, User } from '@/types/post';
import { viewProfile, formatNumber, renderPostDate } from '@/utils/postUtils';
import { CircleCheckFilled } from '@element-plus/icons-vue';
import { faHeart, faComments } from '@fortawesome/free-regular-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ElIcon } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

const config = window._config;
defineProps<{
    post: Post
    author: User
}>()


</script>
<template>
    <div class="post-reply" v-for="reply in post.replies">

        <div class="post-reply-left">
            <ProfilePicture :size="50" 
                :src="`${config.backendUrl}/api/v1/users/@${author.username}/profile_picture`"
                @click.stop="viewProfile(router, author.username)" class="author-profile-picture"
                shape="circle" 
            />
        </div>

        <div class="post-reply-content">
            <div class="user-info" @click.stop="viewProfile(router, author.username)">
                <div class="user-info--display-name">
                    {{ author.displayName }}
                </div>
                <div class="user-info--verified-badge" v-if="author.verified">
                    <el-icon>
                        <CircleCheckFilled />
                    </el-icon>
                </div>
                <div class="user-info--username">
                    @{{ author.username }}
                </div>
            </div>
            <div class="post-content">
                {{ post.content }}
            </div>
            <div class="post-reply-footer">
                <div class="post-actions">
                    <div class="post-action">
                        <div class="post-action-icon like-button">
                            <font-awesome-icon :icon="faHeart" />
                        </div>
                        <div class="post-action-count">
                            {{ formatNumber(reply.likes) }}
                        </div>
                    </div>

                    <div class="post-action">
                        <div class="post-action-icon reply-button">
                            <font-awesome-icon :icon="faComments" />
                        </div>
                        <div class="post-action-count">
                            {{ formatNumber(reply.comments) }}
                        </div>
                    </div>

                    <div class="post-action">
                        <div class="post-action-icon boost-button">
                            <font-awesome-icon :icon="faRetweet" />
                        </div>
                        <div class="post-action-count">
                            {{ formatNumber(reply.boosts) }}
                        </div>
                    </div>
                </div>
                <div class="post-reply-timestamp">
                    {{ renderPostDate(reply.createdAt) }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

$postBorderRadius: 10px;
$postPadding: 20px;
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
        cursor: pointer;
        font-size: 14px;
        margin-bottom: 4px;
        color: var(--color-text);
        align-items: center;
        flex-direction: row;
        column-gap: 8px;
        height: $footerHeight;
        line-height: $footerHeight;

        div.user-info--display-name {
            font-weight: bold;
        }

        div.user-info--username {
            color: var(--color-text-soft);
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
</style>