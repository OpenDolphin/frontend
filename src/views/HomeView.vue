<script setup lang="ts">
import PostVue from '@/components/Post.vue';
import type { PostResponse, Post, User } from '@/types/models';
import { onMounted, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const config = window._config;

let postsResponse : Ref<PostResponse> = ref({posts: [], users: []});
let users : Map<Number, User> = new Map();

onMounted(async ()=>{
  await loadContent();
})

async function loadContent(){
  let req = new Request(`${config.backendUrl}/api/v1/posts`);
  let res = await fetch(req);
  if(res.status != 200 ){
    console.error(`Unable to fetch posts: ${res.status}`);
    return
  }
  let response: PostResponse = await res.json();

  for(let user of response.users) {
    console.log(user);
    users.set(user.id, user);
  }
  postsResponse.value = response
}

function findUser(id: number): User {
  let u = users.get(id);
  console.log(u);
  return u as User;
}

watch(route, async (a,b)=>{
  await loadContent();
});
</script>

<template>
  <main>
    <div class="posts">
      <PostVue 
        v-for="post in postsResponse.posts" 
        :post="post"
        :author="findUser(post.author)"
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
  max-width: 600px;
  min-height: 50px;
}
</style>