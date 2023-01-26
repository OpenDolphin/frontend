<script setup lang="ts">
import ButtonVue from '@/components/Button.vue';
import PostVue from '@/components/Post.vue';
import router from '@/router';
import type { Post } from '@/types/models';
import { CircleCheckFilled } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
import { onMounted, onUpdated, ref, watch, type Ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const config = window._config;
const route = useRoute();
let username = route.params.username;

interface User {
  id: number;
  createdAt: string;
  username: string;
  displayName: string;
  biography: string;
  verified: boolean;
};


const user: Ref<User | null> = ref(null);
const posts: Ref<Array<Post> | null> = ref(null);

const getUser = async ()=>{
  let req = new Request(`${config.backendUrl}/api/v1/users/@${username}`);
  try {
    let res = await fetch(req);
    if(res.status != 200) {
      console.error(`Invalid status code received: ${res.status}`);
      console.error(`Body = ${res.body}`)
      return
    }

    user.value = await res.json() as User;
  } catch(e) {
    console.error(`Unable to fetch profile @${username}`, e);
  }
}

const getUserPosts = async ()=>{
  let req = new Request(`${config.backendUrl}/api/v1/users/@${username}/posts`);
  try {
    let res = await fetch(req);
    if(res.status != 200) {
      console.error(`Invalid status code received: ${res.status}`);
      console.error(`Body = ${res.body}`)
      return
    }

    posts.value = await res.json() as Array<Post>;
  } catch(e) {
    console.error(`Unable to fetch profile @${username}`, e);
  }
}

onMounted(async ()=>{
  getUser()
  getUserPosts()
});

watch(route, ()=>{
  console.log("Something changed")
  username = route.params.username
  posts.value = [];
  getUser()
  getUserPosts()
})
</script>

<template>
  <main>
    <div class="user-profile" v-if="user != null">
      <div class="top-banner">
        <img 
          :src="`${config.backendUrl}/api/v1/users/@${user.username}/bio_picture`"
          class="top-banner"
        />
      </div>

      <div class="banner-bottom">
        <div class="profile-picture-action-buttons">
          <div class="profile-picture">
            <!-- TODO: Add highlightColor -->
            <ProfilePicture
                :size="150"
                :src="`${config.backendUrl}/api/v1/users/@${user.username}/profile_picture`"
                class="author-profile-picture"
                shape="circle"
            />
          </div>

          <div class="action-buttons">
            <ButtonVue>
              Follow
            </ButtonVue>
          </div>
        </div>

        <div class="user-info">
          <div class="display-name">
            <div class="real-display-name">{{ user.displayName }}</div>
            <div class="verified-badge" v-if="user.verified">
                <el-icon><CircleCheckFilled /></el-icon>
            </div>
          </div>
          <div class="username">
            @{{ username }}
          </div>
        </div>

        <div class="biography">
          {{ user.biography }}
        </div>
      </div>
    </div>

    <div class="posts" v-if="posts != null && user != null">
      <PostVue v-for="post in posts" :post="post" :author="user">

      </PostVue>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 800px;
  margin-left: auto;
  margin-right: auto;
}

$radius: 10px;

div.user-profile {
  background-color: var(--color-post-background);
  border-radius: $radius;
  padding-bottom: 20px;
  div.top-banner {
    border-radius: $radius;
    height: 250px;
    overflow: hidden;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  div.banner-bottom {
    margin-left: 20px;
    margin-right: 20px;
  }

  div.profile-picture-action-buttons {
    $height: 150px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: $height;
    margin-top: - calc($height / 2); 
    div.profile-picture {
      height: $height;
    }

    div.action-buttons {
      display: flex;
      padding-top: 15px;
      height: calc($height / 2);
    }
  }

  div.user-info {
    display: flex;
    flex-direction: column;
    width: 250px;
    margin-top: 15px;
    row-gap: 8px;

    div.display-name {
      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 8px;

      $height: 25px;
      height: $height;

      color: var(--color-text);
      font-size: 24px;
      line-height: $height;
      font-weight: bold;
      margin-top: 5px;

      div.real-display-name {
        font-weight: 600;
      }

      div.verified-badge {
        display: flex;
        align-items: center;
        color: var(--color-verified);
      }
      
    }

    div.username {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-soft);
    }
  }

  div.biography {
      color: var(--color-text-soft);
      font-size: 16px;
      margin-top: 10px;
    }
}

div.posts {
  margin-top: 2em;
}

@media screen and (max-width: 800px){
  main {
    width: 80vw;
  }
}
</style>