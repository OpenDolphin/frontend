<script setup lang="ts">
import ButtonVue from '@/components/Button.vue';
import { CircleCheckFilled } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';

const config = window._config;
const route = useRoute();
let username = route.params.username;

interface User {
  id: number;
  createdAt: string;
  username: string;
  displayName: string;
  verified: boolean;
};


const user: Ref<User | null> = ref(null);
const bannerPic = 'https://images.unsplash.com/photo-1570201731886-7f21202470b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=8';

onMounted(async ()=>{
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
});

</script>

<template>
  <main>
    <div class="user-profile" v-if="user != null">
      <div class="top-banner">
        <img 
          :src="bannerPic"
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
          Suspendisse viverra venenatis imperdiet. Donec accumsan erat lacus, vel auctor turpis volutpat id. Phasellus in malesuada enim. Donec nec risus purus. 
        </div>
      </div>
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
</style>