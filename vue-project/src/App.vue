<script setup lang="ts">
const urlSearchParams = new URLSearchParams(location.search);
const token = urlSearchParams.get("token");
if (!token) {
  fetch("http://localhost:3000/login?appId=Rs6s2aHi").then((res) => {
    location.href = res.url;
  });
}
</script>

<template>
  <div>vue-project</div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
