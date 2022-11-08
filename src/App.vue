<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router'
import { reactive, toRefs } from 'vue';
import ProfilePicture from './components/ProfilePicture.vue';
const state = reactive({
  fits: ['fill', 'contain', 'cover'],
  imageUrl: 'placeholders/avatar-1.png',
  name: 'Pierre',
});

const { fits, imageUrl, name } = toRefs(state);
</script>

<template>
  <header>
    <div class="topbar--left">
      <div class="logo">

      </div>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/trending">Trending</RouterLink>
        <RouterLink to="/events">Events</RouterLink>
        <RouterLink to="/communities">Communities</RouterLink>
      </nav>
    </div>
    <div class="topbar--right">
      <div class="profile-section">
        <div class="profile-actions">
          <div class="notifications">
            <el-badge :value="4" :max="10">
              <el-icon size="25">
                <BellFilled />
              </el-icon>
            </el-badge>
          </div>

          <div class="messages">
            <el-badge :value="56" :max="10" type="primary">
              <el-icon size="25">
                <MessageBox />
              </el-icon>
            </el-badge>
          </div>
        </div>

        <div class="profile-name">
          {{ name }}
        </div>
        <ProfilePicture :src="imageUrl" class="avatar" fit="cover" :size="50" shape="circle" />
      </div>

    </div>
  </header>

  <RouterView />
</template>

<style lang="scss">

</style>

<style scoped lang="scss">
header {
  position: sticky;
  left: 0;
  top: 0;
  right: 0;
  z-index: 300;

  display: flex;
  flex-direction: row;
  column-gap: 20px;
  justify-content: space-between;

  line-height: 1.5;
  $topBottom: 16px;
  $leftRight: 32px;
  padding: $topBottom $leftRight $topBottom $leftRight;
  background-color: var(--color-background-topbar);
  background-attachment: fixed;

  $textHeight: 40px;
  height: $textHeight + 2*$topBottom;


  // background-color: rgba(255, 255, 255, .15);  
  backdrop-filter: blur(5px);

  margin-bottom: 10px;

  $contentHeight: 40px;
  $columnGap: 40px;

  div.fill-demo {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 200px;
    background-color: #F00;
    flex-grow: 0;
  }

  div.profile-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 20px;

    color: var(--color-topbar-profile);
    font-size: 18px;

    div.profile-name {
      font-weight: 600;
    }

    div.profile-actions {
      display: flex;
      column-gap: 40px;
      height: 25px;
      margin-left: 20px;
      margin-right: 20px;
    }

    div.notifications {
      cursor: pointer;
      height: 25px;
    }

    div.messages {
      cursor: pointer;
    }
  }

  div.topbar--left {
    display: flex;
    flex-direction: row;
    column-gap: $columnGap;
  }

  div.topbar--right {
    display: flex;
    flex-direction: row;
    column-gap: $columnGap;
  }

  div.logo {
    width: 120px;
    height: $contentHeight;
    background-color: var(--color-100);
    border-radius: 5px;
  }

  nav {
    display: flex;
    flex-direction: row;
    column-gap: 40px;

    height: $contentHeight;
    line-height: $contentHeight;

    a {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-topbar-element);
      text-decoration: none;
    }
  }


}
</style>
