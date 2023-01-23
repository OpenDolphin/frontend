<script setup lang="ts">
import PostVue from '@/components/Post.vue';
import type { Post, PostResponse, User } from '@/types/post';
import { numberLiteralTypeAnnotation } from '@babel/types';
import { onMounted, ref, watch, type Ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

let postId = route.params.post_id;
let post: Ref<Post|null> = ref(null);
let user: Ref<User|null> = ref(null);

const config = window._config;

const loadContent = async() => {
  let req = new Request(`${config.backendUrl}/api/v1/posts/${postId}`);
  let res = await fetch(req);
  if(res.status != 200 ){
    console.error(`Unable to fetch posts: ${res.status}`);
    return
  }
  let response: PostResponse = await res.json();

  if(response.posts.length != 1) {
    console.error(`Invalid PostResponse, posts.length = ${response.posts.length}`, response)
    return
  }

  if(response.users.length != 1){
    console.error(`Invalid PostResponse, users.length = ${response.users.length}`, response)
    return
  }

  post.value = response.posts[0]
  user.value = response.users[0];
};


watch(route, async (a,b)=>{
  await loadContent();
});

onMounted(async ()=>{
  await loadContent();
})

</script>

<template>
  <main>
    <div class="post">
      <div class="post-content" v-if="post != null && user != null">
        <PostVue 
          :post="post"
          :author="user"
        />
      </div>
      <div class="post-content" v-else>
        <h1>Post loading...</h1>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>

main {
  display: flex;
}
div.post {
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