<script lang="ts" setup>
import type { User } from '@/types/models';
import { useRouter } from 'vue-router';
import ProfilePicture from './ProfilePicture.vue';
const props = defineProps<{
    user: User
}>()
const { user } = props;
const config = window._config;
const router = useRouter();

const visitProfile = (username: string) => {
    router.push(`/profile/${username}`)
}

</script>

<template>
    <div class="user-card" @click.stop="visitProfile(user.username)">
        <ProfilePicture 
            class="profile-picture"
            :src="`${config.backendUrl}/api/v1/users/@${user.username}/profile_picture`" 
            shape="circle"
            :size="60"
        />
        <div class="info-right">
            <div class="display-name">{{  user.displayName }}</div>
            <div class="username">@{{ user.username }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
div.user-card {
    display: flex;
    flex-direction: row;
    column-gap: 20px;
    height: 60px;

    div.profile-picture {
        height: 100%;
    }

    div.info-right {
        display: flex;
        flex-direction: column;

        div.display-name {
            font-weight: bold;
        }
    }
}
</style>