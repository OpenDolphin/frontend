<script setup lang="ts">
import PostVue from '@/components/Post.vue';

let colors = [
    '#689F38',
    '#FF9800',
    '#689F38',
    '#AD1457'
]
</script>

<template>
  <main>
    <div class="posts">
      <Post 
        v-for="color in colors" 
        :highlightColor="color"
        name="Pierre Doe"/>
    </div>
  </main>
</template>

<style lang="scss" scoped>

main {
  display: flex;
}
div.posts {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 80vw;
  min-height: 50px;
}
</style>