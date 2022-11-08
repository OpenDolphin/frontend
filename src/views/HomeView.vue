<script setup lang="ts">
import PostVue from '@/components/Post.vue';
import type { Post } from '@/types/post';

let posts = [
    {
      displayName: 'Pierre Doe',
      username: 'pdoe',
      profilePicture: 'placeholders/avatar-1.jpg',
      color: '#689F38',
      verified: true,
      message: 'It\'s sunny outside!',
      time: new Date(2022, 10, 8, 22, 33, 0, 0),
      likes: 84,
      comments: 33,
      boosts: 7899,
      replies: [
        {
          displayName: 'Billy Evans',
          username: 'billy',
          verified: true,
          message: 'Very few companies on this planet manage a notable machine fleet that warrants an in-house compute team of software engineers building non-trivial systems and integrating it with the rest of their internal platform. Cloud has really changed the game for most large software shops.',
          profilePicture: 'placeholders/avatar-2.jpg',
          time: new Date(2022, 10, 8, 23, 33, 0, 0),
          color: '#EF6C00',
          likes: 43423,
          comments: 1234,
          boosts: 3332,
        },
        {
          displayName: 'Suzanne White 🔋⚡️',
          username: 'suzannew',
          verified: false,
          message: 'I have the feelings that many software hide their lack of substance using “magic” terms like “AI”. As a result, as I read that some software uses AI I tend to get really suspicious...',
          profilePicture: 'placeholders/avatar-3.jpg',
          time: new Date(2022, 10, 8, 23, 48, 0, 0),
          color: '#546E7A',
          likes: 55,
          comments: 12,
          boosts: 3,
        }
      ],
    },
    {
      displayName: 'Pierre Doe',
      username: 'pdoe',
      verified: false,
      message: 'Lorem Ipsum',
      profilePicture: 'placeholders/avatar-1.jpg',
      color: '#FF9800',
      time: new Date(2020, 5, 1, 12, 33, 0, 0),
      replies: [],
      likes: 1,
      comments: 2,
      boosts: 3,
    },
    {
      displayName: 'Pierre Doe',
      username: 'pdoe',
      verified: false,
      message: 'Lorem Ipsum',
      profilePicture: 'placeholders/avatar-1.jpg',
      color: '#689F38',
      time: new Date(2022, 5, 1, 12, 33, 0, 0),
      replies: [],
      likes: 4,
      comments: 5,
      boosts: 6,
    },
    {
      displayName: 'Pierre Doe',
      username: 'pdoe',
      verified: true,
      profilePicture: 'placeholders/avatar-1.jpg',
      message: 'Lorem Ipsum',
      color: '#AD1457',
      time: new Date(2022, 5, 1, 12, 33, 0, 0),
      replies: [],
      likes: 7,
      comments: 8,
      boosts: 9,
    },
] as Array<Post>;
</script>

<template>
  <main>
    <div class="posts">
      <Post 
        v-for="post in posts" 
        :post="post"
        />
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
  align-items: center;
  row-gap: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 80vw;
  min-height: 50px;
}
</style>