<script setup lang="ts">
import type { UserProfile } from '@/types/profile';
import { useRoute } from 'vue-router';
const route = useRoute();

const username = route.params.username;
const user = {
  profilePicture: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  color: '#F00',
  verified: true,
}

const bannerPic = 'https://images.unsplash.com/photo-1570201731886-7f21202470b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=8';

</script>

<template>
  <main>
    <div class="user-profile">
      <div class="top-banner">
        <img 
          :src="bannerPic"
          class="top-banner"
        />
      </div>

      <div class="banner-bottom">
        <div class="profile-picture">
          <ProfilePicture
              :size="150"
              :src="user.profilePicture"
              :highlightColor="user.color"
              class="author-profile-picture"
              shape="circle"
          />
        </div>

        <div class="user-info">
          <div class="display-name">
            <div class="real-display-name">John Doe</div>
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
div.user-profile {
  div.top-banner {
    border-radius: 5px;
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

  div.profile-picture {
    $height: 150px;
    height: $height;
    margin-top: - calc($height / 2); 
  }

  div.user-info {
    display: flex;
    flex-direction: column;
    width: 150px;
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

      div.verified-badge {
        display: flex;
        align-items: center;
        color: var(--color-verified);
      }
      
    }

    div.username {
      font-size: 16px;
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