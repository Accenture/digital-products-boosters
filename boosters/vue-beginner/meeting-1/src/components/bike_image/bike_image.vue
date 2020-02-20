<template>
  <div class="bike_image">
    <img :alt="name" :src="imageUrl" />
    <div class="title">{{ name }}</div>
    <CommentsSection :comments="comments" />
  </div>
</template>

<script src="./bike_image.js"></script>
<style src="./bike_image.css" scoped></style>
