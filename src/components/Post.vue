<script lang="ts" setup>
import type ProfilePicture from './ProfilePicture.vue';

import { faHeart, faComments } from '@fortawesome/free-regular-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';



defineProps({
    name: {
        type: String,
        required: true,
    },
    highlightColor: {
        type: String,
        required: false,
        default: null,
    }
})
</script>

<template>
    <div class="post">
        <div class="post-top">
            <div class="author">
                <ProfilePicture
                    size="60"
                    shape="circle"
                    fit="cover"
                    src="placeholders/avatar-1.png"
                    :highlightColor="highlightColor"
                />

                <div class="author-info">
                    <p class="name-surname">{{ name }}</p>
                    <p class="username">@pdoe</p>
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
                Does anybody know a nice "compare" / "diff" package that shows differences of whitespaces in the diff as well? Currently working on a lot of formatting features and it would be great to have a nicer diff. Which packages are you using?
            </div>
        </div>

        <div class="post-footer">
            <div class="post-actions">
                <div class="post-action">
                    <div class="post-action-icon like-button">
                        <font-awesome-icon :icon="faHeart"/>
                    </div>
                    <div class="action-count">
                        13k
                    </div>
                </div>

                <div class="post-action">
                    <div class="post-action-icon reply-button">
                        <font-awesome-icon :icon="faComments"/>
                    </div>
                    <div class="action-count">
                        355
                    </div>
                </div>

                <div class="post-action">
                    <div class="post-action-icon boost-button">
                        <font-awesome-icon :icon="faRetweet"/>
                    </div>
                    <div class="action-count">
                        355
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

div.post {
    display: flex;
    flex-direction: column;

    background-color: var(--color-post-background);

    // border: 1px solid #DDD;
    border-radius: 10px;
    padding: 15px;

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
            font-size: 19px;
            font-weight: 400;
        }
    }

    div.author {
        display: flex;
        flex-direction: row;
        column-gap: 20px;

        div.author-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            row-gap: 0px;

            p.name-surname {
                font-size: 18px;
                line-height: 25px;
                height: 25px;
                font-weight: bold;
            }

            p.username {
                font-size: 14px;
                height: 20px;
                line-height: 20px;
                color: #999;
            }
        }
    }
    
    div.post-footer {
        div.post-actions {
            margin-top: 1rem;
            display: flex;
            flex-direction: row;
            column-gap: 20px;

            div.post-action {
                display: flex;
                align-items: center;
                column-gap: 4px;

                div.post-action-icon {
                    $iconSize: 34px;
                    $iconInnerSize: 18px;

                    cursor: pointer;
                    color: #424242;
                    border-radius: $iconSize;
                    width: $iconSize;
                    height: $iconSize;
                    line-height: $iconSize;
                    text-align: center;
                    font-size: $iconInnerSize;
                    text-align: center;

                    &:hover {
                        background-color: #cdcdcd;
                    }

                    &.like-button:hover {
                        color: var(--color-like);
                    }

                    &.reply-button:hover {
                        color: var(--color-comment);
                    }

                    &.boost-button:hover {
                        color: var(--color-boost);
                    }
                }
            }
        }
    }
}
</style>